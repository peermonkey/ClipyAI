import { requireAuth } from '../../lib/auth.js'
import { query } from '../../lib/db.js'
import Stripe from 'stripe'
import { getStripeConfig } from '../../lib/config.js'

let stripe = null

function getStripeClient() {
  if (!stripe) {
    const config = getStripeConfig()
    stripe = new Stripe(config.secretKey)
  }
  return stripe
}

async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { userId } = req.user
    const { packageId, paymentMethodId } = req.body

    if (!packageId) {
      return res.status(400).json({ error: 'Package ID is required' })
    }

    // Define credit packages
    const creditPackages = {
      small: { id: 'small', credits: 50, amount: 500, description: 'Small Credit Pack - 50 Credits' },
      medium: { id: 'medium', credits: 150, amount: 1200, description: 'Medium Credit Pack - 150 Credits (20% Bonus)' },
      large: { id: 'large', credits: 500, amount: 3000, description: 'Large Credit Pack - 500 Credits (40% Bonus)' },
      subscription_basic: { id: 'subscription_basic', credits: 150, amount: 1500, description: 'Basic Monthly Plan - 150 Credits', recurring: true, interval: 'month' },
      subscription_pro: { id: 'subscription_pro', credits: 500, amount: 3000, description: 'Pro Monthly Plan - 500 Credits', recurring: true, interval: 'month' },
      subscription_agency: { id: 'subscription_agency', credits: 2000, amount: 9900, description: 'Agency Monthly Plan - 2000 Credits', recurring: true, interval: 'month' }
    }

    const selectedPackage = creditPackages[packageId]

    if (!selectedPackage) {
      return res.status(400).json({ error: 'Invalid package ID' })
    }

    // Get user details
    const users = query('SELECT email, name, subscription_plan FROM users WHERE id = ?', [userId])
    if (users.length === 0) {
      return res.status(404).json({ error: 'User not found' })
    }

    const user = users[0]
    const stripeClient = getStripeClient()

    // Check if user already has a subscription
    if (selectedPackage.recurring && user.subscription_plan && user.subscription_plan !== 'free') {
      return res.status(400).json({ error: 'You already have an active subscription. Please cancel it first.' })
    }

    try {
      // Create or retrieve customer
      let customer
      const existingCustomers = await stripeClient.customers.list({
        email: user.email,
        limit: 1
      })

      if (existingCustomers.data.length > 0) {
        customer = existingCustomers.data[0]
      } else {
        customer = await stripeClient.customers.create({
          email: user.email,
          name: user.name,
          metadata: {
            userId: userId.toString()
          }
        })
      }

      // Attach payment method if provided
      if (paymentMethodId) {
        await stripeClient.paymentMethods.attach(paymentMethodId, {
          customer: customer.id
        })
        
        // Set as default payment method
        await stripeClient.customers.update(customer.id, {
          invoice_settings: {
            default_payment_method: paymentMethodId
          }
        })
      }

      let paymentResult

      if (selectedPackage.recurring) {
        // Create subscription
        const subscription = await stripeClient.subscriptions.create({
          customer: customer.id,
          items: [{
            price_data: {
              currency: 'usd',
              product_data: {
                name: selectedPackage.description,
                description: `${selectedPackage.credits} Credits Monthly`
              },
              unit_amount: selectedPackage.amount,
              recurring: {
                interval: selectedPackage.interval
              }
            }
          }],
          payment_behavior: 'default_incomplete',
          metadata: {
            userId: userId.toString(),
            credits: selectedPackage.credits.toString(),
            packageId: selectedPackage.id
          }
        })

        paymentResult = {
          type: 'subscription',
          id: subscription.id,
          status: subscription.status,
          clientSecret: subscription.latest_invoice.payment_intent.client_secret
        }

        // Update user's subscription plan (will be finalized after payment confirmation)
        query('UPDATE users SET subscription_plan = ? WHERE id = ?', [selectedPackage.id, userId])
      } else {
        // Create one-time payment intent
        const paymentIntent = await stripeClient.paymentIntents.create({
          amount: selectedPackage.amount,
          currency: 'usd',
          customer: customer.id,
          description: selectedPackage.description,
          metadata: {
            userId: userId.toString(),
            credits: selectedPackage.credits.toString(),
            packageId: selectedPackage.id
          }
        })

        paymentResult = {
          type: 'payment',
          id: paymentIntent.id,
          status: paymentIntent.status,
          clientSecret: paymentIntent.client_secret
        }
      }

      // Record the transaction attempt
      const transactionResult = query(`
        INSERT INTO transactions (user_id, package_id, amount, credits, transaction_type, status, stripe_reference_id) 
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `, [
        userId,
        selectedPackage.id,
        selectedPackage.amount / 100, // Convert cents to dollars
        selectedPackage.credits,
        selectedPackage.recurring ? 'subscription' : 'one-time',
        'pending',
        paymentResult.id
      ])

      res.status(200).json({
        message: 'Payment process initiated',
        payment: {
          type: paymentResult.type,
          id: paymentResult.id,
          status: paymentResult.status,
          clientSecret: paymentResult.clientSecret,
          amount: selectedPackage.amount,
          credits: selectedPackage.credits,
          packageId: selectedPackage.id,
          transactionId: transactionResult.insertId
        }
      })

    } catch (paymentError) {
      console.error('Stripe payment error:', paymentError)
      res.status(500).json({
        error: 'Payment processing failed',
        details: paymentError.message
      })
    }

  } catch (error) {
    console.error('Credit purchase error:', error)
    res.status(500).json({ error: 'Internal server error', details: error.message })
  }
}

export default requireAuth(handler)

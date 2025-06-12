import Stripe from 'stripe';
import { getStripeConfig } from './config.js';

let stripeClient = null;

export function getStripeClient() {
  if (!stripeClient) {
    const config = getStripeConfig();
    stripeClient = new Stripe(config.secretKey, {
      apiVersion: '2022-11-15',
    });
  }
  return stripeClient;
}

export async function createPaymentIntent(amount, currency = 'usd', metadata = {}) {
  try {
    const client = getStripeClient();
    const paymentIntent = await client.paymentIntents.create({
      amount,
      currency,
      metadata,
    });
    return {
      success: true,
      paymentIntent,
    };
  } catch (error) {
    console.error('Stripe payment intent creation error:', error);
    return {
      success: false,
      error: error.message || 'Failed to create payment intent',
    };
  }
}

export async function confirmPaymentIntent(paymentIntentId, paymentMethodId) {
  try {
    const client = getStripeClient();
    const paymentIntent = await client.paymentIntents.confirm(paymentIntentId, {
      payment_method: paymentMethodId,
    });
    return {
      success: true,
      paymentIntent,
    };
  } catch (error) {
    console.error('Stripe payment intent confirmation error:', error);
    return {
      success: false,
      error: error.message || 'Failed to confirm payment intent',
    };
  }
}

export async function createSubscription(customerId, priceId, metadata = {}) {
  try {
    const client = getStripeClient();
    const subscription = await client.subscriptions.create({
      customer: customerId,
      items: [{ price: priceId }],
      metadata,
    });
    return {
      success: true,
      subscription,
    };
  } catch (error) {
    console.error('Stripe subscription creation error:', error);
    return {
      success: false,
      error: error.message || 'Failed to create subscription',
    };
  }
}

export async function cancelSubscription(subscriptionId) {
  try {
    const client = getStripeClient();
    const subscription = await client.subscriptions.del(subscriptionId);
    return {
      success: true,
      subscription,
    };
  } catch (error) {
    console.error('Stripe subscription cancellation error:', error);
    return {
      success: false,
      error: error.message || 'Failed to cancel subscription',
    };
  }
}

export async function getCustomerByEmail(email) {
  try {
    const client = getStripeClient();
    const customers = await client.customers.list({
      email,
      limit: 1,
    });
    if (customers.data.length > 0) {
      return {
        success: true,
        customer: customers.data[0],
      };
    }
    return {
      success: false,
      error: 'Customer not found',
    };
  } catch (error) {
    console.error('Stripe customer retrieval error:', error);
    return {
      success: false,
      error: error.message || 'Failed to retrieve customer',
    };
  }
}

export async function createCustomer(email, name, metadata = {}) {
  try {
    const client = getStripeClient();
    const customer = await client.customers.create({
      email,
      name,
      metadata,
    });
    return {
      success: true,
      customer,
    };
  } catch (error) {
    console.error('Stripe customer creation error:', error);
    return {
      success: false,
      error: error.message || 'Failed to create customer',
    };
  }
}

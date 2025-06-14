'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@xclips/ui';
import { 
  CreditCardIcon, 
  ArrowRightIcon,
  CheckCircleIcon,
  ClockIcon,
  FilmIcon,
} from '@heroicons/react/24/outline';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import { cn } from '@xclips/ui/utils/cn';

// Mock data for backend placeholder
const mockCreditsData = {
  balance: 120,
  lastPurchase: {
    date: "2025-05-10T14:30:00Z",
    amount: 50,
    credits: 50,
    status: "completed"
  },
  transactions: [
    {
      id: "trans_1",
      type: "purchase",
      amount: 50,
      credits: 50,
      date: "2025-05-10T14:30:00Z",
      status: "completed"
    },
    {
      id: "trans_2",
      type: "usage",
      amount: 0,
      credits: -8,
      date: "2025-06-01T09:15:00Z",
      status: "completed",
      description: "Video processing (Motivational Speech Highlight)"
    },
    {
      id: "trans_3",
      type: "usage",
      amount: 0,
      credits: -5,
      date: "2025-05-28T16:45:00Z",
      status: "completed",
      description: "Video processing (Funny Cat Moment)"
    },
    {
      id: "trans_4",
      type: "purchase",
      amount: 25,
      credits: 25,
      date: "2025-04-15T11:20:00Z",
      status: "completed"
    },
    {
      id: "trans_5",
      type: "usage",
      amount: 0,
      credits: -12,
      date: "2025-04-10T10:10:00Z",
      status: "completed",
      description: "Video processing (Tech Review Snippet)"
    }
  ]
};

// Pricing plans
const pricingPlans = [
  {
    name: "Starter",
    credits: 25,
    price: 25,
    description: "Perfect for occasional creators",
    features: ["25 credits", "Basic AI features", "Standard support"],
    popular: false
  },
  {
    name: "Pro",
    credits: 60,
    price: 50,
    description: "Best value for regular creators",
    features: ["60 credits", "Advanced AI features", "Priority support", "Bonus 10 credits"],
    popular: true
  },
  {
    name: "Enterprise",
    credits: 150,
    price: 120,
    description: "For high-volume content teams",
    features: ["150 credits", "All AI features", "24/7 dedicated support", "Team accounts"],
    popular: false
  }
];

// Mock function for backend placeholder
const mockFetchCreditsData = async () => {
  // Placeholder for backend API call
  return new Promise<typeof mockCreditsData>((resolve) => {
    setTimeout(() => {
      resolve(mockCreditsData);
    }, 500);
  });
};

const mockPurchaseCredits = async (plan: string, credits: number, price: number) => {
  // Placeholder for backend API call
  console.log(`Purchasing ${credits} credits with ${plan} plan for $${price}`);
  return new Promise<{ success: boolean, transactionId: string }>((resolve) => {
    setTimeout(() => {
      resolve({ 
        success: true, 
        transactionId: `trans_${Math.random().toString(36).substr(2, 9)}`
      });
    }, 1500);
  });
};

export default function CreditsPage() {
  const [creditsData, setCreditsData] = useState<typeof mockCreditsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'buy' | 'transactions'>('overview');
  const [purchasing, setPurchasing] = useState(false);
  const [purchaseSuccess, setPurchaseSuccess] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(pricingPlans[1]); // Default to Pro plan
  
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const data = await mockFetchCreditsData();
        setCreditsData(data);
      } catch (err) {
        setError('Failed to load credits data. Please try again.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    
    loadData();
  }, []);

  const handlePurchase = async () => {
    setPurchasing(true);
    setError(null);
    
    try {
      // Placeholder backend call for purchase
      const result = await mockPurchaseCredits(selectedPlan.name, selectedPlan.credits, selectedPlan.price);
      if (result.success) {
        setPurchaseSuccess(true);
        // Update credits balance (mock)
        setCreditsData(prev => prev ? ({ ...prev, balance: prev.balance + selectedPlan.credits }) : prev);
      } else {
        setError('Purchase failed. Please try again.');
      }
    } catch (err) {
      setError('An error occurred during purchase. Please try again.');
      console.error(err);
    } finally {
      setPurchasing(false);
    }
  };

  const getTransactionIcon = (type: string) => {
    if (type === 'purchase') {
      return <CreditCardIcon className="w-5 h-5 text-accent-blue" />;
    } else if (type === 'usage') {
      return <FilmIcon className="w-5 h-5 text-text-secondary" />;
    }
    return <CreditCardIcon className="w-5 h-5 text-text-secondary" />;
  };

  const getTransactionColor = (type: string) => {
    if (type === 'purchase') {
      return 'text-status-success';
    } else if (type === 'usage') {
      return 'text-text-secondary';
    }
    return 'text-text-secondary';
  };

  return (
    <div className="min-h-screen bg-bg-primary flex flex-col">
      <Header />
      
      <main className="flex-1 py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-semibold text-white mb-2">Credits & Billing</h1>
            <p className="text-text-secondary">
              Manage your credits and view your transaction history.
            </p>
          </div>
          
          {error && (
            <div className="mb-6 p-3 bg-status-error-light text-status-error rounded-lg text-sm">
              {error}
            </div>
          )}
          
          {loading ? (
            <div className="py-12 flex justify-center">
              <div className="text-text-secondary">Loading your credits information...</div>
            </div>
          ) : (
            <>
              {/* Credits Balance Card */}
              <div className="bg-bg-surface border border-border-primary rounded-lg p-6 shadow-sm mb-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-semibold text-white mb-1">Current Balance</h2>
                    <p className="text-text-secondary">You have <span className="font-semibold text-accent-blue">{creditsData?.balance}</span> credits available for video processing and AI features.</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Button variant="ghost" size="sm" onClick={() => setActiveTab('transactions')}>
                      View History
                    </Button>
                    <Button size="sm" className="relative overflow-hidden group" onClick={() => setActiveTab('buy')}>
                      <span className="relative z-10">Buy Credits</span>
                      <ArrowRightIcon className="w-3 h-3 ml-1 relative z-10" />
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                    </Button>
                  </div>
                </div>
              </div>
              
              {/* Tab Navigation */}
              <div className="border-b border-border-primary mb-12">
                <div className="flex gap-1">
                  <button
                    onClick={() => setActiveTab('overview')}
                    className={cn(
                      "px-4 py-3 relative transition-colors duration-200",
                      activeTab === 'overview' ? "text-accent-blue" : "text-text-tertiary hover:text-text-secondary"
                    )}
                  >
                    <span className="relative z-10">Overview</span>
                    {activeTab === 'overview' && (
                      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent-blue" />
                    )}
                  </button>
                  <button
                    onClick={() => setActiveTab('buy')}
                    className={cn(
                      "px-4 py-3 relative transition-colors duration-200",
                      activeTab === 'buy' ? "text-accent-blue" : "text-text-tertiary hover:text-text-secondary"
                    )}
                  >
                    <span className="relative z-10">Buy Credits</span>
                    {activeTab === 'buy' && (
                      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent-blue" />
                    )}
                  </button>
                  <button
                    onClick={() => setActiveTab('transactions')}
                    className={cn(
                      "px-4 py-3 relative transition-colors duration-200",
                      activeTab === 'transactions' ? "text-accent-blue" : "text-text-tertiary hover:text-text-secondary"
                    )}
                  >
                    <span className="relative z-10">Transaction History</span>
                    {activeTab === 'transactions' && (
                      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent-blue" />
                    )}
                  </button>
                </div>
              </div>
              
              {/* Tab Content */}
              {activeTab === 'overview' ? (
                <div className="space-y-8">
                  {/* Credits Usage */}
                  <div className="bg-bg-surface border border-border-primary rounded-lg p-6 shadow-sm">
                    <h3 className="text-xl font-semibold text-white mb-6">Credits Usage</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <div className="mb-4">
                          <div className="flex items-center justify-between text-sm mb-2">
                            <span className="text-text-secondary">Current Balance</span>
                            <span className="font-medium text-white">{creditsData?.balance} credits</span>
                          </div>
                          <div className="w-full bg-bg-tertiary rounded-full h-2">
                            <div className="bg-accent-blue h-2 rounded-full" style={{ width: `${Math.min((creditsData?.balance || 0) / 150 * 100, 100)}%` }} />
                          </div>
                        </div>
                        <p className="text-text-tertiary text-sm mb-6">
                          Credits are used for video processing, AI clip generation, and premium export features.
                        </p>
                        <div className="border-t border-border-primary pt-4 mt-4">
                          <h4 className="font-medium text-white mb-3">Last Purchase</h4>
                          {creditsData?.lastPurchase ? (
                            <div className="text-sm">
                              <div className="flex items-center justify-between mb-1">
                                <span className="text-text-secondary">Date</span>
                                <span className="text-white">{new Date(creditsData.lastPurchase.date).toLocaleDateString()}</span>
                              </div>
                              <div className="flex items-center justify-between mb-1">
                                <span className="text-text-secondary">Amount</span>
                                <span className="text-white">${creditsData.lastPurchase.amount}</span>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-text-secondary">Credits</span>
                                <span className="font-medium text-status-success">+{creditsData.lastPurchase.credits}</span>
                              </div>
                            </div>
                          ) : (
                            <p className="text-text-tertiary text-sm">No purchases yet.</p>
                          )}
                        </div>
                      </div>
                      <div className="bg-bg-secondary rounded-lg p-4 border border-border-secondary">
                        <h4 className="font-medium text-white mb-3">How Credits Work</h4>
                        <ul className="space-y-2 text-sm text-text-secondary">
                          <li className="flex items-start gap-2">
                            <CheckCircleIcon className="w-4 h-4 text-status-success mt-1 flex-shrink-0" />
                            <span>1 credit = 1 minute of processed video</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircleIcon className="w-4 h-4 text-status-success mt-1 flex-shrink-0" />
                            <span>Additional credits for premium AI features and exports</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircleIcon className="w-4 h-4 text-status-success mt-1 flex-shrink-0" />
                            <span>Credits never expire</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircleIcon className="w-4 h-4 text-status-success mt-1 flex-shrink-0" />
                            <span>Volume discounts on larger plans</span>
                          </li>
                        </ul>
                        <Button variant="ghost" size="sm" className="mt-4" onClick={() => setActiveTab('buy')}>
                          View Pricing Plans <ArrowRightIcon className="w-3 h-3 ml-1" />
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  {/* Recent Transactions Preview */}
                  <div className="bg-bg-surface border border-border-primary rounded-lg p-6 shadow-sm">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-xl font-semibold text-white">Recent Transactions</h3>
                      <Button variant="ghost" size="sm" onClick={() => setActiveTab('transactions')}>
                        View All <ArrowRightIcon className="w-3 h-3 ml-1" />
                      </Button>
                    </div>
                    <div className="space-y-4">
                      {creditsData?.transactions.slice(0, 3).map((transaction) => (
                        <div key={transaction.id} className="flex items-center justify-between p-3 bg-bg-secondary rounded-lg border border-border-secondary">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-bg-tertiary rounded-full">
                              {getTransactionIcon(transaction.type)}
                            </div>
                            <div>
                              <div className="font-medium text-white capitalize">{transaction.type}</div>
                              {transaction.description && (
                                <div className="text-xs text-text-tertiary">{transaction.description}</div>
                              )}
                            </div>
                          </div>
                          <div className="text-right">
                            <div className={cn("font-medium", getTransactionColor(transaction.type))}>
                              {transaction.type === 'purchase' ? '+' : ''}{transaction.credits} credits
                            </div>
                            {transaction.amount > 0 && (
                              <div className="text-xs text-text-tertiary">${transaction.amount}</div>
                            )}
                            <div className="text-xs text-text-tertiary">{new Date(transaction.date).toLocaleDateString()}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : activeTab === 'buy' ? (
                <div className="space-y-8">
                  {/* Purchase Credits */}
                  <div className="bg-bg-surface border border-border-primary rounded-lg p-6 shadow-sm">
                    <h3 className="text-xl font-semibold text-white mb-6">Buy Credits</h3>
                    
                    {purchaseSuccess ? (
                      <div className="p-6 bg-status-success-light text-status-success rounded-lg mb-6 text-center animate-fade-in">
                        <CheckCircleIcon className="w-10 h-10 mx-auto mb-2" />
                        <h4 className="text-xl font-semibold mb-2">Purchase Successful!</h4>
                        <p className="mb-4">You've successfully purchased {selectedPlan.credits} credits with the {selectedPlan.name} plan.</p>
                        <p className="text-sm">Your new balance is {creditsData?.balance} credits.</p>
                        <Button size="sm" className="mt-4" onClick={() => setPurchaseSuccess(false)}>
                          Buy More Credits
                        </Button>
                      </div>
                    ) : (
                      <>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                          {pricingPlans.map((plan) => (
                            <div 
                              key={plan.name}
                              className={cn(
                                "border rounded-lg overflow-hidden hover:border-border-accent transition-colors duration-200 relative group cursor-pointer",
                                selectedPlan.name === plan.name ? "border-accent-blue" : "border-border-primary"
                              )}
                              onClick={() => setSelectedPlan(plan)}
                            >
                              {plan.popular && (
                                <div className="absolute top-0 left-0 right-0 bg-accent-blue text-white text-xs font-medium text-center py-1 z-10">
                                  Most Popular
                                </div>
                              )}
                              <div className={cn("p-6 bg-bg-secondary", plan.popular ? "pt-8" : "")}>
                                <h4 className="text-lg font-semibold text-white mb-1">{plan.name}</h4>
                                <div className="text-3xl font-semibold text-white mb-1">${plan.price}</div>
                                <div className="text-sm text-accent-blue mb-3">{plan.credits} credits</div>
                                <p className="text-text-secondary text-sm mb-4">{plan.description}</p>
                                <ul className="space-y-2 text-sm text-text-secondary">
                                  {plan.features.map((feature, index) => (
                                    <li key={index} className="flex items-start gap-2">
                                      <CheckCircleIcon className="w-4 h-4 text-status-success mt-1 flex-shrink-0" />
                                      <span>{feature}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          ))}
                        </div>
                        
                        <div className="border-t border-border-primary pt-6 mt-6">
                          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                            <div>
                              <h4 className="font-medium text-white mb-1">Order Summary</h4>
                              <p className="text-text-secondary">Purchasing <span className="font-medium text-white">{selectedPlan.credits} credits</span> with the <span className="font-medium text-white">{selectedPlan.name}</span> plan.</p>
                            </div>
                            <div className="text-right">
                              <div className="text-text-secondary text-sm">Total:</div>
                              <div className="text-2xl font-semibold text-white">${selectedPlan.price}</div>
                            </div>
                          </div>
                          
                          <div className="bg-bg-secondary border border-border-secondary rounded-lg p-4 mb-6">
                            <h5 className="font-medium text-white mb-3">Payment Method</h5>
                            <div className="flex items-center justify-between border border-border-primary rounded p-3 bg-bg-tertiary">
                              <div className="flex items-center gap-2">
                                <CreditCardIcon className="w-5 h-5 text-accent-blue" />
                                <span className="text-white">Visa ending in 1234</span>
                              </div>
                              <button className="text-text-tertiary hover:text-text-secondary text-sm">Change</button>
                            </div>
                            <p className="text-xs text-text-tertiary mt-2">This is a placeholder payment method. In a real implementation, you would integrate with a payment processor.</p>
                          </div>
                          
                          <Button
                            onClick={handlePurchase}
                            disabled={purchasing}
                            className="w-full relative overflow-hidden group"
                          >
                            <span className="relative z-10">
                              {purchasing ? 'Processing Payment...' : 'Complete Purchase'}
                            </span>
                            {!purchasing && <ArrowRightIcon className="w-4 h-4 relative z-10 ml-2" />}
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                          </Button>
                          <p className="text-center text-xs text-text-tertiary mt-3">
                            By completing this purchase, you agree to our{' '}
                            <a href="/terms" className="text-accent-blue hover:underline">Terms of Service</a>.
                          </p>
                        </div>
                      </>
                    )}
                  </div>
                  
                  {/* FAQ */}
                  <div className="bg-bg-surface border border-border-primary rounded-lg p-6 shadow-sm">
                    <h3 className="text-xl font-semibold text-white mb-6">Frequently Asked Questions</h3>
                    <div className="space-y-6">
                      <div className="border-b border-border-primary pb-4">
                        <h4 className="font-medium text-white mb-2">How are credits used?</h4>
                        <p className="text-text-secondary text-sm">Credits are used for processing videos, generating AI clips, and exporting with premium features. Typically, 1 credit equals 1 minute of processed video content, with additional credits for advanced features.</p>
                      </div>
                      <div className="border-b border-border-primary pb-4">
                        <h4 className="font-medium text-white mb-2">Do credits expire?</h4>
                        <p className="text-text-secondary text-sm">No, credits purchased on Xclips.ai never expire. You can use them at any time as long as your account remains active.</p>
                      </div>
                      <div className="border-b border-border-primary pb-4">
                        <h4 className="font-medium text-white mb-2">Can I get a refund for credits?</h4>
                        <p className="text-text-secondary text-sm">Credits are non-refundable as stated in our terms of service. However, if you encounter any issues with your purchase, please contact support for assistance.</p>
                      </div>
                      <div>
                        <h4 className="font-medium text-white mb-2">Do you offer volume discounts or custom plans?</h4>
                        <p className="text-text-secondary text-sm">Yes, we offer volume discounts on our larger plans. For enterprise needs or custom plans, please contact our sales team for personalized pricing.</p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-8">
                  {/* Transactions History */}
                  <div className="bg-bg-surface border border-border-primary rounded-lg shadow-sm overflow-hidden">
                    <div className="p-6 border-b border-border-primary">
                      <h3 className="text-xl font-semibold text-white">Transaction History</h3>
                    </div>
                    
                    <div className="overflow-x-auto">
                      <table className="min-w-full">
                        <thead>
                          <tr className="border-b border-border-primary bg-bg-secondary">
                            <th className="px-6 py-3 text-left text-xs font-medium text-text-tertiary uppercase tracking-wider w-1/3">Transaction</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-text-tertiary uppercase tracking-wider">Date</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-text-tertiary uppercase tracking-wider">Status</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-text-tertiary uppercase tracking-wider">Amount</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-text-tertiary uppercase tracking-wider">Credits</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-border-primary">
                          {creditsData?.transactions.map((transaction) => (
                            <tr key={transaction.id} className="hover:bg-bg-glass transition-colors duration-200">
                              <td className="px-6 py-4">
                                <div className="flex items-center gap-3">
                                  <div className="p-2 bg-bg-tertiary rounded-full flex-shrink-0">
                                    {getTransactionIcon(transaction.type)}
                                  </div>
                                  <div>
                                    <div className="font-medium text-white capitalize">{transaction.type}</div>
                                    {transaction.description && (
                                      <div className="text-xs text-text-tertiary truncate w-48 md:w-auto">{transaction.description}</div>
                                    )}
                                  </div>
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-text-tertiary">
                                {new Date(transaction.date).toLocaleDateString()} {new Date(transaction.date).toLocaleTimeString()}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span className={cn(
                                  "px-2 py-0.5 inline-flex text-xs font-medium rounded-full",
                                  transaction.status === 'completed' ? 'bg-status-success-light text-status-success' : 'bg-status-warning-light text-status-warning'
                                )}>
                                  {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                                </span>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-text-secondary">
                                {transaction.amount > 0 ? `$${transaction.amount}` : '—'}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm">
                                <span className={cn(
                                  transaction.type === 'purchase' ? 'text-status-success' : 'text-text-secondary',
                                  "font-medium"
                                )}>
                                  {transaction.type === 'purchase' ? '+' : ''}{transaction.credits}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    
                    {creditsData?.transactions.length === 0 && (
                      <div className="p-6 text-center text-text-tertiary border-t border-border-primary">
                        No transactions yet. Purchase credits to get started.
                        <Button size="sm" className="mt-3" onClick={() => setActiveTab('buy')}>
                          Buy Credits
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
}

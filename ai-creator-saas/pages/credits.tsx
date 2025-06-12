import { useState } from 'react'
import { CreditCard, TrendingUp, Calendar, Gift, Zap, Crown, Star, Check, ArrowRight, RefreshCw } from 'lucide-react'
// Charts will be added later when recharts is installed

interface PricingTier {
  name: string
  price: number
  credits: number
  features: string[]
  popular?: boolean
  current?: boolean
}

export default function CreditsPage() {
  const [currentPlan, setCurrentPlan] = useState('Basic')
  const [creditsUsed, setCreditsUsed] = useState(850)
  const [creditsTotal, setCreditsTotal] = useState(1000)
  const [showUpgradeModal, setShowUpgradeModal] = useState(false)

  const usageData = [
    { month: 'Jan', credits: 120 },
    { month: 'Feb', credits: 180 },
    { month: 'Mar', credits: 240 },
    { month: 'Apr', credits: 320 },
    { month: 'May', credits: 450 },
    { month: 'Jun', credits: 680 },
    { month: 'Jul', credits: 850 }
  ]

  const dailyUsage = [
    { day: 'Mon', credits: 45 },
    { day: 'Tue', credits: 32 },
    { day: 'Wed', credits: 78 },
    { day: 'Thu', credits: 65 },
    { day: 'Fri', credits: 89 },
    { day: 'Sat', credits: 23 },
    { day: 'Sun', credits: 34 }
  ]

  const pricingTiers: PricingTier[] = [
    {
      name: 'Free',
      price: 0,
      credits: 60,
      features: [
        '60 minutes/month',
        'Watermarked exports',
        '720p quality',
        'Basic AI clips',
        'Email support'
      ]
    },
    {
      name: 'Basic',
      price: 15,
      credits: 150,
      features: [
        '150 minutes/month',
        'Watermark-free exports',
        'HD quality (1080p)',
        'Advanced AI clips',
        'Priority support',
        'Custom captions'
      ],
      current: true
    },
    {
      name: 'Pro',
      price: 30,
      credits: 500,
      features: [
        '500 minutes/month',
        'All Basic features',
        'Reels mode optimization',
        'Batch export',
        'Priority processing',
        'Analytics dashboard',
        'API access'
      ],
      popular: true
    },
    {
      name: 'Agency',
      price: 99,
      credits: 2000,
      features: [
        '2000 minutes/month',
        'All Pro features',
        'Multi-seat access',
        'Custom branding',
        'White-label options',
        'Dedicated support',
        'Custom integrations'
      ]
    }
  ]

  const creditsPercentage = (creditsUsed / creditsTotal) * 100
  const remainingCredits = creditsTotal - creditsUsed

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Credits & Billing</h1>
          <p className="text-gray-400">
            Manage your usage and upgrade your plan
          </p>
        </div>
        
        <div className="flex items-center space-x-4 mt-4 md:mt-0">
          <button className="btn-neon flex items-center">
            <CreditCard className="w-4 h-4 mr-2" />
            Buy Credits
          </button>
        </div>
      </div>

      {/* Current Usage Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-gray-800 bg-opacity-50 border border-gray-700 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-gray-400 text-sm">Current Plan</p>
              <p className="text-2xl font-bold text-white">{currentPlan}</p>
            </div>
            <Crown className="w-8 h-8 text-purple-500" />
          </div>
          <button 
            onClick={() => setShowUpgradeModal(true)}
            className="text-purple-400 hover:text-purple-300 text-sm font-medium"
          >
            Upgrade Plan →
          </button>
        </div>

        <div className="bg-gray-800 bg-opacity-50 border border-gray-700 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-gray-400 text-sm">Credits Used</p>
              <p className="text-2xl font-bold text-white">{creditsUsed}</p>
            </div>
            <Zap className="w-8 h-8 text-blue-400" />
          </div>
          <div className="w-full bg-gray-700 rounded-full h-3 mb-2">
            <div
              className="bg-gradient-to-r from-purple-500 to-blue-500 h-3 rounded-full transition-all duration-300"
              style={{ width: `${creditsPercentage}%` }}
            ></div>
          </div>
          <p className="text-xs text-gray-500">
            {remainingCredits} credits remaining
          </p>
        </div>

        <div className="bg-gray-800 bg-opacity-50 border border-gray-700 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-gray-400 text-sm">This Month</p>
              <p className="text-2xl font-bold text-white">+{usageData[usageData.length - 1].credits}</p>
            </div>
            <TrendingUp className="w-8 h-8 text-green-400" />
          </div>
          <p className="text-xs text-gray-500">
            {((usageData[usageData.length - 1].credits / usageData[usageData.length - 2].credits - 1) * 100).toFixed(1)}% vs last month
          </p>
        </div>

        <div className="bg-gray-800 bg-opacity-50 border border-gray-700 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-gray-400 text-sm">Next Billing</p>
              <p className="text-2xl font-bold text-white">Aug 15</p>
            </div>
            <Calendar className="w-8 h-8 text-yellow-400" />
          </div>
          <p className="text-xs text-gray-500">
            Auto-renewal enabled
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Usage Chart */}
        <div className="bg-gray-800 bg-opacity-50 border border-gray-700 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Monthly Usage Trend</h3>
          <div className="h-72 bg-gray-900 rounded-lg flex items-center justify-center border border-gray-600">
            <div className="text-center">
              <TrendingUp className="w-16 h-16 text-gray-500 mx-auto mb-4" />
              <p className="text-gray-400 text-lg font-medium">Usage Analytics Chart</p>
              <p className="text-gray-500 text-sm">Interactive charts coming soon</p>

              {/* Simple Stats Display */}
              <div className="grid grid-cols-3 gap-4 mt-6 max-w-md mx-auto">
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-400">850</div>
                  <div className="text-xs text-gray-500">This Month</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-400">+25%</div>
                  <div className="text-xs text-gray-500">Growth</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-400">150</div>
                  <div className="text-xs text-gray-500">Remaining</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Daily Usage */}
        <div className="bg-gray-800 bg-opacity-50 border border-gray-700 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">This Week's Usage</h3>
          <div className="space-y-4">
            {dailyUsage.map((day, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-300">{day.day}</span>
                  <span className="text-white font-medium">{day.credits} credits</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(day.credits / 100) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Pricing Plans */}
      <div className="bg-gray-800 bg-opacity-50 border border-gray-700 rounded-xl p-8 mb-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-4">Choose Your Plan</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Scale your content creation with plans designed for every creator, from beginners to agencies.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pricingTiers.map((tier) => (
            <div 
              key={tier.name}
              className={`relative p-6 rounded-xl border-2 transition-all ${
                tier.popular
                  ? 'border-purple-500 bg-purple-500 bg-opacity-5'
                  : tier.current
                  ? 'border-blue-500 bg-blue-500 bg-opacity-5'
                  : 'border-gray-700 bg-gray-800 bg-opacity-50'
              }`}
            >
              {tier.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-purple-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                    MOST POPULAR
                  </span>
                </div>
              )}
              
              {tier.current && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                    CURRENT PLAN
                  </span>
                </div>
              )}

              <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-white mb-2">{tier.name}</h3>
                <div className="mb-2">
                  <span className="text-3xl font-bold text-white">${tier.price}</span>
                  <span className="text-gray-400">/month</span>
                </div>
                <p className="text-gray-400 text-sm">{tier.credits} minutes included</p>
              </div>

              <ul className="space-y-3 mb-6">
                {tier.features.map((feature, index) => (
                  <li key={index} className="flex items-center text-sm">
                    <Check className="w-4 h-4 text-lime-signal mr-2 flex-shrink-0" />
                    <span className="text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>

              <button 
                className={`w-full py-3 px-4 rounded-lg font-medium transition-all ${
                  tier.current
                    ? 'bg-gray-600 text-gray-300 cursor-not-allowed'
                    : tier.popular
                    ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white hover:shadow-lg hover:from-purple-600 hover:to-blue-600'
                    : 'border border-gray-600 text-gray-300 hover:border-gray-500 hover:text-white'
                }`}
                disabled={tier.current}
              >
                {tier.current ? 'Current Plan' : 'Upgrade Now'}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Referral Program */}
      <div className="bg-gray-800 bg-opacity-50 border border-gray-700 rounded-xl p-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
              <Gift className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white mb-1">Refer Friends, Earn Credits</h3>
              <p className="text-gray-400">
                Get 30 free credits for every friend who joins ClipMagic
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-green-400">+90</p>
              <p className="text-xs text-gray-400">Credits earned</p>
            </div>
            <button className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-purple-600 hover:to-blue-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center">
              <RefreshCw className="w-4 h-4 mr-2" />
              Share Link
            </button>
          </div>
        </div>
        
        <div className="mt-6 p-4 bg-gray-800 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400 mb-1">Your referral code</p>
              <p className="text-white font-mono">CREATOR2024</p>
            </div>
            <button className="text-purple-400 hover:text-purple-300 text-sm font-medium">
              Copy Code
            </button>
          </div>
        </div>
      </div>

      {/* Upgrade Modal */}
      {showUpgradeModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 bg-opacity-50 border border-gray-700 rounded-xl p-8 max-w-md w-full">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Crown className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Upgrade to Pro</h3>
              <p className="text-gray-400">
                Unlock advanced features and create more viral content
              </p>
            </div>
            
            <div className="space-y-4 mb-6">
              <div className="flex items-center text-sm">
                <Check className="w-4 h-4 text-green-400 mr-3" />
                <span className="text-gray-300">500 minutes/month (3x more)</span>
              </div>
              <div className="flex items-center text-sm">
                <Check className="w-4 h-4 text-green-400 mr-3" />
                <span className="text-gray-300">Priority processing</span>
              </div>
              <div className="flex items-center text-sm">
                <Check className="w-4 h-4 text-green-400 mr-3" />
                <span className="text-gray-300">Advanced analytics</span>
              </div>
              <div className="flex items-center text-sm">
                <Check className="w-4 h-4 text-green-400 mr-3" />
                <span className="text-gray-300">API access</span>
              </div>
            </div>
            
            <div className="flex space-x-3">
              <button 
                onClick={() => setShowUpgradeModal(false)}
                className="flex-1 py-3 px-4 border border-gray-600 rounded-lg text-gray-300 hover:border-gray-500 hover:text-white transition-all"
              >
                Maybe Later
              </button>
              <button className="flex-1 bg-gradient-to-r from-purple-500 to-blue-500 text-white py-3 px-4 rounded-lg font-semibold hover:from-purple-600 hover:to-blue-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center">
                Upgrade Now
                <ArrowRight className="w-4 h-4 ml-2" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

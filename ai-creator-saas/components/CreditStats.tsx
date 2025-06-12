import { DollarSign, TrendingUp } from 'lucide-react'

interface CreditStatsProps {
  credits: number
  usage: number
  limit: number
  onTopUp: () => void
}

export default function CreditStats({ credits, usage, limit, onTopUp }: CreditStatsProps) {
  const usagePercentage = Math.min((usage / limit) * 100, 100)
  const remainingCredits = Math.max(credits - usage, 0)
  const isLowCredit = remainingCredits < limit * 0.2 // Warning when less than 20% remaining

  return (
    <div className="card-dark p-4">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-semibold text-white flex items-center">
          <DollarSign className="w-5 h-5 text-lime-signal mr-2" />
          Credit Usage
        </h2>
        <button
          onClick={onTopUp}
          className="btn-neon text-sm px-3 py-1"
        >
          Top Up
        </button>
      </div>

      <div className="space-y-3">
        {/* Stats */}
        <div className="flex justify-between text-sm">
          <span className="text-gray-400">Remaining Credits:</span>
          <span className={`font-medium ${isLowCredit ? 'text-red-400' : 'text-lime-signal'}`}>
            {remainingCredits.toLocaleString()} min
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-400">Used this Month:</span>
          <span className="text-white font-medium">{usage.toLocaleString()} min</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-400">Monthly Limit:</span>
          <span className="text-white font-medium">{limit.toLocaleString()} min</span>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-700 rounded-full h-2.5 mt-2">
          <div
            className={`h-2.5 rounded-full transition-all duration-500 ${
              isLowCredit ? 'bg-red-500' : 'bg-lime-signal'
            }`}
            style={{ width: `${usagePercentage}%` }}
          ></div>
        </div>

        {/* Warning Message */}
        {isLowCredit && (
          <div className="text-xs text-red-400 flex items-center mt-1">
            <TrendingUp className="w-3 h-3 mr-1" />
            You're running low on credits. Top up to continue creating.
          </div>
        )}
      </div>
    </div>
  )
}

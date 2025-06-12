import { useState, useEffect } from 'react'
import { Sparkles, RefreshCw } from 'lucide-react'

interface TopicWizardProps {
  onTopicSelect: (topic: string) => void
  selectedTopic: string
}

export default function TopicWizard({ onTopicSelect, selectedTopic }: TopicWizardProps) {
  const [topics, setTopics] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    // Simulate fetching AI-generated topics
    fetchTopics()
  }, [])

  const fetchTopics = async () => {
    setIsLoading(true)
    // Mock API call to fetch GPT-powered topic suggestions
    setTimeout(() => {
      setTopics([
        "Top 5 Tips for Viral Content",
        "Behind the Scenes Secrets",
        "Quick Hacks for Productivity",
        "Ultimate Guide to Engagement",
        "Funny Moments Compilation"
      ])
      setIsLoading(false)
    }, 1000)
  }

  const handleRefresh = () => {
    fetchTopics()
  }

  const handleTopicSelect = (topic: string) => {
    onTopicSelect(topic)
  }

  return (
    <div className="card-dark p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-white flex items-center">
          <Sparkles className="w-5 h-5 text-purple-neon mr-2" />
          AI Topic Wizard
        </h2>
        <button
          onClick={handleRefresh}
          disabled={isLoading}
          className="flex items-center text-gray-400 hover:text-white transition-colors"
        >
          <RefreshCw className={`w-4 h-4 mr-1 ${isLoading ? 'animate-spin' : ''}`} />
          Refresh Ideas
        </button>
      </div>

      <p className="text-gray-400 text-sm mb-4">
        Let AI suggest engaging topics for your clips based on current trends.
      </p>

      {isLoading ? (
        <div className="text-center py-6">
          <div className="loading-spinner mx-auto mb-2"></div>
          <p className="text-gray-400 text-sm">Generating brilliant ideas...</p>
        </div>
      ) : (
        <div className="space-y-3">
          {topics.map((topic, index) => (
            <button
              key={index}
              onClick={() => handleTopicSelect(topic)}
              className={`w-full text-left p-3 rounded-lg transition-colors ${
                selectedTopic === topic
                  ? 'bg-purple-neon/20 text-purple-neon border border-purple-neon/30'
                  : 'bg-gray-800 text-gray-200 hover:bg-gray-700'
              }`}
            >
              <span className="font-medium">{topic}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

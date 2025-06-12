import { useState } from 'react'
import { CheckCircle, ChevronRight } from 'lucide-react'

interface OnboardingStepsProps {
  onComplete: () => void
  initialStep?: number
}

export default function OnboardingSteps({ onComplete, initialStep = 0 }: OnboardingStepsProps) {
  const [currentStep, setCurrentStep] = useState(initialStep)

  const steps = [
    {
      title: "Welcome, Creator!",
      description: "Let's take a quick tour of your AI-powered content studio. We'll show you how to turn your long-form content into viral clips in just a few clicks.",
      action: "Start Tour"
    },
    {
      title: "Choose Your Creator Type",
      description: "Tell us what kind of content you make (YouTube, Podcast, Educator, etc.). This helps us tailor the AI to your style and audience.",
      action: "Select Type"
    },
    {
      title: "Upload Your First Content",
      description: "Drag and drop a video or audio file, or paste a URL from YouTube. Our AI will analyze it and find the best moments.",
      action: "Try Upload"
    },
    {
      title: "AI Magic Happens",
      description: "Sit back as we transcribe your content and automatically generate engaging clips with captions and hashtags optimized for each platform.",
      action: "See Results"
    },
    {
      title: "Review & Export",
      description: "Fine-tune your clips, edit captions, and export them directly to TikTok, Instagram Reels, or YouTube Shorts. You're ready to go viral!",
      action: "Finish Tour"
    }
  ]

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      onComplete()
    }
  }

  return (
    <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-lg overflow-hidden shadow-xl border border-gray-700 max-w-2xl mx-auto">
      {/* Step Indicator */}
      <div className="flex justify-between px-4 pt-4">
        {steps.map((_, index) => (
          <div key={index} className="flex-1 h-1 mx-1 rounded-full overflow-hidden">
            <div
              className={`h-full transition-all duration-500 ${
                index <= currentStep ? 'bg-purple-neon' : 'bg-gray-700'
              }`}
              style={{ width: index < currentStep ? '100%' : index === currentStep ? '50%' : '0%' }}
            ></div>
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="p-6 text-center">
        <h2 className="text-2xl font-bold text-white mb-3">{steps[currentStep].title}</h2>
        <p className="text-gray-300 mb-6">{steps[currentStep].description}</p>
        
        <button
          onClick={handleNext}
          className="bg-purple-neon text-white rounded px-6 py-2 hover:bg-purple-neon/90 transition-colors inline-flex items-center"
        >
          {steps[currentStep].action}
          <ChevronRight className="w-4 h-4 ml-1" />
        </button>
        
        <div className="text-gray-500 text-sm mt-4">
          Step {currentStep + 1} of {steps.length}
        </div>
      </div>

      {/* Completion Check */}
      {currentStep === steps.length - 1 && (
        <div className="bg-lime-signal/10 p-3 text-center border-t border-gray-700">
          <CheckCircle className="w-5 h-5 text-lime-signal mx-auto mb-1" />
          <p className="text-lime-signal text-sm">You're ready to create amazing content!</p>
        </div>
      )}
    </div>
  )
}

import React from 'react'

interface LoadingProps {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  variant?: 'spinner' | 'dots' | 'pulse' | 'skeleton'
  color?: 'purple' | 'blue' | 'green' | 'white'
  className?: string
}

const Loading: React.FC<LoadingProps> = ({ 
  size = 'md', 
  variant = 'spinner', 
  color = 'purple',
  className = '' 
}) => {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
    xl: 'w-12 h-12'
  }

  const colors = {
    purple: 'border-purple-neon',
    blue: 'border-electric-blue',
    green: 'border-lime-signal',
    white: 'border-white'
  }

  if (variant === 'spinner') {
    return (
      <div className={`${sizes[size]} ${className}`}>
        <div className={`animate-spin rounded-full ${sizes[size]} border-2 ${colors[color]} border-t-transparent`} />
      </div>
    )
  }

  if (variant === 'dots') {
    return (
      <div className={`flex space-x-1 ${className}`}>
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className={`${size === 'sm' ? 'w-2 h-2' : size === 'md' ? 'w-3 h-3' : size === 'lg' ? 'w-4 h-4' : 'w-5 h-5'} 
                       bg-${color === 'purple' ? 'purple-neon' : color === 'blue' ? 'electric-blue' : color === 'green' ? 'lime-signal' : 'white'} 
                       rounded-full animate-bounce`}
            style={{ animationDelay: `${i * 0.2}s` }}
          />
        ))}
      </div>
    )
  }

  if (variant === 'pulse') {
    return (
      <div className={`${sizes[size]} ${className}`}>
        <div className={`${sizes[size]} bg-${color === 'purple' ? 'purple-neon' : color === 'blue' ? 'electric-blue' : color === 'green' ? 'lime-signal' : 'white'} rounded-full animate-pulse`} />
      </div>
    )
  }

  if (variant === 'skeleton') {
    return (
      <div className={`bg-gray-700 rounded animate-pulse ${className}`} />
    )
  }

  return null
}

export const Skeleton: React.FC<{ className?: string; children?: React.ReactNode }> = ({ 
  className = '', 
  children 
}) => {
  return (
    <div className={`bg-gray-700 rounded animate-skeleton ${className}`}>
      {children}
    </div>
  )
}

export default Loading

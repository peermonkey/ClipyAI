import React from 'react'

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  className?: string
  variant?: 'default' | 'glass' | 'neon' | 'gradient'
  hover?: boolean
  glow?: boolean
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl'
}

const Card: React.FC<CardProps> = ({ 
  children, 
  className = '', 
  variant = 'default',
  hover = false,
  glow = false,
  padding = 'md',
  ...props
}) => {
  const baseClasses = 'rounded-xl transition-all duration-300'
  
  const variants = {
    default: 'bg-dark-card border border-dark-border',
    glass: 'bg-glass-light backdrop-blur-sm border border-glass-medium',
    neon: 'bg-dark-card border border-purple-neon/30 shadow-neon',
    gradient: 'bg-gradient-to-br from-dark-card to-dark-surface border border-dark-border'
  }
  
  const paddings = {
    none: '',
    sm: 'p-3',
    md: 'p-4',
    lg: 'p-6',
    xl: 'p-8'
  }
  
  const hoverClass = hover ? 'hover:border-purple-neon/50 hover:shadow-lg hover:shadow-purple-500/10 hover:scale-[1.02] cursor-pointer' : ''
  const glowClass = glow ? 'shadow-neon animate-glow' : ''
  
  const classes = `${baseClasses} ${variants[variant]} ${paddings[padding]} ${hoverClass} ${glowClass} ${className}`
  
  return (
    <div className={classes} {...props}>
      {children}
    </div>
  )
}

export default Card

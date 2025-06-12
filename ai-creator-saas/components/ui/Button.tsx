import React from 'react'
import { LucideIcon } from 'lucide-react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'neon' | 'success' | 'warning' | 'error'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  icon?: LucideIcon
  iconPosition?: 'left' | 'right'
  loading?: boolean
  gradient?: boolean
  glow?: boolean
  children?: React.ReactNode
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    className = '', 
    variant = 'primary', 
    size = 'md', 
    icon: Icon, 
    iconPosition = 'left',
    loading = false,
    gradient = false,
    glow = false,
    disabled,
    children, 
    ...props 
  }, ref) => {
    
    const baseClasses = 'inline-flex items-center justify-center rounded-xl font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-dark-bg disabled:opacity-50 disabled:cursor-not-allowed'
    
    const variants = {
      primary: gradient 
        ? 'bg-gradient-to-r from-purple-neon to-electric-blue text-white hover:from-purple-400 hover:to-blue-400 focus:ring-purple-neon transform hover:scale-105' 
        : 'bg-purple-neon text-white hover:bg-purple-400 focus:ring-purple-neon',
      secondary: 'bg-dark-card border border-dark-border text-gray-300 hover:bg-gray-700 hover:text-white focus:ring-purple-neon',
      ghost: 'text-gray-300 hover:text-white hover:bg-dark-card focus:ring-purple-neon',
      neon: 'bg-gradient-to-r from-purple-neon to-electric-blue text-white hover:shadow-neon focus:ring-purple-neon transform hover:scale-105 animate-pulse-neon',
      success: 'bg-success text-white hover:bg-success-dark focus:ring-success',
      warning: 'bg-warning text-white hover:bg-warning-dark focus:ring-warning',
      error: 'bg-error text-white hover:bg-error-dark focus:ring-error'
    }
    
    const sizes = {
      sm: 'px-3 py-2 text-sm',
      md: 'px-4 py-2.5 text-sm',
      lg: 'px-6 py-3 text-base',
      xl: 'px-8 py-4 text-lg'
    }
    
    const glowClass = glow ? 'shadow-neon hover:shadow-lg hover:shadow-purple-500/25' : ''
    
    const classes = `${baseClasses} ${variants[variant]} ${sizes[size]} ${glowClass} ${className}`
    
    return (
      <button
        ref={ref}
        className={classes}
        disabled={disabled || loading}
        {...props}
      >
        {loading && (
          <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
        )}
        
        {Icon && iconPosition === 'left' && !loading && (
          <Icon className={`h-4 w-4 ${children ? 'mr-2' : ''}`} />
        )}
        
        {children}
        
        {Icon && iconPosition === 'right' && !loading && (
          <Icon className={`h-4 w-4 ${children ? 'ml-2' : ''}`} />
        )}
      </button>
    )
  }
)

Button.displayName = 'Button'

export default Button

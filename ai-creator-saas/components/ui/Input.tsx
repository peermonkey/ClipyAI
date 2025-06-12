import React from 'react'
import { LucideIcon } from 'lucide-react'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  icon?: LucideIcon
  iconPosition?: 'left' | 'right'
  variant?: 'default' | 'neon' | 'glass'
  helperText?: string
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ 
    className = '', 
    label, 
    error, 
    icon: Icon, 
    iconPosition = 'left',
    variant = 'default',
    helperText,
    ...props 
  }, ref) => {
    
    const baseClasses = 'w-full rounded-lg px-4 py-3 text-white placeholder-gray-400 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-dark-bg disabled:opacity-50 disabled:cursor-not-allowed'
    
    const variants = {
      default: 'bg-dark-card border border-dark-border focus:border-purple-neon focus:ring-purple-neon/20',
      neon: 'bg-dark-card border border-purple-neon/30 focus:border-purple-neon focus:ring-purple-neon/20 focus:shadow-neon',
      glass: 'bg-glass-light backdrop-blur-sm border border-glass-medium focus:border-purple-neon focus:ring-purple-neon/20'
    }
    
    const errorClass = error ? 'border-error focus:border-error focus:ring-error/20' : ''
    
    const inputClasses = `${baseClasses} ${variants[variant]} ${errorClass} ${
      Icon ? (iconPosition === 'left' ? 'pl-12' : 'pr-12') : ''
    } ${className}`
    
    return (
      <div className="space-y-2">
        {label && (
          <label className="block text-sm font-medium text-gray-300">
            {label}
          </label>
        )}
        
        <div className="relative">
          {Icon && iconPosition === 'left' && (
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
              <Icon className="h-5 w-5 text-gray-400" />
            </div>
          )}
          
          <input
            ref={ref}
            className={inputClasses}
            {...props}
          />
          
          {Icon && iconPosition === 'right' && (
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
              <Icon className="h-5 w-5 text-gray-400" />
            </div>
          )}
        </div>
        
        {error && (
          <p className="text-sm text-error-light animate-fade-in-up">
            {error}
          </p>
        )}
        
        {helperText && !error && (
          <p className="text-sm text-gray-500">
            {helperText}
          </p>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'

export default Input

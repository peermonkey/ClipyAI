import { useState } from 'react'
import { Bell, Moon, Sun, ChevronDown } from 'lucide-react'

interface TopbarProps {
  user: any
  onLogout: () => void
}

export default function Topbar({ user, onLogout }: TopbarProps) {
  const [isDarkMode, setIsDarkMode] = useState(true)
  const [showUserMenu, setShowUserMenu] = useState(false)
  const [notifications] = useState([
    { id: 1, message: 'Your clip "Amazing Tutorial" is ready!', time: '2m ago', unread: true },
    { id: 2, message: 'You have 5 credits remaining', time: '1h ago', unread: true },
  ])

  const getGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return 'Good morning'
    if (hour < 18) return 'Good afternoon'
    return 'Good evening'
  }

  const unreadCount = notifications.filter(n => n.unread).length

  return (
    <header className="bg-gray-900/50 backdrop-blur-sm border-b border-gray-800 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Greeting */}
        <div>
          <h1 className="text-xl font-semibold text-white">
            {getGreeting()}, {user?.name || 'Creator'}! 😎
          </h1>
          <p className="text-gray-400 text-sm">Ready to create something viral?</p>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-4">
          {/* Credits Display */}
          <div className="hidden md:flex items-center space-x-2 bg-gray-800 rounded-lg px-3 py-2">
            <div className="w-2 h-2 bg-lime-signal rounded-full"></div>
            <span className="text-sm text-gray-300">
              <span className="text-lime-signal font-semibold">150</span> credits
            </span>
          </div>

          {/* Theme Toggle */}
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="p-2 text-gray-400 hover:text-white transition-colors rounded-lg hover:bg-gray-800"
            title="Toggle theme"
          >
            {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>

          {/* Notifications */}
          <div className="relative">
            <button
              className="relative p-2 text-gray-400 hover:text-white transition-colors rounded-lg hover:bg-gray-800"
              title="Notifications"
            >
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-purple-neon text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </button>
          </div>

          {/* User Menu */}
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center space-x-2 p-2 text-gray-400 hover:text-white transition-colors rounded-lg hover:bg-gray-800"
            >
              <div className="w-8 h-8 bg-gradient-to-r from-purple-neon to-electric-blue rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-semibold">
                  {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                </span>
              </div>
              <ChevronDown className="w-4 h-4" />
            </button>

            {/* User Dropdown */}
            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-gray-800 border border-gray-700 rounded-lg shadow-lg z-50">
                <div className="p-3 border-b border-gray-700">
                  <p className="text-white font-medium">{user?.name || 'Creator'}</p>
                  <p className="text-gray-400 text-sm">{user?.email || ''}</p>
                </div>
                <div className="py-1">
                  <button className="w-full text-left px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-700 transition-colors">
                    Profile Settings
                  </button>
                  <button className="w-full text-left px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-700 transition-colors">
                    Billing
                  </button>
                  <button className="w-full text-left px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-700 transition-colors">
                    Help & Support
                  </button>
                  <hr className="border-gray-700 my-1" />
                  <button
                    onClick={onLogout}
                    className="w-full text-left px-3 py-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors"
                  >
                    Sign out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

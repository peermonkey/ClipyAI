import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { 
  Home, 
  Upload, 
  Video, 
  FolderOpen, 
  CreditCard, 
  Settings, 
  LogOut, 
  ChevronLeft, 
  ChevronRight 
} from 'lucide-react'

interface SidebarProps {
  user: any
  onLogout: () => void
}

const navItems = [
  { icon: Home, label: 'Dashboard', href: '/dashboard' },
  { icon: Upload, label: 'Upload', href: '/upload' },
  { icon: Video, label: 'My Clips', href: '/clips' },
  { icon: FolderOpen, label: 'Projects', href: '/projects' },
  { icon: CreditCard, label: 'Credits', href: '/credits' },
  { icon: Settings, label: 'Settings', href: '/settings' },
]

export default function Sidebar({ user, onLogout }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const router = useRouter()

  return (
    <div className={`bg-gray-900 border-r border-gray-800 transition-all duration-300 ${
      isCollapsed ? 'w-16' : 'w-64'
    }`}>
      <div className="flex flex-col h-full">
        {/* Logo & Collapse Button */}
        <div className="flex items-center justify-between p-4 border-b border-gray-800">
          {!isCollapsed && (
            <Link href="/dashboard" className="text-xl font-bold text-gradient">
              ClipMagic
            </Link>
          )}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-2 text-gray-400 hover:text-white transition-colors"
          >
            {isCollapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-4">
          <div className="sidebar-nav">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = router.pathname === item.href
              
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`sidebar-item ${isActive ? 'active' : ''}`}
                  title={isCollapsed ? item.label : ''}
                >
                  <Icon className="w-5 h-5" />
                  {!isCollapsed && <span>{item.label}</span>}
                </Link>
              )
            })}
          </div>
        </nav>

        {/* User Section */}
        <div className="border-t border-gray-800 p-4">
          {!isCollapsed && user && (
            <div className="mb-4 p-3 bg-gray-800 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-neon to-electric-blue rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold">
                    {user.name?.charAt(0)?.toUpperCase() || 'U'}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white font-medium truncate">
                    {user.name || 'Creator'}
                  </p>
                  <p className="text-gray-400 text-sm truncate">
                    {user.email || ''}
                  </p>
                </div>
              </div>
            </div>
          )}
          
          <button
            onClick={onLogout}
            className={`sidebar-item w-full text-red-400 hover:text-red-300 hover:bg-red-500/10 ${
              isCollapsed ? 'justify-center' : ''
            }`}
            title={isCollapsed ? 'Logout' : ''}
          >
            <LogOut className="w-5 h-5" />
            {!isCollapsed && <span>Logout</span>}
          </button>
        </div>
      </div>
    </div>
  )
}

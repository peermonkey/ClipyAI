import { useRouter } from 'next/router'
import Link from 'next/link'
import { Home, Upload, Video, CreditCard, User } from 'lucide-react'

const navItems = [
  { icon: Home, label: 'Home', href: '/dashboard' },
  { icon: Upload, label: 'Upload', href: '/upload' },
  { icon: Video, label: 'Clips', href: '/clips' },
  { icon: CreditCard, label: 'Credits', href: '/credits' },
  { icon: User, label: 'Profile', href: '/profile' },
]

export default function MobileNav() {
  const router = useRouter()

  return (
    <nav className="mobile-nav md:hidden">
      <div className="flex">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = router.pathname === item.href
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`mobile-nav-item ${isActive ? 'active' : ''}`}
            >
              <Icon className="w-5 h-5 mb-1" />
              <span>{item.label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}

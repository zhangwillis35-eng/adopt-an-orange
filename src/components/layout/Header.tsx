'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useSession, signOut } from 'next-auth/react'
import { MascotLogo } from '@/components/mascot/MascotLogo'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from '@/components/ui/dropdown-menu'
import { MobileNav } from './MobileNav'
import { Menu, User, TreePine, Package, UserCircle, LogOut } from 'lucide-react'

const navLinks = [
  { href: '/', label: '首页' },
  { href: '/adopt', label: '认养商城' },
  { href: '/orchard', label: '果园动态' },
  { href: '/about', label: '关于我们' },
]

export function Header() {
  const pathname = usePathname()
  const { data: session, status } = useSession()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const isLoggedIn = status === 'authenticated' && !!session?.user

  return (
    <header
      className={`sticky top-0 z-50 w-full border-b transition-all duration-300 ${
        scrolled
          ? 'border-orange-100/60 bg-background/85 shadow-sm shadow-orange-100/30 backdrop-blur-xl'
          : 'border-transparent bg-background'
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="shrink-0">
          <MascotLogo />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex md:items-center md:gap-1">
          {navLinks.map(({ href, label }) => {
            const isActive = pathname === href
            return (
              <Link
                key={href}
                href={href}
                className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-primary/10 text-primary'
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                }`}
              >
                {label}
              </Link>
            )
          })}
        </nav>

        {/* Desktop auth area */}
        <div className="hidden md:flex md:items-center md:gap-2">
          {isLoggedIn ? (
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus:outline-none">
                {session.user.image ? (
                  <Image
                    src={session.user.image}
                    alt="头像"
                    width={28}
                    height={28}
                    className="size-7 rounded-full object-cover"
                  />
                ) : (
                  <div className="flex size-7 items-center justify-center rounded-full bg-orange-100 text-orange-600">
                    <User className="size-4" />
                  </div>
                )}
                <span className="max-w-[80px] truncate">
                  {session.user.name || '用户'}
                </span>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" sideOffset={8}>
                <div className="px-2 py-1.5 text-sm font-semibold">
                  {session.user.name || '用户'}
                </div>
                <DropdownMenuSeparator />
                <Link href="/user/adoptions">
                  <DropdownMenuItem>
                    <TreePine className="size-4" />
                    我的认养
                  </DropdownMenuItem>
                </Link>
                <Link href="/user/orders">
                  <DropdownMenuItem>
                    <Package className="size-4" />
                    我的订单
                  </DropdownMenuItem>
                </Link>
                <Link href="/user/profile">
                  <DropdownMenuItem>
                    <UserCircle className="size-4" />
                    个人资料
                  </DropdownMenuItem>
                </Link>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => signOut({ callbackUrl: '/' })}
                >
                  <LogOut className="size-4" />
                  退出登录
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Link href="/login">
                <Button variant="ghost">登录</Button>
              </Link>
              <Link href="/register">
                <Button>注册</Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile hamburger */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setMobileOpen(true)}
          aria-label="打开菜单"
        >
          <Menu className="size-5" />
        </Button>

        {/* Mobile nav sheet */}
        <MobileNav open={mobileOpen} onOpenChange={setMobileOpen} />
      </div>
    </header>
  )
}

export default Header

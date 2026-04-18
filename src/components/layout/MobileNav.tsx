'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { MascotLogo } from '@/components/mascot/MascotLogo'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
  SheetClose,
} from '@/components/ui/sheet'
import { Home, ShoppingBag, Leaf, Info } from 'lucide-react'

const navLinks = [
  { href: '/', label: '首页', icon: Home },
  { href: '/adopt', label: '认养商城', icon: ShoppingBag },
  { href: '/orchard', label: '果园动态', icon: Leaf },
  { href: '/about', label: '关于我们', icon: Info },
]

interface MobileNavProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function MobileNav({ open, onOpenChange }: MobileNavProps) {
  const pathname = usePathname()

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="flex flex-col">
        <SheetHeader>
          <SheetTitle>
            <MascotLogo />
          </SheetTitle>
        </SheetHeader>

        {/* Navigation links */}
        <nav className="flex-1 px-4">
          <ul className="space-y-1">
            {navLinks.map(({ href, label, icon: Icon }) => {
              const isActive = pathname === href
              return (
                <li key={href}>
                  <SheetClose
                    render={
                      <Link
                        href={href}
                        className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                          isActive
                            ? 'bg-primary/10 text-primary'
                            : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                        }`}
                      />
                    }
                  >
                    <Icon className="size-4" />
                    {label}
                  </SheetClose>
                </li>
              )
            })}
          </ul>
        </nav>

        {/* Bottom actions — pb-safe for mobile bottom bar */}
        <SheetFooter className="pb-[env(safe-area-inset-bottom,16px)]">
          <Link href="/login" className="w-full">
            <Button variant="outline" className="w-full">登录</Button>
          </Link>
          <Link href="/register" className="w-full">
            <Button className="w-full">注册</Button>
          </Link>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}

export default MobileNav

import Link from 'next/link'
import { MascotLogo } from '@/components/mascot/MascotLogo'
import { Phone, MessageCircle, Heart } from 'lucide-react'

const quickLinks = [
  { href: '/adopt', label: '认养商城' },
  { href: '/orchard', label: '果园动态' },
  { href: '/about', label: '关于我们' },
]

export function Footer() {
  return (
    <footer className="border-t border-orange-100 bg-gradient-to-b from-orange-50/40 to-orange-50/80">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {/* Brand */}
          <div className="space-y-4">
            <MascotLogo />
            <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
              认养一棵橙树，体验从开花到结果的全过程。新鲜直达，品质保证。
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="mb-4 text-sm font-bold text-foreground">
              快速链接
            </h3>
            <ul className="space-y-3">
              {quickLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-muted-foreground transition-colors hover:text-[#FF6B00]"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-4 text-sm font-bold text-foreground">
              联系我们
            </h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2.5 text-sm text-muted-foreground">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-100 text-[#FF6B00]">
                  <Phone className="size-4" />
                </div>
                <span>客服电话：400-XXX-XXXX</span>
              </li>
              <li className="flex items-center gap-2.5 text-sm text-muted-foreground">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-100 text-green-600">
                  <MessageCircle className="size-4" />
                </div>
                <span>微信公众号：认养一个橙子</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 border-t border-orange-100 pt-6 text-center text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1">
            &copy; 2026 认养一个橙子 &middot; 用 <Heart className="size-3 fill-red-400 text-red-400" /> 守护每一棵橙树
          </span>
        </div>
      </div>
    </footer>
  )
}

export default Footer

"use client"

import React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useSession } from "next-auth/react"
import {
  TreePine,
  ShoppingBag,
  MapPin,
  User,
  ChevronRight,
} from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"

const navItems = [
  { href: "/user/adoptions", label: "我的认养", icon: TreePine },
  { href: "/user/orders", label: "我的订单", icon: ShoppingBag },
  { href: "/user/addresses", label: "地址管理", icon: MapPin },
  { href: "/user/profile", label: "个人资料", icon: User },
]

export default function UserLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const { data: session } = useSession()

  const userName = session?.user?.name || "橙子用户"
  const userInitial = userName.charAt(0)

  return (
    <div className="min-h-screen bg-background">
      {/* Desktop layout */}
      <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 lg:flex-row">
          {/* Sidebar - desktop */}
          <aside className="hidden w-64 shrink-0 lg:block">
            <div className="sticky top-6 rounded-xl bg-card p-5 ring-1 ring-foreground/10">
              {/* User info */}
              <div className="flex flex-col items-center gap-3 pb-5">
                <Avatar className="size-16 ring-2 ring-primary/20">
                  <AvatarFallback className="bg-gradient-to-br from-orange-400 to-orange-600 text-xl font-bold text-white">
                    {userInitial}
                  </AvatarFallback>
                </Avatar>
                <div className="text-center">
                  <p className="font-heading text-base font-semibold">{userName}</p>
                  <p className="text-xs text-muted-foreground">欢迎回到橙留香</p>
                </div>
              </div>

              <Separator />

              {/* Navigation */}
              <nav className="mt-4 flex flex-col gap-1">
                {navItems.map((item) => {
                  const isActive =
                    pathname === item.href || pathname.startsWith(item.href + "/")
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                        isActive
                          ? "bg-primary/10 text-primary"
                          : "text-muted-foreground hover:bg-muted hover:text-foreground"
                      )}
                    >
                      <item.icon className="size-4" />
                      <span className="flex-1">{item.label}</span>
                      {isActive && <ChevronRight className="size-4 text-primary/60" />}
                    </Link>
                  )
                })}
              </nav>
            </div>
          </aside>

          {/* Mobile tab navigation */}
          <div className="lg:hidden">
            <nav className="flex gap-1 overflow-x-auto rounded-xl bg-card p-1.5 ring-1 ring-foreground/10 scrollbar-none [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {navItems.map((item) => {
                const isActive =
                  pathname === item.href || pathname.startsWith(item.href + "/")
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "flex min-w-fit flex-1 flex-col items-center gap-1 rounded-lg px-3 py-2 text-xs font-medium transition-colors",
                      isActive
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    )}
                  >
                    <item.icon className="size-4" />
                    <span className="whitespace-nowrap">{item.label}</span>
                  </Link>
                )
              })}
            </nav>
          </div>

          {/* Main content */}
          <main className="min-w-0 flex-1">{children}</main>
        </div>
      </div>
    </div>
  )
}

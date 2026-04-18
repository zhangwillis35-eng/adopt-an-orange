"use client"

import React, { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  Users,
  TreePine,
  Gift,
  ShoppingCart,
  Newspaper,
  Truck,
  Settings,
  Bell,
  LogOut,
  Menu,
  ChevronRight,
  Citrus,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu"
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"

const navItems = [
  { href: "/admin", label: "仪表盘", icon: LayoutDashboard },
  { href: "/admin/users", label: "用户管理", icon: Users },
  { href: "/admin/trees", label: "橙树管理", icon: TreePine },
  { href: "/admin/packages", label: "认养套餐", icon: Gift },
  { href: "/admin/orders", label: "订单管理", icon: ShoppingCart },
  { href: "/admin/news", label: "果园动态", icon: Newspaper },
  { href: "/admin/shipping", label: "发货管理", icon: Truck },
  { href: "/admin/settings", label: "系统设置", icon: Settings },
]

const breadcrumbMap: Record<string, string> = {
  "/admin": "仪表盘",
  "/admin/users": "用户管理",
  "/admin/trees": "橙树管理",
  "/admin/packages": "认养套餐",
  "/admin/orders": "订单管理",
  "/admin/news": "果园动态",
  "/admin/shipping": "发货管理",
  "/admin/settings": "系统设置",
}

function SidebarNav({
  pathname,
  onNavigate,
}: {
  pathname: string
  onNavigate?: () => void
}) {
  return (
    <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
      {navItems.map((item) => {
        const isActive =
          item.href === "/admin"
            ? pathname === "/admin"
            : pathname.startsWith(item.href)
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
              isActive
                ? "bg-orange-500/20 text-orange-400"
                : "text-slate-400 hover:bg-slate-800 hover:text-slate-200"
            )}
          >
            <item.icon className="size-5 shrink-0" />
            {item.label}
          </Link>
        )
      })}
    </nav>
  )
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)

  const currentLabel = breadcrumbMap[pathname] || "管理后台"

  return (
    <div className="flex h-screen overflow-hidden bg-slate-100">
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex lg:flex-col lg:w-64 bg-slate-900 border-r border-slate-800 shrink-0">
        {/* Brand */}
        <div className="flex items-center gap-2.5 px-5 h-16 border-b border-slate-800">
          <div className="flex items-center justify-center size-9 rounded-lg bg-orange-500/20">
            <Citrus className="size-5 text-orange-400" />
          </div>
          <div>
            <h1 className="text-sm font-semibold text-white leading-tight">
              认养管理后台
            </h1>
            <p className="text-[11px] text-slate-500">Adopt an Orange</p>
          </div>
        </div>

        <SidebarNav pathname={pathname} />

        {/* Admin info */}
        <div className="border-t border-slate-800 p-3">
          <div className="flex items-center gap-3 rounded-lg px-3 py-2">
            <Avatar size="sm">
              <AvatarFallback className="bg-orange-500/20 text-orange-400 text-xs">
                管
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-slate-200 truncate">
                管理员
              </p>
              <p className="text-[11px] text-slate-500 truncate">
                admin@orange.com
              </p>
            </div>
            <Button
              variant="ghost"
              size="icon-sm"
              className="text-slate-500 hover:text-red-400 hover:bg-red-500/10"
            >
              <LogOut className="size-4" />
            </Button>
          </div>
        </div>
      </aside>

      {/* Mobile sidebar via Sheet */}
      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetContent
          side="left"
          className="w-64 bg-slate-900 p-0 border-slate-800"
        >
          <SheetHeader className="border-b border-slate-800 px-5 h-16 flex flex-row items-center">
            <div className="flex items-center gap-2.5">
              <div className="flex items-center justify-center size-9 rounded-lg bg-orange-500/20">
                <Citrus className="size-5 text-orange-400" />
              </div>
              <SheetTitle className="text-sm font-semibold text-white">
                认养管理后台
              </SheetTitle>
            </div>
          </SheetHeader>
          <SidebarNav
            pathname={pathname}
            onNavigate={() => setMobileOpen(false)}
          />
        </SheetContent>
      </Sheet>

      {/* Main content area */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top bar */}
        <header className="flex items-center h-16 px-4 lg:px-6 bg-white border-b border-slate-200 shrink-0">
          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="icon-sm"
            className="lg:hidden mr-3 text-slate-600"
            onClick={() => setMobileOpen(true)}
          >
            <Menu className="size-5" />
          </Button>

          {/* Breadcrumb */}
          <div className="flex items-center gap-1.5 text-sm text-slate-500">
            <Link
              href="/admin"
              className="hover:text-slate-700 transition-colors"
            >
              管理后台
            </Link>
            {pathname !== "/admin" && (
              <>
                <ChevronRight className="size-3.5" />
                <span className="text-slate-900 font-medium">
                  {currentLabel}
                </span>
              </>
            )}
          </div>

          {/* Right section */}
          <div className="ml-auto flex items-center gap-2">
            {/* Notifications */}
            <Button
              variant="ghost"
              size="icon"
              className="relative text-slate-500 hover:text-slate-700"
            >
              <Bell className="size-5" />
              <span className="absolute top-1 right-1 size-2 rounded-full bg-orange-500" />
            </Button>

            {/* Admin dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger
                render={
                  <button className="flex items-center gap-2 rounded-lg px-2 py-1.5 hover:bg-slate-100 transition-colors outline-none" />
                }
              >
                <Avatar size="sm">
                  <AvatarFallback className="bg-orange-500/10 text-orange-600 text-xs font-medium">
                    管
                  </AvatarFallback>
                </Avatar>
                <span className="hidden sm:block text-sm font-medium text-slate-700">
                  管理员
                </span>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" sideOffset={8}>
                <DropdownMenuLabel>我的账户</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>个人资料</DropdownMenuItem>
                <DropdownMenuItem>系统设置</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem variant="destructive">
                  <LogOut className="size-4" />
                  退出登录
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-6">{children}</main>
      </div>
    </div>
  )
}

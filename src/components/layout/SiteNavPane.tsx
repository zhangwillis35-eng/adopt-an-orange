'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useSession } from 'next-auth/react'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import {
  ChevronRight,
  Home,
  ShoppingBag,
  Leaf,
  Info,
  User,
  Package,
  TreePine,
  MapPin,
  Radio,
  LayoutDashboard,
  Truck,
  Users,
  Settings,
  FileText,
  Award,
} from 'lucide-react'
import { cn } from '@/lib/utils'

/* ─── Types ─────────────────────────────────────────────────── */

interface NavLeaf {
  href: string
  label: string
  exact?: boolean
  pattern?: RegExp
  badge?: string
  /** 动态路由占位项，当前路径匹配时高亮，否则显示为描述性灰字 */
  isVirtual?: boolean
  description?: string
}

interface NavItem {
  href: string
  label: string
  icon: React.ElementType
  exact?: boolean
  description?: string
  children?: NavLeaf[]
}

interface NavSection {
  title: string
  accent: string          // Tailwind text color class
  items: NavItem[]
  guestOnly?: boolean     // 仅未登录时展示
  authRequired?: boolean  // 需要登录
  adminRequired?: boolean // 需要管理员
}

/* ─── Site structure ─────────────────────────────────────────── */

const STRUCTURE: NavSection[] = [
  {
    title: '公开页面',
    accent: 'text-orange-500',
    items: [
      {
        href: '/',
        label: '首页',
        icon: Home,
        exact: true,
        description: '品牌首页 & 认养入口',
      },
      {
        href: '/adopt',
        label: '认养商城',
        icon: ShoppingBag,
        description: '选择认养套餐',
        children: [
          { href: '/adopt', label: '套餐列表', exact: true },
          {
            href: '/adopt/__detail__',
            label: '套餐详情页',
            pattern: /^\/adopt\/.+/,
            isVirtual: true,
            description: '选择套餐后进入',
          },
        ],
      },
      {
        href: '/orchard',
        label: '果园动态',
        icon: Leaf,
        description: '果园实况 & 直播',
        children: [
          { href: '/orchard', label: '动态列表', exact: true },
          { href: '/orchard/live', label: '直播间', badge: 'LIVE' },
          {
            href: '/orchard/__detail__',
            label: '动态详情页',
            pattern: /^\/orchard\/(?!live).+/,
            isVirtual: true,
            description: '点击动态后进入',
          },
        ],
      },
      {
        href: '/about',
        label: '关于我们',
        icon: Info,
        description: '品牌故事 & 果园实景',
      },
    ],
  },
  {
    title: '用户中心',
    accent: 'text-green-700',
    authRequired: true,
    items: [
      {
        href: '/user/adoptions',
        label: '我的认养',
        icon: TreePine,
        children: [
          { href: '/user/adoptions', label: '认养列表', exact: true },
          {
            href: '/user/adoptions/__detail__',
            label: '认养详情页',
            pattern: /^\/user\/adoptions\/.+/,
            isVirtual: true,
          },
          {
            href: '/user/certificate/__detail__',
            label: '认养证书',
            pattern: /^\/user\/certificate\/.+/,
            isVirtual: true,
            badge: '证书',
          },
        ],
      },
      { href: '/user/orders',    label: '我的订单', icon: Package,  description: '订单 & 物流追踪' },
      { href: '/user/profile',   label: '个人资料', icon: User },
      { href: '/user/addresses', label: '收货地址', icon: MapPin },
    ],
  },
  {
    title: '管理后台',
    accent: 'text-neutral-400',
    adminRequired: true,
    items: [
      { href: '/admin',                   label: '数据控制台', icon: LayoutDashboard, exact: true },
      { href: '/admin/trees',             label: '果树管理',   icon: Leaf },
      { href: '/admin/plans',             label: '套餐管理',   icon: FileText },
      { href: '/admin/orders',            label: '订单管理',   icon: Package },
      { href: '/admin/shipments',         label: '发货管理',   icon: Truck },
      { href: '/admin/orchard-updates',   label: '动态发布',   icon: Radio },
      { href: '/admin/users',             label: '用户管理',   icon: Users },
      { href: '/admin/settings',          label: '系统设置',   icon: Settings },
    ],
  },
]

/* ─── Helpers ────────────────────────────────────────────────── */

function leafMatches(leaf: NavLeaf, pathname: string): boolean {
  if (leaf.pattern)  return leaf.pattern.test(pathname)
  if (leaf.exact)    return pathname === leaf.href
  return pathname.startsWith(leaf.href)
}

function itemMatches(item: NavItem, pathname: string): boolean {
  if (item.exact) return pathname === item.href
  return pathname === item.href || pathname.startsWith(item.href + '/')
}

function anyChildActive(item: NavItem, pathname: string): boolean {
  return item.children?.some(c => leafMatches(c, pathname)) ?? false
}

/* ─── LeafRow ────────────────────────────────────────────────── */

function LeafRow({ leaf, onClose }: { leaf: NavLeaf; onClose: () => void }) {
  const pathname = usePathname()
  const active = leafMatches(leaf, pathname)

  /* 动态路由占位：当前在该页时高亮，否则灰色提示 */
  if (leaf.isVirtual) {
    return active ? (
      <div className="flex items-center gap-2 rounded-md px-2 py-1.5 bg-orange-50 text-[#F97316] text-xs font-medium">
        <span className="size-1.5 shrink-0 rounded-full bg-[#F97316]" />
        <span className="flex-1">{leaf.label}</span>
        {leaf.badge && (
          <span className="rounded bg-orange-100 px-1 text-[10px] font-bold text-orange-600">
            {leaf.badge}
          </span>
        )}
      </div>
    ) : (
      <div className="flex items-center gap-2 rounded-md px-2 py-1.5 text-xs text-neutral-400 italic select-none">
        <span className="size-1.5 shrink-0 rounded-full bg-neutral-200" />
        <span>{leaf.label}</span>
        {leaf.description && (
          <span className="text-neutral-300 not-italic truncate">· {leaf.description}</span>
        )}
      </div>
    )
  }

  return (
    <Link
      href={leaf.href}
      onClick={onClose}
      className={cn(
        'flex items-center gap-2 rounded-md px-2 py-1.5 text-xs transition-colors',
        active
          ? 'bg-orange-50 text-[#F97316] font-medium'
          : 'text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900',
      )}
    >
      <span className={cn(
        'size-1.5 shrink-0 rounded-full transition-colors',
        active ? 'bg-[#F97316]' : 'bg-neutral-300',
      )} />
      <span className="flex-1">{leaf.label}</span>
      {leaf.badge && (
        <span className={cn(
          'rounded px-1.5 py-px text-[10px] font-bold leading-none',
          leaf.badge === 'LIVE'
            ? 'animate-pulse bg-red-500 text-white'
            : 'bg-neutral-200 text-neutral-600',
        )}>
          {leaf.badge}
        </span>
      )}
    </Link>
  )
}

/* ─── ItemRow ────────────────────────────────────────────────── */

function ItemRow({ item, onClose }: { item: NavItem; onClose: () => void }) {
  const pathname   = usePathname()
  const selfActive = itemMatches(item, pathname)
  const childActive = anyChildActive(item, pathname)
  const highlighted = selfActive || childActive
  const hasChildren = !!item.children?.length

  /* Auto-expand when a child is active */
  const [expanded, setExpanded] = useState(() => highlighted)
  const Icon = item.icon

  return (
    <div>
      <div className="flex items-center gap-0.5">
        {/* Main link */}
        <Link
          href={item.href}
          onClick={onClose}
          className={cn(
            'flex flex-1 items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm font-medium transition-colors',
            selfActive
              ? 'bg-orange-50 text-[#F97316]'
              : highlighted
              ? 'text-neutral-900 hover:bg-neutral-50'
              : 'text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900',
          )}
        >
          <Icon className={cn(
            'size-4 shrink-0 transition-colors',
            highlighted ? 'text-[#F97316]' : 'text-neutral-400',
          )} />
          <span className="flex-1 truncate">{item.label}</span>
          {selfActive && !hasChildren && (
            <span className="size-1.5 shrink-0 rounded-full bg-[#F97316]" />
          )}
        </Link>

        {/* Expand / collapse chevron */}
        {hasChildren && (
          <button
            onClick={() => setExpanded(e => !e)}
            className="rounded p-1.5 text-neutral-400 transition-colors hover:bg-neutral-100 hover:text-neutral-600"
            aria-label={expanded ? '收起' : '展开'}
          >
            <ChevronRight className={cn(
              'size-3.5 transition-transform duration-200',
              expanded && 'rotate-90',
            )} />
          </button>
        )}
      </div>

      {/* Children */}
      {hasChildren && expanded && (
        <div className="ml-5 mt-0.5 space-y-0.5 border-l border-orange-100 pl-3 pb-1">
          {item.children!.map(leaf => (
            <LeafRow key={leaf.href} leaf={leaf} onClose={onClose} />
          ))}
        </div>
      )}
    </div>
  )
}

/* ─── Main export ────────────────────────────────────────────── */

interface SiteNavPaneProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function SiteNavPane({ open, onOpenChange }: SiteNavPaneProps) {
  const { data: session, status } = useSession()
  const isLoggedIn = status === 'authenticated' && !!session?.user
  const isAdmin    = isLoggedIn && (session?.user as { role?: string })?.role === 'ADMIN'
  const close      = () => onOpenChange(false)

  const visibleSections = STRUCTURE.filter(s => {
    if (s.authRequired  && !isLoggedIn) return false
    if (s.adminRequired && !isAdmin)    return false
    return true
  })

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="left"
        className="flex w-72 flex-col gap-0 border-r border-orange-100/60 bg-[#FFFBF5] p-0"
      >
        {/* Header */}
        <SheetHeader className="border-b border-orange-100/50 px-5 py-4">
          <SheetTitle
            className="text-left text-xs font-semibold uppercase tracking-[0.15em] text-neutral-400"
            style={{ fontFamily: "'ZCOOL XiaoWei', serif" }}
          >
            网站导航
          </SheetTitle>
        </SheetHeader>

        {/* Scrollable nav tree */}
        <div className="flex-1 space-y-5 overflow-y-auto px-3 py-4">
          {visibleSections.map(section => (
            <div key={section.title}>
              <p className={cn(
                'mb-1.5 px-2 text-[10px] font-bold uppercase tracking-[0.18em]',
                section.accent,
              )}>
                {section.title}
              </p>
              <div className="space-y-px">
                {section.items.map(item => (
                  <ItemRow key={item.href} item={item} onClose={close} />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="border-t border-orange-100/50 px-5 py-3">
          <p className="text-[11px] text-neutral-400">
            {isLoggedIn
              ? `已登录 · ${session?.user?.name ?? '用户'}`
              : '登录后可查看用户中心'}
          </p>
        </div>
      </SheetContent>
    </Sheet>
  )
}

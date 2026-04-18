export const revalidate = 3600

import type { Metadata } from 'next'
import Link from 'next/link'
import { Video } from 'lucide-react'
import { OrangeMascot } from '@/components/mascot/OrangeMascot'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { mockOrchardUpdates } from '@/lib/mock-data'
import {
  updateTypeConfig,
  timelineDotColor,
} from '@/components/orchard/UpdateCard'
import type { UpdateType } from '@/lib/mock-data'

export const metadata: Metadata = {
  title: '果园动态',
  description:
    '实时了解认养橙树的成长近况，查看果园生长记录、养护日志、气象播报与活动回顾。',
  keywords: ['果园动态', '橙树成长记录', '果园直播', '赣南果园', '养护日志'],
  openGraph: {
    title: '果园动态 | 认养一个橙子',
    description:
      '实时了解认养橙树的成长近况，查看果园生长记录、养护日志与气象播报。',
    images: [{ url: '/og-default.png', width: 1200, height: 630 }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: '果园动态 | 认养一个橙子',
    description:
      '实时了解认养橙树的成长近况，查看果园生长记录、养护日志与气象播报。',
    images: ['/og-default.png'],
  },
}

/* ─── filter tabs (static, all rendered at once; client filter via CSS or JS later) ─── */

const filterTabs: { label: string; value: UpdateType | 'ALL' }[] = [
  { label: '全部', value: 'ALL' },
  { label: '生长记录', value: 'GROWTH' },
  { label: '养护', value: 'CARE' },
  { label: '气象', value: 'WEATHER' },
  { label: '采摘', value: 'HARVEST' },
  { label: '活动', value: 'EVENT' },
  { label: '直播', value: 'LIVE' },
]

const placeholderGradient: Record<UpdateType, string> = {
  GROWTH: 'from-emerald-200/60 to-green-100/40',
  WEATHER: 'from-sky-200/60 to-blue-100/40',
  CARE: 'from-amber-200/60 to-yellow-100/40',
  HARVEST: 'from-orange-200/60 to-amber-100/40',
  EVENT: 'from-purple-200/60 to-fuchsia-100/40',
  LIVE: 'from-rose-200/60 to-pink-100/40',
}

const placeholderEmoji: Record<UpdateType, string> = {
  GROWTH: '\u{1F331}',
  WEATHER: '\u{1F326}',
  CARE: '\u{2702}',
  HARVEST: '\u{1F34A}',
  EVENT: '\u{1F389}',
  LIVE: '\u{1F4F9}',
}

export default function OrchardPage() {
  const updates = [...mockOrchardUpdates].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  )

  return (
    <div className="flex flex-col">
      {/* ─── Hero ─── */}
      <section
        className="relative overflow-hidden px-4 py-24 text-center sm:py-32"
        style={{
          background:
            'linear-gradient(135deg, #166534 0%, #15803d 25%, #22c55e 50%, #4ade80 75%, #86efac 100%)',
        }}
      >
        {/* Decorative floating orbs */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div
            className="absolute -left-16 -top-16 h-64 w-64 rounded-full bg-white/8"
            style={{ animation: 'hero-float-1 8s ease-in-out infinite' }}
          />
          <div
            className="absolute -bottom-10 -right-10 h-56 w-56 rounded-full bg-white/8"
            style={{ animation: 'hero-float-2 10s ease-in-out infinite' }}
          />
          <div
            className="absolute left-[20%] top-[25%] h-5 w-5 rounded-full bg-white/20"
            style={{ animation: 'hero-float-3 4s ease-in-out infinite' }}
          />
          <div
            className="absolute left-[70%] top-[18%] h-4 w-4 rounded-full bg-white/25"
            style={{ animation: 'hero-float-1 5s ease-in-out infinite 0.5s' }}
          />
          <div
            className="absolute left-[12%] top-[65%] h-12 w-6 rotate-45 rounded-full bg-emerald-300/15"
            style={{ animation: 'hero-float-2 9s ease-in-out infinite 1.5s' }}
          />
        </div>

        <div className="relative mx-auto flex max-w-3xl flex-col items-center gap-5">
          <OrangeMascot size="lg" expression="happy" animation="float" />
          <h1 className="text-3xl font-extrabold leading-tight text-white drop-shadow-lg sm:text-5xl">
            果园动态
          </h1>
          <p className="max-w-md text-lg font-medium text-white/90">
            实时了解您认养橙树的成长近况
          </p>
          <Link href="/orchard/live">
            <Button
              size="lg"
              className="mt-2 h-12 rounded-full bg-white/20 px-8 text-base font-bold text-white backdrop-blur-sm transition-all hover:bg-white/30"
            >
              <Video className="mr-2 size-4" />
              进入果园直播
            </Button>
          </Link>
        </div>
      </section>

      {/* ─── Filter Bar ─── */}
      <section className="sticky top-0 z-20 border-b border-green-100 bg-white/80 backdrop-blur-lg">
        <div className="mx-auto flex max-w-5xl gap-2 overflow-x-auto px-4 py-3">
          {filterTabs.map((tab, idx) => (
            <button
              key={tab.value}
              className={`shrink-0 rounded-full px-4 py-1.5 text-sm font-semibold transition-all ${
                idx === 0
                  ? 'bg-green-600 text-white shadow-sm'
                  : 'bg-green-50 text-green-700 hover:bg-green-100'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </section>

      {/* ─── Timeline List ─── */}
      <section className="bg-gradient-to-b from-green-50/50 to-background px-4 py-14">
        <div className="mx-auto max-w-4xl">
          <div className="relative">
            {/* Vertical timeline line */}
            <div className="absolute left-[18px] top-0 hidden h-full w-[2px] bg-gradient-to-b from-green-300 via-green-200 to-transparent sm:block" />

            <div className="space-y-8">
              {updates.map((update) => {
                const cfg = updateTypeConfig[update.type]
                const { Icon } = cfg

                return (
                  <div key={update.id} className="relative flex gap-6 sm:gap-8">
                    {/* Timeline node */}
                    <div className="relative z-10 hidden flex-col items-center sm:flex">
                      <div
                        className={`h-[38px] w-[38px] shrink-0 rounded-full ${timelineDotColor[update.type]} flex items-center justify-center shadow-md`}
                      >
                        <Icon className="size-4 text-white" />
                      </div>
                    </div>

                    {/* Card */}
                    <Link
                      href={`/orchard/${update.id}`}
                      className="group flex-1 rounded-2xl border border-green-100 bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md hover:shadow-green-100/60"
                    >
                      {/* Image placeholder */}
                      <div
                        className={`mb-4 flex aspect-[16/7] items-center justify-center rounded-xl bg-gradient-to-br ${placeholderGradient[update.type]}`}
                      >
                        <span className="text-4xl opacity-50">
                          {placeholderEmoji[update.type]}
                        </span>
                      </div>

                      {/* Meta row */}
                      <div className="mb-2 flex flex-wrap items-center gap-2">
                        <Badge
                          className={`${cfg.bgColor} ${cfg.color} border-0 text-[11px] font-semibold`}
                        >
                          <Icon className="mr-1 size-3" />
                          {cfg.label}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {update.publishedAt}
                        </span>
                        {/* Mobile-only dot */}
                        <span
                          className={`block h-2 w-2 rounded-full sm:hidden ${timelineDotColor[update.type]}`}
                        />
                      </div>

                      {/* Title */}
                      <h3 className="mb-1.5 text-lg font-bold leading-snug text-foreground transition-colors group-hover:text-green-700">
                        {update.title}
                      </h3>

                      {/* Excerpt */}
                      <p className="mb-3 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                        {update.content.slice(0, 100)}...
                      </p>

                      {/* Footer */}
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>{update.orchardName}</span>
                        <span>{update.author}</span>
                      </div>
                    </Link>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

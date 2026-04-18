import type { Metadata } from 'next'
import Link from 'next/link'
import {
  ArrowLeft,
  Play,
  Radio,
  Eye,
  Clock,
  MessageCircle,
  TreePine,
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { mockLiveReplays, mockLiveComments } from '@/lib/mock-data'

export const metadata: Metadata = {
  title: '果园直播',
  description:
    '实时观看赣南果园直播，感受橙树生长的每一刻，与你的专属橙树零距离互动。',
  keywords: ['果园直播', '赣南果园', '橙树直播', '实时直播', '认养直播'],
  openGraph: {
    title: '果园直播 | 认养一个橙子',
    description:
      '实时观看赣南果园直播，感受橙树生长的每一刻，与你的专属橙树零距离互动。',
    images: [{ url: '/og-default.png', width: 1200, height: 630 }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: '果园直播 | 认养一个橙子',
    description:
      '实时观看赣南果园直播，感受橙树生长的每一刻。',
    images: ['/og-default.png'],
  },
}

const channels = [
  {
    id: 'ch-1',
    name: '赣南一号园',
    location: '江西赣州·信丰县',
    status: '直播中' as const,
    viewers: 1286,
  },
  {
    id: 'ch-2',
    name: '赣南二号园',
    location: '江西赣州·安远县',
    status: '直播中' as const,
    viewers: 843,
  },
]

export default function LivePage() {
  return (
    <div className="flex flex-col">
      {/* ─── Top bar ─── */}
      <div className="border-b border-green-100 bg-green-50/50">
        <div className="mx-auto flex max-w-6xl items-center px-4 py-3">
          <Link
            href="/orchard"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-green-700 transition-colors hover:text-green-900"
          >
            <ArrowLeft className="size-4" />
            返回果园动态
          </Link>
        </div>
      </div>

      {/* ─── Header ─── */}
      <section className="bg-gradient-to-b from-green-50 to-background px-4 pt-10 pb-6">
        <div className="mx-auto max-w-6xl">
          <div className="mb-1 flex items-center gap-2">
            <Badge className="border-0 bg-rose-100 text-rose-700 text-xs font-semibold">
              <Radio className="mr-1 size-3 animate-pulse" />
              LIVE
            </Badge>
          </div>
          <h1 className="text-2xl font-extrabold sm:text-3xl">果园直播</h1>
          <p className="mt-1 text-muted-foreground">
            实时观看赣南果园，感受橙树生长的每一刻
          </p>
        </div>
      </section>

      {/* ─── Main Content ─── */}
      <section className="px-4 pb-16">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col gap-6 lg:flex-row">
            {/* ─── Left: Player + Channels ─── */}
            <div className="flex-1 space-y-6">
              {/* Live Player Placeholder */}
              <div className="relative overflow-hidden rounded-2xl shadow-lg">
                <div
                  className="flex aspect-video flex-col items-center justify-center"
                  style={{
                    background:
                      'linear-gradient(135deg, #166534 0%, #15803d 30%, #22c55e 60%, #4ade80 100%)',
                  }}
                >
                  {/* Subtle grid overlay */}
                  <div
                    className="pointer-events-none absolute inset-0 opacity-[0.04]"
                    style={{
                      backgroundImage:
                        'linear-gradient(rgba(255,255,255,.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.3) 1px, transparent 1px)',
                      backgroundSize: '40px 40px',
                    }}
                  />

                  {/* Floating decorative elements */}
                  <div className="pointer-events-none absolute inset-0 overflow-hidden">
                    <div
                      className="absolute left-[10%] top-[20%] h-3 w-3 rounded-full bg-white/15"
                      style={{ animation: 'hero-float-3 4s ease-in-out infinite' }}
                    />
                    <div
                      className="absolute left-[80%] top-[30%] h-2 w-2 rounded-full bg-white/20"
                      style={{ animation: 'hero-float-1 5s ease-in-out infinite 0.5s' }}
                    />
                    <div
                      className="absolute left-[60%] top-[70%] h-4 w-4 rounded-full bg-white/10"
                      style={{ animation: 'hero-float-2 6s ease-in-out infinite 1s' }}
                    />
                  </div>

                  {/* Play button */}
                  <div className="relative mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm transition-transform hover:scale-110">
                    <Play className="ml-1 size-8 text-white" />
                  </div>
                  <p className="relative text-lg font-semibold text-white/90">
                    直播信号连接中...
                  </p>
                  <p className="relative mt-1 text-sm text-white/60">
                    赣南一号园 · 实时画面
                  </p>

                  {/* Live badge */}
                  <div className="absolute left-4 top-4 flex items-center gap-2">
                    <span className="flex items-center gap-1.5 rounded-full bg-red-500/90 px-3 py-1 text-xs font-bold text-white backdrop-blur-sm">
                      <span className="h-2 w-2 animate-pulse rounded-full bg-white" />
                      LIVE
                    </span>
                    <span className="flex items-center gap-1 rounded-full bg-black/30 px-2.5 py-1 text-xs text-white backdrop-blur-sm">
                      <Eye className="size-3" />
                      1,286
                    </span>
                  </div>
                </div>
              </div>

              {/* Channel Cards */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {channels.map((ch, idx) => (
                  <button
                    key={ch.id}
                    className={`group flex items-center gap-4 rounded-xl border p-4 text-left transition-all hover:-translate-y-0.5 hover:shadow-md ${
                      idx === 0
                        ? 'border-green-300 bg-green-50 shadow-sm shadow-green-100'
                        : 'border-green-100 bg-white hover:shadow-green-100/60'
                    }`}
                  >
                    <div
                      className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-xl ${
                        idx === 0
                          ? 'bg-green-600 text-white'
                          : 'bg-green-100 text-green-700'
                      }`}
                    >
                      <TreePine className="size-6" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-bold">{ch.name}</p>
                        <span className="flex items-center gap-1 text-[11px] text-rose-600">
                          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-rose-500" />
                          {ch.status}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground">{ch.location}</p>
                      <p className="mt-0.5 flex items-center gap-1 text-xs text-muted-foreground">
                        <Eye className="size-3" />
                        {ch.viewers.toLocaleString()} 人观看
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* ─── Right: Chat ─── */}
            <div className="w-full lg:w-80">
              <div className="sticky top-16 rounded-2xl border border-green-100 bg-white shadow-sm">
                {/* Chat header */}
                <div className="flex items-center gap-2 border-b border-green-100 px-4 py-3">
                  <MessageCircle className="size-4 text-green-600" />
                  <span className="text-sm font-bold">实时弹幕</span>
                  <span className="ml-auto rounded-full bg-green-50 px-2 py-0.5 text-[11px] text-green-600">
                    {mockLiveComments.length} 条
                  </span>
                </div>

                {/* Chat messages */}
                <div className="max-h-[400px] space-y-1 overflow-y-auto p-3">
                  {mockLiveComments.map((comment) => (
                    <div
                      key={comment.id}
                      className="rounded-lg px-3 py-2 transition-colors hover:bg-green-50/50"
                    >
                      <div className="flex items-baseline gap-2">
                        <span className="shrink-0 text-xs font-semibold text-green-700">
                          {comment.user}
                        </span>
                        <span className="text-[11px] text-muted-foreground">
                          {comment.time}
                        </span>
                      </div>
                      <p className="mt-0.5 text-sm text-muted-foreground">
                        {comment.content}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Chat input placeholder */}
                <div className="border-t border-green-100 px-3 py-3">
                  <div className="flex items-center gap-2 rounded-full border border-green-200 bg-green-50/50 px-4 py-2 text-sm text-muted-foreground">
                    说点什么...
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ─── Replay List ─── */}
          <div className="mt-14">
            <h2 className="mb-6 text-xl font-bold">直播回放</h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {mockLiveReplays.map((replay) => (
                <div
                  key={replay.id}
                  className="group cursor-pointer overflow-hidden rounded-xl border border-green-100 bg-white transition-all hover:-translate-y-0.5 hover:shadow-md hover:shadow-green-100/60"
                >
                  {/* Thumbnail placeholder */}
                  <div className="relative aspect-video bg-gradient-to-br from-green-200/50 to-emerald-100/30">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/80 shadow-sm transition-transform group-hover:scale-110">
                        <Play className="ml-0.5 size-4 text-green-700" />
                      </div>
                    </div>
                    <div className="absolute bottom-2 right-2 rounded bg-black/60 px-1.5 py-0.5 text-[11px] text-white">
                      {replay.duration}
                    </div>
                  </div>

                  {/* Info */}
                  <div className="p-3">
                    <h3 className="mb-1 text-sm font-semibold leading-snug text-foreground group-hover:text-green-700">
                      {replay.title}
                    </h3>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>{replay.orchardName}</span>
                      <span className="flex items-center gap-1">
                        <Eye className="size-3" />
                        {replay.viewers.toLocaleString()}
                      </span>
                    </div>
                    <div className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="size-3" />
                      {replay.date}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

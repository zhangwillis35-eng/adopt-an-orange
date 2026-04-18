import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, ChevronLeft, ChevronRight, MapPin } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { mockOrchardUpdates } from '@/lib/mock-data'
import { updateTypeConfig } from '@/components/orchard/UpdateCard'
import { UpdateCard } from '@/components/orchard/UpdateCard'
import type { UpdateType } from '@/lib/mock-data'

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

export function generateStaticParams() {
  return mockOrchardUpdates.map((u) => ({ updateId: u.id }))
}

export function generateMetadata({ params }: { params: Promise<{ updateId: string }> }) {
  // Note: we need sync access for metadata; Next.js 16 passes params as Promise
  // but generateMetadata receives the resolved value — this wrapper handles both.
  return params.then(({ updateId }) => {
    const update = mockOrchardUpdates.find((u) => u.id === updateId)
    return {
      title: update ? `${update.title} - 果园动态` : '果园动态',
      description: update?.content.slice(0, 160),
    }
  })
}

export default async function UpdateDetailPage({
  params,
}: {
  params: Promise<{ updateId: string }>
}) {
  const { updateId } = await params

  const sorted = [...mockOrchardUpdates].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  )
  const currentIdx = sorted.findIndex((u) => u.id === updateId)
  if (currentIdx === -1) notFound()

  const update = sorted[currentIdx]
  const prevUpdate = currentIdx < sorted.length - 1 ? sorted[currentIdx + 1] : null
  const nextUpdate = currentIdx > 0 ? sorted[currentIdx - 1] : null

  const cfg = updateTypeConfig[update.type]
  const { Icon } = cfg

  // Related updates: same type, excluding current, max 3
  const related = sorted
    .filter((u) => u.type === update.type && u.id !== update.id)
    .slice(0, 3)

  return (
    <div className="flex flex-col">
      {/* ─── Top bar ─── */}
      <div className="border-b border-green-100 bg-green-50/50">
        <div className="mx-auto flex max-w-4xl items-center px-4 py-3">
          <Link
            href="/orchard"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-green-700 transition-colors hover:text-green-900"
          >
            <ArrowLeft className="size-4" />
            返回果园动态
          </Link>
        </div>
      </div>

      {/* ─── Article ─── */}
      <article className="mx-auto w-full max-w-4xl px-4 py-10">
        {/* Meta */}
        <div className="mb-4 flex flex-wrap items-center gap-3">
          <Badge
            className={`${cfg.bgColor} ${cfg.color} border-0 text-xs font-semibold`}
          >
            <Icon className="mr-1 size-3" />
            {cfg.label}
          </Badge>
          <span className="text-sm text-muted-foreground">{update.publishedAt}</span>
        </div>

        {/* Title */}
        <h1 className="mb-4 text-2xl font-extrabold leading-tight sm:text-3xl">
          {update.title}
        </h1>

        {/* Orchard info */}
        <div className="mb-8 flex flex-wrap items-center gap-4 rounded-xl bg-green-50 px-4 py-3">
          <div className="flex items-center gap-1.5 text-sm font-medium text-green-800">
            <MapPin className="size-4" />
            {update.orchardName}
          </div>
          <span className="text-sm text-green-600">{update.orchardLocation}</span>
          <span className="ml-auto text-sm text-muted-foreground">
            {update.author}
          </span>
        </div>

        {/* Image grid placeholder */}
        <div className="mb-8 grid grid-cols-2 gap-3">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className={`flex aspect-[4/3] items-center justify-center rounded-xl bg-gradient-to-br ${placeholderGradient[update.type]} ${
                i === 0 ? 'col-span-2 aspect-[16/7]' : ''
              }`}
            >
              <span className="text-3xl opacity-40">
                {placeholderEmoji[update.type]}
              </span>
            </div>
          ))}
        </div>

        {/* Content */}
        <div className="prose prose-green mx-auto max-w-none leading-[1.9] text-foreground">
          {update.content.split(/(?<=。)/).map((paragraph, i) =>
            paragraph.trim() ? (
              <p key={i} className="mb-4 text-base leading-[1.9] text-muted-foreground">
                {paragraph.trim()}
              </p>
            ) : null,
          )}
        </div>

        {/* ─── Prev / Next Navigation ─── */}
        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {prevUpdate ? (
            <Link
              href={`/orchard/${prevUpdate.id}`}
              className="group flex items-center gap-3 rounded-xl border border-green-100 bg-white p-4 transition-all hover:-translate-y-0.5 hover:shadow-md hover:shadow-green-100/60"
            >
              <ChevronLeft className="size-5 shrink-0 text-green-500 transition-transform group-hover:-translate-x-0.5" />
              <div className="min-w-0">
                <p className="text-xs text-muted-foreground">上一篇</p>
                <p className="truncate text-sm font-semibold text-foreground group-hover:text-green-700">
                  {prevUpdate.title}
                </p>
              </div>
            </Link>
          ) : (
            <div />
          )}
          {nextUpdate ? (
            <Link
              href={`/orchard/${nextUpdate.id}`}
              className="group flex items-center justify-end gap-3 rounded-xl border border-green-100 bg-white p-4 text-right transition-all hover:-translate-y-0.5 hover:shadow-md hover:shadow-green-100/60"
            >
              <div className="min-w-0">
                <p className="text-xs text-muted-foreground">下一篇</p>
                <p className="truncate text-sm font-semibold text-foreground group-hover:text-green-700">
                  {nextUpdate.title}
                </p>
              </div>
              <ChevronRight className="size-5 shrink-0 text-green-500 transition-transform group-hover:translate-x-0.5" />
            </Link>
          ) : (
            <div />
          )}
        </div>
      </article>

      {/* ─── Related Updates ─── */}
      {related.length > 0 && (
        <section className="border-t border-green-100 bg-green-50/30 px-4 py-14">
          <div className="mx-auto max-w-5xl">
            <h2 className="mb-8 text-center text-xl font-bold">相关动态</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((r) => (
                <UpdateCard key={r.id} update={r} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}

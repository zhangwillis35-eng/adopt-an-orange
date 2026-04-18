import Link from 'next/link'
import {
  Sprout,
  CloudSun,
  Scissors,
  Apple,
  CalendarHeart,
  Radio,
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import type { MockOrchardUpdate, UpdateType } from '@/lib/mock-data'

/* ─── Type config: color, icon, label ─── */

export const updateTypeConfig: Record<
  UpdateType,
  { label: string; color: string; bgColor: string; Icon: React.ComponentType<{ className?: string }> }
> = {
  GROWTH: {
    label: '生长记录',
    color: 'text-emerald-700',
    bgColor: 'bg-emerald-100',
    Icon: Sprout,
  },
  WEATHER: {
    label: '气象',
    color: 'text-sky-700',
    bgColor: 'bg-sky-100',
    Icon: CloudSun,
  },
  CARE: {
    label: '养护',
    color: 'text-amber-700',
    bgColor: 'bg-amber-100',
    Icon: Scissors,
  },
  HARVEST: {
    label: '采摘',
    color: 'text-orange-700',
    bgColor: 'bg-orange-100',
    Icon: Apple,
  },
  EVENT: {
    label: '活动',
    color: 'text-purple-700',
    bgColor: 'bg-purple-100',
    Icon: CalendarHeart,
  },
  LIVE: {
    label: '直播',
    color: 'text-rose-700',
    bgColor: 'bg-rose-100',
    Icon: Radio,
  },
}

export const timelineDotColor: Record<UpdateType, string> = {
  GROWTH: 'bg-emerald-500',
  WEATHER: 'bg-sky-500',
  CARE: 'bg-amber-500',
  HARVEST: 'bg-orange-500',
  EVENT: 'bg-purple-500',
  LIVE: 'bg-rose-500',
}

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

interface UpdateCardProps {
  update: MockOrchardUpdate
  /** Hide image placeholder for compact usage */
  compact?: boolean
}

export function UpdateCard({ update, compact = false }: UpdateCardProps) {
  const cfg = updateTypeConfig[update.type]
  const { Icon } = cfg

  return (
    <Link
      href={`/orchard/${update.id}`}
      className="group block rounded-2xl border border-green-100 bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md hover:shadow-green-100/60"
    >
      {/* Image placeholder */}
      {!compact && (
        <div
          className={`mb-4 flex aspect-[16/9] items-center justify-center rounded-xl bg-gradient-to-br ${placeholderGradient[update.type]}`}
        >
          <span className="text-4xl opacity-50">{placeholderEmoji[update.type]}</span>
        </div>
      )}

      {/* Meta row */}
      <div className="mb-2 flex items-center gap-2">
        <Badge
          className={`${cfg.bgColor} ${cfg.color} border-0 text-[11px] font-semibold`}
        >
          <Icon className="mr-1 size-3" />
          {cfg.label}
        </Badge>
        <span className="text-xs text-muted-foreground">{update.publishedAt}</span>
      </div>

      {/* Title */}
      <h3 className="mb-1.5 text-base font-bold leading-snug text-foreground transition-colors group-hover:text-green-700">
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
  )
}

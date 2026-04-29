"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { ThumbsUp, MessageCircle, Send } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { StarRating } from "@/components/review/StarRating"
import { getVisitorId } from "@/lib/visitor-id"

/* ────────────────────────── types ────────────────────────── */

interface Review {
  id: string
  userName: string
  location: string
  rating: number
  content: string
  planName: string
  createdAt: string
  _count?: { likes: number; replies: number }
}

interface Reply {
  id: string
  userName: string
  content: string
  createdAt: string
}

/* ────────────────────────── helpers ────────────────────────── */

const AVATAR_COLORS = [
  "bg-pink-400", "bg-blue-400", "bg-green-400", "bg-purple-400",
  "bg-amber-400", "bg-teal-400", "bg-red-400", "bg-indigo-400",
]

function getAvatarColor(name: string) {
  let hash = 0
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash)
  }
  return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length]
}

function relativeTime(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime()
  const seconds = Math.floor(diff / 1000)
  if (seconds < 60) return "刚刚"
  const minutes = Math.floor(seconds / 60)
  if (minutes < 60) return `${minutes}分钟前`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours}小时前`
  const days = Math.floor(hours / 24)
  if (days < 30) return `${days}天前`
  const months = Math.floor(days / 30)
  if (months < 12) return `${months}个月前`
  return `${Math.floor(months / 12)}年前`
}

/* ────────────────────────── component ────────────────────────── */

interface ReviewCardProps {
  review: Review
  className?: string
  isNew?: boolean
}

export function ReviewCard({ review: r, className = "", isNew }: ReviewCardProps) {
  const { data: session } = useSession()

  // Like state
  const [likeCount, setLikeCount] = useState(r._count?.likes ?? 0)
  const [liked, setLiked] = useState(false)

  // Reply state
  const [showReplies, setShowReplies] = useState(false)
  const [replies, setReplies] = useState<Reply[]>([])
  const [replyCount, setReplyCount] = useState(r._count?.replies ?? 0)
  const [replyText, setReplyText] = useState("")
  const [repliesLoaded, setRepliesLoaded] = useState(false)
  const [submittingReply, setSubmittingReply] = useState(false)

  // Check like status on mount
  useEffect(() => {
    const visitorId = getVisitorId()
    if (!visitorId) return
    fetch(`/api/v1/reviews/${r.id}/like?visitorId=${visitorId}`)
      .then((res) => res.json())
      .then((data) => {
        setLiked(data.liked)
        setLikeCount(data.count)
      })
      .catch(() => {})
  }, [r.id])

  const handleLike = async () => {
    const visitorId = getVisitorId()
    if (!visitorId) return
    // Optimistic update
    setLiked(!liked)
    setLikeCount((c) => (liked ? c - 1 : c + 1))
    try {
      const res = await fetch(`/api/v1/reviews/${r.id}/like`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ visitorId }),
      })
      const data = await res.json()
      setLiked(data.liked)
    } catch {
      // Revert on error
      setLiked(liked)
      setLikeCount((c) => (liked ? c + 1 : c - 1))
    }
  }

  const handleToggleReplies = async () => {
    setShowReplies(!showReplies)
    if (!repliesLoaded) {
      try {
        const res = await fetch(`/api/v1/reviews/${r.id}/replies`)
        const data = await res.json()
        setReplies(data.replies)
        setRepliesLoaded(true)
      } catch {}
    }
  }

  const handleSubmitReply = async () => {
    if (!replyText.trim() || submittingReply) return
    setSubmittingReply(true)
    try {
      const res = await fetch(`/api/v1/reviews/${r.id}/replies`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: replyText.trim() }),
      })
      if (res.ok) {
        const reply: Reply = await res.json()
        setReplies((prev) => [...prev, reply])
        setReplyCount((c) => c + 1)
        setReplyText("")
      }
    } catch {}
    setSubmittingReply(false)
  }

  return (
    <Card className={`card-hover border-orange-100 transition-all duration-500 ${isNew ? "animate-slide-in-from-top ring-2 ring-[#FF6B00]/30" : ""} ${className}`}>
      <CardContent className="space-y-4 pt-6">
        {/* User info */}
        <div className="flex items-center gap-3">
          <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white shadow-md ${getAvatarColor(r.userName)}`}>
            {r.userName[0]}
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-bold">{r.userName}</p>
            <p className="text-xs text-muted-foreground">{r.location}</p>
          </div>
          <span className="shrink-0 text-xs text-muted-foreground">{relativeTime(r.createdAt)}</span>
        </div>

        {/* Stars */}
        <StarRating value={r.rating} readonly size="sm" />

        {/* Content */}
        <p className="text-sm leading-relaxed text-muted-foreground">
          &ldquo;{r.content}&rdquo;
        </p>

        {/* Plan badge */}
        <Badge variant="secondary" className="bg-orange-50 text-[#FF6B00]">
          {r.planName}
        </Badge>

        {/* Actions: Like + Reply */}
        <div className="flex items-center gap-4 border-t border-orange-50 pt-3">
          <button
            onClick={handleLike}
            className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs transition-all ${
              liked
                ? "bg-orange-100 font-semibold text-[#FF6B00]"
                : "text-muted-foreground hover:bg-orange-50 hover:text-[#FF6B00]"
            }`}
          >
            <ThumbsUp className={`size-3.5 ${liked ? "fill-[#FF6B00]" : ""}`} />
            {likeCount > 0 && <span>{likeCount}</span>}
          </button>

          <button
            onClick={handleToggleReplies}
            className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs transition-all ${
              showReplies
                ? "bg-orange-100 font-semibold text-[#FF6B00]"
                : "text-muted-foreground hover:bg-orange-50 hover:text-[#FF6B00]"
            }`}
          >
            <MessageCircle className="size-3.5" />
            {replyCount > 0 && <span>{replyCount}</span>}
          </button>
        </div>

        {/* Replies section */}
        {showReplies && (
          <div className="space-y-3 border-t border-orange-50 pt-3">
            {replies.map((reply) => (
              <div key={reply.id} className="flex gap-2">
                <div className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[10px] font-bold text-white ${getAvatarColor(reply.userName)}`}>
                  {reply.userName[0]}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-baseline gap-2">
                    <span className="text-xs font-semibold">{reply.userName}</span>
                    <span className="text-[10px] text-muted-foreground">{relativeTime(reply.createdAt)}</span>
                  </div>
                  <p className="text-xs leading-relaxed text-muted-foreground">{reply.content}</p>
                </div>
              </div>
            ))}

            {repliesLoaded && replies.length === 0 && (
              <p className="text-center text-xs text-muted-foreground">暂无回复</p>
            )}

            {/* Reply input */}
            {session?.user ? (
              <div className="flex gap-2">
                <Input
                  placeholder="写回复..."
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSubmitReply()}
                  maxLength={200}
                  className="h-8 text-xs"
                />
                <button
                  onClick={handleSubmitReply}
                  disabled={!replyText.trim() || submittingReply}
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-[#FF6B00] text-white transition-colors hover:bg-[#FF8C00] disabled:opacity-50"
                >
                  <Send className="size-3.5" />
                </button>
              </div>
            ) : (
              <p className="text-center text-xs text-muted-foreground">登录后可以回复</p>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

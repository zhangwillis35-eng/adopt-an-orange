"use client"

import { useEffect, useState, useCallback } from "react"
import { useSession } from "next-auth/react"
import { Star, MessageSquarePlus } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { StarRating } from "@/components/review/StarRating"

/* ────────────────────────── types ────────────────────────── */

interface Review {
  id: string
  userId: string
  userName: string
  userAvatar: string | null
  location: string
  rating: number
  content: string
  planName: string
  createdAt: string
}

/* ────────────────────────── helpers ────────────────────────── */

const AVATAR_COLORS = [
  "bg-pink-400",
  "bg-blue-400",
  "bg-green-400",
  "bg-purple-400",
  "bg-amber-400",
  "bg-teal-400",
  "bg-red-400",
  "bg-indigo-400",
]

function getAvatarColor(name: string) {
  let hash = 0
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash)
  }
  return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length]
}

function relativeTime(dateStr: string): string {
  const now = Date.now()
  const then = new Date(dateStr).getTime()
  const diff = now - then

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

  const years = Math.floor(months / 12)
  return `${years}年前`
}

/* ────────────────────────── component ────────────────────────── */

export function ReviewSection() {
  const { data: session } = useSession()
  const [reviews, setReviews] = useState<Review[]>([])
  const [total, setTotal] = useState(0)
  const [averageRating, setAverageRating] = useState(0)
  const [loading, setLoading] = useState(true)
  const [newReviewId, setNewReviewId] = useState<string | null>(null)

  // Dialog state
  const [dialogOpen, setDialogOpen] = useState(false)

  // Form state
  const [formRating, setFormRating] = useState(5)
  const [formLocation, setFormLocation] = useState("")
  const [formPlanName, setFormPlanName] = useState("")
  const [formContent, setFormContent] = useState("")
  const [submitting, setSubmitting] = useState(false)
  const [formError, setFormError] = useState("")

  const fetchReviews = useCallback(async () => {
    try {
      const res = await fetch("/api/v1/reviews?limit=6")
      const data = await res.json()
      setReviews(data.reviews)
      setTotal(data.total)
      setAverageRating(data.averageRating)
    } catch {
      // silently fail
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchReviews()
  }, [fetchReviews])

  // Clear animation class after it plays
  useEffect(() => {
    if (newReviewId) {
      const timer = setTimeout(() => setNewReviewId(null), 800)
      return () => clearTimeout(timer)
    }
  }, [newReviewId])

  const resetForm = () => {
    setFormRating(5)
    setFormLocation("")
    setFormPlanName("")
    setFormContent("")
    setFormError("")
  }

  const handleSubmit = async () => {
    // Client-side validation
    if (formContent.length < 5) {
      setFormError("评价内容至少5个字符")
      return
    }
    if (formContent.length > 200) {
      setFormError("评价内容最多200个字符")
      return
    }
    if (!formLocation.trim()) {
      setFormError("请填写城市")
      return
    }
    if (!formPlanName) {
      setFormError("请选择套餐")
      return
    }

    setSubmitting(true)
    setFormError("")

    try {
      const res = await fetch("/api/v1/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          rating: formRating,
          content: formContent,
          location: formLocation.trim(),
          planName: formPlanName,
        }),
      })

      if (!res.ok) {
        const data = await res.json()
        setFormError(data.error || "提交失败，请稍后重试")
        return
      }

      const newReview: Review = await res.json()
      // Prepend new review, keep max 6
      setReviews((prev) => [newReview, ...prev].slice(0, 6))
      setTotal((prev) => prev + 1)
      setAverageRating((prev) => {
        const newTotal = total + 1
        return Math.round(((prev * total + formRating) / newTotal) * 10) / 10
      })
      setNewReviewId(newReview.id)
      setDialogOpen(false)
      resetForm()
    } catch {
      setFormError("网络错误，请稍后重试")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section className="bg-gradient-to-b from-orange-50/80 to-background px-4 py-20">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="animate-fade-up mb-4 text-center">
          <span className="inline-block rounded-full bg-orange-100 px-4 py-1.5 text-sm font-semibold text-[#FF6B00]">
            用户好评
          </span>
        </div>
        <h2 className="animate-fade-up animate-delay-100 mb-4 text-center text-2xl font-extrabold sm:text-4xl">
          他们都在认养
        </h2>
        <p className="animate-fade-up animate-delay-200 mx-auto mb-6 max-w-md text-center text-muted-foreground">
          来自真实用户的声音
        </p>

        {/* Stats + Write Review Button */}
        <div className="animate-fade-up animate-delay-200 mb-10 flex flex-col items-center justify-between gap-4 sm:flex-row">
          {/* Stats */}
          <div className="flex items-center gap-4">
            {!loading && (
              <>
                <div className="flex items-center gap-1.5">
                  <Star className="size-5 fill-amber-400 text-amber-400" />
                  <span className="text-lg font-bold">{averageRating}</span>
                  <span className="text-sm text-muted-foreground">平均评分</span>
                </div>
                <div className="h-4 w-px bg-border" />
                <div className="text-sm text-muted-foreground">
                  共 <span className="font-semibold text-foreground">{total}</span> 条评价
                </div>
              </>
            )}
          </div>

          {/* Write Review Button */}
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger>
              <Button
                className="rounded-full bg-gradient-to-r from-[#FF6B00] to-[#FF8C00] px-6 font-semibold text-white shadow-md shadow-orange-200/50 transition-all hover:shadow-lg hover:shadow-orange-200/60"
                onClick={() => {
                  if (!session?.user) {
                    setDialogOpen(false)
                    alert("请先登录后评价")
                    return
                  }
                }}
              >
                <MessageSquarePlus className="mr-2 size-4" />
                我要评价
              </Button>
            </DialogTrigger>

            {session?.user && (
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>写评价</DialogTitle>
                  <DialogDescription>
                    分享你的认养体验，帮助更多人了解我们
                  </DialogDescription>
                </DialogHeader>

                <div className="space-y-4 py-2">
                  {/* Star rating */}
                  <div className="space-y-2">
                    <Label>评分</Label>
                    <StarRating value={formRating} onChange={setFormRating} />
                  </div>

                  {/* Location */}
                  <div className="space-y-2">
                    <Label htmlFor="review-location">城市</Label>
                    <Input
                      id="review-location"
                      placeholder="例如：上海"
                      value={formLocation}
                      onChange={(e) => setFormLocation(e.target.value)}
                      maxLength={20}
                    />
                  </div>

                  {/* Plan selection */}
                  <div className="space-y-2">
                    <Label>认养套餐</Label>
                    <Select value={formPlanName} onValueChange={(v) => setFormPlanName(v ?? "")}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="选择套餐" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="尝鲜套餐">尝鲜套餐</SelectItem>
                        <SelectItem value="家庭套餐">家庭套餐</SelectItem>
                        <SelectItem value="豪华套餐">豪华套餐</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Content */}
                  <div className="space-y-2">
                    <Label htmlFor="review-content">
                      评价内容
                      <span className="ml-2 text-xs font-normal text-muted-foreground">
                        {formContent.length}/200
                      </span>
                    </Label>
                    <Textarea
                      id="review-content"
                      placeholder="说说你的认养体验吧（5-200字）"
                      value={formContent}
                      onChange={(e) => setFormContent(e.target.value)}
                      maxLength={200}
                      className="min-h-24 resize-none"
                    />
                  </div>

                  {formError && (
                    <p className="text-sm text-destructive">{formError}</p>
                  )}
                </div>

                <DialogFooter>
                  <Button
                    onClick={handleSubmit}
                    disabled={submitting}
                    className="w-full rounded-full bg-gradient-to-r from-[#FF6B00] to-[#FF8C00] font-semibold text-white sm:w-auto"
                  >
                    {submitting ? "提交中..." : "提交评价"}
                  </Button>
                </DialogFooter>
              </DialogContent>
            )}
          </Dialog>
        </div>

        {/* Review cards grid */}
        {loading ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="border-orange-100">
                <CardContent className="space-y-4 pt-6">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 animate-pulse rounded-full bg-gray-200" />
                    <div className="space-y-2">
                      <div className="h-4 w-16 animate-pulse rounded bg-gray-200" />
                      <div className="h-3 w-10 animate-pulse rounded bg-gray-200" />
                    </div>
                  </div>
                  <div className="h-4 w-24 animate-pulse rounded bg-gray-200" />
                  <div className="space-y-2">
                    <div className="h-3 w-full animate-pulse rounded bg-gray-200" />
                    <div className="h-3 w-3/4 animate-pulse rounded bg-gray-200" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {reviews.map((r, idx) => (
              <Card
                key={r.id}
                className={`card-hover animate-fade-up border-orange-100 transition-all duration-500 ${
                  idx === 0
                    ? "animate-delay-200"
                    : idx === 1
                      ? "animate-delay-300"
                      : idx === 2
                        ? "animate-delay-400"
                        : idx === 3
                          ? "animate-delay-500"
                          : idx === 4
                            ? "animate-delay-600"
                            : "animate-delay-700"
                } ${r.id === newReviewId ? "animate-slide-in-from-top ring-2 ring-[#FF6B00]/30" : ""}`}
              >
                <CardContent className="space-y-4 pt-6">
                  {/* User info */}
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white shadow-md ${getAvatarColor(r.userName)}`}
                    >
                      {r.userName[0]}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-bold">{r.userName}</p>
                      <p className="text-xs text-muted-foreground">
                        {r.location}
                      </p>
                    </div>
                    <span className="shrink-0 text-xs text-muted-foreground">
                      {relativeTime(r.createdAt)}
                    </span>
                  </div>

                  {/* Stars */}
                  <StarRating value={r.rating} readonly size="sm" />

                  {/* Content */}
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    &ldquo;{r.content}&rdquo;
                  </p>

                  {/* Plan badge */}
                  <Badge
                    variant="secondary"
                    className="bg-orange-50 text-[#FF6B00]"
                  >
                    {r.planName}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

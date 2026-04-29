"use client"

import { useEffect, useState, useCallback, useRef } from "react"
import { useSession } from "next-auth/react"
import { Star, MessageSquarePlus, ChevronDown, ChevronUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
} from "@/components/ui/card"
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
import { ReviewCard } from "@/components/review/ReviewCard"
import { EmojiPickerButton } from "@/components/review/EmojiPickerButton"

/* ────────────────────────── types ────────────────────────── */

interface Review {
  id: string
  userId: string
  userName: string
  location: string
  rating: number
  content: string
  planName: string
  createdAt: string
  _count?: { likes: number; replies: number }
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
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  // 展开/收起状态
  const [expanded, setExpanded] = useState(false)
  const INITIAL_SHOW = 3

  const fetchReviews = useCallback(async () => {
    try {
      const res = await fetch("/api/v1/reviews")
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

  const handleEmojiInsert = (emoji: string) => {
    const ta = textareaRef.current
    if (ta) {
      const start = ta.selectionStart ?? formContent.length
      const newContent = formContent.slice(0, start) + emoji + formContent.slice(start)
      if (newContent.length <= 200) {
        setFormContent(newContent)
        // Move cursor after emoji
        setTimeout(() => {
          ta.focus()
          ta.setSelectionRange(start + emoji.length, start + emoji.length)
        }, 0)
      }
    } else {
      const newContent = formContent + emoji
      if (newContent.length <= 200) setFormContent(newContent)
    }
  }

  const handleSubmit = async () => {
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
      setReviews((prev) => [newReview, ...prev])
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

  const DELAY_CLASSES = [
    "animate-delay-200", "animate-delay-300", "animate-delay-400",
    "animate-delay-500", "animate-delay-600", "animate-delay-700",
  ]

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
                  <div className="space-y-2">
                    <Label>评分</Label>
                    <StarRating value={formRating} onChange={setFormRating} />
                  </div>

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

                  {/* Content + Emoji Picker */}
                  <div className="space-y-2">
                    <Label htmlFor="review-content">
                      评价内容
                      <span className="ml-2 text-xs font-normal text-muted-foreground">
                        {formContent.length}/200
                      </span>
                    </Label>
                    <Textarea
                      ref={textareaRef}
                      id="review-content"
                      placeholder="说说你的认养体验吧（5-200字）"
                      value={formContent}
                      onChange={(e) => setFormContent(e.target.value)}
                      maxLength={200}
                      className="min-h-24 resize-none"
                    />
                    <div className="flex items-center">
                      <EmojiPickerButton onEmojiSelect={handleEmojiInsert} />
                      <span className="ml-2 text-xs text-muted-foreground">点击插入表情</span>
                    </div>
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
          <>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {(expanded ? reviews : reviews.slice(0, INITIAL_SHOW)).map((r, idx) => (
                <ReviewCard
                  key={r.id}
                  review={r}
                  isNew={r.id === newReviewId}
                  className={`animate-fade-up ${DELAY_CLASSES[Math.min(idx, DELAY_CLASSES.length - 1)]}`}
                />
              ))}
            </div>

            {reviews.length > INITIAL_SHOW && (
              <div className="mt-8 flex justify-center">
                <Button
                  variant="outline"
                  className="rounded-full border-orange-200 px-8 text-[#FF6B00] hover:bg-orange-50 hover:text-[#FF6B00]"
                  onClick={() => setExpanded(!expanded)}
                >
                  {expanded ? (
                    <>
                      <ChevronUp className="mr-2 size-4" />
                      收起评价
                    </>
                  ) : (
                    <>
                      <ChevronDown className="mr-2 size-4" />
                      查看更多评价（共 {reviews.length} 条）
                    </>
                  )}
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  )
}

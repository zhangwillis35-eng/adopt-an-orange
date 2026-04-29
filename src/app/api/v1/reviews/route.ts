import { NextRequest, NextResponse } from "next/server"
import { connection } from "next/server"
import { z } from "zod"
import { auth } from "@/lib/auth"

const createReviewSchema = z.object({
  rating: z.number().int().min(1).max(5),
  content: z.string().min(5, "评价内容至少5个字符").max(200, "评价内容最多200个字符"),
  location: z.string().min(1, "请填写城市"),
  planName: z.string().min(1, "请选择套餐"),
})

export async function GET(request: NextRequest) {
  await connection()
  const { getReviews, getReviewCount, getAverageRating } = await import("@/services/review.service")

  const { searchParams } = request.nextUrl
  const limitParam = searchParams.get("limit")
  const limit = limitParam ? parseInt(limitParam, 10) : undefined

  const [reviews, total, averageRating] = await Promise.all([
    getReviews(limit),
    getReviewCount(),
    getAverageRating(),
  ])

  return NextResponse.json({ reviews, total, averageRating })
}

export async function POST(request: NextRequest) {
  const session = await auth()

  if (!session?.user?.id) {
    return NextResponse.json({ error: "请先登录后评价" }, { status: 401 })
  }

  try {
    const body = await request.json()
    const parsed = createReviewSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        { error: "参数校验失败", details: parsed.error.flatten().fieldErrors },
        { status: 400 }
      )
    }

    const { addReview } = await import("@/services/review.service")
    const review = await addReview({
      userId: session.user.id,
      userName: session.user.name || "匿名用户",
      location: parsed.data.location,
      rating: parsed.data.rating,
      content: parsed.data.content,
      planName: parsed.data.planName,
    })

    return NextResponse.json(review, { status: 201 })
  } catch {
    return NextResponse.json({ error: "请求格式错误" }, { status: 400 })
  }
}

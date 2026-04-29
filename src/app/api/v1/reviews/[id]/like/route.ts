import { NextRequest, NextResponse } from "next/server"
import { connection } from "next/server"
import { z } from "zod"

const bodySchema = z.object({
  visitorId: z.string().min(1),
})

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id: reviewId } = await params
  try {
    const body = await request.json()
    const parsed = bodySchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json({ error: "参数错误" }, { status: 400 })
    }
    const { toggleLike } = await import("@/services/review.service")
    const result = await toggleLike(reviewId, parsed.data.visitorId)
    return NextResponse.json(result)
  } catch (err) {
    const message = err instanceof Error ? err.message : "操作失败"
    return NextResponse.json({ error: message }, { status: 400 })
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  await connection()
  const { id: reviewId } = await params
  const visitorId = request.nextUrl.searchParams.get("visitorId") || ""

  const { getLikeCount, isLikedByVisitor } = await import("@/services/review.service")
  const [count, liked] = await Promise.all([
    getLikeCount(reviewId),
    visitorId ? isLikedByVisitor(reviewId, visitorId) : false,
  ])
  return NextResponse.json({ count, liked })
}

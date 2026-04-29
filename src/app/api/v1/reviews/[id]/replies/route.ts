import { NextRequest, NextResponse } from "next/server"
import { connection } from "next/server"
import { z } from "zod"
import { auth } from "@/lib/auth"

const replySchema = z.object({
  content: z.string().min(1, "回复不能为空").max(200, "回复最多200字"),
})

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  await connection()
  const { id: reviewId } = await params
  const { getReplies } = await import("@/services/review.service")
  const replies = await getReplies(reviewId)
  return NextResponse.json({ replies })
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: "请先登录" }, { status: 401 })
  }

  const { id: reviewId } = await params
  try {
    const body = await request.json()
    const parsed = replySchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json({ error: "参数校验失败" }, { status: 400 })
    }
    const { addReply } = await import("@/services/review.service")
    const reply = await addReply({
      reviewId,
      userId: session.user.id,
      userName: session.user.name || "匿名用户",
      content: parsed.data.content,
    })
    return NextResponse.json(reply, { status: 201 })
  } catch (err) {
    const message = err instanceof Error ? err.message : "操作失败"
    return NextResponse.json({ error: message }, { status: 400 })
  }
}

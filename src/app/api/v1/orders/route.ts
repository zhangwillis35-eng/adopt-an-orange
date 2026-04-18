import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { createOrderSchema } from "@/lib/validators"
import { createOrder } from "@/services/order.service"

export async function POST(request: NextRequest) {
  try {
    // 1. 验证身份
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "请先登录" },
        { status: 401 }
      )
    }

    // 2. 解析请求体
    const body = await request.json()

    // 3. Zod 校验
    const result = createOrderSchema.safeParse(body)
    if (!result.success) {
      return NextResponse.json(
        { error: "参数校验失败", details: result.error.flatten() },
        { status: 400 }
      )
    }

    // 4. 创建订单
    const order = await createOrder(result.data, session.user.id)

    // 5. 返回订单数据
    return NextResponse.json({
      success: true,
      data: {
        id: order.id,
        orderNo: order.orderNo,
        planName: order.plan.name,
        treeCode: order.tree.treeCode,
        treeVariety: order.tree.variety,
        orchardName: order.tree.orchardName,
        amount: order.amount,
        status: order.status,
        adoptionName: order.adoptionName,
        createdAt: order.createdAt,
      },
    })
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "创建订单失败"
    return NextResponse.json({ error: message }, { status: 500 })
  }
}

import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { getOrder, processPayment } from "@/services/order.service"

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

    // 2. 解析请求
    const { orderId } = await request.json()
    if (!orderId) {
      return NextResponse.json(
        { error: "缺少订单ID" },
        { status: 400 }
      )
    }

    // 3. 验证订单存在且属于当前用户
    const order = await getOrder(orderId)
    if (!order) {
      return NextResponse.json(
        { error: "订单不存在" },
        { status: 404 }
      )
    }
    if (order.userId !== session.user.id) {
      return NextResponse.json(
        { error: "无权操作该订单" },
        { status: 403 }
      )
    }

    // 4. 模拟支付处理
    const success = await processPayment(orderId)

    if (success) {
      return NextResponse.json({
        success: true,
        data: {
          orderId: order.id,
          orderNo: order.orderNo,
          amount: order.amount,
          paidAt: new Date().toISOString(),
          message: "支付成功",
        },
      })
    }

    return NextResponse.json(
      { error: "支付失败，请重试" },
      { status: 500 }
    )
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "支付处理失败"
    return NextResponse.json({ error: message }, { status: 500 })
  }
}

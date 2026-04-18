import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { getOrder, getAdoptionByOrder } from "@/services/order.service"

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "请先登录" },
        { status: 401 }
      )
    }

    const { id } = await params
    const order = await getOrder(id)

    if (!order) {
      return NextResponse.json(
        { error: "订单不存在" },
        { status: 404 }
      )
    }

    // 验证订单属于当前用户
    if (order.userId !== session.user.id) {
      return NextResponse.json(
        { error: "无权访问该订单" },
        { status: 403 }
      )
    }

    // 查找关联的认养记录
    const adoption = await getAdoptionByOrder(order.id)

    return NextResponse.json({
      success: true,
      data: {
        id: order.id,
        orderNo: order.orderNo,
        planName: order.plan.name,
        planPrice: order.plan.price,
        planDuration: order.plan.duration,
        planDeliveryCount: order.plan.deliveryCount,
        treeId: order.treeId,
        treeCode: order.tree.treeCode,
        treeVariety: order.tree.variety,
        orchardName: order.tree.orchardName,
        orchardLocation: order.tree.orchardLocation,
        adoptionName: order.adoptionName,
        amount: order.amount,
        status: order.status,
        address: order.address,
        createdAt: order.createdAt,
        paidAt: order.paidAt,
        adoption: adoption
          ? {
              id: adoption.id,
              certificateNo: adoption.certificateNo,
              status: adoption.status,
              startDate: adoption.startDate,
              endDate: adoption.endDate,
            }
          : null,
      },
    })
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "获取订单详情失败"
    return NextResponse.json({ error: message }, { status: 500 })
  }
}

import { mockPlans, mockTrees, type MockPlan, type MockTree } from "@/lib/mock-data"
import type { CreateOrderInput } from "@/lib/validators"

/* ── Types ── */

export interface MockOrder {
  id: string
  orderNo: string
  userId: string
  planId: string
  plan: MockPlan
  treeId: string
  tree: MockTree
  adoptionName?: string
  address: CreateOrderInput["address"]
  amount: number
  status: "PENDING" | "PAID" | "CANCELLED"
  createdAt: string
  paidAt?: string
}

export interface MockAdoption {
  id: string
  userId: string
  orderId: string
  treeId: string
  tree: MockTree
  plan: MockPlan
  adoptionName?: string
  certificateNo: string
  status: "ACTIVE" | "COMPLETED" | "CANCELLED"
  startDate: string
  endDate: string
  createdAt: string
}

/* ── In-memory stores ── */

const orders: Map<string, MockOrder> = new Map()
const adoptions: Map<string, MockAdoption> = new Map()

/* ── Helpers ── */

export function generateOrderNo(): string {
  const date = new Date().toISOString().slice(0, 10).replace(/-/g, "")
  const random = Math.floor(Math.random() * 10000)
    .toString()
    .padStart(4, "0")
  return `ADO${date}${random}`
}

function generateCertificateNo(): string {
  const date = new Date().toISOString().slice(0, 10).replace(/-/g, "")
  const random = Math.floor(Math.random() * 100000)
    .toString()
    .padStart(5, "0")
  return `CERT${date}${random}`
}

function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`
}

/* ── Service functions ── */

export async function createOrder(
  data: CreateOrderInput,
  userId: string
): Promise<MockOrder> {
  // 1. 验证套餐存在
  const plan = mockPlans.find((p) => p.id === data.planId)
  if (!plan) {
    throw new Error("套餐不存在")
  }
  if (!plan.isActive) {
    throw new Error("该套餐已下架")
  }

  // 2. 查找或随机分配橙树
  let tree: MockTree | undefined
  if (data.treeId) {
    tree = mockTrees.find((t) => t.id === data.treeId)
    if (!tree) {
      throw new Error("橙树不存在")
    }
    if (tree.status !== "AVAILABLE") {
      throw new Error("该橙树已被认养或不可选")
    }
  } else {
    // 随机分配一棵可用的橙树
    const availableTrees = mockTrees.filter((t) => t.status === "AVAILABLE")
    if (availableTrees.length === 0) {
      throw new Error("暂无可认养的橙树")
    }
    tree = availableTrees[Math.floor(Math.random() * availableTrees.length)]
  }

  // 3. 生成订单号
  const orderNo = generateOrderNo()
  const orderId = generateId()

  // 4. 创建订单
  const order: MockOrder = {
    id: orderId,
    orderNo,
    userId,
    planId: plan.id,
    plan,
    treeId: tree.id,
    tree,
    adoptionName: data.adoptionName,
    address: data.address,
    amount: plan.price,
    status: "PENDING",
    createdAt: new Date().toISOString(),
  }

  orders.set(orderId, order)

  // 5. 返回订单
  return order
}

export async function getOrder(orderId: string): Promise<MockOrder | null> {
  return orders.get(orderId) ?? null
}

export async function getOrdersByUser(userId: string): Promise<MockOrder[]> {
  return Array.from(orders.values()).filter((o) => o.userId === userId)
}

export async function processPayment(orderId: string): Promise<boolean> {
  const order = orders.get(orderId)
  if (!order) {
    throw new Error("订单不存在")
  }
  if (order.status !== "PENDING") {
    throw new Error("订单状态异常，无法支付")
  }

  // 模拟支付延迟 (300-800ms)
  await new Promise((resolve) =>
    setTimeout(resolve, 300 + Math.random() * 500)
  )

  // 1. 更新订单状态 PENDING -> PAID
  order.status = "PAID"
  order.paidAt = new Date().toISOString()

  // 2. 创建 Adoption 记录
  const now = new Date()
  const endDate = new Date(now)
  endDate.setMonth(endDate.getMonth() + order.plan.duration)

  const adoption: MockAdoption = {
    id: generateId(),
    userId: order.userId,
    orderId: order.id,
    treeId: order.treeId,
    tree: order.tree,
    plan: order.plan,
    adoptionName: order.adoptionName,
    certificateNo: generateCertificateNo(),
    status: "ACTIVE",
    startDate: now.toISOString(),
    endDate: endDate.toISOString(),
    createdAt: now.toISOString(),
  }

  adoptions.set(adoption.id, adoption)

  // 3. 更新橙树状态为 ADOPTED（修改 mock 数据中的引用）
  const treeIndex = mockTrees.findIndex((t) => t.id === order.treeId)
  if (treeIndex !== -1) {
    ;(mockTrees[treeIndex] as { status: string }).status = "ADOPTED"
  }

  // 4. 返回成功
  return true
}

export async function getAdoptionByOrder(
  orderId: string
): Promise<MockAdoption | null> {
  return (
    Array.from(adoptions.values()).find((a) => a.orderId === orderId) ?? null
  )
}

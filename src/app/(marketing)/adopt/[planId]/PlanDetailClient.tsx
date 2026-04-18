"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import {
  ArrowLeft,
  Check,
  Clock,
  Truck,
  Scale,
  Shield,
  MapPin,
  Citrus,
  PenLine,
  Home,
  Phone,
  User,
  Loader2,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { TreeSelector } from "@/components/adopt/TreeSelector"
import type { MockPlan, MockTree } from "@/lib/mock-data"

/* ── tier colors ── */

const tierGradient: Record<string, string> = {
  尝鲜套餐: "from-orange-300 via-orange-200 to-amber-100",
  家庭套餐: "from-orange-500 via-orange-400 to-amber-300",
  豪华套餐: "from-amber-600 via-orange-500 to-yellow-400",
}

interface PlanDetailClientProps {
  plan: MockPlan
  trees: MockTree[]
}

export function PlanDetailClient({ plan, trees }: PlanDetailClientProps) {
  const router = useRouter()
  const [selectedTreeId, setSelectedTreeId] = useState<string | null>(null)
  const [adoptName, setAdoptName] = useState("")
  const [receiverName, setReceiverName] = useState("")
  const [receiverPhone, setReceiverPhone] = useState("")
  const [receiverAddress, setReceiverAddress] = useState("")

  // Order & payment state
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [orderError, setOrderError] = useState("")
  const [showPayDialog, setShowPayDialog] = useState(false)
  const [isPaying, setIsPaying] = useState(false)
  const [createdOrder, setCreatedOrder] = useState<{
    id: string
    orderNo: string
    amount: number
    treeCode: string
    planName: string
  } | null>(null)

  const gradient = tierGradient[plan.name] ?? "from-orange-400 to-amber-200"
  const selectedTree = trees.find((t) => t.id === selectedTreeId)

  /* ── 创建订单 ── */
  async function handleCreateOrder() {
    setOrderError("")

    // 前端基础校验
    if (!receiverName || receiverName.length < 2) {
      setOrderError("请输入收货人姓名（至少2个字）")
      return
    }
    if (!/^1[3-9]\d{9}$/.test(receiverPhone)) {
      setOrderError("请输入正确的手机号")
      return
    }
    if (!receiverAddress || receiverAddress.length < 5) {
      setOrderError("请输入详细收货地址（至少5个字）")
      return
    }

    setIsSubmitting(true)
    try {
      const res = await fetch("/api/v1/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          planId: plan.id,
          treeId: selectedTreeId ?? undefined,
          adoptionName: adoptName || undefined,
          address: {
            contactName: receiverName,
            phone: receiverPhone,
            province: "自动识别",
            city: "自动识别",
            district: "自动识别",
            detail: receiverAddress,
          },
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        setOrderError(data.error || "创建订单失败，请重试")
        return
      }

      setCreatedOrder(data.data)
      setShowPayDialog(true)
    } catch {
      setOrderError("网络错误，请重试")
    } finally {
      setIsSubmitting(false)
    }
  }

  /* ── 确认支付 ── */
  async function handlePayment() {
    if (!createdOrder) return
    setIsPaying(true)
    try {
      const res = await fetch("/api/v1/payment/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId: createdOrder.id }),
      })

      const data = await res.json()

      if (!res.ok) {
        setOrderError(data.error || "支付失败，请重试")
        setShowPayDialog(false)
        return
      }

      // 支付成功，跳转到成功页
      router.push(
        `/payment/success?orderId=${createdOrder.id}&orderNo=${createdOrder.orderNo}`
      )
    } catch {
      setOrderError("支付过程中网络错误，请重试")
      setShowPayDialog(false)
    } finally {
      setIsPaying(false)
    }
  }

  return (
    <div className="flex flex-col">
      {/* ─── Header bar ─── */}
      <div className="border-b bg-card/80 px-4 py-3 backdrop-blur-sm">
        <div className="mx-auto flex max-w-6xl items-center gap-3">
          <Link
            href="/adopt"
            className="flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="size-4" />
            返回套餐列表
          </Link>
        </div>
      </div>

      <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:py-12">
        <div className="grid gap-8 lg:grid-cols-5">
          {/* ─── Left: Plan Details (3 cols) ─── */}
          <div className="space-y-6 lg:col-span-3">
            {/* plan hero card */}
            <Card className="overflow-hidden border-0 shadow-lg">
              <div
                className={cn(
                  "bg-gradient-to-br px-6 pb-8 pt-10",
                  gradient
                )}
              >
                <div className="flex items-center gap-2 text-gray-700/60">
                  <Citrus className="size-4" />
                  <span className="text-xs font-medium uppercase tracking-wide">
                    认养套餐
                  </span>
                </div>
                <h1 className="mt-2 text-3xl font-bold text-gray-900">
                  {plan.name}
                </h1>
                <div className="mt-3 flex items-baseline gap-1">
                  <span className="text-lg font-semibold text-gray-700">
                    ¥
                  </span>
                  <span className="text-5xl font-extrabold tracking-tight text-gray-900">
                    {plan.price}
                  </span>
                  <span className="text-base text-gray-600">/年</span>
                </div>
              </div>

              <CardContent className="space-y-6 px-6 pt-6">
                {/* description */}
                <p className="leading-relaxed text-muted-foreground">
                  {plan.description}
                </p>

                {/* key metrics */}
                <div className="grid grid-cols-3 gap-4">
                  {[
                    {
                      icon: Clock,
                      label: "认养周期",
                      value: `${plan.duration}个月`,
                    },
                    {
                      icon: Truck,
                      label: "发货次数",
                      value: `${plan.deliveryCount}次`,
                    },
                    {
                      icon: Scale,
                      label: "预估收获",
                      value: `${plan.estimatedWeight}斤`,
                    },
                  ].map((m) => (
                    <div
                      key={m.label}
                      className="flex flex-col items-center gap-1.5 rounded-xl bg-accent/50 px-3 py-4"
                    >
                      <m.icon className="size-5 text-primary" />
                      <span className="text-xs text-muted-foreground">
                        {m.label}
                      </span>
                      <span className="text-sm font-bold">{m.value}</span>
                    </div>
                  ))}
                </div>

                {/* features */}
                <div>
                  <h3 className="mb-3 flex items-center gap-2 font-semibold">
                    <Shield className="size-4 text-primary" />
                    套餐权益
                  </h3>
                  <ul className="grid gap-2 sm:grid-cols-2">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm">
                        <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                        <span className="text-muted-foreground">{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* orchard info */}
                <div className="rounded-xl bg-gradient-to-br from-green-50 to-emerald-50 p-4 dark:from-green-950/30 dark:to-emerald-950/30">
                  <h3 className="mb-2 flex items-center gap-2 text-sm font-semibold">
                    <MapPin className="size-4 text-secondary" />
                    果园信息
                  </h3>
                  <div className="grid gap-2 text-sm text-muted-foreground sm:grid-cols-2">
                    <p>阳光果园 · 江西赣州信丰县</p>
                    <p>翠谷果园 · 江西赣州安远县</p>
                  </div>
                  <p className="mt-2 text-xs text-muted-foreground">
                    赣南脐橙核心产区，年均日照1800+小时，得天独厚的气候条件
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* ─── Right: Configuration (2 cols) ─── */}
          <div className="space-y-6 lg:col-span-2">
            {/* tree selector */}
            <Card className="border-0 shadow-md">
              <CardContent className="p-6">
                <TreeSelector
                  trees={trees}
                  selectedTreeId={selectedTreeId}
                  onSelect={setSelectedTreeId}
                />
              </CardContent>
            </Card>

            {/* adopt name */}
            <Card className="border-0 shadow-md">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-base">
                  <PenLine className="size-4 text-primary" />
                  给橙树起个名字
                </CardTitle>
              </CardHeader>
              <CardContent className="px-6 pb-6">
                <Input
                  placeholder="例如：甜心小橙、阳光宝贝…"
                  value={adoptName}
                  onChange={(e) => setAdoptName(e.target.value)}
                  className="h-10"
                />
                <p className="mt-2 text-xs text-muted-foreground">
                  可选。名字将出现在你的认养证书上
                </p>
              </CardContent>
            </Card>

            {/* shipping address */}
            <Card className="border-0 shadow-md">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-base">
                  <Home className="size-4 text-primary" />
                  收货信息
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 px-6 pb-6">
                <div className="flex gap-3">
                  <div className="flex-1">
                    <label className="mb-1 flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                      <User className="size-3" />
                      收货人
                    </label>
                    <Input
                      placeholder="姓名"
                      value={receiverName}
                      onChange={(e) => setReceiverName(e.target.value)}
                      className="h-10"
                    />
                  </div>
                  <div className="flex-1">
                    <label className="mb-1 flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                      <Phone className="size-3" />
                      联系电话
                    </label>
                    <Input
                      placeholder="手机号"
                      value={receiverPhone}
                      onChange={(e) => setReceiverPhone(e.target.value)}
                      className="h-10"
                    />
                  </div>
                </div>
                <div>
                  <label className="mb-1 flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                    <MapPin className="size-3" />
                    收货地址
                  </label>
                  <Input
                    placeholder="请输入详细收货地址"
                    value={receiverAddress}
                    onChange={(e) => setReceiverAddress(e.target.value)}
                    className="h-10"
                  />
                </div>
              </CardContent>
            </Card>

            {/* price summary & CTA */}
            <Card className="border-0 bg-gradient-to-br from-orange-50 to-amber-50 shadow-md dark:from-orange-950/20 dark:to-amber-950/20">
              <CardContent className="space-y-4 p-6">
                <h3 className="font-semibold">价格汇总</h3>

                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">{plan.name}</span>
                    <span>¥{plan.price}</span>
                  </div>
                  {selectedTree && (
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">
                        橙树：{selectedTree.treeCode}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        已选
                      </span>
                    </div>
                  )}
                  <div className="border-t pt-2" />
                  <div className="flex items-center justify-between text-base font-bold">
                    <span>合计</span>
                    <span className="text-xl text-primary">
                      ¥{plan.price}
                    </span>
                  </div>
                </div>

                {orderError && (
                  <p className="rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive">
                    {orderError}
                  </p>
                )}

                <Button
                  className="h-12 w-full rounded-full bg-primary text-base font-bold text-primary-foreground shadow-lg transition-all hover:bg-primary/90 hover:shadow-xl"
                  onClick={handleCreateOrder}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 size-4 animate-spin" />
                      提交中...
                    </>
                  ) : (
                    "确认认养"
                  )}
                </Button>

                <p className="text-center text-xs text-muted-foreground">
                  确认后将进入支付流程，支持微信/支付宝
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* ─── Payment Confirmation Dialog ─── */}
      <Dialog open={showPayDialog} onOpenChange={setShowPayDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center text-lg">
              确认支付
            </DialogTitle>
            <DialogDescription className="text-center">
              请确认以下订单信息并完成支付
            </DialogDescription>
          </DialogHeader>

          {createdOrder && (
            <div className="space-y-4 py-4">
              <div className="rounded-xl bg-orange-50 p-4 dark:bg-orange-950/20">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">订单号</span>
                    <span className="font-mono font-medium">
                      {createdOrder.orderNo}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">套餐</span>
                    <span className="font-medium">{createdOrder.planName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">橙树编号</span>
                    <span className="font-medium">
                      {createdOrder.treeCode}
                    </span>
                  </div>
                  <div className="border-t pt-2" />
                  <div className="flex justify-between text-base font-bold">
                    <span>支付金额</span>
                    <span className="text-primary">
                      ¥{createdOrder.amount}
                    </span>
                  </div>
                </div>
              </div>

              <p className="text-center text-xs text-muted-foreground">
                本次为模拟支付，点击即完成支付
              </p>
            </div>
          )}

          <DialogFooter className="flex gap-3 sm:gap-3">
            <Button
              variant="outline"
              onClick={() => setShowPayDialog(false)}
              disabled={isPaying}
              className="flex-1"
            >
              取消
            </Button>
            <Button
              onClick={handlePayment}
              disabled={isPaying}
              className="flex-1 bg-primary font-bold"
            >
              {isPaying ? (
                <>
                  <Loader2 className="mr-2 size-4 animate-spin" />
                  支付中...
                </>
              ) : (
                "确认支付"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

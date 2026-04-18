"use client"

import { Suspense, useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { OrangeMascot } from "@/components/mascot"
import {
  TreePine,
  MapPin,
  Calendar,
  Hash,
  Truck,
  ArrowRight,
  Home,
} from "lucide-react"

interface OrderDetail {
  orderNo: string
  planName: string
  treeCode: string
  treeVariety: string
  orchardName: string
  orchardLocation: string
  adoptionName?: string
  amount: number
  planDuration: number
  planDeliveryCount: number
  adoption?: {
    certificateNo: string
    startDate: string
    endDate: string
  } | null
}

function PaymentSuccessContent() {
  const searchParams = useSearchParams()
  const orderId = searchParams.get("orderId")
  const orderNo = searchParams.get("orderNo")

  const [order, setOrder] = useState<OrderDetail | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!orderId) {
      setLoading(false)
      return
    }

    fetch(`/api/v1/orders/${orderId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setOrder(data.data)
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [orderId])

  return (
    <div className="relative flex min-h-[80vh] flex-col items-center justify-center overflow-hidden px-4 py-12">
      {/* ── Confetti / celebration effect ── */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {Array.from({ length: 40 }).map((_, i) => (
          <span
            key={i}
            className="confetti-piece absolute"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2.5 + Math.random() * 2}s`,
              backgroundColor: [
                "#FF8C00",
                "#FFA500",
                "#FFD700",
                "#FF6347",
                "#4CAF50",
                "#FF69B4",
                "#87CEEB",
                "#DDA0DD",
              ][i % 8],
              width: `${6 + Math.random() * 6}px`,
              height: `${6 + Math.random() * 6}px`,
              borderRadius: Math.random() > 0.5 ? "50%" : "2px",
            }}
          />
        ))}
      </div>

      {/* ── Main content ── */}
      <div className="relative z-10 flex w-full max-w-lg flex-col items-center gap-6">
        {/* Mascot */}
        <OrangeMascot expression="happy" animation="bounce" withCape size="xl" />

        {/* Title */}
        <div className="text-center">
          <h1 className="bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500 bg-clip-text text-4xl font-extrabold text-transparent sm:text-5xl">
            认养成功！
          </h1>
          <p className="mt-2 text-lg text-muted-foreground">
            恭喜你，一棵属于你的橙树已经在阳光下等你啦
          </p>
        </div>

        {/* Order info card */}
        {loading ? (
          <Card className="w-full border-0 shadow-lg">
            <CardContent className="flex items-center justify-center py-12">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
            </CardContent>
          </Card>
        ) : order ? (
          <Card className="w-full border-0 shadow-lg">
            <CardContent className="space-y-4 p-6">
              {/* Order number */}
              <div className="rounded-xl bg-gradient-to-r from-orange-50 to-amber-50 p-4 dark:from-orange-950/20 dark:to-amber-950/20">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Hash className="size-4" />
                  <span>订单号</span>
                </div>
                <p className="mt-1 font-mono text-lg font-bold">
                  {order.orderNo}
                </p>
              </div>

              {/* Tree info */}
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="flex items-start gap-3 rounded-xl bg-green-50 p-3 dark:bg-green-950/20">
                  <TreePine className="mt-0.5 size-5 text-green-600" />
                  <div>
                    <p className="text-xs text-muted-foreground">认养橙树</p>
                    <p className="font-semibold">{order.treeCode}</p>
                    <p className="text-xs text-muted-foreground">
                      {order.treeVariety}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 rounded-xl bg-blue-50 p-3 dark:bg-blue-950/20">
                  <MapPin className="mt-0.5 size-5 text-blue-600" />
                  <div>
                    <p className="text-xs text-muted-foreground">所在果园</p>
                    <p className="font-semibold">{order.orchardName}</p>
                    <p className="text-xs text-muted-foreground">
                      {order.orchardLocation}
                    </p>
                  </div>
                </div>
              </div>

              {/* Plan & adoption details */}
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">认养套餐</span>
                  <span className="font-medium">{order.planName}</span>
                </div>
                {order.adoptionName && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">橙树昵称</span>
                    <span className="font-medium">{order.adoptionName}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-muted-foreground">认养周期</span>
                  <span className="font-medium">{order.planDuration}个月</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">配送次数</span>
                  <span className="font-medium">
                    {order.planDeliveryCount}次
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">支付金额</span>
                  <span className="font-bold text-primary">
                    ¥{order.amount}
                  </span>
                </div>
              </div>

              {/* Certificate info */}
              {order.adoption && (
                <div className="rounded-xl border-2 border-dashed border-orange-300 bg-orange-50/50 p-4 dark:border-orange-800 dark:bg-orange-950/10">
                  <div className="flex items-center gap-2 text-sm font-semibold text-orange-700 dark:text-orange-400">
                    <Calendar className="size-4" />
                    认养证书
                  </div>
                  <div className="mt-2 space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">证书编号</span>
                      <span className="font-mono font-medium">
                        {order.adoption.certificateNo}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">生效日期</span>
                      <span>
                        {new Date(
                          order.adoption.startDate
                        ).toLocaleDateString("zh-CN")}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">到期日期</span>
                      <span>
                        {new Date(
                          order.adoption.endDate
                        ).toLocaleDateString("zh-CN")}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ) : (
          <Card className="w-full border-0 shadow-lg">
            <CardContent className="p-6 text-center">
              <p className="font-mono text-lg font-bold">
                {orderNo || "---"}
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                订单已创建，详情请在个人中心查看
              </p>
            </CardContent>
          </Card>
        )}

        {/* Action buttons */}
        <div className="flex w-full gap-4">
          <Link href="/" className="flex-1">
            <Button variant="outline" className="h-12 w-full">
              <Home className="mr-2 size-4" />
              返回首页
            </Button>
          </Link>
          <Link href="/user/adoptions" className="flex-1">
            <Button className="h-12 w-full font-bold">
              查看我的认养
              <ArrowRight className="ml-2 size-4" />
            </Button>
          </Link>
        </div>

        {/* Extra info */}
        <div className="flex items-center gap-2 rounded-xl bg-accent/50 px-4 py-3 text-sm text-muted-foreground">
          <Truck className="size-4 shrink-0" />
          <span>
            橙子成熟后将按套餐约定次数配送到家，请保持收货信息畅通
          </span>
        </div>
      </div>

      {/* ── Celebration CSS ── */}
      <style jsx>{`
        @keyframes confetti-fall {
          0% {
            transform: translateY(-100vh) rotate(0deg);
            opacity: 1;
          }
          70% {
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
          }
        }
        .confetti-piece {
          animation: confetti-fall 4s ease-in-out infinite;
          top: -20px;
        }
      `}</style>
    </div>
  )
}

export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-screen"><div className="animate-spin h-8 w-8 border-4 border-orange-500 border-t-transparent rounded-full" /></div>}>
      <PaymentSuccessContent />
    </Suspense>
  )
}

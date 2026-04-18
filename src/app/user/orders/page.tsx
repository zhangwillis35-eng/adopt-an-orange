import { ShoppingBag, Calendar } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MascotEmpty } from "@/components/mascot"

const mockOrders = [
  {
    id: "ORD-20251115001",
    planName: "家庭套餐",
    amount: 599,
    status: "已完成" as const,
    date: "2025-11-15",
    treeName: "阳光一号 (GN-A003)",
  },
  {
    id: "ORD-20241001002",
    planName: "豪华套餐",
    amount: 999,
    status: "已完成" as const,
    date: "2024-10-01",
    treeName: "翠谷之星 (GN-B003)",
  },
  {
    id: "ORD-20260401003",
    planName: "尝鲜套餐",
    amount: 299,
    status: "待支付" as const,
    date: "2026-04-01",
    treeName: "阳光二号 (GN-A002)",
  },
]

const statusStyleMap: Record<string, string> = {
  已完成: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  待支付: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
  已取消: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
  配送中: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
}

export default function OrdersPage() {
  if (mockOrders.length === 0) {
    return (
      <div>
        <h1 className="mb-6 font-heading text-xl font-semibold">我的订单</h1>
        <Card>
          <CardContent>
            <MascotEmpty message="还没有订单哦" />
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div>
      <h1 className="mb-6 font-heading text-xl font-semibold">我的订单</h1>

      <div className="grid gap-4">
        {mockOrders.map((order) => (
          <Card key={order.id}>
            <CardHeader>
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-lg bg-gradient-to-br from-orange-400 to-orange-600">
                    <ShoppingBag className="size-5 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-base">{order.planName}</CardTitle>
                    <p className="mt-0.5 text-sm text-muted-foreground">
                      {order.treeName}
                    </p>
                  </div>
                </div>
                <Badge className={statusStyleMap[order.status] || ""}>
                  {order.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                  <Calendar className="size-3.5" />
                  {order.date}
                </span>
                <div className="flex items-baseline gap-1">
                  <span className="text-xs text-muted-foreground">订单号：</span>
                  <span className="font-mono text-xs text-muted-foreground">
                    {order.id}
                  </span>
                </div>
              </div>
              <div className="mt-3 flex items-baseline justify-end">
                <span className="text-sm text-muted-foreground">合计：</span>
                <span className="ml-1 text-lg font-bold text-primary">
                  ¥{order.amount}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

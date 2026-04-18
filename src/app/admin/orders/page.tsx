"use client"

import * as React from "react"
import {
  Search,
  MoreHorizontal,
  Eye,
  Truck,
  RotateCcw,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface Order {
  id: string
  orderNo: string
  user: string
  plan: string
  amount: number
  status: "pending" | "paid" | "shipped" | "completed" | "refunded" | "cancelled"
  payMethod: string
  date: string
  treeCode: string
  address: string
  paymentTime: string
}

const statusMap: Record<
  string,
  { label: string; className: string }
> = {
  pending: { label: "待支付", className: "bg-yellow-100 text-yellow-700 border-yellow-200" },
  paid: { label: "已支付", className: "bg-blue-100 text-blue-700 border-blue-200" },
  shipped: { label: "已发货", className: "bg-purple-100 text-purple-700 border-purple-200" },
  completed: { label: "已完成", className: "bg-green-100 text-green-700 border-green-200" },
  refunded: { label: "已退款", className: "bg-red-100 text-red-700 border-red-200" },
  cancelled: { label: "已取消", className: "bg-gray-100 text-gray-600 border-gray-200" },
}

const initialOrders: Order[] = [
  { id: "1", orderNo: "ORD20250301001", user: "张三丰", plan: "家庭装", amount: 699, status: "completed", payMethod: "微信支付", date: "2025-03-01", treeCode: "QC-002", address: "北京市朝阳区xxx路1号", paymentTime: "2025-03-01 10:32:15" },
  { id: "2", orderNo: "ORD20250315002", user: "李小龙", plan: "尝鲜装", amount: 299, status: "paid", payMethod: "支付宝", date: "2025-03-15", treeCode: "QC-009", address: "上海市浦东新区xxx路2号", paymentTime: "2025-03-15 14:20:00" },
  { id: "3", orderNo: "ORD20250320003", user: "赵薇薇", plan: "豪华装", amount: 1299, status: "shipped", payMethod: "微信支付", date: "2025-03-20", treeCode: "QC-004", address: "广州市天河区xxx路3号", paymentTime: "2025-03-20 09:15:30" },
  { id: "4", orderNo: "ORD20250401004", user: "王小明", plan: "家庭装", amount: 699, status: "pending", payMethod: "-", date: "2025-04-01", treeCode: "-", address: "深圳市南山区xxx路4号", paymentTime: "-" },
  { id: "5", orderNo: "ORD20250405005", user: "周杰伦", plan: "尝鲜装", amount: 299, status: "refunded", payMethod: "支付宝", date: "2025-04-05", treeCode: "QC-012", address: "杭州市西湖区xxx路5号", paymentTime: "2025-04-05 16:45:00" },
  { id: "6", orderNo: "ORD20250410006", user: "张三丰", plan: "豪华装", amount: 1299, status: "paid", payMethod: "微信支付", date: "2025-04-10", treeCode: "QC-007", address: "北京市海淀区xxx路6号", paymentTime: "2025-04-10 11:00:00" },
  { id: "7", orderNo: "ORD20250412007", user: "赵薇薇", plan: "家庭装", amount: 699, status: "completed", payMethod: "微信支付", date: "2025-04-12", treeCode: "QC-010", address: "广州市番禺区xxx路7号", paymentTime: "2025-04-12 08:30:00" },
  { id: "8", orderNo: "ORD20250413008", user: "刘德华", plan: "尝鲜装", amount: 299, status: "cancelled", payMethod: "-", date: "2025-04-13", treeCode: "-", address: "成都市武侯区xxx路8号", paymentTime: "-" },
  { id: "9", orderNo: "ORD20250414009", user: "孙悟空", plan: "家庭装", amount: 699, status: "pending", payMethod: "-", date: "2025-04-14", treeCode: "-", address: "重庆市渝北区xxx路9号", paymentTime: "-" },
  { id: "10", orderNo: "ORD20250415010", user: "周杰伦", plan: "豪华装", amount: 1299, status: "paid", payMethod: "支付宝", date: "2025-04-15", treeCode: "QC-015", address: "杭州市滨江区xxx路10号", paymentTime: "2025-04-15 13:22:00" },
]

export default function OrdersPage() {
  const [orders, setOrders] = React.useState<Order[]>(initialOrders)
  const [search, setSearch] = React.useState("")
  const [statusFilter, setStatusFilter] = React.useState<string>("all")
  const [dateFrom, setDateFrom] = React.useState("")
  const [dateTo, setDateTo] = React.useState("")
  const [detailOrder, setDetailOrder] = React.useState<Order | null>(null)
  const [refundOrder, setRefundOrder] = React.useState<Order | null>(null)

  const filtered = orders.filter((o) => {
    const matchSearch =
      o.orderNo.toLowerCase().includes(search.toLowerCase()) ||
      o.user.includes(search)
    const matchStatus = statusFilter === "all" || o.status === statusFilter
    const matchDateFrom = !dateFrom || o.date >= dateFrom
    const matchDateTo = !dateTo || o.date <= dateTo
    return matchSearch && matchStatus && matchDateFrom && matchDateTo
  })

  function handleShip(id: string) {
    setOrders((prev) =>
      prev.map((o) => (o.id === id ? { ...o, status: "shipped" as const } : o))
    )
  }

  function handleRefund() {
    if (!refundOrder) return
    setOrders((prev) =>
      prev.map((o) =>
        o.id === refundOrder.id ? { ...o, status: "refunded" as const } : o
      )
    )
    setRefundOrder(null)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">订单管理</h1>
        <p className="text-sm text-muted-foreground">管理所有认养订单</p>
      </div>

      <Card className="p-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:flex-wrap mb-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="搜索订单号或用户..."
              className="pl-8"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <Select value={statusFilter} onValueChange={(v) => v && setStatusFilter(v)}>
            <SelectTrigger className="w-[130px]">
              <SelectValue placeholder="状态筛选" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">全部状态</SelectItem>
              <SelectItem value="pending">待支付</SelectItem>
              <SelectItem value="paid">已支付</SelectItem>
              <SelectItem value="shipped">已发货</SelectItem>
              <SelectItem value="completed">已完成</SelectItem>
              <SelectItem value="refunded">已退款</SelectItem>
              <SelectItem value="cancelled">已取消</SelectItem>
            </SelectContent>
          </Select>
          <div className="flex items-center gap-2">
            <Input
              type="date"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
              className="w-[140px]"
            />
            <span className="text-muted-foreground text-sm">至</span>
            <Input
              type="date"
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
              className="w-[140px]"
            />
          </div>
          <p className="text-sm text-muted-foreground ml-auto">
            共 {filtered.length} 条
          </p>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>订单号</TableHead>
              <TableHead>用户</TableHead>
              <TableHead>套餐</TableHead>
              <TableHead>金额</TableHead>
              <TableHead>状态</TableHead>
              <TableHead>支付方式</TableHead>
              <TableHead>日期</TableHead>
              <TableHead className="text-right">操作</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((order, idx) => (
              <TableRow key={order.id} className={idx % 2 === 0 ? "bg-muted/30" : ""}>
                <TableCell className="font-mono text-xs">
                  {order.orderNo}
                </TableCell>
                <TableCell>{order.user}</TableCell>
                <TableCell>{order.plan}</TableCell>
                <TableCell className="font-medium">¥{order.amount}</TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={statusMap[order.status].className}
                  >
                    {statusMap[order.status].label}
                  </Badge>
                </TableCell>
                <TableCell>{order.payMethod}</TableCell>
                <TableCell>{order.date}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger
                      render={<Button variant="ghost" size="icon-sm" />}
                    >
                      <MoreHorizontal className="size-4" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => setDetailOrder(order)}>
                        <Eye className="size-4" />
                        查看详情
                      </DropdownMenuItem>
                      {order.status === "paid" && (
                        <DropdownMenuItem onClick={() => handleShip(order.id)}>
                          <Truck className="size-4" />
                          确认发货
                        </DropdownMenuItem>
                      )}
                      {(order.status === "paid" || order.status === "shipped") && (
                        <>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            variant="destructive"
                            onClick={() => setRefundOrder(order)}
                          >
                            <RotateCcw className="size-4" />
                            退款
                          </DropdownMenuItem>
                        </>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      {/* Detail Dialog */}
      <Dialog
        open={!!detailOrder}
        onOpenChange={(open) => !open && setDetailOrder(null)}
      >
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>订单详情</DialogTitle>
            <DialogDescription>订单号：{detailOrder?.orderNo}</DialogDescription>
          </DialogHeader>
          {detailOrder && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <p className="text-muted-foreground">用户</p>
                  <p className="font-medium">{detailOrder.user}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">套餐</p>
                  <p className="font-medium">{detailOrder.plan}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">金额</p>
                  <p className="font-medium">¥{detailOrder.amount}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">状态</p>
                  <Badge
                    variant="outline"
                    className={statusMap[detailOrder.status].className}
                  >
                    {statusMap[detailOrder.status].label}
                  </Badge>
                </div>
              </div>
              <div className="border-t pt-3 space-y-3 text-sm">
                <h4 className="font-medium">认养信息</h4>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <p className="text-muted-foreground">认养橙树</p>
                    <p className="font-medium">{detailOrder.treeCode}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">下单日期</p>
                    <p className="font-medium">{detailOrder.date}</p>
                  </div>
                </div>
              </div>
              <div className="border-t pt-3 space-y-3 text-sm">
                <h4 className="font-medium">收货地址</h4>
                <p>{detailOrder.address}</p>
              </div>
              <div className="border-t pt-3 space-y-3 text-sm">
                <h4 className="font-medium">支付记录</h4>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <p className="text-muted-foreground">支付方式</p>
                    <p className="font-medium">{detailOrder.payMethod}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">支付时间</p>
                    <p className="font-medium">{detailOrder.paymentTime}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
          <DialogFooter showCloseButton />
        </DialogContent>
      </Dialog>

      {/* Refund Confirm Dialog */}
      <Dialog
        open={!!refundOrder}
        onOpenChange={(open) => !open && setRefundOrder(null)}
      >
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>确认退款</DialogTitle>
            <DialogDescription>
              确定要对订单 {refundOrder?.orderNo} 进行退款吗？退款金额：¥
              {refundOrder?.amount}。此操作不可撤销。
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setRefundOrder(null)}>
              取消
            </Button>
            <Button variant="destructive" onClick={handleRefund}>
              确认退款
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

"use client"

import React from "react"
import Link from "next/link"
import {
  TreePine,
  DollarSign,
  Users,
  Truck,
  TrendingUp,
  ArrowUpRight,
  Plus,
} from "lucide-react"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardAction,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

/* ── Mock Data ── */

const stats = [
  {
    label: "总认养数",
    value: "128",
    change: "+12%",
    changeLabel: "较上月",
    icon: TreePine,
    iconBg: "bg-emerald-500/10",
    iconColor: "text-emerald-600",
  },
  {
    label: "总收入",
    value: "\uFFE576,800",
    change: "+8%",
    changeLabel: "较上月",
    icon: DollarSign,
    iconBg: "bg-orange-500/10",
    iconColor: "text-orange-600",
  },
  {
    label: "活跃用户",
    value: "1,024",
    change: "+15%",
    changeLabel: "较上月",
    icon: Users,
    iconBg: "bg-blue-500/10",
    iconColor: "text-blue-600",
  },
  {
    label: "待发货",
    value: "12",
    change: "",
    changeLabel: "需处理",
    icon: Truck,
    iconBg: "bg-amber-500/10",
    iconColor: "text-amber-600",
  },
]

const monthlyData = [
  { month: "1月", value: 8 },
  { month: "2月", value: 6 },
  { month: "3月", value: 10 },
  { month: "4月", value: 14 },
  { month: "5月", value: 12 },
  { month: "6月", value: 18 },
  { month: "7月", value: 22 },
  { month: "8月", value: 20 },
  { month: "9月", value: 16 },
  { month: "10月", value: 24 },
  { month: "11月", value: 28 },
  { month: "12月", value: 30 },
]
const maxMonthly = Math.max(...monthlyData.map((d) => d.value))

const packageDistribution = [
  { name: "尝鲜装", percentage: 35, color: "#f97316" },
  { name: "家庭装", percentage: 45, color: "#22c55e" },
  { name: "豪华装", percentage: 20, color: "#3b82f6" },
]

const recentOrders = [
  {
    id: "ORD-20260401",
    user: "张三",
    package: "家庭装",
    amount: "\uFFE51,280",
    status: "已完成",
    statusVariant: "default" as const,
    date: "2026-04-15",
  },
  {
    id: "ORD-20260402",
    user: "李四",
    package: "尝鲜装",
    amount: "\uFFE5398",
    status: "待发货",
    statusVariant: "secondary" as const,
    date: "2026-04-14",
  },
  {
    id: "ORD-20260403",
    user: "王五",
    package: "豪华装",
    amount: "\uFFE52,680",
    status: "已完成",
    statusVariant: "default" as const,
    date: "2026-04-13",
  },
  {
    id: "ORD-20260404",
    user: "赵六",
    package: "家庭装",
    amount: "\uFFE51,280",
    status: "配送中",
    statusVariant: "outline" as const,
    date: "2026-04-12",
  },
  {
    id: "ORD-20260405",
    user: "孙七",
    package: "尝鲜装",
    amount: "\uFFE5398",
    status: "待付款",
    statusVariant: "destructive" as const,
    date: "2026-04-11",
  },
]

const recentNews = [
  { title: "春季果园施肥工作全面展开", type: "果园日志", date: "2026-04-15" },
  { title: "四月橙花盛开，果园美景如画", type: "图文动态", date: "2026-04-13" },
  { title: "新一批有机认证顺利通过", type: "公告通知", date: "2026-04-10" },
]

/* ── Pie Chart (SVG arcs) ── */

function PieChart() {
  const total = packageDistribution.reduce((s, d) => s + d.percentage, 0)
  let cumulative = 0
  const segments = packageDistribution.map((d) => {
    const startAngle = (cumulative / total) * 360
    cumulative += d.percentage
    const endAngle = (cumulative / total) * 360
    return { ...d, startAngle, endAngle }
  })

  function polarToCartesian(
    cx: number,
    cy: number,
    r: number,
    angleDeg: number
  ) {
    const rad = ((angleDeg - 90) * Math.PI) / 180
    return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) }
  }

  function arcPath(
    cx: number,
    cy: number,
    r: number,
    startAngle: number,
    endAngle: number
  ) {
    const start = polarToCartesian(cx, cy, r, endAngle)
    const end = polarToCartesian(cx, cy, r, startAngle)
    const largeArc = endAngle - startAngle > 180 ? 1 : 0
    return `M ${cx} ${cy} L ${start.x} ${start.y} A ${r} ${r} 0 ${largeArc} 0 ${end.x} ${end.y} Z`
  }

  return (
    <div className="flex items-center justify-center gap-8">
      <svg viewBox="0 0 200 200" className="size-40 shrink-0">
        {segments.map((seg) => (
          <path
            key={seg.name}
            d={arcPath(100, 100, 90, seg.startAngle, seg.endAngle)}
            fill={seg.color}
            stroke="white"
            strokeWidth="2"
          />
        ))}
        <circle cx="100" cy="100" r="50" fill="white" />
      </svg>
      <div className="space-y-3">
        {packageDistribution.map((d) => (
          <div key={d.name} className="flex items-center gap-2.5">
            <span
              className="size-3 rounded-full shrink-0"
              style={{ backgroundColor: d.color }}
            />
            <span className="text-sm text-slate-600">{d.name}</span>
            <span className="text-sm font-semibold text-slate-900 ml-auto">
              {d.percentage}%
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ── Page ── */

export default function AdminDashboard() {
  return (
    <div className="space-y-6 max-w-7xl">
      {/* Page title */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900">仪表盘</h1>
        <p className="text-sm text-slate-500 mt-1">
          欢迎回来，管理员。以下是您的果园运营概览。
        </p>
      </div>

      {/* ── Stat Cards ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => (
          <Card key={s.label}>
            <CardContent className="flex items-start gap-4">
              <div
                className={`flex items-center justify-center size-11 rounded-xl ${s.iconBg} shrink-0`}
              >
                <s.icon className={`size-5 ${s.iconColor}`} />
              </div>
              <div className="min-w-0">
                <p className="text-sm text-slate-500">{s.label}</p>
                <p className="text-2xl font-bold text-slate-900 mt-0.5">
                  {s.value}
                </p>
                <div className="flex items-center gap-1 mt-1">
                  {s.change ? (
                    <>
                      <TrendingUp className="size-3.5 text-emerald-500" />
                      <span className="text-xs font-medium text-emerald-600">
                        {s.change}
                      </span>
                    </>
                  ) : (
                    <span className="size-3.5" />
                  )}
                  <span className="text-xs text-slate-400">
                    {s.changeLabel}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* ── Charts Row ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Bar chart */}
        <Card>
          <CardHeader>
            <CardTitle>月度认养趋势</CardTitle>
            <CardAction>
              <span className="text-xs text-slate-400">2026 年</span>
            </CardAction>
          </CardHeader>
          <CardContent>
            <div className="flex items-end gap-2 h-48">
              {monthlyData.map((d) => (
                <div
                  key={d.month}
                  className="flex flex-col items-center flex-1 gap-1.5"
                >
                  <span className="text-[10px] font-medium text-slate-500">
                    {d.value}
                  </span>
                  <div
                    className="w-full rounded-t-md bg-gradient-to-t from-orange-500 to-orange-400 transition-all duration-300 min-h-[4px]"
                    style={{
                      height: `${(d.value / maxMonthly) * 140}px`,
                    }}
                  />
                  <span className="text-[10px] text-slate-400">
                    {d.month.replace("月", "")}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Pie chart */}
        <Card>
          <CardHeader>
            <CardTitle>套餐分布</CardTitle>
            <CardAction>
              <span className="text-xs text-slate-400">全部认养</span>
            </CardAction>
          </CardHeader>
          <CardContent>
            <div className="h-48 flex items-center justify-center">
              <PieChart />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* ── Recent Orders ── */}
      <Card>
        <CardHeader>
          <CardTitle>最近订单</CardTitle>
          <CardAction>
            <Link
              href="/admin/orders"
              className="inline-flex items-center gap-1 text-sm text-orange-600 hover:text-orange-700 font-medium transition-colors"
            >
              查看全部
              <ArrowUpRight className="size-3.5" />
            </Link>
          </CardAction>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>订单号</TableHead>
                <TableHead>用户</TableHead>
                <TableHead>套餐</TableHead>
                <TableHead>金额</TableHead>
                <TableHead>状态</TableHead>
                <TableHead>日期</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-mono text-xs">
                    {order.id}
                  </TableCell>
                  <TableCell className="font-medium">{order.user}</TableCell>
                  <TableCell>{order.package}</TableCell>
                  <TableCell className="font-medium">{order.amount}</TableCell>
                  <TableCell>
                    <Badge variant={order.statusVariant}>{order.status}</Badge>
                  </TableCell>
                  <TableCell className="text-slate-500">{order.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* ── Recent News ── */}
      <Card>
        <CardHeader>
          <CardTitle>最近动态</CardTitle>
          <CardAction>
            <Button size="sm">
              <Plus className="size-3.5" />
              发布新动态
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          <div className="divide-y divide-slate-100">
            {recentNews.map((news, i) => (
              <div
                key={i}
                className="flex items-center justify-between py-3 first:pt-0 last:pb-0"
              >
                <div className="min-w-0">
                  <p className="text-sm font-medium text-slate-900 truncate">
                    {news.title}
                  </p>
                  <p className="text-xs text-slate-500 mt-0.5">{news.date}</p>
                </div>
                <Badge variant="outline" className="ml-3 shrink-0">
                  {news.type}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

"use client"

import * as React from "react"
import { Plus, MoreHorizontal, Pencil, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
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
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface Plan {
  id: string
  name: string
  price: number
  period: string
  shipments: number
  estimatedWeight: string
  active: boolean
  sort: number
}

const initialPlans: Plan[] = [
  {
    id: "1",
    name: "尝鲜装",
    price: 299,
    period: "3个月",
    shipments: 1,
    estimatedWeight: "10斤",
    active: true,
    sort: 1,
  },
  {
    id: "2",
    name: "家庭装",
    price: 699,
    period: "6个月",
    shipments: 3,
    estimatedWeight: "30斤",
    active: true,
    sort: 2,
  },
  {
    id: "3",
    name: "豪华装",
    price: 1299,
    period: "12个月",
    shipments: 6,
    estimatedWeight: "60斤",
    active: false,
    sort: 3,
  },
]

const emptyPlan = {
  name: "",
  price: 0,
  period: "",
  shipments: 1,
  estimatedWeight: "",
  active: true,
  sort: 0,
}

export default function PlansPage() {
  const [plans, setPlans] = React.useState<Plan[]>(initialPlans)
  const [dialogOpen, setDialogOpen] = React.useState(false)
  const [editPlan, setEditPlan] = React.useState<Plan | null>(null)
  const [form, setForm] = React.useState(emptyPlan)

  function openCreate() {
    setEditPlan(null)
    setForm({ ...emptyPlan, sort: plans.length + 1 })
    setDialogOpen(true)
  }

  function openEdit(plan: Plan) {
    setEditPlan(plan)
    setForm({
      name: plan.name,
      price: plan.price,
      period: plan.period,
      shipments: plan.shipments,
      estimatedWeight: plan.estimatedWeight,
      active: plan.active,
      sort: plan.sort,
    })
    setDialogOpen(true)
  }

  function handleSave() {
    if (editPlan) {
      setPlans((prev) =>
        prev.map((p) => (p.id === editPlan.id ? { ...p, ...form } : p))
      )
    } else {
      setPlans((prev) => [...prev, { ...form, id: String(Date.now()) }])
    }
    setDialogOpen(false)
  }

  function handleDelete(id: string) {
    setPlans((prev) => prev.filter((p) => p.id !== id))
  }

  function toggleActive(id: string) {
    setPlans((prev) =>
      prev.map((p) => (p.id === id ? { ...p, active: !p.active } : p))
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">认养套餐管理</h1>
          <p className="text-sm text-muted-foreground">
            管理认养套餐的价格、周期等信息
          </p>
        </div>
        <Button onClick={openCreate}>
          <Plus className="size-4" />
          新增套餐
        </Button>
      </div>

      <Card className="p-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>套餐名称</TableHead>
              <TableHead>价格(元)</TableHead>
              <TableHead>周期</TableHead>
              <TableHead>发货次数</TableHead>
              <TableHead>预估重量</TableHead>
              <TableHead>状态</TableHead>
              <TableHead>排序</TableHead>
              <TableHead className="text-right">操作</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {plans
              .sort((a, b) => a.sort - b.sort)
              .map((plan, idx) => (
                <TableRow key={plan.id} className={idx % 2 === 0 ? "bg-muted/30" : ""}>
                  <TableCell className="font-medium">{plan.name}</TableCell>
                  <TableCell>¥{plan.price}</TableCell>
                  <TableCell>{plan.period}</TableCell>
                  <TableCell>{plan.shipments} 次</TableCell>
                  <TableCell>{plan.estimatedWeight}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Switch
                        checked={plan.active}
                        onCheckedChange={() => toggleActive(plan.id)}
                        size="sm"
                      />
                      <Badge variant={plan.active ? "default" : "secondary"}>
                        {plan.active ? "上架" : "下架"}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell>{plan.sort}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger
                        render={<Button variant="ghost" size="icon-sm" />}
                      >
                        <MoreHorizontal className="size-4" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => openEdit(plan)}>
                          <Pencil className="size-4" />
                          编辑
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          variant="destructive"
                          onClick={() => handleDelete(plan.id)}
                        >
                          <Trash2 className="size-4" />
                          删除
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </Card>

      {/* Create / Edit Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{editPlan ? "编辑套餐" : "新增套餐"}</DialogTitle>
            <DialogDescription>
              {editPlan ? "修改认养套餐信息" : "填写新认养套餐信息"}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="space-y-2">
              <Label>套餐名称</Label>
              <Input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="例如：尝鲜装"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>价格(元)</Label>
                <Input
                  type="number"
                  value={form.price}
                  onChange={(e) =>
                    setForm({ ...form, price: Number(e.target.value) })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>周期</Label>
                <Input
                  value={form.period}
                  onChange={(e) => setForm({ ...form, period: e.target.value })}
                  placeholder="例如：3个月"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>发货次数</Label>
                <Input
                  type="number"
                  value={form.shipments}
                  onChange={(e) =>
                    setForm({ ...form, shipments: Number(e.target.value) })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>预估重量</Label>
                <Input
                  value={form.estimatedWeight}
                  onChange={(e) =>
                    setForm({ ...form, estimatedWeight: e.target.value })
                  }
                  placeholder="例如：10斤"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>排序</Label>
                <Input
                  type="number"
                  value={form.sort}
                  onChange={(e) =>
                    setForm({ ...form, sort: Number(e.target.value) })
                  }
                />
              </div>
              <div className="flex items-end gap-3 pb-0.5">
                <Label>上架状态</Label>
                <Switch
                  checked={form.active}
                  onCheckedChange={(checked) =>
                    setForm({ ...form, active: !!checked })
                  }
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              取消
            </Button>
            <Button onClick={handleSave}>保存</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

"use client"

import * as React from "react"
import {
  Plus,
  MoreHorizontal,
  Pencil,
  Trash2,
  Package,
  Search,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface Shipment {
  id: string
  shipmentNo: string
  adopter: string
  treeCode: string
  batch: string
  weight: string
  courier: string
  trackingNo: string
  status: "pending" | "packing" | "shipped" | "delivered"
}

const statusMap: Record<string, { label: string; className: string }> = {
  pending: { label: "待打包", className: "bg-yellow-100 text-yellow-700 border-yellow-200" },
  packing: { label: "打包中", className: "bg-blue-100 text-blue-700 border-blue-200" },
  shipped: { label: "已发货", className: "bg-purple-100 text-purple-700 border-purple-200" },
  delivered: { label: "已签收", className: "bg-green-100 text-green-700 border-green-200" },
}

const couriers = ["顺丰速运", "中通快递", "圆通速递", "京东物流", "邮政EMS"]

const initialShipments: Shipment[] = [
  { id: "1", shipmentNo: "SH20250401001", adopter: "张三丰", treeCode: "QC-002", batch: "第1批次", weight: "10斤", courier: "顺丰速运", trackingNo: "SF1234567890", status: "delivered" },
  { id: "2", shipmentNo: "SH20250401002", adopter: "赵薇薇", treeCode: "QC-004", batch: "第1批次", weight: "10斤", courier: "京东物流", trackingNo: "JD9876543210", status: "shipped" },
  { id: "3", shipmentNo: "SH20250410003", adopter: "周杰伦", treeCode: "QC-015", batch: "第2批次", weight: "10斤", courier: "", trackingNo: "", status: "packing" },
  { id: "4", shipmentNo: "SH20250410004", adopter: "张三丰", treeCode: "QC-007", batch: "第2批次", weight: "10斤", courier: "", trackingNo: "", status: "pending" },
  { id: "5", shipmentNo: "SH20250415005", adopter: "赵薇薇", treeCode: "QC-010", batch: "第2批次", weight: "10斤", courier: "", trackingNo: "", status: "pending" },
  { id: "6", shipmentNo: "SH20250415006", adopter: "李小龙", treeCode: "QC-009", batch: "第1批次", weight: "10斤", courier: "中通快递", trackingNo: "ZT5555666677", status: "shipped" },
]

export default function ShipmentsPage() {
  const [shipments, setShipments] = React.useState<Shipment[]>(initialShipments)
  const [statusFilter, setStatusFilter] = React.useState<string>("all")
  const [selected, setSelected] = React.useState<Set<string>>(new Set())
  const [dialogOpen, setDialogOpen] = React.useState(false)
  const [editShipment, setEditShipment] = React.useState<Shipment | null>(null)
  const [form, setForm] = React.useState({
    shipmentNo: "",
    adopter: "",
    treeCode: "",
    batch: "",
    weight: "",
    courier: "",
    trackingNo: "",
  })
  const [batchDialogOpen, setBatchDialogOpen] = React.useState(false)
  const [batchCourier, setBatchCourier] = React.useState("顺丰速运")

  const filtered = shipments.filter(
    (s) => statusFilter === "all" || s.status === statusFilter
  )

  function openCreate() {
    setEditShipment(null)
    setForm({
      shipmentNo: `SH${Date.now().toString().slice(-10)}`,
      adopter: "",
      treeCode: "",
      batch: "",
      weight: "",
      courier: "",
      trackingNo: "",
    })
    setDialogOpen(true)
  }

  function openEdit(shipment: Shipment) {
    setEditShipment(shipment)
    setForm({
      shipmentNo: shipment.shipmentNo,
      adopter: shipment.adopter,
      treeCode: shipment.treeCode,
      batch: shipment.batch,
      weight: shipment.weight,
      courier: shipment.courier,
      trackingNo: shipment.trackingNo,
    })
    setDialogOpen(true)
  }

  function handleSave() {
    if (editShipment) {
      setShipments((prev) =>
        prev.map((s) =>
          s.id === editShipment.id
            ? {
                ...s,
                ...form,
                status: form.trackingNo ? "shipped" : s.status,
              }
            : s
        )
      )
    } else {
      setShipments((prev) => [
        ...prev,
        {
          ...form,
          id: String(Date.now()),
          status: "pending" as const,
        },
      ])
    }
    setDialogOpen(false)
  }

  function handleDelete(id: string) {
    setShipments((prev) => prev.filter((s) => s.id !== id))
    setSelected((prev) => {
      const next = new Set(prev)
      next.delete(id)
      return next
    })
  }

  function toggleSelect(id: string) {
    setSelected((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  function toggleSelectAll() {
    const pendingItems = filtered.filter(
      (s) => s.status === "pending" || s.status === "packing"
    )
    if (
      pendingItems.length > 0 &&
      pendingItems.every((s) => selected.has(s.id))
    ) {
      setSelected(new Set())
    } else {
      setSelected(new Set(pendingItems.map((s) => s.id)))
    }
  }

  function handleBatchShip() {
    setShipments((prev) =>
      prev.map((s) =>
        selected.has(s.id)
          ? {
              ...s,
              courier: batchCourier,
              trackingNo: `BATCH${Date.now().toString().slice(-8)}${s.id}`,
              status: "shipped" as const,
            }
          : s
      )
    )
    setSelected(new Set())
    setBatchDialogOpen(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">发货管理</h1>
          <p className="text-sm text-muted-foreground">
            管理认养橙子的发货和物流信息
          </p>
        </div>
        <Button onClick={openCreate}>
          <Plus className="size-4" />
          新建发货
        </Button>
      </div>

      <Card className="p-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-4">
          <div className="flex items-center gap-3">
            <Select value={statusFilter} onValueChange={(v) => v && setStatusFilter(v)}>
              <SelectTrigger className="w-[130px]">
                <SelectValue placeholder="状态筛选" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">全部状态</SelectItem>
                <SelectItem value="pending">待打包</SelectItem>
                <SelectItem value="packing">打包中</SelectItem>
                <SelectItem value="shipped">已发货</SelectItem>
                <SelectItem value="delivered">已签收</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {selected.size > 0 && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setBatchDialogOpen(true)}
            >
              <Package className="size-4" />
              批量发货 ({selected.size})
            </Button>
          )}
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-10">
                <Checkbox
                  checked={
                    filtered.filter(
                      (s) => s.status === "pending" || s.status === "packing"
                    ).length > 0 &&
                    filtered
                      .filter(
                        (s) => s.status === "pending" || s.status === "packing"
                      )
                      .every((s) => selected.has(s.id))
                  }
                  onCheckedChange={toggleSelectAll}
                />
              </TableHead>
              <TableHead>发货编号</TableHead>
              <TableHead>认养人</TableHead>
              <TableHead>橙树编号</TableHead>
              <TableHead>批次</TableHead>
              <TableHead>重量</TableHead>
              <TableHead>快递公司</TableHead>
              <TableHead>快递单号</TableHead>
              <TableHead>状态</TableHead>
              <TableHead className="text-right">操作</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((shipment, idx) => (
              <TableRow
                key={shipment.id}
                className={idx % 2 === 0 ? "bg-muted/30" : ""}
              >
                <TableCell>
                  {(shipment.status === "pending" ||
                    shipment.status === "packing") && (
                    <Checkbox
                      checked={selected.has(shipment.id)}
                      onCheckedChange={() => toggleSelect(shipment.id)}
                    />
                  )}
                </TableCell>
                <TableCell className="font-mono text-xs">
                  {shipment.shipmentNo}
                </TableCell>
                <TableCell>{shipment.adopter}</TableCell>
                <TableCell>{shipment.treeCode}</TableCell>
                <TableCell>{shipment.batch}</TableCell>
                <TableCell>{shipment.weight}</TableCell>
                <TableCell>{shipment.courier || "-"}</TableCell>
                <TableCell className="font-mono text-xs">
                  {shipment.trackingNo || "-"}
                </TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={statusMap[shipment.status].className}
                  >
                    {statusMap[shipment.status].label}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger
                      render={<Button variant="ghost" size="icon-sm" />}
                    >
                      <MoreHorizontal className="size-4" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => openEdit(shipment)}>
                        <Pencil className="size-4" />
                        {shipment.status === "pending" || shipment.status === "packing"
                          ? "录入快递信息"
                          : "编辑"}
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        variant="destructive"
                        onClick={() => handleDelete(shipment.id)}
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

      {/* Create / Edit / Tracking Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>
              {editShipment ? "编辑发货信息" : "新建发货"}
            </DialogTitle>
            <DialogDescription>
              {editShipment
                ? "修改发货及快递信息"
                : "填写新发货记录"}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>发货编号</Label>
                <Input
                  value={form.shipmentNo}
                  onChange={(e) =>
                    setForm({ ...form, shipmentNo: e.target.value })
                  }
                  disabled={!!editShipment}
                />
              </div>
              <div className="space-y-2">
                <Label>认养人</Label>
                <Input
                  value={form.adopter}
                  onChange={(e) =>
                    setForm({ ...form, adopter: e.target.value })
                  }
                  placeholder="认养人姓名"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>橙树编号</Label>
                <Input
                  value={form.treeCode}
                  onChange={(e) =>
                    setForm({ ...form, treeCode: e.target.value })
                  }
                  placeholder="QC-XXX"
                />
              </div>
              <div className="space-y-2">
                <Label>批次</Label>
                <Input
                  value={form.batch}
                  onChange={(e) =>
                    setForm({ ...form, batch: e.target.value })
                  }
                  placeholder="第X批次"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>重量</Label>
              <Input
                value={form.weight}
                onChange={(e) =>
                  setForm({ ...form, weight: e.target.value })
                }
                placeholder="例如：10斤"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>快递公司</Label>
                <Select
                  value={form.courier}
                  onValueChange={(v) => setForm({ ...form, courier: v ?? "" })}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="选择快递公司" />
                  </SelectTrigger>
                  <SelectContent>
                    {couriers.map((c) => (
                      <SelectItem key={c} value={c}>
                        {c}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>快递单号</Label>
                <Input
                  value={form.trackingNo}
                  onChange={(e) =>
                    setForm({ ...form, trackingNo: e.target.value })
                  }
                  placeholder="输入快递单号"
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

      {/* Batch Ship Dialog */}
      <Dialog open={batchDialogOpen} onOpenChange={setBatchDialogOpen}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>批量发货</DialogTitle>
            <DialogDescription>
              将为选中的 {selected.size} 条记录生成快递单号并标记为已发货
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-2">
            <Label>快递公司</Label>
            <Select value={batchCourier} onValueChange={(v) => v && setBatchCourier(v)}>
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {couriers.map((c) => (
                  <SelectItem key={c} value={c}>
                    {c}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setBatchDialogOpen(false)}>
              取消
            </Button>
            <Button onClick={handleBatchShip}>确认批量发货</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

"use client"

import * as React from "react"
import {
  Search,
  Plus,
  MoreHorizontal,
  Pencil,
  Trash2,
  CheckSquare,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface OrangeTree {
  id: string
  code: string
  variety: string
  age: number
  orchard: string
  status: "available" | "adopted" | "resting"
  estimatedYield: number
}

const statusMap: Record<
  string,
  { label: string; className: string }
> = {
  available: { label: "可认养", className: "bg-green-100 text-green-700 border-green-200" },
  adopted: { label: "已认养", className: "bg-orange-100 text-orange-700 border-orange-200" },
  resting: { label: "休养中", className: "bg-gray-100 text-gray-600 border-gray-200" },
}

const orchards = ["阳光果园", "翠谷果园", "金秋果园", "丰收果园"]
const varieties = ["脐橙", "冰糖橙", "血橙", "红美人", "沃柑"]

const initialTrees: OrangeTree[] = [
  { id: "1", code: "QC-001", variety: "脐橙", age: 5, orchard: "阳光果园", status: "available", estimatedYield: 50 },
  { id: "2", code: "QC-002", variety: "冰糖橙", age: 8, orchard: "阳光果园", status: "adopted", estimatedYield: 80 },
  { id: "3", code: "QC-003", variety: "血橙", age: 3, orchard: "翠谷果园", status: "available", estimatedYield: 30 },
  { id: "4", code: "QC-004", variety: "脐橙", age: 10, orchard: "金秋果园", status: "adopted", estimatedYield: 100 },
  { id: "5", code: "QC-005", variety: "红美人", age: 6, orchard: "翠谷果园", status: "resting", estimatedYield: 0 },
  { id: "6", code: "QC-006", variety: "沃柑", age: 4, orchard: "丰收果园", status: "available", estimatedYield: 40 },
  { id: "7", code: "QC-007", variety: "脐橙", age: 7, orchard: "阳光果园", status: "adopted", estimatedYield: 70 },
  { id: "8", code: "QC-008", variety: "冰糖橙", age: 9, orchard: "金秋果园", status: "available", estimatedYield: 90 },
  { id: "9", code: "QC-009", variety: "血橙", age: 2, orchard: "翠谷果园", status: "available", estimatedYield: 20 },
  { id: "10", code: "QC-010", variety: "红美人", age: 5, orchard: "丰收果园", status: "adopted", estimatedYield: 55 },
  { id: "11", code: "QC-011", variety: "脐橙", age: 12, orchard: "阳光果园", status: "resting", estimatedYield: 0 },
  { id: "12", code: "QC-012", variety: "沃柑", age: 3, orchard: "金秋果园", status: "available", estimatedYield: 35 },
  { id: "13", code: "QC-013", variety: "冰糖橙", age: 6, orchard: "翠谷果园", status: "adopted", estimatedYield: 65 },
  { id: "14", code: "QC-014", variety: "血橙", age: 4, orchard: "丰收果园", status: "available", estimatedYield: 45 },
  { id: "15", code: "QC-015", variety: "脐橙", age: 8, orchard: "阳光果园", status: "available", estimatedYield: 75 },
]

const emptyTree: Omit<OrangeTree, "id"> = {
  code: "",
  variety: "脐橙",
  age: 1,
  orchard: "阳光果园",
  status: "available",
  estimatedYield: 0,
}

export default function TreesPage() {
  const [trees, setTrees] = React.useState<OrangeTree[]>(initialTrees)
  const [search, setSearch] = React.useState("")
  const [statusFilter, setStatusFilter] = React.useState<string>("all")
  const [selected, setSelected] = React.useState<Set<string>>(new Set())
  const [dialogOpen, setDialogOpen] = React.useState(false)
  const [editTree, setEditTree] = React.useState<OrangeTree | null>(null)
  const [form, setForm] = React.useState(emptyTree)
  const [batchDialogOpen, setBatchDialogOpen] = React.useState(false)
  const [batchStatus, setBatchStatus] = React.useState<string>("available")

  const filtered = trees.filter((t) => {
    const matchSearch =
      t.code.toLowerCase().includes(search.toLowerCase()) ||
      t.variety.includes(search)
    const matchStatus = statusFilter === "all" || t.status === statusFilter
    return matchSearch && matchStatus
  })

  function openCreate() {
    setEditTree(null)
    setForm(emptyTree)
    setDialogOpen(true)
  }

  function openEdit(tree: OrangeTree) {
    setEditTree(tree)
    setForm({
      code: tree.code,
      variety: tree.variety,
      age: tree.age,
      orchard: tree.orchard,
      status: tree.status,
      estimatedYield: tree.estimatedYield,
    })
    setDialogOpen(true)
  }

  function handleSave() {
    if (editTree) {
      setTrees((prev) =>
        prev.map((t) => (t.id === editTree.id ? { ...t, ...form } : t))
      )
    } else {
      setTrees((prev) => [
        ...prev,
        { ...form, id: String(Date.now()) },
      ])
    }
    setDialogOpen(false)
  }

  function handleDelete(id: string) {
    setTrees((prev) => prev.filter((t) => t.id !== id))
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
    if (selected.size === filtered.length) {
      setSelected(new Set())
    } else {
      setSelected(new Set(filtered.map((t) => t.id)))
    }
  }

  function handleBatchStatus() {
    setTrees((prev) =>
      prev.map((t) =>
        selected.has(t.id) ? { ...t, status: batchStatus as OrangeTree["status"] } : t
      )
    )
    setSelected(new Set())
    setBatchDialogOpen(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">橙树管理</h1>
          <p className="text-sm text-muted-foreground">管理所有果园橙树信息</p>
        </div>
        <Button onClick={openCreate}>
          <Plus className="size-4" />
          录入橙树
        </Button>
      </div>

      <Card className="p-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-4">
          <div className="flex flex-1 items-center gap-3">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="搜索树编号或品种..."
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
                <SelectItem value="available">可认养</SelectItem>
                <SelectItem value="adopted">已认养</SelectItem>
                <SelectItem value="resting">休养中</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {selected.size > 0 && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setBatchDialogOpen(true)}
            >
              <CheckSquare className="size-4" />
              批量修改状态 ({selected.size})
            </Button>
          )}
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-10">
                <Checkbox
                  checked={filtered.length > 0 && selected.size === filtered.length}
                  onCheckedChange={toggleSelectAll}
                />
              </TableHead>
              <TableHead>树编号</TableHead>
              <TableHead>品种</TableHead>
              <TableHead>树龄</TableHead>
              <TableHead>所属果园</TableHead>
              <TableHead>状态</TableHead>
              <TableHead>预估产量(斤)</TableHead>
              <TableHead className="text-right">操作</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((tree, idx) => (
              <TableRow key={tree.id} className={idx % 2 === 0 ? "bg-muted/30" : ""}>
                <TableCell>
                  <Checkbox
                    checked={selected.has(tree.id)}
                    onCheckedChange={() => toggleSelect(tree.id)}
                  />
                </TableCell>
                <TableCell className="font-medium">{tree.code}</TableCell>
                <TableCell>{tree.variety}</TableCell>
                <TableCell>{tree.age} 年</TableCell>
                <TableCell>{tree.orchard}</TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={statusMap[tree.status].className}
                  >
                    {statusMap[tree.status].label}
                  </Badge>
                </TableCell>
                <TableCell>{tree.estimatedYield}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger
                      render={<Button variant="ghost" size="icon-sm" />}
                    >
                      <MoreHorizontal className="size-4" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => openEdit(tree)}>
                        <Pencil className="size-4" />
                        编辑
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        variant="destructive"
                        onClick={() => handleDelete(tree.id)}
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
            <DialogTitle>{editTree ? "编辑橙树" : "录入橙树"}</DialogTitle>
            <DialogDescription>
              {editTree ? "修改橙树信息" : "填写新橙树信息"}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>树编号</Label>
                <Input
                  value={form.code}
                  onChange={(e) => setForm({ ...form, code: e.target.value })}
                  placeholder="QC-XXX"
                />
              </div>
              <div className="space-y-2">
                <Label>品种</Label>
                <Select
                  value={form.variety}
                  onValueChange={(v) => setForm({ ...form, variety: v ?? "" })}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {varieties.map((v) => (
                      <SelectItem key={v} value={v}>{v}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>树龄(年)</Label>
                <Input
                  type="number"
                  value={form.age}
                  onChange={(e) =>
                    setForm({ ...form, age: Number(e.target.value) })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>所属果园</Label>
                <Select
                  value={form.orchard}
                  onValueChange={(v) => setForm({ ...form, orchard: v ?? "" })}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {orchards.map((o) => (
                      <SelectItem key={o} value={o}>{o}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>状态</Label>
                <Select
                  value={form.status}
                  onValueChange={(v) =>
                    setForm({ ...form, status: v as OrangeTree["status"] })
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="available">可认养</SelectItem>
                    <SelectItem value="adopted">已认养</SelectItem>
                    <SelectItem value="resting">休养中</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>预估产量(斤)</Label>
                <Input
                  type="number"
                  value={form.estimatedYield}
                  onChange={(e) =>
                    setForm({ ...form, estimatedYield: Number(e.target.value) })
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

      {/* Batch Status Dialog */}
      <Dialog open={batchDialogOpen} onOpenChange={setBatchDialogOpen}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>批量修改状态</DialogTitle>
            <DialogDescription>
              将选中的 {selected.size} 棵橙树修改为新状态
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-2">
            <Label>目标状态</Label>
            <Select value={batchStatus} onValueChange={(v) => v && setBatchStatus(v)}>
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="available">可认养</SelectItem>
                <SelectItem value="adopted">已认养</SelectItem>
                <SelectItem value="resting">休养中</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setBatchDialogOpen(false)}>
              取消
            </Button>
            <Button onClick={handleBatchStatus}>确认修改</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

"use client"

import * as React from "react"
import {
  Plus,
  MoreHorizontal,
  Pencil,
  Trash2,
  Eye,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
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

interface OrchardUpdate {
  id: string
  title: string
  content: string
  type: "日志" | "图文" | "视频" | "公告"
  orchard: string
  published: boolean
  date: string
}

const typeColors: Record<string, string> = {
  日志: "bg-blue-100 text-blue-700 border-blue-200",
  图文: "bg-green-100 text-green-700 border-green-200",
  视频: "bg-purple-100 text-purple-700 border-purple-200",
  公告: "bg-orange-100 text-orange-700 border-orange-200",
}

const orchards = ["阳光果园", "翠谷果园", "金秋果园", "丰收果园"]
const types: OrchardUpdate["type"][] = ["日志", "图文", "视频", "公告"]

const initialUpdates: OrchardUpdate[] = [
  { id: "1", title: "春季施肥工作全面展开", content: "今日完成了全部果园的春季施肥，使用有机肥料，确保橙树生长。本次施肥面积覆盖200亩。", type: "日志", orchard: "阳光果园", published: true, date: "2025-03-15" },
  { id: "2", title: "橙花盛开美景", content: "四月正是橙花盛开的季节，果园里弥漫着清香。认养人们可以通过直播观看。", type: "图文", orchard: "翠谷果园", published: true, date: "2025-04-02" },
  { id: "3", title: "有机认证顺利通过", content: "经过严格检测，我们的果园再次通过有机认证，品质有保障。", type: "公告", orchard: "金秋果园", published: true, date: "2025-04-10" },
  { id: "4", title: "果园直播预告", content: "本周六将进行果园直播，带大家参观橙树生长情况。", type: "视频", orchard: "阳光果园", published: false, date: "2025-04-12" },
  { id: "5", title: "病虫害防治记录", content: "本周对果园进行了生物防治，使用天敌昆虫控制害虫数量。", type: "日志", orchard: "丰收果园", published: true, date: "2025-04-14" },
  { id: "6", title: "新品种沃柑长势喜人", content: "去年嫁接的沃柑品种长势良好，预计明年可以投入认养。", type: "图文", orchard: "翠谷果园", published: true, date: "2025-04-15" },
  { id: "7", title: "五一假期活动通知", content: "五一假期果园开放参观，认养人可免费入园采摘体验。", type: "公告", orchard: "金秋果园", published: false, date: "2025-04-16" },
  { id: "8", title: "灌溉系统升级完成", content: "全新的智能灌溉系统安装完毕，可以精准控制每棵树的水量。", type: "日志", orchard: "阳光果园", published: true, date: "2025-04-17" },
]

const emptyUpdate = {
  title: "",
  content: "",
  type: "日志" as OrchardUpdate["type"],
  orchard: "阳光果园",
  published: false,
  date: new Date().toISOString().split("T")[0],
}

export default function OrchardUpdatesPage() {
  const [updates, setUpdates] = React.useState<OrchardUpdate[]>(initialUpdates)
  const [dialogOpen, setDialogOpen] = React.useState(false)
  const [editUpdate, setEditUpdate] = React.useState<OrchardUpdate | null>(null)
  const [form, setForm] = React.useState(emptyUpdate)
  const [previewUpdate, setPreviewUpdate] = React.useState<OrchardUpdate | null>(null)

  function openCreate() {
    setEditUpdate(null)
    setForm(emptyUpdate)
    setDialogOpen(true)
  }

  function openEdit(update: OrchardUpdate) {
    setEditUpdate(update)
    setForm({
      title: update.title,
      content: update.content,
      type: update.type,
      orchard: update.orchard,
      published: update.published,
      date: update.date,
    })
    setDialogOpen(true)
  }

  function handleSave() {
    if (editUpdate) {
      setUpdates((prev) =>
        prev.map((u) => (u.id === editUpdate.id ? { ...u, ...form } : u))
      )
    } else {
      setUpdates((prev) => [...prev, { ...form, id: String(Date.now()) }])
    }
    setDialogOpen(false)
  }

  function handleDelete(id: string) {
    setUpdates((prev) => prev.filter((u) => u.id !== id))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">果园动态管理</h1>
          <p className="text-sm text-muted-foreground">发布和管理果园最新动态</p>
        </div>
        <Button onClick={openCreate}>
          <Plus className="size-4" />
          发布新动态
        </Button>
      </div>

      <Card className="p-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>标题</TableHead>
              <TableHead>类型</TableHead>
              <TableHead>果园</TableHead>
              <TableHead>发布状态</TableHead>
              <TableHead>发布日期</TableHead>
              <TableHead className="text-right">操作</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {updates.map((update, idx) => (
              <TableRow key={update.id} className={idx % 2 === 0 ? "bg-muted/30" : ""}>
                <TableCell className="font-medium max-w-[200px] truncate">
                  {update.title}
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className={typeColors[update.type]}>
                    {update.type}
                  </Badge>
                </TableCell>
                <TableCell>{update.orchard}</TableCell>
                <TableCell>
                  <Badge variant={update.published ? "default" : "secondary"}>
                    {update.published ? "已发布" : "草稿"}
                  </Badge>
                </TableCell>
                <TableCell>{update.date}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger
                      render={<Button variant="ghost" size="icon-sm" />}
                    >
                      <MoreHorizontal className="size-4" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => setPreviewUpdate(update)}>
                        <Eye className="size-4" />
                        预览
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => openEdit(update)}>
                        <Pencil className="size-4" />
                        编辑
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        variant="destructive"
                        onClick={() => handleDelete(update.id)}
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
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>
              {editUpdate ? "编辑动态" : "发布新动态"}
            </DialogTitle>
            <DialogDescription>
              {editUpdate ? "修改果园动态信息" : "填写动态内容并发布"}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="space-y-2">
              <Label>标题</Label>
              <Input
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                placeholder="输入动态标题"
              />
            </div>
            <div className="space-y-2">
              <Label>内容</Label>
              <Textarea
                value={form.content}
                onChange={(e) => setForm({ ...form, content: e.target.value })}
                placeholder="输入动态内容..."
                className="min-h-[120px]"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>类型</Label>
                <Select
                  value={form.type}
                  onValueChange={(v) =>
                    setForm({ ...form, type: v as OrchardUpdate["type"] })
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {types.map((t) => (
                      <SelectItem key={t} value={t}>
                        {t}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>果园</Label>
                <Select
                  value={form.orchard || undefined}
                  onValueChange={(v) => setForm({ ...form, orchard: v ?? "" })}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {orchards.map((o) => (
                      <SelectItem key={o} value={o}>
                        {o}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Switch
                checked={form.published}
                onCheckedChange={(checked) =>
                  setForm({ ...form, published: !!checked })
                }
              />
              <Label>立即发布</Label>
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

      {/* Preview Dialog */}
      <Dialog
        open={!!previewUpdate}
        onOpenChange={(open) => !open && setPreviewUpdate(null)}
      >
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>{previewUpdate?.title}</DialogTitle>
            <DialogDescription>
              <span className="flex items-center gap-2 mt-1">
                <Badge
                  variant="outline"
                  className={typeColors[previewUpdate?.type ?? "日志"]}
                >
                  {previewUpdate?.type}
                </Badge>
                <span>{previewUpdate?.orchard}</span>
                <span>{previewUpdate?.date}</span>
              </span>
            </DialogDescription>
          </DialogHeader>
          <div className="text-sm leading-relaxed whitespace-pre-wrap">
            {previewUpdate?.content}
          </div>
          <DialogFooter showCloseButton />
        </DialogContent>
      </Dialog>
    </div>
  )
}

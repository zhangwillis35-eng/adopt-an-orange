"use client"

import * as React from "react"
import { Search, MoreHorizontal, Eye, UserCog } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
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
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"

interface User {
  id: string
  avatar: string
  nickname: string
  phone: string
  role: "user" | "vip" | "admin"
  adoptions: number
  registeredAt: string
}

const roleMap: Record<string, { label: string; variant: "default" | "secondary" | "outline" }> = {
  user: { label: "普通用户", variant: "secondary" },
  vip: { label: "VIP用户", variant: "default" },
  admin: { label: "管理员", variant: "outline" },
}

const initialUsers: User[] = [
  { id: "1", avatar: "张", nickname: "张三丰", phone: "138****1234", role: "vip", adoptions: 3, registeredAt: "2025-03-15" },
  { id: "2", avatar: "李", nickname: "李小龙", phone: "139****5678", role: "user", adoptions: 1, registeredAt: "2025-05-20" },
  { id: "3", avatar: "王", nickname: "王小明", phone: "137****9012", role: "user", adoptions: 2, registeredAt: "2025-06-10" },
  { id: "4", avatar: "赵", nickname: "赵薇薇", phone: "136****3456", role: "vip", adoptions: 5, registeredAt: "2025-01-08" },
  { id: "5", avatar: "陈", nickname: "陈大海", phone: "135****7890", role: "admin", adoptions: 0, registeredAt: "2024-12-01" },
  { id: "6", avatar: "刘", nickname: "刘德华", phone: "134****2345", role: "user", adoptions: 1, registeredAt: "2025-07-22" },
  { id: "7", avatar: "孙", nickname: "孙悟空", phone: "133****6789", role: "user", adoptions: 0, registeredAt: "2025-09-15" },
  { id: "8", avatar: "周", nickname: "周杰伦", phone: "132****0123", role: "vip", adoptions: 4, registeredAt: "2025-02-28" },
]

export default function UsersPage() {
  const [users, setUsers] = React.useState<User[]>(initialUsers)
  const [search, setSearch] = React.useState("")
  const [roleFilter, setRoleFilter] = React.useState<string>("all")
  const [detailUser, setDetailUser] = React.useState<User | null>(null)
  const [roleEditUser, setRoleEditUser] = React.useState<User | null>(null)
  const [newRole, setNewRole] = React.useState<string>("")

  const filtered = users.filter((u) => {
    const matchSearch =
      u.nickname.includes(search) || u.phone.includes(search)
    const matchRole = roleFilter === "all" || u.role === roleFilter
    return matchSearch && matchRole
  })

  function handleRoleSave() {
    if (!roleEditUser || !newRole) return
    setUsers((prev) =>
      prev.map((u) =>
        u.id === roleEditUser.id ? { ...u, role: newRole as User["role"] } : u
      )
    )
    setRoleEditUser(null)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">用户管理</h1>
        <p className="text-sm text-muted-foreground">管理平台所有注册用户</p>
      </div>

      <Card className="p-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-4">
          <div className="flex flex-1 items-center gap-3">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="搜索昵称或手机号..."
                className="pl-8"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <Select value={roleFilter} onValueChange={(v) => v && setRoleFilter(v)}>
              <SelectTrigger className="w-[130px]">
                <SelectValue placeholder="角色筛选" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">全部角色</SelectItem>
                <SelectItem value="user">普通用户</SelectItem>
                <SelectItem value="vip">VIP用户</SelectItem>
                <SelectItem value="admin">管理员</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <p className="text-sm text-muted-foreground">
            共 {filtered.length} 位用户
          </p>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>头像</TableHead>
              <TableHead>昵称</TableHead>
              <TableHead>手机号</TableHead>
              <TableHead>角色</TableHead>
              <TableHead>认养数</TableHead>
              <TableHead>注册日期</TableHead>
              <TableHead className="text-right">操作</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((user, idx) => (
              <TableRow key={user.id} className={idx % 2 === 0 ? "bg-muted/30" : ""}>
                <TableCell>
                  <div className="size-8 rounded-full bg-primary/10 flex items-center justify-center text-xs font-medium text-primary">
                    {user.avatar}
                  </div>
                </TableCell>
                <TableCell className="font-medium">{user.nickname}</TableCell>
                <TableCell>{user.phone}</TableCell>
                <TableCell>
                  <Badge variant={roleMap[user.role].variant}>
                    {roleMap[user.role].label}
                  </Badge>
                </TableCell>
                <TableCell>{user.adoptions}</TableCell>
                <TableCell>{user.registeredAt}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger
                      render={
                        <Button variant="ghost" size="icon-sm" />
                      }
                    >
                      <MoreHorizontal className="size-4" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => setDetailUser(user)}>
                        <Eye className="size-4" />
                        查看详情
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => {
                          setRoleEditUser(user)
                          setNewRole(user.role)
                        }}
                      >
                        <UserCog className="size-4" />
                        修改角色
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      {/* Detail Dialog */}
      <Dialog open={!!detailUser} onOpenChange={(open) => !open && setDetailUser(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>用户详情</DialogTitle>
            <DialogDescription>查看用户的详细信息</DialogDescription>
          </DialogHeader>
          {detailUser && (
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="size-16 rounded-full bg-primary/10 flex items-center justify-center text-2xl font-medium text-primary">
                  {detailUser.avatar}
                </div>
                <div>
                  <p className="font-semibold text-lg">{detailUser.nickname}</p>
                  <Badge variant={roleMap[detailUser.role].variant}>
                    {roleMap[detailUser.role].label}
                  </Badge>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <p className="text-muted-foreground">手机号</p>
                  <p className="font-medium">{detailUser.phone}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">认养数量</p>
                  <p className="font-medium">{detailUser.adoptions} 棵</p>
                </div>
                <div>
                  <p className="text-muted-foreground">注册日期</p>
                  <p className="font-medium">{detailUser.registeredAt}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">用户ID</p>
                  <p className="font-medium">{detailUser.id}</p>
                </div>
              </div>
            </div>
          )}
          <DialogFooter showCloseButton />
        </DialogContent>
      </Dialog>

      {/* Role Edit Dialog */}
      <Dialog open={!!roleEditUser} onOpenChange={(open) => !open && setRoleEditUser(null)}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>修改角色</DialogTitle>
            <DialogDescription>
              修改 {roleEditUser?.nickname} 的用户角色
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3">
            <Label>选择角色</Label>
            <Select value={newRole} onValueChange={(v) => v && setNewRole(v)}>
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="user">普通用户</SelectItem>
                <SelectItem value="vip">VIP用户</SelectItem>
                <SelectItem value="admin">管理员</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setRoleEditUser(null)}>
              取消
            </Button>
            <Button onClick={handleRoleSave}>保存</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

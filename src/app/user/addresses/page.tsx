"use client"

import React, { useState } from "react"
import {
  MapPin,
  Plus,
  Pencil,
  Trash2,
  Phone,
  User,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog"
import { MascotEmpty } from "@/components/mascot"

interface Address {
  id: string
  name: string
  phone: string
  province: string
  city: string
  district: string
  detail: string
  isDefault: boolean
}

const initialAddresses: Address[] = [
  {
    id: "addr-001",
    name: "张三",
    phone: "138****8888",
    province: "广东省",
    city: "深圳市",
    district: "南山区",
    detail: "科技园路1号 创新大厦 A座 1201",
    isDefault: true,
  },
]

const emptyForm: Omit<Address, "id"> = {
  name: "",
  phone: "",
  province: "",
  city: "",
  district: "",
  detail: "",
  isDefault: false,
}

export default function AddressesPage() {
  const [addresses, setAddresses] = useState<Address[]>(initialAddresses)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [form, setForm] = useState(emptyForm)

  const handleOpenAdd = () => {
    setEditingId(null)
    setForm(emptyForm)
    setDialogOpen(true)
  }

  const handleOpenEdit = (address: Address) => {
    setEditingId(address.id)
    setForm({
      name: address.name,
      phone: address.phone,
      province: address.province,
      city: address.city,
      district: address.district,
      detail: address.detail,
      isDefault: address.isDefault,
    })
    setDialogOpen(true)
  }

  const handleSave = () => {
    if (!form.name || !form.phone || !form.detail) return

    if (editingId) {
      setAddresses((prev) =>
        prev.map((a) =>
          a.id === editingId
            ? { ...a, ...form }
            : form.isDefault
              ? { ...a, isDefault: false }
              : a
        )
      )
    } else {
      const newAddress: Address = {
        id: `addr-${Date.now()}`,
        ...form,
      }
      setAddresses((prev) => {
        if (form.isDefault) {
          return [...prev.map((a) => ({ ...a, isDefault: false })), newAddress]
        }
        return [...prev, newAddress]
      })
    }

    setDialogOpen(false)
    setForm(emptyForm)
    setEditingId(null)
  }

  const handleDelete = (id: string) => {
    setAddresses((prev) => prev.filter((a) => a.id !== id))
  }

  const updateField = (field: keyof typeof form, value: string | boolean) => {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="font-heading text-xl font-semibold">地址管理</h1>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger
            render={
              <Button className="gap-2 bg-gradient-to-r from-orange-500 to-amber-500 text-white hover:from-orange-600 hover:to-amber-600" onClick={handleOpenAdd} />
            }
          >
            <Plus className="size-4" />
            新增地址
          </DialogTrigger>

          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>
                {editingId ? "编辑地址" : "新增收货地址"}
              </DialogTitle>
              <DialogDescription>
                请填写您的收货信息
              </DialogDescription>
            </DialogHeader>

            <div className="grid gap-4 py-2">
              <div className="grid gap-2">
                <Label htmlFor="name">收货人</Label>
                <Input
                  id="name"
                  placeholder="请输入收货人姓名"
                  value={form.name}
                  onChange={(e) => updateField("name", e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="phone">手机号</Label>
                <Input
                  id="phone"
                  placeholder="请输入手机号"
                  value={form.phone}
                  onChange={(e) => updateField("phone", e.target.value)}
                />
              </div>
              <div className="grid grid-cols-3 gap-2">
                <div className="grid gap-2">
                  <Label htmlFor="province">省份</Label>
                  <Input
                    id="province"
                    placeholder="省份"
                    value={form.province}
                    onChange={(e) => updateField("province", e.target.value)}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="city">城市</Label>
                  <Input
                    id="city"
                    placeholder="城市"
                    value={form.city}
                    onChange={(e) => updateField("city", e.target.value)}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="district">区县</Label>
                  <Input
                    id="district"
                    placeholder="区县"
                    value={form.district}
                    onChange={(e) => updateField("district", e.target.value)}
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="detail">详细地址</Label>
                <Input
                  id="detail"
                  placeholder="请输入详细地址"
                  value={form.detail}
                  onChange={(e) => updateField("detail", e.target.value)}
                />
              </div>
              <label className="flex cursor-pointer items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={form.isDefault}
                  onChange={(e) => updateField("isDefault", e.target.checked)}
                  className="size-4 accent-primary"
                />
                设为默认地址
              </label>
            </div>

            <DialogFooter>
              <Button
                className="bg-gradient-to-r from-orange-500 to-amber-500 text-white hover:from-orange-600 hover:to-amber-600"
                onClick={handleSave}
              >
                保存
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {addresses.length === 0 ? (
        <Card>
          <CardContent>
            <MascotEmpty message="还没有收货地址哦，添加一个吧~" />
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {addresses.map((address) => (
            <Card key={address.id}>
              <CardContent className="pt-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0 flex-1 space-y-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="flex items-center gap-1.5 font-medium">
                        <User className="size-3.5 text-muted-foreground" />
                        {address.name}
                      </span>
                      <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                        <Phone className="size-3.5" />
                        {address.phone}
                      </span>
                      {address.isDefault && (
                        <Badge className="bg-primary/10 text-primary">默认</Badge>
                      )}
                    </div>
                    <p className="flex items-start gap-1.5 text-sm text-muted-foreground">
                      <MapPin className="mt-0.5 size-3.5 shrink-0" />
                      {address.province}
                      {address.city}
                      {address.district} {address.detail}
                    </p>
                  </div>

                  <div className="flex shrink-0 gap-1">
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      onClick={() => handleOpenEdit(address)}
                    >
                      <Pencil className="size-3.5" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      className="text-destructive hover:text-destructive"
                      onClick={() => handleDelete(address.id)}
                    >
                      <Trash2 className="size-3.5" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

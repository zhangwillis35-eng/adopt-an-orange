"use client"

import React, { useState } from "react"
import { useSession } from "next-auth/react"
import { Camera, Save } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"

export default function ProfilePage() {
  const { data: session } = useSession()

  const [nickname, setNickname] = useState(
    session?.user?.name || "橙子用户"
  )
  const [email, setEmail] = useState(
    session?.user?.email || "user@example.com"
  )
  const [phone] = useState("138****8888")
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const userInitial = nickname.charAt(0)

  return (
    <div>
      <h1 className="mb-6 font-heading text-xl font-semibold">个人资料</h1>

      <Card>
        <CardHeader>
          <CardTitle>基本信息</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start">
            {/* Avatar section */}
            <div className="flex flex-col items-center gap-3">
              <div className="relative">
                <Avatar className="size-24 ring-4 ring-primary/10">
                  <AvatarFallback className="bg-gradient-to-br from-orange-400 to-orange-600 text-3xl font-bold text-white">
                    {userInitial}
                  </AvatarFallback>
                </Avatar>
                <button
                  className="absolute -right-1 -bottom-1 flex size-8 items-center justify-center rounded-full bg-primary text-white shadow-md transition-transform hover:scale-105"
                  onClick={() => alert("上传头像功能即将上线")}
                >
                  <Camera className="size-4" />
                </button>
              </div>
              <p className="text-xs text-muted-foreground">点击更换头像</p>
            </div>

            <Separator orientation="vertical" className="hidden h-auto self-stretch sm:block" />

            {/* Form section */}
            <div className="w-full flex-1 space-y-5">
              <div className="grid gap-2">
                <Label htmlFor="nickname">昵称</Label>
                <Input
                  id="nickname"
                  placeholder="请输入昵称"
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="phone">手机号</Label>
                <div className="flex items-center gap-2">
                  <Input
                    id="phone"
                    value={phone}
                    disabled
                    className="flex-1"
                  />
                  <Button variant="outline" size="sm">
                    修改
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  手机号已脱敏显示，如需修改请点击"修改"按钮
                </p>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="email">邮箱</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="请输入邮箱"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="pt-2">
                <Button
                  className="gap-2 bg-gradient-to-r from-orange-500 to-amber-500 text-white hover:from-orange-600 hover:to-amber-600"
                  onClick={handleSave}
                >
                  <Save className="size-4" />
                  {saved ? "已保存" : "保存修改"}
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

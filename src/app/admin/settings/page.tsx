"use client"

import * as React from "react"
import { Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

export default function SettingsPage() {
  const [siteName, setSiteName] = React.useState("认养一个橙子")
  const [siteDesc, setSiteDesc] = React.useState(
    "让每一颗橙子都有温度，让每一份认养都有故事。"
  )
  const [liveUrl, setLiveUrl] = React.useState(
    "https://live.example.com/orchard-cam"
  )
  const [smsEnabled, setSmsEnabled] = React.useState(true)
  const [smsOrderNotify, setSmsOrderNotify] = React.useState(true)
  const [smsShipNotify, setSmsShipNotify] = React.useState(true)
  const [wxAppId, setWxAppId] = React.useState("")
  const [wxMchId, setWxMchId] = React.useState("")
  const [wxApiKey, setWxApiKey] = React.useState("")
  const [aliAppId, setAliAppId] = React.useState("")
  const [aliPrivateKey, setAliPrivateKey] = React.useState("")
  const [saved, setSaved] = React.useState(false)

  function handleSave() {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="space-y-6 max-w-3xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">系统设置</h1>
          <p className="text-sm text-muted-foreground">配置网站基本信息和系统参数</p>
        </div>
        <Button onClick={handleSave}>
          <Save className="size-4" />
          {saved ? "已保存" : "保存设置"}
        </Button>
      </div>

      {/* Site Info */}
      <Card>
        <CardHeader>
          <CardTitle>网站基本信息</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>网站名称</Label>
            <Input
              value={siteName}
              onChange={(e) => setSiteName(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label>网站描述</Label>
            <Textarea
              value={siteDesc}
              onChange={(e) => setSiteDesc(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Live Stream */}
      <Card>
        <CardHeader>
          <CardTitle>果园直播配置</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>直播地址</Label>
            <Input
              value={liveUrl}
              onChange={(e) => setLiveUrl(e.target.value)}
              placeholder="https://live.example.com/..."
            />
            <p className="text-xs text-muted-foreground">
              填写果园直播摄像头的推流地址或播放地址
            </p>
          </div>
        </CardContent>
      </Card>

      {/* SMS */}
      <Card>
        <CardHeader>
          <CardTitle>短信通知</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">启用短信通知</p>
              <p className="text-xs text-muted-foreground">开启后将通过短信通知用户</p>
            </div>
            <Switch
              checked={smsEnabled}
              onCheckedChange={(c) => setSmsEnabled(!!c)}
            />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">订单通知</p>
              <p className="text-xs text-muted-foreground">
                订单支付成功后通知用户
              </p>
            </div>
            <Switch
              checked={smsOrderNotify}
              onCheckedChange={(c) => setSmsOrderNotify(!!c)}
              disabled={!smsEnabled}
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">发货通知</p>
              <p className="text-xs text-muted-foreground">
                快递发出后通知用户
              </p>
            </div>
            <Switch
              checked={smsShipNotify}
              onCheckedChange={(c) => setSmsShipNotify(!!c)}
              disabled={!smsEnabled}
            />
          </div>
        </CardContent>
      </Card>

      {/* Payment */}
      <Card>
        <CardHeader>
          <CardTitle>支付配置</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <h4 className="text-sm font-medium">微信支付</h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>AppID</Label>
                <Input
                  value={wxAppId}
                  onChange={(e) => setWxAppId(e.target.value)}
                  placeholder="wx1234567890abcdef"
                />
              </div>
              <div className="space-y-2">
                <Label>商户号(MchID)</Label>
                <Input
                  value={wxMchId}
                  onChange={(e) => setWxMchId(e.target.value)}
                  placeholder="1234567890"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>API密钥</Label>
              <Input
                type="password"
                value={wxApiKey}
                onChange={(e) => setWxApiKey(e.target.value)}
                placeholder="输入API密钥"
              />
            </div>
          </div>
          <Separator />
          <div className="space-y-4">
            <h4 className="text-sm font-medium">支付宝</h4>
            <div className="space-y-2">
              <Label>AppID</Label>
              <Input
                value={aliAppId}
                onChange={(e) => setAliAppId(e.target.value)}
                placeholder="2021000000000000"
              />
            </div>
            <div className="space-y-2">
              <Label>应用私钥</Label>
              <Textarea
                value={aliPrivateKey}
                onChange={(e) => setAliPrivateKey(e.target.value)}
                placeholder="粘贴应用私钥..."
                className="min-h-[80px] font-mono text-xs"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

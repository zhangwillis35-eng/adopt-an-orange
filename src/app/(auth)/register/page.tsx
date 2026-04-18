"use client"

import { useState, useCallback } from "react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function RegisterPage() {
  const router = useRouter()
  const [nickname, setNickname] = useState("")
  const [phone, setPhone] = useState("")
  const [code, setCode] = useState("")
  const [loading, setLoading] = useState(false)
  const [sendingCode, setSendingCode] = useState(false)
  const [countdown, setCountdown] = useState(0)
  const [error, setError] = useState("")

  const handleSendCode = useCallback(async () => {
    if (countdown > 0 || sendingCode) return
    if (!/^1[3-9]\d{9}$/.test(phone)) {
      setError("请输入正确的手机号")
      return
    }

    setSendingCode(true)
    setError("")

    try {
      const res = await fetch("/api/auth/send-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone }),
      })

      const data = await res.json()

      if (data.success) {
        setCountdown(60)
        const timer = setInterval(() => {
          setCountdown((prev) => {
            if (prev <= 1) {
              clearInterval(timer)
              return 0
            }
            return prev - 1
          })
        }, 1000)
      } else {
        setError(data.message || "发送失败")
      }
    } catch {
      setError("网络错误，请重试")
    } finally {
      setSendingCode(false)
    }
  }, [phone, countdown, sendingCode])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!nickname.trim()) {
      setError("请输入昵称")
      return
    }
    if (!/^1[3-9]\d{9}$/.test(phone)) {
      setError("请输入正确的手机号")
      return
    }
    if (!code) {
      setError("请输入验证码")
      return
    }

    setLoading(true)

    try {
      const result = await signIn("phone-code", {
        phone,
        code,
        nickname,
        redirect: false,
        callbackUrl: "/",
      })

      if (result?.error) {
        if (result.error === "CredentialsSignin") {
          setError("验证码错误，请输入 123456")
        } else {
          setError("注册失败，请重试")
        }
        setLoading(false)
      } else if (result?.url) {
        router.push(result.url)
        router.refresh()
      } else {
        router.push("/")
        router.refresh()
      }
    } catch {
      setError("注册失败，请重试")
      setLoading(false)
    }
  }

  return (
    <div>
      <div className="mb-6 text-center">
        <h1 className="text-2xl font-bold text-gray-900">创建账号</h1>
        <p className="mt-1 text-sm text-gray-500">
          注册后即可认养你的专属橙树
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="nickname">昵称</Label>
          <Input
            id="nickname"
            type="text"
            placeholder="给自己取个名字吧"
            maxLength={20}
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">手机号</Label>
          <Input
            id="phone"
            type="tel"
            placeholder="请输入手机号"
            maxLength={11}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="code">验证码</Label>
          <div className="flex gap-2">
            <Input
              id="code"
              type="text"
              placeholder="请输入验证码"
              maxLength={6}
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="flex-1"
            />
            <Button
              type="button"
              variant="outline"
              onClick={handleSendCode}
              disabled={countdown > 0 || sendingCode}
              className="shrink-0 whitespace-nowrap"
            >
              {countdown > 0 ? `${countdown}s` : sendingCode ? "发送中..." : "发送验证码"}
            </Button>
          </div>
        </div>

        {error && (
          <p className="text-sm text-red-500">{error}</p>
        )}

        <Button
          type="submit"
          disabled={loading}
          className="w-full bg-orange-500 text-white hover:bg-orange-600"
        >
          {loading ? "注册中..." : "注册"}
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-gray-500">
        已有账号？{" "}
        <Link
          href="/login"
          className="font-medium text-orange-600 hover:text-orange-500"
        >
          去登录
        </Link>
      </p>
    </div>
  )
}

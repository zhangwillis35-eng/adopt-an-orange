'use client'

import { OrangeMascot } from '@/components/mascot/OrangeMascot'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function MarketingError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 px-4 text-center">
      <OrangeMascot size="lg" expression="surprised" animation="bounce" />

      <div className="space-y-2">
        <h2 className="text-2xl font-bold">出了点小问题...</h2>
        <p className="max-w-md text-sm text-muted-foreground">
          {error.message || '页面加载时发生了意外错误，请稍后再试。'}
        </p>
      </div>

      <div className="flex items-center gap-3">
        <Button onClick={reset}>重试</Button>
        <Link href="/">
          <Button variant="outline">返回首页</Button>
        </Link>
      </div>
    </div>
  )
}

'use client'

import { Button } from '@/components/ui/button'
import { AlertCircle } from 'lucide-react'

export default function AdminError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-32 text-center">
      <div className="flex size-12 items-center justify-center rounded-full bg-red-100">
        <AlertCircle className="size-6 text-red-600" />
      </div>

      <div className="space-y-1">
        <h2 className="text-lg font-semibold">加载失败</h2>
        <p className="max-w-sm text-sm text-muted-foreground">
          {error.message || '发生了意外错误'}
        </p>
      </div>

      <Button onClick={reset} variant="outline">
        重试
      </Button>
    </div>
  )
}

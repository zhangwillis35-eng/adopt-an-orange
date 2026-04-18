import Link from 'next/link'
import { OrangeMascot } from '@/components/mascot/OrangeMascot'
import { Button } from '@/components/ui/button'
import { Home } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 px-4 text-center">
      <OrangeMascot expression="surprised" size="xl" animation="float" />

      <div className="space-y-2">
        <h1 className="text-4xl font-bold tracking-tight text-foreground">
          页面走丢了...
        </h1>
        <p className="text-lg text-muted-foreground">
          橙留香正在帮你寻找...
        </p>
      </div>

      <Link href="/">
        <Button size="lg">
          <Home className="size-4" />
          返回首页
        </Button>
      </Link>
    </div>
  )
}

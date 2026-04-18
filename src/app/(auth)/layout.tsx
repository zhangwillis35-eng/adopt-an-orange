import { OrangeMascot } from "@/components/mascot/OrangeMascot"

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="relative flex min-h-screen items-center justify-center bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 px-4 py-12">
      {/* 背景装饰 */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-orange-200/30 blur-3xl" />
        <div className="absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-amber-200/30 blur-3xl" />
      </div>

      <div className="relative z-10 flex w-full max-w-md flex-col items-center">
        {/* 吉祥物装饰 */}
        <div className="mb-6">
          <OrangeMascot size="lg" expression="waving" animation="float" />
        </div>

        {/* 卡片式表单容器 */}
        <div className="w-full rounded-2xl border border-orange-100 bg-white/80 p-6 shadow-xl shadow-orange-100/50 backdrop-blur-sm sm:p-8">
          {children}
        </div>
      </div>
    </div>
  )
}

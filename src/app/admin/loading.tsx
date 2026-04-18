export default function AdminLoading() {
  return (
    <div className="flex items-center justify-center py-32">
      <div className="flex flex-col items-center gap-3">
        <div className="size-8 animate-spin rounded-full border-4 border-orange-200 border-t-orange-500" />
        <p className="text-sm text-muted-foreground">加载中...</p>
      </div>
    </div>
  )
}

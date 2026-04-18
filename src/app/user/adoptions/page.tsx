import Link from "next/link"
import { TreePine, Calendar, MapPin } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MascotEmpty } from "@/components/mascot"

const mockAdoptions = [
  {
    id: "adopt-001",
    treeName: "阳光一号",
    treeCode: "GN-A003",
    planName: "家庭套餐",
    status: "进行中" as const,
    startDate: "2025-11-15",
    endDate: "2026-11-15",
    orchardName: "阳光果园",
    orchardLocation: "江西赣州·信丰县",
  },
  {
    id: "adopt-002",
    treeName: "翠谷之星",
    treeCode: "GN-B003",
    planName: "豪华套餐",
    status: "已完成" as const,
    startDate: "2024-10-01",
    endDate: "2025-10-01",
    orchardName: "翠谷果园",
    orchardLocation: "江西赣州·安远县",
  },
]

const statusColorMap: Record<string, string> = {
  进行中: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  已完成: "bg-muted text-muted-foreground",
  已取消: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
}

export default function AdoptionsPage() {
  if (mockAdoptions.length === 0) {
    return (
      <div>
        <h1 className="mb-6 font-heading text-xl font-semibold">我的认养</h1>
        <Card>
          <CardContent>
            <MascotEmpty message="还没有认养橙树哦，快去挑选一棵吧~" />
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div>
      <h1 className="mb-6 font-heading text-xl font-semibold">我的认养</h1>

      <div className="grid gap-4">
        {mockAdoptions.map((adoption) => (
          <Link key={adoption.id} href={`/user/adoptions/${adoption.id}`}>
            <Card className="card-hover cursor-pointer transition-shadow hover:ring-primary/30">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex size-10 items-center justify-center rounded-lg bg-gradient-to-br from-orange-400 to-orange-600">
                      <TreePine className="size-5 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-base">
                        {adoption.treeName}
                        <span className="ml-2 text-sm font-normal text-muted-foreground">
                          {adoption.treeCode}
                        </span>
                      </CardTitle>
                      <p className="mt-0.5 text-sm text-muted-foreground">
                        {adoption.planName}
                      </p>
                    </div>
                  </div>
                  <Badge
                    className={statusColorMap[adoption.status] || ""}
                  >
                    {adoption.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="size-3.5" />
                    {adoption.startDate} ~ {adoption.endDate}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <MapPin className="size-3.5" />
                    {adoption.orchardName} · {adoption.orchardLocation}
                  </span>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}

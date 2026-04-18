import Link from "next/link"
import {
  TreePine,
  Calendar,
  MapPin,
  Award,
  Package,
  Sprout,
  Sun,
  Leaf,
  Apple,
  Truck,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { MascotInteractive } from "@/components/mascot"

const mockAdoptionDetail = {
  id: "adopt-001",
  treeName: "阳光一号",
  treeCode: "GN-A003",
  variety: "赣南脐橙",
  treeAge: 10,
  orchardName: "阳光果园",
  orchardLocation: "江西赣州·信丰县",
  planName: "家庭套餐",
  planPrice: 599,
  status: "进行中",
  startDate: "2025-11-15",
  endDate: "2026-11-15",
  estimatedYield: 25,
  timeline: [
    {
      date: "2025-11-15",
      title: "认养成功",
      description: "恭喜您成功认养橙树 GN-A003，开启甜蜜之旅！",
      icon: "sprout",
      completed: true,
    },
    {
      date: "2026-03-01",
      title: "春季养护",
      description: "果园已完成春季施肥、修剪和病虫害防治，橙树生长良好。",
      icon: "leaf",
      completed: true,
    },
    {
      date: "2026-06-15",
      title: "夏季生长",
      description: "橙树进入挂果期，果实正在茁壮成长中。",
      icon: "sun",
      completed: false,
    },
    {
      date: "2026-10-20",
      title: "秋季采摘",
      description: "丰收季节到来，新鲜脐橙即将采摘并发往您的手中！",
      icon: "apple",
      completed: false,
    },
  ],
  deliveries: [
    {
      id: "ship-001",
      date: "2026-03-20",
      weight: "10斤",
      status: "已签收",
      trackingNo: "SF1234567890",
    },
  ],
}

const timelineIconMap: Record<string, React.ElementType> = {
  sprout: Sprout,
  leaf: Leaf,
  sun: Sun,
  apple: Apple,
}

export default function AdoptionDetailPage({
  params,
}: {
  params: Promise<{ adoptionId: string }>
}) {
  const detail = mockAdoptionDetail

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-heading text-xl font-semibold">认养详情</h1>
        <Badge className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
          {detail.status}
        </Badge>
      </div>

      {/* Tree info card */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="flex size-11 items-center justify-center rounded-xl bg-gradient-to-br from-orange-400 to-orange-600">
              <TreePine className="size-5 text-white" />
            </div>
            <div>
              <CardTitle>{detail.treeName}</CardTitle>
              <p className="text-sm text-muted-foreground">编号 {detail.treeCode}</p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            <div>
              <p className="text-xs text-muted-foreground">品种</p>
              <p className="font-medium">{detail.variety}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">树龄</p>
              <p className="font-medium">{detail.treeAge} 年</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">果园</p>
              <p className="font-medium">{detail.orchardName}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">位置</p>
              <p className="font-medium">{detail.orchardLocation}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Adoption info card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="size-4 text-primary" />
            认养信息
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            <div>
              <p className="text-xs text-muted-foreground">套餐</p>
              <p className="font-medium">{detail.planName}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">价格</p>
              <p className="font-medium text-primary">¥{detail.planPrice}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">认养周期</p>
              <p className="font-medium">
                {detail.startDate} ~ {detail.endDate}
              </p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">预估产量</p>
              <p className="font-medium">{detail.estimatedYield} 斤</p>
            </div>
          </div>

          <div className="mt-4">
            <Link href={`/user/certificate/${detail.id}`}>
              <Button className="gap-2 bg-gradient-to-r from-orange-500 to-amber-500 text-white hover:from-orange-600 hover:to-amber-600">
                <Award className="size-4" />
                查看认养证书
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* Timeline */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="size-4 text-primary" />
            认养时间线
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative ml-3 border-l-2 border-border pl-6">
            {detail.timeline.map((event, index) => {
              const Icon = timelineIconMap[event.icon] || Sprout
              return (
                <div
                  key={index}
                  className="relative pb-8 last:pb-0"
                >
                  {/* Timeline dot */}
                  <div
                    className={`absolute -left-[31px] flex size-6 items-center justify-center rounded-full ring-4 ring-card ${
                      event.completed
                        ? "bg-gradient-to-br from-orange-400 to-orange-600"
                        : "bg-muted"
                    }`}
                  >
                    <Icon
                      className={`size-3 ${
                        event.completed ? "text-white" : "text-muted-foreground"
                      }`}
                    />
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{event.title}</span>
                      {event.completed && (
                        <Badge className="bg-green-100 text-green-700 text-[10px] dark:bg-green-900/30 dark:text-green-400">
                          已完成
                        </Badge>
                      )}
                    </div>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      {event.date}
                    </p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {event.description}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Mascot interaction */}
      <MascotInteractive
        treeName={detail.treeName}
        treeCode={detail.treeCode}
        variety={detail.variety}
        orchardName={detail.orchardName}
      />

      {/* Delivery records */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Truck className="size-4 text-primary" />
            发货记录
          </CardTitle>
        </CardHeader>
        <CardContent>
          {detail.deliveries.length === 0 ? (
            <p className="py-4 text-center text-sm text-muted-foreground">
              暂无发货记录
            </p>
          ) : (
            <div className="space-y-3">
              {detail.deliveries.map((delivery) => (
                <div
                  key={delivery.id}
                  className="flex items-center justify-between rounded-lg bg-muted/50 p-3"
                >
                  <div className="space-y-0.5">
                    <p className="text-sm font-medium">
                      {delivery.date} · {delivery.weight}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      快递单号：{delivery.trackingNo}
                    </p>
                  </div>
                  <Badge className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                    {delivery.status}
                  </Badge>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

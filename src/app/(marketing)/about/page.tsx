export const revalidate = 3600

import type { Metadata } from 'next'
import { OrangeMascot } from '@/components/mascot/OrangeMascot'
import { Heart, Leaf, Sun, Users } from 'lucide-react'

export const metadata: Metadata = {
  title: '关于我们',
  description:
    '了解"认养一个橙子"品牌故事、赣南脐橙产地介绍、团队使命与橙留香IP吉祥物。',
  keywords: ['认养一个橙子', '品牌故事', '赣南脐橙产地', '橙留香', '有机种植'],
  openGraph: {
    title: '关于我们 | 认养一个橙子',
    description:
      '了解"认养一个橙子"品牌故事、赣南脐橙产地介绍、团队使命与橙留香IP吉祥物。',
    images: [{ url: '/og-default.png', width: 1200, height: 630 }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: '关于我们 | 认养一个橙子',
    description:
      '了解"认养一个橙子"品牌故事、赣南脐橙产地介绍与橙留香IP吉祥物。',
    images: ['/og-default.png'],
  },
}

const values = [
  {
    icon: Leaf,
    title: '自然有机',
    desc: '坚持生态种植，不使用催熟剂，让每一颗橙子自然成熟。',
  },
  {
    icon: Sun,
    title: '阳光透明',
    desc: '从种植到发货全程可视化，果园直播让认养看得见。',
  },
  {
    icon: Heart,
    title: '用心守护',
    desc: '专业果农团队精心养护每一棵橙树，品质始终如一。',
  },
  {
    icon: Users,
    title: '连接共享',
    desc: '搭建城市与田园的桥梁，让更多人感受土地的温度。',
  },
]

export default function AboutPage() {
  return (
    <div className="flex flex-col">
      {/* ─── Hero Banner ─── */}
      <section className="bg-gradient-to-br from-[#FF8C00] via-[#FFA500] to-[#FFD700] px-4 py-20 text-center text-white sm:py-28">
        <div className="mx-auto max-w-3xl">
          <h1 className="mb-4 text-3xl font-bold sm:text-4xl">关于我们</h1>
          <p className="text-lg text-white/90">
            一群热爱土地的人，一个连接果园与餐桌的故事
          </p>
        </div>
      </section>

      {/* ─── 品牌故事 ─── */}
      <section className="bg-background px-4 py-20">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-8 text-center text-2xl font-bold sm:text-3xl">
            品牌故事
          </h2>
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              "认养一个橙子"诞生于一个简单的想法：让城市里的人们也能拥有一棵属于自己的橙树。
            </p>
            <p>
              我们相信，食物不应该只是货架上的商品，它应该有故事、有温度、有连接。
              当你认养一棵橙树，你不只是在购买橙子——你在参与一段生命的成长，
              从春天的花开到秋天的丰收，每一天都值得期待。
            </p>
            <p>
              我们通过 C2B
              认养模式，让消费者直接与果园建立联系。没有中间商，没有冷链周转，
              果实从枝头到你手中，新鲜与品质都有保障。
            </p>
          </div>
        </div>
      </section>

      {/* ─── 果园介绍 ─── */}
      <section className="bg-muted/50 px-4 py-20">
        <div className="mx-auto flex max-w-5xl flex-col gap-10 lg:flex-row lg:items-center">
          {/* placeholder image */}
          <div className="flex-1">
            <div className="aspect-[4/3] rounded-2xl bg-gradient-to-br from-[#4CAF50]/20 via-[#FFD700]/15 to-[#FF8C00]/20" />
          </div>
          <div className="flex-1 space-y-4">
            <h2 className="text-2xl font-bold sm:text-3xl">赣南脐橙产地</h2>
            <div className="space-y-3 text-muted-foreground leading-relaxed">
              <p>
                我们的果园坐落于江西省赣州市，这里是中国脐橙之乡，也是世界公认的脐橙黄金产区。
              </p>
              <p>
                赣南地处亚热带季风气候区，年均气温 18-19&deg;C，日照充足，昼夜温差大，
                红壤土质富含微量元素——这些得天独厚的条件造就了赣南脐橙独特的甜美风味：
                皮薄肉厚、汁多化渣、甜酸适度。
              </p>
              <p>
                果园采用生态种植方式，以有机肥替代化肥，以物理防虫替代农药，
                确保每一颗橙子都是安全、健康、美味的。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 团队使命 ─── */}
      <section className="bg-background px-4 py-20">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-4 text-center text-2xl font-bold sm:text-3xl">
            我们的使命
          </h2>
          <p className="mx-auto mb-12 max-w-lg text-center text-muted-foreground">
            让每一个人都能感受到来自土地的善意
          </p>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v) => (
              <div
                key={v.title}
                className="flex flex-col items-center text-center"
              >
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-accent text-primary">
                  <v.icon className="size-6" />
                </div>
                <h3 className="mb-1 text-base font-semibold">{v.title}</h3>
                <p className="text-sm text-muted-foreground">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 橙留香 IP ─── */}
      <section className="bg-muted/50 px-4 py-20">
        <div className="mx-auto flex max-w-4xl flex-col items-center gap-8 text-center">
          <OrangeMascot size="xl" expression="waving" animation="wave" />

          <div className="space-y-4">
            <h2 className="text-2xl font-bold sm:text-3xl">
              认识橙留香
            </h2>
            <div className="mx-auto max-w-lg space-y-3 text-muted-foreground leading-relaxed">
              <p>
                橙留香是"认养一个橙子"的品牌吉祥物——一只活泼可爱的小橙子，
                头顶绿叶，身披橙色披风，永远带着温暖的笑容。
              </p>
              <p>
                它的名字取自"橙"与"留香"的谐音，寓意美好的味道与记忆会长久留存。
                在平台的每个角落，橙留香都会陪伴你，提醒你果园里那棵属于你的橙树正在茁壮成长。
              </p>
            </div>
          </div>

          <div className="flex gap-6">
            <OrangeMascot size="md" expression="happy" animation="float" />
            <OrangeMascot size="md" expression="thinking" />
            <OrangeMascot size="md" expression="surprised" />
          </div>
        </div>
      </section>
    </div>
  )
}

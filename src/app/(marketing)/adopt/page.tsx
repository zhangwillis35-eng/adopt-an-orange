export const revalidate = 3600

import type { Metadata } from "next"
import { TreePine, Citrus, SlidersHorizontal } from "lucide-react"
import { OrangeMascot } from "@/components/mascot/OrangeMascot"
import { PlanCard } from "@/components/adopt/PlanCard"
import { mockPlans } from "@/lib/mock-data"

export const metadata: Metadata = {
  title: "认养商城",
  description:
    "选择适合你的赣南脐橙认养套餐，尝鲜299元起，果园直播+产地直发，开启与自然的美好约定。",
  keywords: ["认养套餐", "脐橙认养", "水果礼盒", "赣南脐橙套餐", "产地直发"],
  openGraph: {
    title: "认养商城 | 认养一个橙子",
    description:
      "选择适合你的赣南脐橙认养套餐，尝鲜299元起，果园直播+产地直发。",
    images: [{ url: "/og-default.png", width: 1200, height: 630 }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "认养商城 | 认养一个橙子",
    description:
      "选择适合你的赣南脐橙认养套餐，尝鲜299元起，果园直播+产地直发。",
    images: ["/og-default.png"],
  },
}

const productJsonLd = mockPlans
  .filter((p) => p.isActive)
  .map((plan) => ({
    "@context": "https://schema.org",
    "@type": "Product",
    name: `${plan.name} - 认养一个橙子`,
    description: plan.description,
    brand: { "@type": "Brand", name: "认养一个橙子" },
    offers: {
      "@type": "Offer",
      price: plan.price,
      priceCurrency: "CNY",
      availability: "https://schema.org/InStock",
      url: `https://adopt-an-orange.com/adopt`,
    },
  }))

export default function AdoptPage() {
  // Sort plans by sortOrder
  const plans = [...mockPlans]
    .filter((p) => p.isActive)
    .sort((a, b) => a.sortOrder - b.sortOrder)

  return (
    <div className="flex flex-col">
      {productJsonLd.map((ld, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }}
        />
      ))}
      {/* ─── Hero ─── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#FF8C00] via-[#FFA500] to-[#FFD700] px-4 py-20 text-center sm:py-28">
        {/* decorative elements */}
        <div className="pointer-events-none absolute -left-20 -top-20 h-64 w-64 rounded-full bg-white/10" />
        <div className="pointer-events-none absolute -bottom-12 -right-12 h-48 w-48 rounded-full bg-white/10" />
        <div className="pointer-events-none absolute left-1/4 top-1/3 h-32 w-32 rounded-full bg-white/5" />

        <div className="relative mx-auto flex max-w-3xl flex-col items-center gap-6">
          <div className="flex items-center gap-2 rounded-full bg-white/20 px-4 py-1.5 text-sm font-medium text-white backdrop-blur-sm">
            <Citrus className="size-4" />
            认养商城
          </div>

          <h1 className="animate-fade-up text-3xl font-bold leading-tight text-white sm:text-5xl">
            认养你的专属橙树
          </h1>
          <p className="animate-fade-up animate-delay-100 max-w-lg text-lg text-white/90">
            选择适合你的认养套餐，开启一段与自然的美好约定
          </p>

          {/* stats */}
          <div className="animate-fade-up animate-delay-200 mt-4 flex flex-wrap items-center justify-center gap-6 rounded-2xl bg-white/15 px-8 py-4 backdrop-blur-sm sm:gap-10">
            {[
              { label: "认养方案", value: `${plans.length}种` },
              { label: "合作果园", value: "2座" },
              { label: "可选橙树", value: "20+" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-2xl font-bold text-white">{stat.value}</p>
                <p className="text-xs text-white/70">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Plan Grid ─── */}
      <section className="bg-background px-4 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl">
          {/* section header */}
          <div className="mb-12 flex flex-col items-center gap-3 text-center">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent text-primary">
              <TreePine className="size-5" />
            </div>
            <h2 className="text-2xl font-bold sm:text-3xl">精选认养套餐</h2>
            <p className="max-w-md text-muted-foreground">
              从尝鲜到尊享，总有一款适合你。所有套餐均含专属认养证书与果园直播权限。
            </p>
          </div>

          {/* plan cards */}
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {plans.map((plan) => (
              <PlanCard key={plan.id} plan={plan} />
            ))}
          </div>

          {/* bottom note */}
          <div className="mt-12 flex items-start gap-3 rounded-xl bg-accent/50 px-6 py-4">
            <SlidersHorizontal className="mt-0.5 size-5 shrink-0 text-primary" />
            <div className="text-sm text-muted-foreground">
              <p className="font-medium text-foreground">
                不确定选择哪个套餐？
              </p>
              <p>
                我们推荐首次认养的用户从「尝鲜套餐」开始体验。家庭用户可以选择性价比最高的「家庭套餐」。
                如有任何疑问，欢迎联系客服咨询。
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

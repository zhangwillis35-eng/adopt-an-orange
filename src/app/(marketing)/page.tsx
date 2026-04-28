export const revalidate = 3600

import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import {
  Gift,
  TreePine,
  Video,
  Apple,
  ChevronRight,
  Star,
  ArrowRight,
  Sparkles,
  Shield,
  Truck,
} from 'lucide-react'
import { OrangeMascot } from '@/components/mascot/OrangeMascot'
import { Button } from '@/components/ui/button'
import { images } from '@/lib/images'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card'
import { ReviewSection } from '@/components/review/ReviewSection'

export const metadata: Metadata = {
  title: '首页',
  description:
    '认养一棵赣南脐橙树，果园直播全程可见，新鲜橙子产地直发到家。10000+用户信赖的C2B水果认养平台。',
  keywords: ['认养橙子', '赣南脐橙', '水果认养', '果园直播', '产地直发', '有机水果'],
  openGraph: {
    title: '认养一个橙子 - 认养你的专属橙树',
    description:
      '认养一棵赣南脐橙树，果园直播全程可见，新鲜橙子产地直发到家。',
    images: [{ url: '/og-default.png', width: 1200, height: 630 }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: '认养一个橙子 - 认养你的专属橙树',
    description:
      '认养一棵赣南脐橙树，果园直播全程可见，新鲜橙子产地直发到家。',
    images: ['/og-default.png'],
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      name: '认养一个橙子',
      url: 'https://adopt-an-orange.com',
      logo: 'https://adopt-an-orange.com/logo.png',
      description: 'C2B农业认养平台，认养赣南脐橙树，果园直播全程可见，新鲜直达。',
      sameAs: [],
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'customer service',
        availableLanguage: 'Chinese',
      },
    },
    {
      '@type': 'WebSite',
      name: '认养一个橙子',
      url: 'https://adopt-an-orange.com',
      potentialAction: {
        '@type': 'SearchAction',
        target: 'https://adopt-an-orange.com/search?q={search_term_string}',
        'query-input': 'required name=search_term_string',
      },
    },
  ],
}

/* ────────────────────────── data ────────────────────────── */

const steps = [
  {
    icon: Gift,
    title: '选择套餐',
    desc: '根据需求选择适合你的认养方案',
  },
  {
    icon: TreePine,
    title: '认养橙树',
    desc: '专属橙树挂上你的名牌，开启守护之旅',
  },
  {
    icon: Video,
    title: '果园直播',
    desc: '实时查看橙树生长，体验田园乐趣',
  },
  {
    icon: Apple,
    title: '收获橙子',
    desc: '新鲜脐橙从果园直达你的餐桌',
  },
]

const plans = [
  {
    id: 'plan-1',
    name: '尝鲜套餐',
    price: 299,
    weight: '10斤/年',
    deliveries: '2次发货',
    features: ['专属橙树认养证书', '果园直播权限', '每次5斤新鲜直达'],
    recommended: false,
  },
  {
    id: 'plan-2',
    name: '家庭套餐',
    price: 599,
    weight: '25斤/年',
    deliveries: '3次发货',
    features: [
      '专属橙树认养证书',
      '果园直播权限',
      '优先发货特权',
      '橙留香定制礼盒',
    ],
    recommended: true,
  },
  {
    id: 'plan-3',
    name: '豪华套餐',
    price: 999,
    weight: '50斤/年',
    deliveries: '4次发货',
    features: [
      '专属橙树认养证书',
      '果园直播权限',
      '优先发货特权',
      '橙留香定制礼盒',
      '果园实地参观1次',
    ],
    recommended: false,
  },
]

const stats = [
  { value: '10,000+', label: '认养用户' },
  { value: '5,000', label: '果树养护中' },
  { value: '98%', label: '好评率' },
  { value: '24h', label: '新鲜直达' },
]

/* ────────────────────────── page ────────────────────────── */

export default function HomePage() {
  return (
    <div className="flex flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* ─── Hero ─── */}
      <section className="section-wave relative overflow-hidden px-6 py-20 sm:py-28" style={{
        background: 'linear-gradient(135deg, #F97316 0%, #EA580C 25%, #FFA500 50%, #FB923C 75%, #FFD700 100%)',
      }}>
        {/* Decorative floating orbs */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -left-20 -top-20 h-80 w-80 rounded-full bg-white/8"
            style={{ animation: 'hero-float-1 8s ease-in-out infinite' }} />
          <div className="absolute -bottom-12 -right-12 h-64 w-64 rounded-full bg-white/8"
            style={{ animation: 'hero-float-2 10s ease-in-out infinite' }} />
          <div className="absolute left-[15%] top-[20%] h-6 w-6 rounded-full bg-white/20"
            style={{ animation: 'hero-float-3 4s ease-in-out infinite' }} />
          <div className="absolute left-[75%] top-[15%] h-4 w-4 rounded-full bg-white/25"
            style={{ animation: 'hero-float-1 5s ease-in-out infinite 0.5s' }} />
          <div className="absolute left-[55%] top-[80%] h-8 w-8 rounded-full bg-yellow-300/15"
            style={{ animation: 'hero-float-1 7s ease-in-out infinite 2s' }} />
        </div>

        {/* Two-column: left text, right product image */}
        <div className="relative mx-auto flex max-w-6xl flex-col items-center gap-10 lg:flex-row lg:items-center lg:gap-16">

          {/* ── Left: mascot + copy ── */}
          <div className="flex flex-1 flex-col items-center gap-6 text-center lg:items-start lg:text-left">
            {/* Glow */}
            <div className="pointer-events-none absolute -top-8 left-1/4 h-64 w-64 -translate-x-1/2 rounded-full bg-yellow-300/25 blur-3xl lg:left-1/4"
              style={{ animation: 'hero-glow-pulse 4s ease-in-out infinite' }} />

            <div className="animate-scale-in relative">
              <OrangeMascot size="lg" expression="happy" animation="float" withCape />
            </div>

            <h1 className="animate-fade-up animate-delay-200 font-display text-4xl font-extrabold leading-tight text-white drop-shadow-lg sm:text-5xl lg:text-6xl"
              style={{ fontFamily: "'Ma Shan Zheng', 'Noto Sans SC', serif", letterSpacing: '0.05em' }}>
              认养一棵橙
              <br />
              <span className="text-yellow-100 drop-shadow-md"
                style={{ fontFamily: "'Ma Shan Zheng', 'Noto Sans SC', serif" }}>
                留住一季香
              </span>
            </h1>

            <p className="animate-fade-up animate-delay-300 max-w-md text-base font-medium text-white/90 sm:text-lg"
              style={{ fontFamily: "'Noto Sans SC', sans-serif" }}>
              从果园到餐桌，橙留香陪你全程守护每一颗果实的成长
            </p>

            <div className="animate-fade-up animate-delay-400 flex flex-col gap-3 sm:flex-row">
              <Link href="/adopt">
                <Button size="lg"
                  className="h-13 rounded-full bg-white px-10 text-base font-bold text-[#F97316] shadow-xl shadow-orange-900/20 transition-all hover:scale-105 hover:bg-white hover:shadow-2xl">
                  <Sparkles className="mr-2 size-4" />
                  立即认养
                </Button>
              </Link>
              <Link href="/about">
                <Button variant="outline" size="lg"
                  className="h-13 rounded-full border-2 border-white/50 bg-white/10 px-10 text-base font-semibold text-white backdrop-blur-sm transition-all hover:border-white/80 hover:bg-white/20">
                  了解更多
                </Button>
              </Link>
            </div>

            {/* Trust indicators */}
            <div className="animate-fade-up animate-delay-500 flex flex-wrap items-center justify-center gap-5 text-sm text-white/80 lg:justify-start">
              <span className="flex items-center gap-1.5"><Shield className="size-4" /> 品质保障</span>
              <span className="flex items-center gap-1.5"><Truck className="size-4" /> 产地直发</span>
              <span className="flex items-center gap-1.5"><Star className="size-4 fill-current" /> 10000+ 用户信赖</span>
            </div>
          </div>

          {/* ── Right: product box image ── */}
          <div className="animate-fade-up animate-delay-300 relative flex-shrink-0 lg:flex-1">
            {/* Glow behind box */}
            <div className="absolute inset-4 rounded-3xl bg-yellow-300/20 blur-2xl" />
            <div className="relative overflow-hidden rounded-3xl shadow-2xl shadow-orange-900/30"
              style={{ animation: 'hero-float-2 8s ease-in-out infinite' }}>
              <Image
                src={images.coverBox}
                alt="赣南脐橙家庭认养礼盒"
                width={600}
                height={450}
                className="w-full object-cover"
                priority
              />
              {/* Shine overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent" />
            </div>
            {/* Floating badge */}
            <div className="absolute -right-3 -top-3 rounded-2xl bg-white px-4 py-2 shadow-lg shadow-orange-200/40">
              <p className="text-xs font-bold text-[#F97316]">🌱 产地直发</p>
              <p className="text-[10px] text-neutral-500">赣南脐橙原产地</p>
            </div>
          </div>

        </div>
      </section>

      {/* ─── Stats Bar ─── */}
      <section className="relative z-10 -mt-8 px-4">
        <div className="mx-auto max-w-4xl rounded-2xl bg-white px-6 py-6 shadow-xl shadow-orange-900/8">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {stats.map((stat, i) => (
              <div key={stat.label} className={`animate-fade-up text-center ${
                i === 0 ? 'animate-delay-300' : i === 1 ? 'animate-delay-400' : i === 2 ? 'animate-delay-500' : 'animate-delay-600'
              }`}>
                <div className="stat-number text-2xl font-extrabold sm:text-3xl">{stat.value}</div>
                <div className="mt-1 text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 认养流程 ─── */}
      <section className="bg-background px-4 pb-20 pt-28">
        <div className="mx-auto max-w-5xl">
          <div className="animate-fade-up mb-4 text-center">
            <span className="inline-block rounded-full bg-orange-100 px-4 py-1.5 text-sm font-semibold text-[#F97316]">
              简单四步
            </span>
          </div>
          <h2 className="animate-fade-up animate-delay-100 mb-4 text-center text-2xl font-extrabold sm:text-4xl" style={{ fontFamily: "'ZCOOL XiaoWei', 'Noto Sans SC', serif", letterSpacing: '0.05em' }}>
            认养，就是这么简单
          </h2>
          <p className="animate-fade-up animate-delay-200 mx-auto mb-14 max-w-md text-center text-muted-foreground">
            四步即可拥有你的专属橙树
          </p>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, i) => (
              <div
                key={step.title}
                className={`animate-fade-up group relative flex flex-col items-center text-center ${
                  i === 0 ? 'animate-delay-200' : i === 1 ? 'animate-delay-300' : i === 2 ? 'animate-delay-400' : 'animate-delay-500'
                }`}
              >
                {/* connector line */}
                {i > 0 && (
                  <div className="absolute -left-4 top-10 hidden h-[2px] w-8 bg-gradient-to-r from-orange-200 to-orange-300 lg:block" />
                )}

                <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-50 to-orange-100 text-[#F97316] shadow-md shadow-orange-100 transition-all duration-300 group-hover:-translate-y-1 group-hover:bg-gradient-to-br group-hover:from-[#F97316] group-hover:to-[#EA580C] group-hover:text-white group-hover:shadow-lg group-hover:shadow-orange-200">
                  <step.icon className="size-8" />
                </div>

                <span className="mb-2 inline-block rounded-full bg-orange-50 px-3 py-0.5 text-xs font-bold tracking-wider text-[#F97316]">
                  STEP {i + 1}
                </span>
                <h3 className="mb-1 text-lg font-bold">{step.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 精选套餐 ─── */}
      <section className="bg-gradient-to-b from-orange-50/80 to-background px-4 py-20">
        <div className="mx-auto max-w-5xl">
          <div className="animate-fade-up mb-4 text-center">
            <span className="inline-block rounded-full bg-orange-100 px-4 py-1.5 text-sm font-semibold text-[#F97316]">
              精选方案
            </span>
          </div>
          <h2 className="animate-fade-up animate-delay-100 mb-4 text-center text-2xl font-extrabold sm:text-4xl" style={{ fontFamily: "'ZCOOL XiaoWei', 'Noto Sans SC', serif", letterSpacing: '0.05em' }}>
            精选认养套餐
          </h2>
          <p className="animate-fade-up animate-delay-200 mx-auto mb-14 max-w-md text-center text-muted-foreground">
            总有一款适合你
          </p>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {plans.map((plan, idx) => (
              <Card
                key={plan.name}
                className={`card-hover animate-fade-up relative overflow-visible ${
                  idx === 0 ? 'animate-delay-200' : idx === 1 ? 'animate-delay-300' : 'animate-delay-400'
                } ${
                  plan.recommended
                    ? 'card-recommended card-recommended-hover border-2 border-[#F97316] shadow-xl shadow-orange-200/50 lg:scale-105'
                    : 'border border-orange-100'
                }`}
              >
                {plan.recommended && (
                  <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-[#F97316] to-[#EA580C] px-5 py-1 text-xs font-bold text-white shadow-lg shadow-orange-300/50">
                    最受欢迎
                  </span>
                )}
                <CardHeader className="items-center pb-2 text-center">
                  <CardTitle className="text-xl font-bold">{plan.name}</CardTitle>
                  <CardDescription className="text-sm">
                    {plan.weight} &middot; {plan.deliveries}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col items-center gap-5">
                  <div className="flex items-baseline gap-1">
                    <span className="text-base text-muted-foreground">&#xA5;</span>
                    <span className={`text-5xl font-extrabold ${plan.recommended ? 'text-[#F97316]' : 'text-foreground'}`}>
                      {plan.price}
                    </span>
                    <span className="text-sm text-muted-foreground">/年</span>
                  </div>
                  <div className="h-px w-full bg-gradient-to-r from-transparent via-orange-200 to-transparent" />
                  <ul className="w-full space-y-3">
                    {plan.features.map((f) => (
                      <li
                        key={f}
                        className="flex items-center gap-2.5 text-sm text-muted-foreground"
                      >
                        <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-orange-100 text-[#F97316]">
                          <ChevronRight className="size-3" />
                        </div>
                        {f}
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter className="justify-center border-t-0 bg-transparent pt-2">
                  <Link href={`/adopt/${plan.id}`} className="w-full">
                    <Button
                      className={`w-full rounded-full py-6 text-base font-bold transition-all ${
                        plan.recommended
                          ? 'bg-gradient-to-r from-[#F97316] to-[#EA580C] shadow-lg shadow-orange-300/40 hover:shadow-xl hover:shadow-orange-300/50'
                          : 'border-2 border-orange-200 bg-transparent text-[#F97316] hover:bg-orange-50'
                      }`}
                      variant={plan.recommended ? 'default' : 'outline'}
                    >
                      立即认养
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 果园预览 ─── */}
      <section className="bg-background px-4 py-20">
        <div className="mx-auto max-w-5xl">
          <div className="flex flex-col gap-10 lg:flex-row lg:items-center">
            <div className="animate-fade-up flex-1 space-y-5">
              <span className="inline-block rounded-full bg-green-100 px-4 py-1.5 text-sm font-semibold text-green-700">
                赣南果园
              </span>
              <h2 className="text-2xl font-extrabold sm:text-4xl" style={{ fontFamily: "'ZCOOL XiaoWei', 'Noto Sans SC', serif", letterSpacing: '0.05em' }}>
                走进我们的果园
              </h2>
              <p className="text-base leading-relaxed text-muted-foreground">
                我们的果园位于江西赣南，这里日照充足、雨量充沛，是世界公认的脐橙最佳产区之一。
                每一棵橙树都经过精心养护，只为给您带来最甜美的果实。
              </p>
              <Link
                href="/orchard"
                className="group inline-flex items-center gap-2 text-sm font-bold text-[#F97316] transition-colors hover:text-[#C2410C]"
              >
                查看更多动态
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
            {/* Image grid with real photos */}
            <div className="animate-fade-up animate-delay-300 grid flex-1 grid-cols-2 gap-4">
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-lg">
                <Image src={images.orangeTree1} alt="果园实景" fill className="object-cover transition-transform duration-500 hover:scale-110" />
                <div className="absolute bottom-3 left-3 rounded-lg bg-white/80 px-2.5 py-1 text-xs font-semibold text-[#F97316] backdrop-blur-sm">
                  果园实景
                </div>
              </div>
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-lg">
                <Image src={images.orangeTree2} alt="橙树养护" fill className="object-cover transition-transform duration-500 hover:scale-110" />
                <div className="absolute bottom-3 left-3 rounded-lg bg-white/80 px-2.5 py-1 text-xs font-semibold text-green-700 backdrop-blur-sm">
                  橙树养护
                </div>
              </div>
              <div className="relative col-span-2 aspect-[2/1] overflow-hidden rounded-2xl shadow-lg">
                <Image src={images.orchardLandscape} alt="赣南脐橙产区全景" fill className="object-cover transition-transform duration-500 hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                <div className="absolute bottom-3 left-3 rounded-lg bg-white/80 px-2.5 py-1 text-xs font-semibold text-[#F97316] backdrop-blur-sm">
                  赣南脐橙产区全景
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 用户评价 ─── */}
      <ReviewSection />

      {/* ─── CTA Banner ─── */}
      <section className="px-4 py-16">
        <div className="mx-auto max-w-4xl overflow-hidden rounded-3xl bg-gradient-to-r from-[#F97316] via-[#EA580C] to-[#FB923C] px-8 py-14 text-center shadow-2xl shadow-orange-200/40 sm:px-16">
          <div className="mx-auto max-w-xl">
            <h2 className="mb-4 text-2xl font-extrabold text-white sm:text-3xl" style={{ fontFamily: "'ZCOOL XiaoWei', 'Noto Sans SC', serif", letterSpacing: '0.05em' }}>
              开启你的认养之旅
            </h2>
            <p className="mb-8 text-white/90">
              现在加入，即可获得专属橙树认养证书和果园直播权限
            </p>
            <Link href="/adopt">
              <Button
                size="lg"
                className="h-13 rounded-full bg-white px-12 text-base font-bold text-[#F97316] shadow-xl transition-all hover:scale-105 hover:bg-white"
              >
                <Sparkles className="mr-2 size-4" />
                立即认养
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

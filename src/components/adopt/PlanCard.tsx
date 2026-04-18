import Link from "next/link"
import { Check, Crown, Flame, Heart } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import type { MockPlan } from "@/lib/mock-data"

/* ── gradient & accent maps ── */

const tierConfig: Record<
  string,
  {
    gradient: string
    accent: string
    icon: typeof Flame
    badge?: string
  }
> = {
  尝鲜套餐: {
    gradient: "from-orange-300 via-orange-200 to-amber-100",
    accent: "text-orange-600",
    icon: Flame,
  },
  家庭套餐: {
    gradient: "from-orange-500 via-orange-400 to-amber-300",
    accent: "text-orange-700",
    icon: Heart,
    badge: "最受欢迎",
  },
  豪华套餐: {
    gradient: "from-amber-600 via-orange-500 to-yellow-400",
    accent: "text-amber-700",
    icon: Crown,
  },
}

const defaultTier = {
  gradient: "from-orange-400 via-orange-300 to-amber-200",
  accent: "text-orange-600",
  icon: Flame,
}

/* ── Component ── */

interface PlanCardProps {
  plan: MockPlan
  variant?: "grid" | "featured"
}

export function PlanCard({ plan, variant = "grid" }: PlanCardProps) {
  const tier = tierConfig[plan.name] ?? defaultTier
  const isPopular = !!tier.badge

  return (
    <Card
      className={cn(
        "card-hover relative flex flex-col overflow-visible border-0 shadow-md",
        isPopular && "card-recommended ring-2 ring-primary/30 shadow-xl",
        variant === "featured" && "lg:scale-105"
      )}
    >
      {/* ── Popular badge ── */}
      {isPopular && (
        <span className="absolute -top-3 left-1/2 z-10 -translate-x-1/2 rounded-full bg-primary px-4 py-1 text-xs font-bold text-primary-foreground shadow-md">
          {tier.badge}
        </span>
      )}

      {/* ── Gradient header area ── */}
      <div
        className={cn(
          "flex flex-col items-center gap-2 rounded-t-xl bg-gradient-to-br px-6 pb-6 pt-8",
          tier.gradient
        )}
      >
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/80 shadow-sm">
          <tier.icon className={cn("size-6", tier.accent)} />
        </div>
        <CardHeader className="items-center p-0 text-center">
          <CardTitle className="text-xl font-bold text-gray-900">
            {plan.name}
          </CardTitle>
          <CardDescription className="text-gray-700/80">
            认养周期 {plan.duration} 个月
          </CardDescription>
        </CardHeader>

        {/* ── Price ── */}
        <div className="mt-2 flex items-baseline gap-0.5">
          <span className="text-sm font-semibold text-gray-700">¥</span>
          <span className="text-4xl font-extrabold tracking-tight text-gray-900">
            {plan.price}
          </span>
          <span className="text-sm text-gray-600">/年</span>
        </div>
      </div>

      {/* ── Features ── */}
      <CardContent className="flex flex-1 flex-col gap-3 px-6 pt-6">
        <ul className="space-y-2.5">
          {plan.features.map((f) => (
            <li key={f} className="flex items-start gap-2.5 text-sm">
              <Check className="mt-0.5 size-4 shrink-0 text-primary" />
              <span className="text-muted-foreground">{f}</span>
            </li>
          ))}
        </ul>
      </CardContent>

      {/* ── CTA ── */}
      <CardFooter className="border-t-0 bg-transparent px-6 pb-6">
        <Link href={`/adopt/${plan.id}`} className="w-full">
          <Button
            className={cn(
              "h-11 w-full rounded-full text-base font-semibold transition-all",
              isPopular
                ? "bg-primary text-primary-foreground shadow-lg hover:bg-primary/90 hover:shadow-xl"
                : "border-2 border-primary/30 bg-transparent text-primary hover:bg-primary hover:text-primary-foreground"
            )}
            variant={isPopular ? "default" : "outline"}
          >
            立即认养
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}

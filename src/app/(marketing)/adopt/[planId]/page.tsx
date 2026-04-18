import { notFound } from "next/navigation"
import { mockPlans, mockTrees } from "@/lib/mock-data"
import { PlanDetailClient } from "./PlanDetailClient"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ planId: string }>
}) {
  const { planId } = await params
  const plan = mockPlans.find((p) => p.id === planId)
  if (!plan) return { title: "套餐未找到" }
  return {
    title: `${plan.name} — 认养一个橙子`,
    description: plan.description,
  }
}

export default async function PlanDetailPage({
  params,
}: {
  params: Promise<{ planId: string }>
}) {
  const { planId } = await params
  const plan = mockPlans.find((p) => p.id === planId)
  if (!plan) notFound()

  const availableTrees = mockTrees.filter((t) => t.status === "AVAILABLE")

  return <PlanDetailClient plan={plan} trees={availableTrees} />
}

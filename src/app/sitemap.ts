import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://adopt-an-orange.com'

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/adopt`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/orchard`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/orchard/live`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
  ]

  // TODO: 动态套餐页 — 当有 /adopt/[id] 路由时，从数据库获取套餐列表
  // const plans = await getPlans()
  // const planPages = plans.map((plan) => ({
  //   url: `${baseUrl}/adopt/${plan.id}`,
  //   lastModified: plan.updatedAt,
  //   changeFrequency: 'weekly' as const,
  //   priority: 0.8,
  // }))

  // TODO: 动态动态详情页 — 当有 /orchard/[id] 路由时，从数据库获取动态列表
  // const updates = await getOrchardUpdates()
  // const updatePages = updates.map((update) => ({
  //   url: `${baseUrl}/orchard/${update.id}`,
  //   lastModified: update.publishedAt,
  //   changeFrequency: 'monthly' as const,
  //   priority: 0.6,
  // }))

  return [
    ...staticPages,
    // ...planPages,
    // ...updatePages,
  ]
}

// 免费可商用图片资源 (Unsplash)
// 所有图片均来自 Unsplash，免费商用无需署名

export const images = {
  // 橙子特写 — 用于套餐卡片、产品展示
  orangeCloseup1: "https://images.unsplash.com/photo-1582979512210-99b6a53386f9?w=800&q=80",
  orangeCloseup2: "https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?w=800&q=80",
  orangeCloseup3: "https://images.unsplash.com/photo-1547514701-42782101795e?w=800&q=80",

  // 橙树/果园 — 用于 Hero 背景、果园展示
  orangeTree1: "https://images.unsplash.com/photo-1564750497011-ead0ce4b9448?w=1200&q=80",
  orangeTree2: "https://images.unsplash.com/photo-1603048588665-791ca8aea617?w=1200&q=80",
  orangeOrchard1: "https://images.unsplash.com/photo-1501004318855-dc2ecb527c4b?w=1200&q=80",

  // 果园风景 — 用于果园动态、关于页面
  orchardLandscape: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=1200&q=80",
  orchardSunset: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200&q=80",

  // 采摘/收获 — 用于流程展示
  harvest1: "https://images.unsplash.com/photo-1595272568891-123402d0fb3b?w=800&q=80",
  harvest2: "https://images.unsplash.com/photo-1557800636-894a64c1696f?w=800&q=80",

  // 橙汁/切面 — 用于装饰
  orangeSlice: "https://images.unsplash.com/photo-1587735243615-c03f25aaff15?w=800&q=80",
  orangeJuice: "https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=800&q=80",
} as const

// 套餐对应图片
export const planImages = {
  "plan-1": images.orangeCloseup1, // 尝鲜套餐
  "plan-2": images.orangeCloseup2, // 家庭套餐
  "plan-3": images.orangeCloseup3, // 豪华套餐
} as Record<string, string>

// 果园对应图片
export const orchardImages = {
  orchard1: images.orangeOrchard1,
  orchard2: images.orchardLandscape,
} as Record<string, string>

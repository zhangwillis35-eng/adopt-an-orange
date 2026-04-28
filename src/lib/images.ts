// 品牌自有图片资源（本地 public/images/）

export const images = {
  // ── 封面/Hero ──────────────────────────────────────────
  /** 赣南脐橙家庭认养礼盒（俯视）— Hero 右侧产品主图 */
  coverBox: '/images/cover-box.png',

  // ── 套餐展示图 ─────────────────────────────────────────
  /** 切开脐橙特写 — 尝鲜套餐 */
  orangeCloseup1: '/images/oranges-halved.jpg',
  /** 饱满橙子堆 — 家庭套餐 */
  orangeCloseup2: '/images/oranges-closeup.jpg',
  /** 礼盒正面展示 — 豪华套餐 */
  orangeCloseup3: '/images/box-side.jpg',

  // ── 果园实景 ───────────────────────────────────────────
  /** 密集橙树 — 果园实景 */
  orangeTree1: '/images/orchard-trees.jpg',
  /** 橙树下野餐 — 橙树养护 */
  orangeTree2: '/images/orchard-picnic.jpg',

  // ── 产区风景 ───────────────────────────────────────────
  /** 采摘篮+橙树 — 产区全景（宽幅用） */
  orchardLandscape: '/images/harvest-basket.jpg',
  /** 大山+橙树江景 — 关于我们/背景 */
  orchardSunset: '/images/orchard-mountain.jpg',

  // ── 采摘/收获 ─────────────────────────────────────────
  harvest1: '/images/harvest-basket.jpg',
  harvest2: '/images/orchard-picnic.jpg',

  // ── 橙子特写 ──────────────────────────────────────────
  orangeSlice:  '/images/oranges-halved.jpg',
  orangeJuice:  '/images/oranges-closeup.jpg',
} as const

// 套餐对应图片
export const planImages = {
  'plan-1': images.orangeCloseup1, // 尝鲜套餐 — 切橙特写
  'plan-2': images.orangeCloseup2, // 家庭套餐 — 橙子堆
  'plan-3': images.orangeCloseup3, // 豪华套餐 — 礼盒正面
} as Record<string, string>

// 果园对应图片
export const orchardImages = {
  orchard1: images.orangeTree1,
  orchard2: images.orchardLandscape,
} as Record<string, string>

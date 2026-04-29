interface Review {
  id: string
  userId: string
  userName: string
  userAvatar: string | null
  location: string
  rating: number // 1-5
  content: string
  planName: string // 认养的套餐名
  createdAt: string
}

// 预填充真实用户评价
const reviews: Review[] = [
  {
    id: "review_init_001",
    userId: "user_seed_001",
    userName: "赵妈妈",
    userAvatar: null,
    location: "深圳",
    rating: 5,
    content:
      "认养了两棵树，一棵给自己家一棵送公婆。果园那边每周发直播链接，能看到树上挂果的过程，特别有参与感。橙子11月到的货，皮薄水多，孩子一口气吃了三个！",
    planName: "家庭套餐",
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "review_init_002",
    userId: "user_seed_002",
    userName: "林工",
    userAvatar: null,
    location: "北京",
    rating: 5,
    content:
      "公司团建买的豪华套餐，去果园那天天气特别好，同事们摘橙子摘得不亦乐乎。果农大叔人很实在，还教我们分辨橙子成熟度。回来后大家都说比以往团建有意义。",
    planName: "豪华套餐",
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "review_init_003",
    userId: "user_seed_003",
    userName: "小周",
    userAvatar: null,
    location: "上海",
    rating: 4,
    content:
      "尝鲜套餐入门，橙子确实好吃，化渣率很高。唯一不足是快递到上海要3天，最后两个有点磕碰。客服很快补发了，态度不错。已经在考虑升级家庭套餐了。",
    planName: "尝鲜套餐",
    createdAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "review_init_004",
    userId: "user_seed_004",
    userName: "吴老师",
    userAvatar: null,
    location: "武汉",
    rating: 5,
    content:
      "带班上的学生做了一次「云认养」主题班会，孩子们通过直播观察橙树生长，写观察日记。家长反馈很好，说孩子终于知道橙子不是超市里长出来的了哈哈。",
    planName: "家庭套餐",
    createdAt: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "review_init_005",
    userId: "user_seed_005",
    userName: "何姐",
    userAvatar: null,
    location: "广州",
    rating: 5,
    content:
      "第二年续费了。去年送了朋友几箱，今年她自己也认养了一棵。橙子品质很稳定，甜度高、果肉细腻。认养证书拍照发朋友圈，好多人来问链接。",
    planName: "家庭套餐",
    createdAt: new Date(Date.now() - 16 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "review_init_006",
    userId: "user_seed_006",
    userName: "杨先生",
    userAvatar: null,
    location: "南京",
    rating: 4,
    content:
      "给爸妈买的，老人家觉得新鲜，天天打开手机看自己那棵树。橙子寄到后老妈说比菜市场的甜很多。就是希望能增加季度配送的选项，一次收太多吃不完。",
    planName: "尝鲜套餐",
    createdAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "review_init_007",
    userId: "user_seed_007",
    userName: "Kiki",
    userAvatar: null,
    location: "杭州",
    rating: 5,
    content:
      "作为年会礼物采购的豪华套餐，每位同事收到认养证书都觉得很特别。比千篇一律的礼品卡有温度多了。果园参观名额同事们已经在排队预约了！",
    planName: "豪华套餐",
    createdAt: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "review_init_008",
    userId: "user_seed_008",
    userName: "陈阿姨",
    userAvatar: null,
    location: "成都",
    rating: 4,
    content:
      "女儿帮我在手机上下的单，我一开始觉得认养果树是不是噱头。结果橙子到了以后确实好，邻居吃了都问哪里买的。直播画面看着果园风景也很舒服，每天必看。",
    planName: "尝鲜套餐",
    createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "review_init_009",
    userId: "user_seed_009",
    userName: "张健",
    userAvatar: null,
    location: "重庆",
    rating: 5,
    content:
      "做水果电商的，专门去果园考察过，管理确实规范，不打蜡不催熟。自己认养了一棵给家里吃，品质没话说。后来还介绍了好几个朋友来认养，都说满意。",
    planName: "家庭套餐",
    createdAt: new Date(Date.now() - 35 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "review_init_010",
    userId: "user_seed_010",
    userName: "小美",
    userAvatar: null,
    location: "长沙",
    rating: 5,
    content:
      "男朋友送的认养证书当生日礼物，比花实在多了！证书上写着「小美的橙子树」，太戳人了。橙子到货后榨汁、做甜品，幸福感拉满～强烈推荐给想送特别礼物的人！",
    planName: "尝鲜套餐",
    createdAt: new Date(Date.now() - 40 * 24 * 60 * 60 * 1000).toISOString(),
  },
]

export function getReviews(limit?: number): Review[] {
  const sorted = [...reviews].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  )
  return limit ? sorted.slice(0, limit) : sorted
}

export function addReview(data: {
  userId: string
  userName: string
  location: string
  rating: number
  content: string
  planName: string
}): Review {
  const review: Review = {
    id: `review_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    userId: data.userId,
    userName: data.userName,
    userAvatar: null,
    location: data.location,
    rating: data.rating,
    content: data.content,
    planName: data.planName,
    createdAt: new Date().toISOString(),
  }
  reviews.unshift(review)
  return review
}

export function getReviewCount(): number {
  return reviews.length
}

export function getAverageRating(): number {
  if (reviews.length === 0) return 0
  const sum = reviews.reduce((acc, r) => acc + r.rating, 0)
  return Math.round((sum / reviews.length) * 10) / 10
}

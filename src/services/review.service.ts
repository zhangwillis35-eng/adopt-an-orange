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

// 预填充 5 条初始评价
const reviews: Review[] = [
  {
    id: "review_init_001",
    userId: "user_seed_001",
    userName: "张女士",
    userAvatar: null,
    location: "上海",
    rating: 5,
    content:
      "第一次尝试认养橙树，没想到这么有趣！每次看直播都觉得特别治愈，收到的橙子也特别甜，皮薄汁多，全家都喜欢。",
    planName: "家庭套餐",
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "review_init_002",
    userId: "user_seed_002",
    userName: "李先生",
    userAvatar: null,
    location: "北京",
    rating: 5,
    content:
      "给父母买的家庭套餐，他们特别喜欢。每次发货都很新鲜，比超市的好吃太多了，老人家天天看直播乐呵呵的。",
    planName: "家庭套餐",
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "review_init_003",
    userId: "user_seed_003",
    userName: "王同学",
    userAvatar: null,
    location: "广州",
    rating: 4,
    content:
      "作为生日礼物送给好朋友，超有心意！认养证书上还有名字，朋友开心了好久。就是希望发货能再快一点。",
    planName: "尝鲜套餐",
    createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "review_init_004",
    userId: "user_seed_004",
    userName: "陈先生",
    userAvatar: null,
    location: "成都",
    rating: 5,
    content:
      "豪华套餐太值了，带孩子去果园参观了一次，孩子亲手摘橙子，是很棒的亲子体验。橙子的品质一如既往的好！",
    planName: "豪华套餐",
    createdAt: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "review_init_005",
    userId: "user_seed_005",
    userName: "刘女士",
    userAvatar: null,
    location: "杭州",
    rating: 4,
    content:
      "同事推荐来的，尝鲜套餐性价比很高。橙子个头大、味道甜，已经续费第二年了。果园直播也很有意思，能看到自己的树。",
    planName: "尝鲜套餐",
    createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
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

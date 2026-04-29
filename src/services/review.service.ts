import { prisma } from "@/lib/prisma"

export async function getReviews(limit?: number) {
  return prisma.review.findMany({
    orderBy: { createdAt: "desc" },
    ...(limit ? { take: limit } : {}),
    include: {
      _count: { select: { likes: true, replies: true } },
    },
  })
}

export async function addReview(data: {
  userId: string
  userName: string
  location: string
  rating: number
  content: string
  planName: string
}) {
  return prisma.review.create({ data })
}

export async function getReviewCount() {
  return prisma.review.count()
}

export async function getAverageRating() {
  const result = await prisma.review.aggregate({
    _avg: { rating: true },
  })
  return result._avg.rating
    ? Math.round(result._avg.rating * 10) / 10
    : 0
}

// ─── Likes ───────────────────────────────────────────────

export async function toggleLike(reviewId: string, visitorId: string) {
  const existing = await prisma.reviewLike.findUnique({
    where: { reviewId_visitorId: { reviewId, visitorId } },
  })
  if (existing) {
    await prisma.reviewLike.delete({ where: { id: existing.id } })
    return { liked: false }
  }
  await prisma.reviewLike.create({ data: { reviewId, visitorId } })
  return { liked: true }
}

export async function getLikeCount(reviewId: string) {
  return prisma.reviewLike.count({ where: { reviewId } })
}

export async function isLikedByVisitor(reviewId: string, visitorId: string) {
  const like = await prisma.reviewLike.findUnique({
    where: { reviewId_visitorId: { reviewId, visitorId } },
  })
  return !!like
}

// ─── Replies ─────────────────────────────────────────────

export async function getReplies(reviewId: string) {
  return prisma.reviewReply.findMany({
    where: { reviewId },
    orderBy: { createdAt: "asc" },
  })
}

export async function addReply(data: {
  reviewId: string
  userId: string
  userName: string
  content: string
}) {
  return prisma.reviewReply.create({ data })
}

import { prisma } from "@/lib/prisma"

export async function getReviews(limit?: number) {
  return prisma.review.findMany({
    orderBy: { createdAt: "desc" },
    ...(limit ? { take: limit } : {}),
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

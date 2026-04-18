import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import type {} from "@/lib/auth-types"

// 模拟用户存储（后续接入真实数据库后替换为 PrismaAdapter）
const mockUsers = new Map<string, { id: string; phone: string; nickname: string; role: string; avatar: string | null }>()

export const { handlers, signIn, signOut, auth } = NextAuth({
  session: { strategy: "jwt" },
  pages: {
    signIn: "/login",
  },
  providers: [
    Credentials({
      id: "phone-code",
      name: "手机验证码登录",
      credentials: {
        phone: { label: "手机号", type: "tel" },
        code: { label: "验证码", type: "text" },
        nickname: { label: "昵称", type: "text" },
      },
      async authorize(credentials) {
        const phone = credentials?.phone as string | undefined
        const code = credentials?.code as string | undefined
        const nickname = credentials?.nickname as string | undefined

        if (!phone || !code) return null

        // 验证码硬编码为 123456
        if (code !== "123456") return null

        // 查找或创���用户（内存模拟）
        let user = mockUsers.get(phone)

        if (!user) {
          const id = `user_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`
          user = {
            id,
            phone,
            nickname: nickname || `用户${phone.slice(-4)}`,
            role: "CUSTOMER",
            avatar: null,
          }
          mockUsers.set(phone, user)
        }

        return {
          id: user.id,
          name: user.nickname,
          phone: user.phone,
          role: user.role,
          image: user.avatar,
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id as string
        token.role = (user as { role?: string }).role || "CUSTOMER"
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string
        session.user.role = token.role as string
      }
      return session
    },
  },
})

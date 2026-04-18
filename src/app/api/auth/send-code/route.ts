import { NextResponse } from "next/server"

export async function POST(request: Request) {
  const body = await request.json()
  const { phone } = body

  if (!phone || !/^1[3-9]\d{9}$/.test(phone)) {
    return NextResponse.json(
      { success: false, message: "请输入正确的手机号" },
      { status: 400 }
    )
  }

  // TODO: 接入真实短信服务
  // 目前模拟验证码发送，验证码固定为 123456
  console.log(`[Mock SMS] 向 ${phone} 发送验证码: 123456`)

  return NextResponse.json({
    success: true,
    message: "验证码已发送",
  })
}

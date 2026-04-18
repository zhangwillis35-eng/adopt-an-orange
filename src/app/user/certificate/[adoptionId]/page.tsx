"use client"

import React from "react"
import { Award, Share2, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { OrangeMascot } from "@/components/mascot"

const mockCertificate = {
  adoptionId: "adopt-001",
  certificateNo: "CERT-2025-GNA003-001",
  adopterName: "橙子用户",
  treeCode: "GN-A003",
  variety: "赣南脐橙",
  orchardName: "阳光果园",
  orchardLocation: "江西赣州·信丰县",
  startDate: "2025-11-15",
  endDate: "2026-11-15",
  issueDate: "2025-11-15",
}

export default function CertificatePage() {
  const cert = mockCertificate

  return (
    <div className="space-y-6">
      <h1 className="font-heading text-xl font-semibold">认养证书</h1>

      {/* Certificate */}
      <div className="mx-auto max-w-2xl">
        <div
          className="relative overflow-hidden rounded-2xl p-1"
          style={{
            background:
              "linear-gradient(135deg, #FF8C00, #FFD700, #FF8C00, #FFD700, #FF8C00)",
            backgroundSize: "300% 300%",
            animation: "shimmer 4s linear infinite",
          }}
        >
          <div className="relative rounded-xl bg-white p-8 sm:p-12 dark:bg-card">
            {/* Decorative corner patterns */}
            <div className="absolute top-4 left-4 size-12 rounded-tl-lg border-t-2 border-l-2 border-orange-300/60" />
            <div className="absolute top-4 right-4 size-12 rounded-tr-lg border-t-2 border-r-2 border-orange-300/60" />
            <div className="absolute bottom-4 left-4 size-12 rounded-bl-lg border-b-2 border-l-2 border-orange-300/60" />
            <div className="absolute bottom-4 right-4 size-12 rounded-br-lg border-b-2 border-r-2 border-orange-300/60" />

            {/* Watermark */}
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-[0.04]">
              <OrangeMascot size="xl" expression="happy" />
            </div>

            {/* Content */}
            <div className="relative z-10 flex flex-col items-center text-center">
              {/* Icon */}
              <div className="mb-4 flex size-16 items-center justify-center rounded-full bg-gradient-to-br from-orange-400 to-amber-500">
                <Award className="size-8 text-white" />
              </div>

              {/* Title */}
              <h2
                className="mb-1 text-3xl font-bold tracking-wide sm:text-4xl"
                style={{
                  background: "linear-gradient(135deg, #FF8C00, #E05500)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                认养证书
              </h2>
              <p className="mb-8 text-sm text-muted-foreground">
                ADOPTION CERTIFICATE
              </p>

              {/* Decorative line */}
              <div className="mb-8 flex w-full items-center gap-3">
                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-orange-300 to-transparent" />
                <div className="size-2 rotate-45 bg-orange-400" />
                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-orange-300 to-transparent" />
              </div>

              {/* Certificate body */}
              <div className="mb-8 w-full space-y-6 text-left">
                <p className="text-center leading-relaxed text-foreground/80">
                  兹证明 <span className="mx-1 inline-block rounded-md bg-orange-50 px-2 py-0.5 font-semibold text-primary dark:bg-orange-950/30">{cert.adopterName}</span> 已成功认养位于
                  <span className="mx-1 font-medium">{cert.orchardName}</span>
                  （{cert.orchardLocation}）的橙树一棵。
                </p>

                <div className="grid grid-cols-2 gap-x-6 gap-y-4 rounded-xl bg-orange-50/50 p-5 dark:bg-orange-950/10">
                  <div>
                    <p className="text-xs text-muted-foreground">橙树编号</p>
                    <p className="mt-0.5 font-heading font-semibold text-primary">
                      {cert.treeCode}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">品种</p>
                    <p className="mt-0.5 font-heading font-semibold">
                      {cert.variety}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">果园</p>
                    <p className="mt-0.5 font-heading font-semibold">
                      {cert.orchardName}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">认养周期</p>
                    <p className="mt-0.5 font-heading font-semibold">
                      {cert.startDate} ~ {cert.endDate}
                    </p>
                  </div>
                </div>
              </div>

              {/* Decorative line */}
              <div className="mb-6 flex w-full items-center gap-3">
                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-orange-300 to-transparent" />
                <div className="size-2 rotate-45 bg-orange-400" />
                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-orange-300 to-transparent" />
              </div>

              {/* Footer */}
              <div className="flex w-full items-end justify-between">
                <div className="text-left">
                  <p className="text-xs text-muted-foreground">签发日期</p>
                  <p className="text-sm font-medium">{cert.issueDate}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-muted-foreground">证书编号</p>
                  <p className="font-mono text-xs font-medium text-primary">
                    {cert.certificateNo}
                  </p>
                </div>
              </div>

              {/* Stamp effect */}
              <div className="mt-6 flex size-20 items-center justify-center rounded-full border-2 border-dashed border-primary/30">
                <div className="flex size-16 items-center justify-center rounded-full border border-primary/20">
                  <span
                    className="text-xs font-bold"
                    style={{
                      background: "linear-gradient(135deg, #FF8C00, #E05500)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    橙留香
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div className="mt-6 flex justify-center gap-3">
          <Button
            variant="outline"
            className="gap-2"
            onClick={() => alert("分享功能即将上线")}
          >
            <Share2 className="size-4" />
            分享证书
          </Button>
          <Button
            className="gap-2 bg-gradient-to-r from-orange-500 to-amber-500 text-white hover:from-orange-600 hover:to-amber-600"
            onClick={() => alert("下载功能即将上线")}
          >
            <Download className="size-4" />
            下载证书
          </Button>
        </div>
      </div>
    </div>
  )
}

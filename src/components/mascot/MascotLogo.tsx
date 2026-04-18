'use client'

import React from 'react'
import './mascot.css'
import { cn } from '@/lib/utils'

interface MascotLogoProps {
  className?: string
}

export function MascotLogo({ className }: MascotLogoProps) {
  return (
    <div className={cn('inline-flex items-center gap-2', className)}>
      {/* Half-body bust SVG */}
      <svg
        width="36"
        height="36"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0"
      >
        <defs>
          <radialGradient id="logoBodyGrad" cx="50%" cy="40%" r="55%">
            <stop offset="0%" stopColor="#FFD700" />
            <stop offset="50%" stopColor="#FFA500" />
            <stop offset="100%" stopColor="#FF8C00" />
          </radialGradient>
          <linearGradient id="logoLeafGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4CAF50" />
            <stop offset="100%" stopColor="#2E7D32" />
          </linearGradient>
          <radialGradient id="logoBlush" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FF9999" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#FF9999" stopOpacity="0" />
          </radialGradient>
          <clipPath id="logoBust">
            <rect x="0" y="0" width="100" height="100" />
          </clipPath>
        </defs>

        <g clipPath="url(#logoBust)">
          {/* Leaves */}
          <g style={{ transformOrigin: '50px 22px', animation: 'mascot-leaf-sway 3s ease-in-out infinite' }}>
            <path d="M50 22 Q50 12 48 6" stroke="#5D8A3C" strokeWidth="2" strokeLinecap="round" fill="none" />
            <ellipse cx="42" cy="9" rx="8" ry="4" fill="url(#logoLeafGrad)" transform="rotate(-30 42 9)" />
            <ellipse cx="55" cy="7" rx="7" ry="3.5" fill="url(#logoLeafGrad)" transform="rotate(20 55 7)" />
          </g>

          {/* Body */}
          <ellipse cx="50" cy="58" rx="38" ry="42" fill="url(#logoBodyGrad)" />
          {/* Highlight */}
          <ellipse cx="40" cy="44" rx="14" ry="10" fill="white" opacity="0.13" transform="rotate(-20 40 44)" />

          {/* Blush */}
          <circle cx="28" cy="62" r="8" fill="url(#logoBlush)" />
          <circle cx="72" cy="62" r="8" fill="url(#logoBlush)" />

          {/* Eyes with blink */}
          <g style={{ transformOrigin: '50px 52px', animation: 'mascot-blink 4s ease-in-out infinite' }}>
            <ellipse cx="38" cy="52" rx="7" ry="7.5" fill="white" />
            <circle cx="38" cy="52" r="4" fill="#1a1a1a" />
            <circle cx="36" cy="49" r="1.8" fill="white" />

            <ellipse cx="62" cy="52" rx="7" ry="7.5" fill="white" />
            <circle cx="62" cy="52" r="4" fill="#1a1a1a" />
            <circle cx="60" cy="49" r="1.8" fill="white" />
          </g>

          {/* Mouth — smile */}
          <path d="M42 68 Q50 76 58 68" stroke="#6B4226" strokeWidth="2" strokeLinecap="round" fill="none" />
        </g>
      </svg>

      {/* Brand text */}
      <span className="text-base font-bold tracking-tight whitespace-nowrap bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent select-none">
        认养一个橙子
      </span>
    </div>
  )
}

export default MascotLogo

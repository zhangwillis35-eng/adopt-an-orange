'use client'

import React from 'react'
import './mascot.css'
import { cn } from '@/lib/utils'

interface MascotLoadingProps {
  text?: string
  className?: string
}

export function MascotLoading({ text = '加载中', className }: MascotLoadingProps) {
  return (
    <div className={cn('flex flex-col items-center justify-center gap-4 py-12', className)}>
      {/* Bouncing mascot */}
      <div style={{ animation: 'mascot-bounce 0.8s ease-in-out infinite' }}>
        <svg
          width="80"
          height="96"
          viewBox="0 0 200 220"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <radialGradient id="loadBodyGrad" cx="50%" cy="45%" r="50%">
              <stop offset="0%" stopColor="#FFD700" />
              <stop offset="50%" stopColor="#FFA500" />
              <stop offset="100%" stopColor="#FF8C00" />
            </radialGradient>
            <linearGradient id="loadLeafGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#4CAF50" />
              <stop offset="100%" stopColor="#2E7D32" />
            </linearGradient>
            <radialGradient id="loadBlush" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FF9999" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#FF9999" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Leaves */}
          <g style={{ transformOrigin: '100px 42px', animation: 'mascot-leaf-sway 2s ease-in-out infinite' }}>
            <path d="M100 42 Q100 28 97 20" stroke="#5D8A3C" strokeWidth="3" strokeLinecap="round" fill="none" />
            <ellipse cx="88" cy="24" rx="12" ry="6" fill="url(#loadLeafGrad)" transform="rotate(-30 88 24)" />
            <ellipse cx="108" cy="20" rx="11" ry="5.5" fill="url(#loadLeafGrad)" transform="rotate(20 108 20)" />
            <ellipse cx="97" cy="17" rx="7" ry="3.5" fill="#66BB6A" transform="rotate(-10 97 17)" />
          </g>

          {/* Body */}
          <ellipse cx="100" cy="105" rx="58" ry="62" fill="url(#loadBodyGrad)" />
          <ellipse cx="85" cy="85" rx="22" ry="16" fill="white" opacity="0.15" transform="rotate(-20 85 85)" />

          {/* Blush */}
          <circle cx="65" cy="112" r="12" fill="url(#loadBlush)" />
          <circle cx="135" cy="112" r="12" fill="url(#loadBlush)" />

          {/* Eyes — happy squint */}
          <g style={{ transformOrigin: '100px 95px', animation: 'mascot-blink 3s ease-in-out infinite' }}>
            <ellipse cx="80" cy="95" rx="10" ry="11" fill="white" />
            <circle cx="80" cy="95" r="5.5" fill="#1a1a1a" />
            <circle cx="77" cy="91" r="2.5" fill="white" />
            <circle cx="83" cy="93" r="1.2" fill="white" />

            <ellipse cx="120" cy="95" rx="10" ry="11" fill="white" />
            <circle cx="120" cy="95" r="5.5" fill="#1a1a1a" />
            <circle cx="117" cy="91" r="2.5" fill="white" />
            <circle cx="123" cy="93" r="1.2" fill="white" />
          </g>

          {/* Mouth — big smile */}
          <path d="M85 118 Q100 133 115 118" stroke="#6B4226" strokeWidth="2.5" strokeLinecap="round" fill="none" />

          {/* Arms waving */}
          <g>
            <path d="M45 108 Q30 100 25 88" stroke="#FF8C00" strokeWidth="6" strokeLinecap="round" fill="none" />
            <circle cx="25" cy="86" r="5" fill="#FFA500" />
            <g style={{ transformOrigin: '155px 108px', animation: 'mascot-wave-hand 0.6s ease-in-out infinite' }}>
              <path d="M155 108 Q170 100 175 88" stroke="#FF8C00" strokeWidth="6" strokeLinecap="round" fill="none" />
              <circle cx="175" cy="86" r="5" fill="#FFA500" />
            </g>
          </g>

          {/* Legs */}
          <path d="M80 160 Q78 178 75 190 Q73 196 80 196 L90 196 Q94 196 92 190 Q90 180 88 165" fill="#FF8C00" stroke="#E07800" strokeWidth="1" />
          <path d="M112 165 Q110 180 108 190 Q106 196 110 196 L120 196 Q124 196 122 190 Q120 178 118 160" fill="#FF8C00" stroke="#E07800" strokeWidth="1" />
          <ellipse cx="84" cy="197" rx="10" ry="4" fill="#8B4513" />
          <ellipse cx="116" cy="197" rx="10" ry="4" fill="#8B4513" />
        </svg>
      </div>

      {/* Bounce shadow */}
      <div
        className="w-12 h-2 rounded-full bg-gray-300/60"
        style={{ animation: 'mascot-bounce 0.8s ease-in-out infinite reverse' }}
      />

      {/* Loading text */}
      <p className="text-sm text-muted-foreground font-medium">
        {text}
        <span className="inline-block w-6 text-left animate-pulse">...</span>
      </p>
    </div>
  )
}

export default MascotLoading

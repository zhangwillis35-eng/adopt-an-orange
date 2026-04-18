'use client'

import React from 'react'
import './mascot.css'
import { cn } from '@/lib/utils'

interface MascotEmptyProps {
  message: string
  className?: string
}

export function MascotEmpty({ message, className }: MascotEmptyProps) {
  return (
    <div className={cn('flex flex-col items-center justify-center gap-3 py-16', className)}>
      <div style={{ animation: 'mascot-float 3s ease-in-out infinite' }}>
        <svg
          width="140"
          height="200"
          viewBox="0 0 280 360"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <radialGradient id="emptyBodyGrad" cx="50%" cy="45%" r="50%">
              <stop offset="0%" stopColor="#FFD700" />
              <stop offset="50%" stopColor="#FFA500" />
              <stop offset="100%" stopColor="#FF8C00" />
            </radialGradient>
            <linearGradient id="emptyLeafGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#4CAF50" />
              <stop offset="100%" stopColor="#2E7D32" />
            </linearGradient>
            <radialGradient id="emptyBlush" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FF9999" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#FF9999" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* ── Sign board (behind body) ── */}
          <g>
            {/* Sign stick - left */}
            <rect x="95" y="175" width="4" height="80" rx="2" fill="#A1887F" />
            {/* Sign stick - right */}
            <rect x="181" y="175" width="4" height="80" rx="2" fill="#A1887F" />
            {/* Sign board */}
            <rect x="72" y="230" width="136" height="80" rx="8" fill="white" stroke="#E0E0E0" strokeWidth="2" />
            {/* Sign inner border */}
            <rect x="78" y="236" width="124" height="68" rx="5" fill="none" stroke="#FFA726" strokeWidth="1.5" strokeDasharray="4 3" />
          </g>

          {/* ── Leaves ── */}
          <g style={{ transformOrigin: '140px 52px', animation: 'mascot-leaf-sway 2.5s ease-in-out infinite' }}>
            <path d="M140 52 Q140 36 137 26" stroke="#5D8A3C" strokeWidth="3" strokeLinecap="round" fill="none" />
            <ellipse cx="126" cy="30" rx="13" ry="6.5" fill="url(#emptyLeafGrad)" transform="rotate(-30 126 30)" />
            <ellipse cx="148" cy="26" rx="12" ry="5.5" fill="url(#emptyLeafGrad)" transform="rotate(20 148 26)" />
            <ellipse cx="136" cy="22" rx="8" ry="4" fill="#66BB6A" transform="rotate(-10 136 22)" />
          </g>

          {/* ── Body ── */}
          <ellipse cx="140" cy="115" rx="60" ry="65" fill="url(#emptyBodyGrad)" />
          <ellipse cx="123" cy="93" rx="22" ry="16" fill="white" opacity="0.14" transform="rotate(-20 123 93)" />

          {/* ── Blush ── */}
          <circle cx="102" cy="122" r="13" fill="url(#emptyBlush)" />
          <circle cx="178" cy="122" r="13" fill="url(#emptyBlush)" />

          {/* ── Eyes ── */}
          <g style={{ transformOrigin: '140px 105px', animation: 'mascot-blink 4.5s ease-in-out infinite' }}>
            <ellipse cx="118" cy="105" rx="10" ry="11" fill="white" />
            <circle cx="118" cy="105" r="5.5" fill="#1a1a1a" />
            <circle cx="115" cy="101" r="2.5" fill="white" />
            <circle cx="121" cy="103" r="1.2" fill="white" />

            <ellipse cx="162" cy="105" rx="10" ry="11" fill="white" />
            <circle cx="162" cy="105" r="5.5" fill="#1a1a1a" />
            <circle cx="159" cy="101" r="2.5" fill="white" />
            <circle cx="165" cy="103" r="1.2" fill="white" />
          </g>

          {/* ── Mouth — slight smile ── */}
          <path d="M128 130 Q140 140 152 130" stroke="#6B4226" strokeWidth="2.5" strokeLinecap="round" fill="none" />

          {/* ── Arms holding the sign ── */}
          <g>
            {/* Left arm reaching down to sign stick */}
            <path d="M84 118 Q72 140 80 168 Q84 178 95 180" stroke="#FF8C00" strokeWidth="6" strokeLinecap="round" fill="none" />
            <circle cx="95" cy="180" r="5" fill="#FFA500" />

            {/* Right arm reaching down to sign stick */}
            <path d="M196 118 Q208 140 200 168 Q196 178 185 180" stroke="#FF8C00" strokeWidth="6" strokeLinecap="round" fill="none" />
            <circle cx="185" cy="180" r="5" fill="#FFA500" />
          </g>

          {/* ── Legs ── */}
          <g>
            <path d="M118 172 Q116 192 113 204 Q111 210 118 210 L128 210 Q132 210 130 204 Q128 192 126 177" fill="#FF8C00" stroke="#E07800" strokeWidth="1" />
            <path d="M154 177 Q152 192 150 204 Q148 210 152 210 L162 210 Q166 210 164 204 Q162 192 160 172" fill="#FF8C00" stroke="#E07800" strokeWidth="1" />
            <ellipse cx="122" cy="211" rx="10" ry="4" fill="#8B4513" />
            <ellipse cx="158" cy="211" rx="10" ry="4" fill="#8B4513" />
          </g>

          {/* ── Sign text (rendered as SVG text) ── */}
          <foreignObject x="82" y="240" width="116" height="60">
            <div
              style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                fontSize: '13px',
                lineHeight: '1.4',
                color: '#666',
                fontFamily: 'system-ui, sans-serif',
                padding: '4px',
                overflow: 'hidden',
                wordBreak: 'break-word',
              }}
            >
              {message}
            </div>
          </foreignObject>
        </svg>
      </div>
    </div>
  )
}

export default MascotEmpty

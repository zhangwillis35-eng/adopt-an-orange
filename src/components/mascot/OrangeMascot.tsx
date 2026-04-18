'use client'

import React from 'react'
import './mascot.css'
import { cn } from '@/lib/utils'

interface OrangeMascotProps {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  expression?: 'happy' | 'surprised' | 'thinking' | 'waving' | 'sleeping'
  animation?: 'none' | 'bounce' | 'spin' | 'float' | 'wave'
  withCape?: boolean
  className?: string
}

const sizeMap = { sm: 32, md: 64, lg: 128, xl: 256 }

export function OrangeMascot({
  size = 'md',
  expression = 'happy',
  animation = 'none',
  withCape = false,
  className,
}: OrangeMascotProps) {
  const px = sizeMap[size]
  const animStyle: React.CSSProperties =
    animation === 'none'
      ? {}
      : animation === 'bounce'
        ? { animation: 'mascot-bounce 0.8s ease-in-out infinite' }
        : animation === 'float'
          ? { animation: 'mascot-float 3s ease-in-out infinite' }
          : animation === 'spin'
            ? { animation: 'mascot-spin 1.2s linear infinite' }
            : animation === 'wave'
              ? { animation: 'mascot-float 3s ease-in-out infinite' }
              : {}

  return (
    <div className={cn('inline-flex items-center justify-center', className)} style={animStyle}>
      <svg
        width={px}
        height={px}
        viewBox="0 0 200 220"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Body gradient */}
          <radialGradient id="bodyGrad" cx="50%" cy="45%" r="50%">
            <stop offset="0%" stopColor="#FFD700" />
            <stop offset="50%" stopColor="#FFA500" />
            <stop offset="100%" stopColor="#FF8C00" />
          </radialGradient>
          {/* Blush gradient */}
          <radialGradient id="blushGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FF9999" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#FF9999" stopOpacity="0" />
          </radialGradient>
          {/* Cape gradient */}
          <linearGradient id="capeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#E05500" />
            <stop offset="100%" stopColor="#CC4400" />
          </linearGradient>
          {/* Leaf gradient */}
          <linearGradient id="leafGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4CAF50" />
            <stop offset="100%" stopColor="#2E7D32" />
          </linearGradient>
        </defs>

        {/* ── Cape (behind body) ── */}
        {withCape && (
          <g style={{ transformOrigin: '100px 105px', animation: 'mascot-cape-wave 2.5s ease-in-out infinite' }}>
            <path
              d="M60 105 Q45 140 50 185 L80 175 Q75 145 78 115 Z"
              fill="url(#capeGrad)"
            />
            <path
              d="M140 105 Q155 140 150 185 L120 175 Q125 145 122 115 Z"
              fill="url(#capeGrad)"
            />
            {/* Cape collar */}
            <path
              d="M65 100 Q100 115 135 100 Q130 108 100 112 Q70 108 65 100 Z"
              fill="#CC4400"
            />
          </g>
        )}

        {/* ── Leaves ── */}
        <g style={{ transformOrigin: '100px 42px', animation: 'mascot-leaf-sway 2s ease-in-out infinite' }}>
          {/* Stem */}
          <path d="M100 42 Q100 28 97 20" stroke="#5D8A3C" strokeWidth="3" strokeLinecap="round" fill="none" />
          {/* Left leaf */}
          <ellipse cx="88" cy="24" rx="12" ry="6" fill="url(#leafGrad)" transform="rotate(-30 88 24)" />
          {/* Right leaf */}
          <ellipse cx="108" cy="20" rx="11" ry="5.5" fill="url(#leafGrad)" transform="rotate(20 108 20)" />
          {/* Small center leaf */}
          <ellipse cx="97" cy="17" rx="7" ry="3.5" fill="#66BB6A" transform="rotate(-10 97 17)" />
        </g>

        {/* ── Body ── */}
        <ellipse cx="100" cy="105" rx="58" ry="62" fill="url(#bodyGrad)" />
        {/* Subtle body highlight */}
        <ellipse cx="85" cy="85" rx="22" ry="16" fill="white" opacity="0.15" transform="rotate(-20 85 85)" />

        {/* ── Cheeks / Blush ── */}
        <circle cx="65" cy="112" r="12" fill="url(#blushGrad)" />
        <circle cx="135" cy="112" r="12" fill="url(#blushGrad)" />

        {/* ── Eyes ── */}
        <Eyes expression={expression} />

        {/* ── Mouth ── */}
        <Mouth expression={expression} />

        {/* ── Sleeping Zzz ── */}
        {expression === 'sleeping' && (
          <g>
            <text x="145" y="70" fontSize="14" fontWeight="bold" fill="#666" style={{ animation: 'mascot-zzz 2s ease-in-out infinite' }}>Z</text>
            <text x="155" y="58" fontSize="11" fontWeight="bold" fill="#888" style={{ animation: 'mascot-zzz 2s ease-in-out 0.4s infinite' }}>z</text>
            <text x="163" y="48" fontSize="9" fontWeight="bold" fill="#aaa" style={{ animation: 'mascot-zzz 2s ease-in-out 0.8s infinite' }}>z</text>
          </g>
        )}

        {/* ── Arms ── */}
        <Arms expression={expression} animation={animation} />

        {/* ── Legs ── */}
        <g>
          {/* Left leg */}
          <path
            d="M80 160 Q78 178 75 190 Q73 196 80 196 L90 196 Q94 196 92 190 Q90 180 88 165"
            fill="#FF8C00"
            stroke="#E07800"
            strokeWidth="1"
          />
          {/* Right leg */}
          <path
            d="M112 165 Q110 180 108 190 Q106 196 110 196 L120 196 Q124 196 122 190 Q120 178 118 160"
            fill="#FF8C00"
            stroke="#E07800"
            strokeWidth="1"
          />
          {/* Shoes */}
          <ellipse cx="84" cy="197" rx="10" ry="4" fill="#8B4513" />
          <ellipse cx="116" cy="197" rx="10" ry="4" fill="#8B4513" />
        </g>
      </svg>
    </div>
  )
}

/* ── Sub-components ── */

function Eyes({ expression }: { expression: OrangeMascotProps['expression'] }) {
  if (expression === 'sleeping') {
    return (
      <g>
        {/* Closed eyes — arcs */}
        <path d="M75 97 Q80 103 88 97" stroke="#333" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        <path d="M112 97 Q117 103 125 97" stroke="#333" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      </g>
    )
  }

  const surprised = expression === 'surprised'
  const pupilR = surprised ? 7 : 5.5
  const eyeR = surprised ? 12 : 10

  // Thinking: eyes look up-right
  const pupilOffsetX = expression === 'thinking' ? 2 : 0
  const pupilOffsetY = expression === 'thinking' ? -3 : 0

  return (
    <g style={{ transformOrigin: '100px 95px', animation: expression !== 'thinking' ? 'mascot-blink 4s ease-in-out infinite' : 'none' }}>
      {/* Left eye white */}
      <ellipse cx="80" cy="95" rx={eyeR} ry={eyeR + 1} fill="white" />
      {/* Left pupil */}
      <circle cx={80 + pupilOffsetX} cy={95 + pupilOffsetY} r={pupilR} fill="#1a1a1a" />
      {/* Left highlight */}
      <circle cx={77 + pupilOffsetX} cy={91 + pupilOffsetY} r={2.5} fill="white" />
      <circle cx={83 + pupilOffsetX} cy={93 + pupilOffsetY} r={1.2} fill="white" />

      {/* Right eye white */}
      <ellipse cx="120" cy="95" rx={eyeR} ry={eyeR + 1} fill="white" />
      {/* Right pupil */}
      <circle cx={120 + pupilOffsetX} cy={95 + pupilOffsetY} r={pupilR} fill="#1a1a1a" />
      {/* Right highlight */}
      <circle cx={117 + pupilOffsetX} cy={91 + pupilOffsetY} r={2.5} fill="white" />
      <circle cx={123 + pupilOffsetX} cy={93 + pupilOffsetY} r={1.2} fill="white" />

      {/* Eyebrows for thinking */}
      {expression === 'thinking' && (
        <>
          <path d="M70 82 Q80 78 90 82" stroke="#6B4226" strokeWidth="2" strokeLinecap="round" fill="none" />
          <path d="M110 80 Q120 75 130 80" stroke="#6B4226" strokeWidth="2" strokeLinecap="round" fill="none" />
        </>
      )}
    </g>
  )
}

function Mouth({ expression }: { expression: OrangeMascotProps['expression'] }) {
  switch (expression) {
    case 'happy':
    case 'waving':
      return (
        <path
          d="M88 118 Q100 130 112 118"
          stroke="#6B4226"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
        />
      )
    case 'surprised':
      return <ellipse cx="100" cy="122" rx="6" ry="8" fill="#6B4226" />
    case 'thinking':
      return (
        <path
          d="M90 120 Q100 118 110 120"
          stroke="#6B4226"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
        />
      )
    case 'sleeping':
      return (
        <path
          d="M90 118 Q100 122 110 118"
          stroke="#6B4226"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
        />
      )
    default:
      return null
  }
}

function Arms({
  expression,
  animation,
}: {
  expression: OrangeMascotProps['expression']
  animation: OrangeMascotProps['animation']
}) {
  const isWaving = expression === 'waving' || animation === 'wave'

  return (
    <g>
      {/* Left arm */}
      <path
        d="M45 108 Q35 115 30 128 Q28 133 33 132 L38 130"
        stroke="#FF8C00"
        strokeWidth="6"
        strokeLinecap="round"
        fill="none"
      />
      {/* Left hand */}
      <circle cx="32" cy="130" r="5" fill="#FFA500" />

      {/* Right arm — waving if needed */}
      <g
        style={
          isWaving
            ? { transformOrigin: '155px 108px', animation: 'mascot-wave-hand 0.6s ease-in-out infinite' }
            : {}
        }
      >
        <path
          d={
            isWaving
              ? 'M155 108 Q165 95 170 82 Q172 77 167 80 L163 84'
              : 'M155 108 Q165 115 170 128 Q172 133 167 132 L162 130'
          }
          stroke="#FF8C00"
          strokeWidth="6"
          strokeLinecap="round"
          fill="none"
        />
        {/* Right hand */}
        <circle cx={isWaving ? 168 : 168} cy={isWaving ? 80 : 130} r="5" fill="#FFA500" />
      </g>
    </g>
  )
}

export default OrangeMascot

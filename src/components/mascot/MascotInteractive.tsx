'use client'

import React, { useState, useCallback, useEffect, useRef } from 'react'
import { OrangeMascot } from './OrangeMascot'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Smile, Zap, Moon, Flame, Hand, ArrowUp, Swords, TreePine } from 'lucide-react'

interface MascotInteractiveProps {
  treeName?: string
  treeCode: string
  variety: string
  orchardName: string
}

type Expression = 'happy' | 'surprised' | 'sleeping' | 'thinking'
type MascotAnimation = 'none' | 'wave' | 'bounce' | 'spin'

const expressionButtons = [
  { key: 'happy' as Expression, label: '开心', icon: Smile, color: 'bg-amber-500 hover:bg-amber-600 text-white' },
  { key: 'surprised' as Expression, label: '惊讶', icon: Zap, color: 'bg-sky-500 hover:bg-sky-600 text-white' },
  { key: 'sleeping' as Expression, label: '困了', icon: Moon, color: 'bg-indigo-500 hover:bg-indigo-600 text-white' },
  { key: 'thinking' as Expression, label: '生气', icon: Flame, color: 'bg-red-500 hover:bg-red-600 text-white' },
]

const actionButtons = [
  { key: 'wave' as MascotAnimation, label: '招手', icon: Hand, color: 'bg-emerald-500 hover:bg-emerald-600 text-white' },
  { key: 'bounce' as MascotAnimation, label: '跳跃', icon: ArrowUp, color: 'bg-orange-500 hover:bg-orange-600 text-white' },
  { key: 'spin' as MascotAnimation, label: '出招', icon: Swords, color: 'bg-purple-500 hover:bg-purple-600 text-white' },
]

function getDialogues(treeCode: string, orchardName: string, treeName?: string) {
  const nameLabel = treeName || `${treeCode}号橙树`
  return {
    default: [
      '果宝特攻，橙留香报到！',
      `守护${treeCode}号橙树！`,
      '赣南脐橙，天下第一甜！🍊',
      `今天${nameLabel}长大了一点哦~`,
      '阳光雨露，甜蜜成长中！',
      '我会好好守护这棵橙树的！',
    ],
    happy: [
      '太开心啦！你来看我了！🥳',
      `${nameLabel}今天很精神！`,
      `${orchardName}今天阳光很好！`,
      '开心到转圈圈！',
      '有你的关注，橙树更有干劲了！',
    ],
    surprised: [
      '哇！你突然出现了！😮',
      '今天橙树结了好多果子！',
      `${orchardName}下了一场好大的雨！`,
      '不得了！叶子又变绿了！',
      '刚才好像看到一只小鸟！',
    ],
    sleeping: [
      '嗯嗯...别吵...我在看守橙树呢...',
      '做了个好梦...梦到丰收了...',
      `${nameLabel}也在午休哦...💤`,
      '再睡一会儿...果子还没熟呢...',
    ],
    thinking: [
      '哼！谁欺负我的橙树！😤',
      '虫子都给我走开！',
      `不准碰${nameLabel}！`,
      '生气归生气，还是要好好工作！',
      '橙留香生气的样子也很可爱吧？',
    ],
  }
}

export function MascotInteractive({
  treeName,
  treeCode,
  variety,
  orchardName,
}: MascotInteractiveProps) {
  const [expression, setExpression] = useState<Expression>('happy')
  const [animation, setAnimation] = useState<MascotAnimation>('none')
  const [mood, setMood] = useState(60)
  const [interactionCount, setInteractionCount] = useState(0)
  const [dialogue, setDialogue] = useState('')
  const [showBubble, setShowBubble] = useState(false)
  const bubbleTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const animTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const dialogues = getDialogues(treeCode, orchardName, treeName)

  const showDialogue = useCallback(
    (category: keyof typeof dialogues) => {
      const pool = dialogues[category] || dialogues.default
      const text = pool[Math.floor(Math.random() * pool.length)]
      setDialogue(text)
      setShowBubble(true)
      if (bubbleTimer.current) clearTimeout(bubbleTimer.current)
      bubbleTimer.current = setTimeout(() => setShowBubble(false), 3000)
    },
    // dialogues depends on props which are stable
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [treeCode, orchardName, treeName],
  )

  const handleExpression = useCallback(
    (expr: Expression) => {
      setExpression(expr)
      setMood((m) => Math.min(100, m + 5))
      setInteractionCount((c) => c + 1)
      showDialogue(expr)
    },
    [showDialogue],
  )

  const handleAction = useCallback(
    (anim: MascotAnimation) => {
      setAnimation(anim)
      setMood((m) => Math.min(100, m + 8))
      setInteractionCount((c) => c + 1)
      showDialogue(expression)
      if (animTimer.current) clearTimeout(animTimer.current)
      animTimer.current = setTimeout(() => setAnimation('none'), 1500)
    },
    [showDialogue, expression],
  )

  const handleMascotClick = useCallback(() => {
    setMood((m) => Math.min(100, m + 3))
    setInteractionCount((c) => c + 1)
    showDialogue(expression)
  }, [showDialogue, expression])

  // Cleanup timers on unmount
  useEffect(() => {
    return () => {
      if (bubbleTimer.current) clearTimeout(bubbleTimer.current)
      if (animTimer.current) clearTimeout(animTimer.current)
    }
  }, [])

  // Mood decays slowly
  useEffect(() => {
    const interval = setInterval(() => {
      setMood((m) => Math.max(0, m - 1))
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  // Map expression for OrangeMascot (it doesn't have 'thinking' -> use 'thinking', no 'angry')
  const mascotExpression = expression === 'thinking' ? 'thinking' : expression === 'sleeping' ? 'sleeping' : expression === 'surprised' ? 'surprised' : 'happy'
  const mascotAnim = animation === 'wave' ? 'wave' : animation === 'bounce' ? 'bounce' : animation === 'spin' ? 'spin' : 'none'

  const moodLabel = mood >= 80 ? '超级开心' : mood >= 60 ? '心情不错' : mood >= 40 ? '一般般' : mood >= 20 ? '有点低落' : '需要关注'
  const moodColor = mood >= 80 ? 'bg-green-500' : mood >= 60 ? 'bg-amber-400' : mood >= 40 ? 'bg-yellow-500' : mood >= 20 ? 'bg-orange-500' : 'bg-red-500'

  return (
    <Card className="relative overflow-visible border-0 ring-0 bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 dark:from-orange-950/30 dark:via-amber-950/20 dark:to-yellow-950/10">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-orange-700 dark:text-orange-400">
          <span className="text-lg">🍊</span>
          和你的橙树互动
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        {/* Tree info strip */}
        <div className="flex flex-wrap items-center gap-2 rounded-lg bg-white/60 px-3 py-2 text-xs dark:bg-white/5">
          <TreePine className="size-3.5 text-orange-500" />
          <span className="font-medium text-orange-700 dark:text-orange-300">
            {treeName || treeCode}
          </span>
          <span className="text-muted-foreground">·</span>
          <span className="text-muted-foreground">编号 {treeCode}</span>
          <span className="text-muted-foreground">·</span>
          <span className="text-muted-foreground">{variety}</span>
          <span className="text-muted-foreground">·</span>
          <span className="text-muted-foreground">{orchardName}</span>
        </div>

        {/* Mascot display area */}
        <div className="relative flex flex-col items-center">
          {/* Speech bubble */}
          <div
            className={`absolute -top-2 left-1/2 z-10 -translate-x-1/2 transition-all duration-300 ${
              showBubble
                ? 'scale-100 opacity-100'
                : 'pointer-events-none scale-75 opacity-0'
            }`}
          >
            <div className="relative max-w-[240px] rounded-2xl bg-white px-4 py-2.5 text-sm font-medium text-orange-800 shadow-lg ring-1 ring-orange-200 dark:bg-gray-800 dark:text-orange-200 dark:ring-orange-800">
              {dialogue}
              {/* Bubble tail */}
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2">
                <div className="size-0 border-x-[8px] border-t-[8px] border-x-transparent border-t-white dark:border-t-gray-800" />
              </div>
            </div>
          </div>

          {/* Mascot */}
          <button
            type="button"
            onClick={handleMascotClick}
            className="mt-10 cursor-pointer transition-transform hover:scale-105 active:scale-95 focus:outline-none"
            aria-label="点击橙留香互动"
          >
            <OrangeMascot
              size="xl"
              expression={mascotExpression}
              animation={mascotAnim}
              withCape
            />
          </button>
        </div>

        {/* Mood meter */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs">
            <span className="font-medium text-orange-700 dark:text-orange-300">
              心情指数
            </span>
            <span className="text-muted-foreground">
              {moodLabel} · {mood}%
            </span>
          </div>
          <div className="h-2.5 overflow-hidden rounded-full bg-orange-100 dark:bg-orange-900/30">
            <div
              className={`h-full rounded-full transition-all duration-500 ease-out ${moodColor}`}
              style={{ width: `${mood}%` }}
            />
          </div>
        </div>

        {/* Expression buttons */}
        <div className="space-y-2">
          <p className="text-xs font-medium text-muted-foreground">切换表情</p>
          <div className="grid grid-cols-4 gap-2">
            {expressionButtons.map(({ key, label, icon: Icon, color }) => (
              <Button
                key={key}
                onClick={() => handleExpression(key)}
                className={`gap-1 text-xs ${
                  expression === key
                    ? `${color} ring-2 ring-offset-1 ring-offset-orange-50 dark:ring-offset-gray-900`
                    : `${color} opacity-75 hover:opacity-100`
                }`}
                size="sm"
              >
                <Icon className="size-3.5" />
                {label}
              </Button>
            ))}
          </div>
        </div>

        {/* Action buttons */}
        <div className="space-y-2">
          <p className="text-xs font-medium text-muted-foreground">触发动作</p>
          <div className="grid grid-cols-3 gap-2">
            {actionButtons.map(({ key, label, icon: Icon, color }) => (
              <Button
                key={key}
                onClick={() => handleAction(key)}
                className={`gap-1 text-xs ${color}`}
                size="sm"
              >
                <Icon className="size-3.5" />
                {label}
              </Button>
            ))}
          </div>
        </div>

        {/* Interaction counter */}
        <div className="flex items-center justify-center gap-2 rounded-lg bg-white/50 py-2 text-xs text-muted-foreground dark:bg-white/5">
          <span>互动次数</span>
          <span className="font-bold tabular-nums text-orange-600 dark:text-orange-400">
            {interactionCount}
          </span>
        </div>
      </CardContent>
    </Card>
  )
}

export default MascotInteractive

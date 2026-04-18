"use client"

import { useState } from "react"
import {
  TreePine,
  MapPin,
  Calendar,
  Sparkles,
  Check,
  Shuffle,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import type { MockTree } from "@/lib/mock-data"

interface TreeSelectorProps {
  trees: MockTree[]
  selectedTreeId: string | null
  onSelect: (treeId: string | null) => void
}

export function TreeSelector({
  trees,
  selectedTreeId,
  onSelect,
}: TreeSelectorProps) {
  const [isRandom, setIsRandom] = useState(false)

  const availableTrees = trees.filter((t) => t.status === "AVAILABLE")

  function handleRandomAssign() {
    setIsRandom(true)
    onSelect(null)
  }

  function handleSelectTree(treeId: string) {
    setIsRandom(false)
    onSelect(treeId)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">选择你的橙树</h3>
        <Button
          variant={isRandom ? "default" : "outline"}
          size="sm"
          onClick={handleRandomAssign}
          className="gap-1.5 rounded-full"
        >
          <Shuffle className="size-3.5" />
          系统随机分配
        </Button>
      </div>

      {isRandom && (
        <div className="flex items-center gap-3 rounded-xl border-2 border-dashed border-primary/40 bg-accent/50 px-4 py-3">
          <Sparkles className="size-5 text-primary" />
          <p className="text-sm text-muted-foreground">
            系统将为你随机分配一棵健康优质的橙树
          </p>
        </div>
      )}

      <div className="grid gap-3 sm:grid-cols-2">
        {availableTrees.map((tree) => {
          const isSelected = !isRandom && selectedTreeId === tree.id
          return (
            <button
              key={tree.id}
              type="button"
              onClick={() => handleSelectTree(tree.id)}
              className={cn(
                "group relative flex flex-col gap-2 rounded-xl border-2 p-4 text-left transition-all",
                isSelected
                  ? "border-primary bg-accent/60 shadow-md"
                  : "border-border bg-card hover:border-primary/40 hover:shadow-sm"
              )}
            >
              {/* selected indicator */}
              {isSelected && (
                <div className="absolute right-3 top-3 flex h-5 w-5 items-center justify-center rounded-full bg-primary">
                  <Check className="size-3 text-primary-foreground" />
                </div>
              )}

              {/* tree code & variety */}
              <div className="flex items-center gap-2">
                <div
                  className={cn(
                    "flex h-8 w-8 items-center justify-center rounded-lg transition-colors",
                    isSelected
                      ? "bg-primary text-primary-foreground"
                      : "bg-accent text-primary"
                  )}
                >
                  <TreePine className="size-4" />
                </div>
                <div>
                  <p className="text-sm font-semibold">{tree.treeCode}</p>
                  <p className="text-xs text-muted-foreground">
                    {tree.variety}
                  </p>
                </div>
              </div>

              {/* meta */}
              <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Calendar className="size-3" />
                  树龄 {tree.age} 年
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="size-3" />
                  {tree.orchardName}
                </span>
              </div>

              <p className="text-xs text-muted-foreground">
                {tree.orchardLocation} · 预估年产 {tree.estimatedYield} 斤
              </p>
            </button>
          )
        })}
      </div>

      {availableTrees.length === 0 && (
        <p className="py-8 text-center text-sm text-muted-foreground">
          暂无可选橙树，请稍后再试
        </p>
      )}
    </div>
  )
}

"use client"

import { useState } from "react"
import { Star } from "lucide-react"
import { cn } from "@/lib/utils"

interface StarRatingProps {
  value: number
  onChange?: (value: number) => void
  readonly?: boolean
  size?: "sm" | "md"
}

export function StarRating({
  value,
  onChange,
  readonly = false,
  size = "md",
}: StarRatingProps) {
  const [hoverValue, setHoverValue] = useState(0)

  const starSize = size === "sm" ? "size-4" : "size-5"

  return (
    <div className="inline-flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => {
        const isFilled = readonly
          ? star <= value
          : star <= (hoverValue || value)

        return (
          <button
            key={star}
            type="button"
            disabled={readonly}
            className={cn(
              "transition-all duration-150",
              readonly
                ? "cursor-default"
                : "cursor-pointer hover:scale-110 active:scale-95"
            )}
            onClick={() => onChange?.(star)}
            onMouseEnter={() => !readonly && setHoverValue(star)}
            onMouseLeave={() => !readonly && setHoverValue(0)}
          >
            <Star
              className={cn(
                starSize,
                isFilled
                  ? "fill-amber-400 text-amber-400"
                  : "fill-transparent text-gray-300"
              )}
            />
          </button>
        )
      })}
    </div>
  )
}

"use client"

import { useState, useRef, useEffect } from "react"
import { Smile } from "lucide-react"
import dynamic from "next/dynamic"

const Picker = dynamic(() => import("emoji-picker-react"), { ssr: false })

interface EmojiPickerButtonProps {
  onEmojiSelect: (emoji: string) => void
}

export function EmojiPickerButton({ onEmojiSelect }: EmojiPickerButtonProps) {
  const [open, setOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [open])

  return (
    <div className="relative" ref={containerRef}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-orange-50 hover:text-[#FF6B00]"
        title="插入表情"
      >
        <Smile className="size-5" />
      </button>
      {open && (
        <div className="absolute bottom-10 left-0 z-50">
          <Picker
            onEmojiClick={(emojiData) => {
              onEmojiSelect(emojiData.emoji)
              setOpen(false)
            }}
            width={320}
            height={400}
            searchPlaceHolder="搜索表情..."
            previewConfig={{ showPreview: false }}
          />
        </div>
      )}
    </div>
  )
}

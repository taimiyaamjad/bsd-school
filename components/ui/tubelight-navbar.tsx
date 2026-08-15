"use client"

import React, { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

export interface NavItem {
  name: string
  url?: string
  icon: LucideIcon
  onClick?: () => void
  active?: boolean
}

export interface NavBarProps {
  items: NavItem[]
  className?: string
  activeTab?: string
  onTabChange?: (name: string) => void
  variant?: "floating" | "inline"
}

export function NavBar({
  items,
  className,
  activeTab: controlledActiveTab,
  onTabChange,
  variant = "floating"
}: NavBarProps) {
  const [internalActiveTab, setInternalActiveTab] = useState(items[0]?.name || "")
  const [, setIsMobile] = useState(false)

  const activeTab = controlledActiveTab !== undefined ? controlledActiveTab : internalActiveTab

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const handleItemClick = (item: NavItem, e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => {
    e.preventDefault()
    if (item.onClick) {
      item.onClick()
    }
    setInternalActiveTab(item.name)
    if (onTabChange) {
      onTabChange(item.name)
    }
  }

  const containerClasses =
    variant === "floating"
      ? cn(
          "fixed bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-50 max-w-[95vw]",
          className
        )
      : cn("relative z-20", className)

  return (
    <nav aria-label="Main Navigation" className={containerClasses}>
      <div className="flex items-center gap-1 sm:gap-1.5 bg-white/90 dark:bg-slate-900/90 border border-slate-200/90 dark:border-slate-800 backdrop-blur-xl p-1.5 rounded-full shadow-2xl shadow-slate-950/15 dark:shadow-black/60 ring-1 ring-slate-900/5 dark:ring-white/10">
        {items.map((item) => {
          const Icon = item.icon
          const isActive = activeTab === item.name || !!item.active

          return (
            <button
              key={item.name}
              type="button"
              onClick={(e) => handleItemClick(item, e)}
              className={cn(
                "relative cursor-pointer text-xs sm:text-sm font-semibold px-2.5 sm:px-4 py-2 sm:py-2.5 rounded-full transition-all duration-200 flex items-center gap-1.5 sm:gap-2",
                "text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400",
                isActive && "text-blue-600 dark:text-blue-400 font-bold bg-blue-50/90 dark:bg-blue-950/70"
              )}
              aria-current={isActive ? "page" : undefined}
            >
              <Icon size={17} className={cn("transition-all duration-200 shrink-0", isActive ? "scale-115 text-blue-600 dark:text-blue-400 stroke-[2.5]" : "stroke-[1.8]")} />
              <span className="hidden sm:inline whitespace-nowrap">{item.name}</span>
              {isActive && (
                <motion.div
                  layoutId="tubelight-lamp"
                  className="absolute inset-0 w-full bg-blue-500/10 dark:bg-blue-400/15 rounded-full -z-10"
                  initial={false}
                  transition={{
                    type: "spring",
                    stiffness: 380,
                    damping: 32,
                  }}
                >
                  {/* Glowing tubelight filament on the top edge */}
                  <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-8 sm:w-10 h-1 bg-blue-600 dark:bg-blue-400 rounded-t-full shadow-[0_0_10px_rgba(37,99,235,0.9)]">
                    <div className="absolute w-14 h-6 bg-blue-500/35 rounded-full blur-md -top-2 -left-3" />
                    <div className="absolute w-8 h-4 bg-blue-400/50 rounded-full blur-sm -top-1" />
                  </div>
                </motion.div>
              )}
            </button>
          )
        })}
      </div>
    </nav>
  )
}


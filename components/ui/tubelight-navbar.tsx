"use client"

import React, { useEffect, useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { LucideIcon, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"
import { ModeToggle } from "../mode-toggle"
import { usePathname, useRouter } from "next/navigation"

interface NavItem {
  name: string
  url: string
  icon: LucideIcon
}

interface NavBarProps {
  items: NavItem[]
  className?: string
}

export function NavBar({ items, className }: NavBarProps) {
  const [activeTab, setActiveTab] = useState(items[0].name)
  const [isMobile, setIsMobile] = useState(false)
  const location = usePathname()


  useEffect(() => {
    if (location == "/resume") {
      setActiveTab("Analyze");
    }
  }, [location])

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }





    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return (
    <div
      className={cn(
        "fixed  top-0 left-1/2 -translate-x-1/2 z-50 mb-6 pt-6",
        className,
      )}
    >
      <div className="flex items-center gap-3 bg-background/5 border border-border backdrop-blur-lg py-1 px-1 rounded-full shadow-lg">
        <Link href="/" className="items-center gap-2 fv  bn font-semibold flex text-foreground text-sm md:text-lg hover:opacity-80 transition px-5"
          onClick={() => setActiveTab("Home")}
        >
          <Sparkles className="w-5 h-5 text-indigo-600" />
          <p className="hidden md:flex">ResumeRite</p>
        </Link>
        {items.map((item) => {
          const Icon = item.icon
          const isActive = activeTab === item.name

          return (
            <Link
              key={item.name}
              href={item.url}
              onClick={() => setActiveTab(item.name)}
              className={cn(
                "relative cursor-pointer text-sm font-semibold px-6 py-2 rounded-full transition-colors",
                "text-foreground/80 hover:text-primary",
                isActive && "bg-muted text-primary",
              )}
            >
              <span className="hidden md:inline">{item.name}</span>
              <span className="md:hidden">
                <Icon size={18} strokeWidth={2.5} />
              </span>
              {isActive && (
                <motion.div
                  layoutId="lamp"
                  className="absolute inset-0 w-full bg-primary/5 rounded-full -z-10"
                  initial={false}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                  }}
                >
                  <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-1 bg-indigo-600 rounded-t-full">
                    <div className="absolute w-12 h-6 bg-indigo-600/20 rounded-full blur-md -top-2 -left-2" />
                    <div className="absolute w-8 h-6 bg-indigo-600/20 rounded-full blur-md -top-1" />
                    <div className="absolute w-4 h-4 bg-indigo-600/20 rounded-full blur-sm top-0 left-2" />
                  </div>
                </motion.div>
              )}
            </Link>
          )
        })}
        <ModeToggle />
      </div>
    </div>
  )
}

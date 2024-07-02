"use client"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { usePathname, useRouter } from "next/navigation"
import { useEffect, useState, useTransition } from "react"

export function SwitcherLocale() {
  const [isPending, startTransition] = useTransition()
  const router = useRouter()
  const pathname = usePathname()
  const [headerTop, setHeaderTop] = useState(true)
  const [showLocale, setShowLocale] = useState(false)
  const [nextLocale, setNextLocale] = useState("")

  function scrollHeader() {
    if (window.scrollY >= 80) {
      setHeaderTop(false)
    } else {
      setHeaderTop(true)
    }
  }

  useEffect(() => {
    window.addEventListener("scroll", scrollHeader)

    return () => {
      window.addEventListener("scroll", scrollHeader)
    }
  }, [])

  async function handleSelectLocale(lang: string) {
    setNextLocale(lang)
    console.log(lang)
    startTransition(() => {
      router.replace(`/${lang}`)
    })

    setShowLocale(false)
  }

  return (
    <div
      className="relative"
      onClick={() => setShowLocale(!showLocale)}
      onMouseEnter={() => setShowLocale(true)}
      onMouseLeave={() => setShowLocale(false)}
    >
      <button
        className={cn("uppercase transition-all duration-300 text-black")}
      >
        {pathname === "/pt" ? "pt" : pathname === "/es" ? "es" : "en"}
      </button>
      <div
        className={cn(
          "absolute -right-3 z-10 origin-top flex-col rounded-md shadow-md",
          showLocale
            ? "flex h-auto bg-white transition-all duration-300 "
            : "invisible h-0 overflow-hidden transition-all duration-300"
        )}
      >
        <Button
          className={cn(pathname.includes("en") && "hidden")}
          variant="ghost"
          onClick={() => handleSelectLocale("en")}
        >
          EN
        </Button>
        <Button
          className={cn(pathname.includes("pt") && "hidden")}
          variant="ghost"
          onClick={() => handleSelectLocale("pt")}
        >
          PT
        </Button>
        <Button
          className={cn(pathname.includes("es") && "hidden")}
          variant="ghost"
          onClick={() => handleSelectLocale("es")}
        >
          ES
        </Button>
      </div>
    </div>
  )
}

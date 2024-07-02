"use client"

import { logout } from "@/actions/auth/logout"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { CircleUser, LogOut } from "lucide-react"
import type { User } from "next-auth"
import { useTranslations } from "next-intl"
import Link from "next/link"
import { LineMdCogLoop } from "../icons"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import LoginButton from "./login-button"
import LogoutButton from "./logout-button"

type Props = {
  user?: User
}

export function LoginBadge({ user }: Props) {
  const t = useTranslations("Global")
  return (
    <>
      {user && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar>
              <AvatarImage src={user?.image || ""} />
              <AvatarFallback className="bg-green-500">
                <CircleUser className="h-5 w-5" />
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>{t("my-account")}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link
                href="/auth/settings"
                className="flex flex-1 justify-start items-center"
              >
                <LineMdCogLoop className="mr-2" />
                {t("profile")}
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <LogoutButton>
              <DropdownMenuItem className="p-0 m-0">
                <Button
                  onClick={() => logout()}
                  variant={"ghost"}
                  className="flex flex-1 justify-around"
                >
                  <LogOut /> {t("sign-out")}
                </Button>
              </DropdownMenuItem>
            </LogoutButton>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
      {!user && (
        <LoginButton>
          <Button variant={"default"}>Entrar</Button>
        </LoginButton>
      )}
    </>
  )
}

"use client"

import * as React from "react"
import Link from "next/link"
import { CircleCheckIcon, CircleHelpIcon, CircleIcon } from "lucide-react"
import { useUser } from "@auth0/nextjs-auth0"

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

import { ModeToggle } from "@/components/original/mode-toggle"

const components: { title: string; href: string; description: string }[] = [
  {
    title: "Alert Dialog",
    href: "/docs/primitives/alert-dialog",
    description:
      "A modal dialog that interrupts the user with important content and expects a response.",
  },
  {
    title: "Hover Card",
    href: "/docs/primitives/hover-card",
    description:
      "For sighted users to preview content available behind a link.",
  },
  {
    title: "Progress",
    href: "/docs/primitives/progress",
    description:
      "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
  },
  {
    title: "Scroll-area",
    href: "/docs/primitives/scroll-area",
    description: "Visually or semantically separates content.",
  },
  {
    title: "Tabs",
    href: "/docs/primitives/tabs",
    description:
      "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
  },
  {
    title: "Tooltip",
    href: "/docs/primitives/tooltip",
    description:
      "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
  },
]

function ConditionalNavMenu({ title, user_role, link}){
    if(user_role == "admin"){
        return (
            <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                <Link href="/admin/create">Crear publicacion</Link>
            </NavigationMenuLink>
        )
    }
}

function AuthenticateUser({flag}){
  if(flag == false){
    return (
          <NavigationMenuItem>
            <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
              <Link href="/auth/login">Iniciar sesión</Link>
            </NavigationMenuLink>
            <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
              <Link href="/auth/login?screen_hint=signup">Registrate</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
    )
  } else {
    return (
      <NavigationMenuItem>
        <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
          <Link href="/auth/logout">Cerrar sesión</Link>
        </NavigationMenuLink>
      </NavigationMenuItem>
    )
  }
}

export function Navbar(session) {
  const { user, isLoading, error } = useUser()
  let user_role = null
  if(user)
    user_role = user["https://edv.com/roles"]
  const flag = user ? true : false

  if(isLoading){
    return (
      <div className="w-[400px] h-[50px] border-2 rounded-md mt-4"></div>
    );
  }

  return (
    <NavigationMenu viewport={false} className="gap-4 border-1 mt-4 rounded-md p-2" suppressHydrationWarning>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link href="/">Inicio</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <ConditionalNavMenu title="Crear publicación" user_role={user_role} link="/admin/create"/>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link href="/publications">Publicaciones</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <AuthenticateUser flag={flag}/>
      </NavigationMenuList>
      <ModeToggle></ModeToggle>
    </NavigationMenu>
  )
}

function ListItem({
  title,
  children,
  href,
  ...props
}: React.ComponentPropsWithoutRef<"li"> & { href: string }) {
  return (
    <li {...props}>
      <NavigationMenuLink asChild>
        <Link href={href}>
          <div className="text-sm leading-none font-medium">{title}</div>
          <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  )
}

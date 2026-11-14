"use client"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarRail,
  SidebarGroupLabel,
  SidebarMenuButton,
  SidebarGroupContent,
  useSidebar
  

} from "@/components/ui/sidebar"
import { ChartNoAxesCombined, Settings, TicketCheck, Webhook } from "lucide-react"
import Link from "next/link"
import SignOutButton from "./sign-out-button"
import { usePathname } from "next/navigation"



const navigation = [
  {
    title: "Endpoints",
    url: "/endpoints",
    icon: Webhook
  },
  {
    title: "Events",
    url: "/events",
    icon: TicketCheck
  },
  {
    title: "Metrics",
    url: "/Metrics",
    icon: ChartNoAxesCombined
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings
  }
]

interface AppSidebarProps {
  user : {
    email: string,
    name: string
  }
}

export function AppSidebar({user}: AppSidebarProps) {

  const {state} = useSidebar();
  const isCollapsed = state === "collapsed";
  const path = usePathname();

  return (
    <Sidebar variant="floating" collapsible="icon">
      <SidebarHeader>
          Hook Relay
      </SidebarHeader>
      <SidebarContent>
  <SidebarGroup>
    <SidebarGroupLabel>Platform</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            {navigation.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild tooltip={item.title}  isActive = {path === item.url}>
                  <Link href={item.url}>
                    <item.icon />
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
     <SidebarFooter>
  <SidebarMenu>
    <SidebarMenuItem>
      <SidebarMenuButton tooltip={user.email}>
        <span className="truncate">{user.email}</span>
      </SidebarMenuButton>
    </SidebarMenuItem>

    <SidebarMenuItem>
      <SignOutButton collapsed={isCollapsed} />
    </SidebarMenuItem>
  </SidebarMenu>
</SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import getSession from "@/lib/session"
import { redirect } from "next/navigation";
import { TooltipProvider } from "@/components/ui/tooltip";

export const instant = false;

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {

    const session = await getSession();
    if(!session){
        redirect("/auth/login")
    }
    
  return (
   <>
   <TooltipProvider>

        <SidebarProvider>
        <AppSidebar user = {session.user} />
        <main>
        <SidebarTrigger/>
          {children}
          </main>
        </SidebarProvider>
   </TooltipProvider>
   </>
      
  )
}
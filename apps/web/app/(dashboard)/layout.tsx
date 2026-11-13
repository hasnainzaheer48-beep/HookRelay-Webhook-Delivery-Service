import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import getSession from "@/lib/session"
import { redirect } from "next/navigation";

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
        <SidebarProvider>
        <AppSidebar/>
        <main>
        <SidebarTrigger/>
          {children}
          </main>
        </SidebarProvider>
   </>
      
  )
}
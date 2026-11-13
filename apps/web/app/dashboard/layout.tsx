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
        {/* Layout UI */}
        {/* Place children where you want to render a page or nested layout */}
        <main>{children}</main>
   </>
      
  )
}
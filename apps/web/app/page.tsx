import getSession from "@/lib/session";
import { redirect } from "next/navigation";


export default async function Home()
{
  const session = await getSession();
  if(!session)
  {
    redirect("/auth/login")
  }
  else{
    redirect("/endpoints")
  }
  
 

  return (
     <main className="p-8">
      <h1 className="text-2xl font-bold">HookRelay</h1>
    </main>
  );
}
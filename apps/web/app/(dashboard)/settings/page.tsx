import { DataTable } from "@/components/ui/data-table";
import { CreateAPISecretDialogue } from "./ui/dialogues/createAPISecretDialogue";
import getSession from "@/lib/session";
import { redirect } from "next/navigation";
import { prisma } from "@hookrelay/shared";
import { columns } from "./ui/tables/columns";

export default async function Page()
{
   const session = await getSession()
       if(!session?.user)
       {
           redirect("/auth/login")
       }
       const records = await prisma.apiKey.findMany({
           where: {
               userId: session?.user.id
           },
           select: {
                id: true,
                name: true,
                keyPrefix: true,
                lastUsedAt: true,
                createdAt: true ,
                revokedAt: true,

           }
       })

       

     return(
            <div className="px-8 py-16 container mx-auto max-w-5xl space-y-8  ">
    
            <div className="space-y-8 ">
                <h1 className="text-3xl font-bold ">Settings</h1>
            </div>
           
            <CreateAPISecretDialogue />
            <DataTable columns={columns} data={records} />
            </div>
        )
}
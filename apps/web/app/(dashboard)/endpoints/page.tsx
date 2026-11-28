import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import CreateEndpointForm from "./ui/forms/createEndpointForm";
import { Button } from "@/components/ui/button";
import { DataTable } from "./ui/table/data-table";
import { columns } from "./ui/table/columns";
import { prisma } from "@hookrelay/shared";
import getSession from "@/lib/session";
import { redirect } from "next/navigation";

export default async function Page()
{
   
    const session = await getSession()
    if(!session?.user)
    {
        redirect("/auth/login")
    }
    const records = await prisma.endpoint.findMany({
        where: {
            userId: session?.user.id
        },
        select: {
            id: true,
            url: true,
            status: true,
            rateLimitPerSec: true,
            createdAt: true,
            description: true,
            eventTypes: true
        }
    })

    
     return(
            <div className="px-8 py-16 container mx-auto max-w-full space-y-8  ">
    
            <div className="space-y-8 ">
                <h1 className="text-3xl font-bold ">Endpoints</h1>
            </div>

            <Dialog>
            <DialogTrigger asChild>
                <Button variant={"outline"} size={"lg"}>    
                Create Endpoint
                </Button>
                </DialogTrigger>
            <DialogContent>
            <DialogHeader>
            <DialogTitle>Create a new Endpoint</DialogTitle>
            <DialogDescription>
                    Register a new Endpoint.
            </DialogDescription>
            </DialogHeader>
            <CreateEndpointForm />
            </DialogContent>
            </Dialog>

        <DataTable columns={columns} data={records} />
            </div>
        )
}
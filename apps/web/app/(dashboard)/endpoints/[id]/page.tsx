import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import getSession from "@/lib/session";
import { prisma } from "@hookrelay/shared";
import { notFound, redirect } from "next/navigation";
import EditEndpointStatusForm from "../ui/forms/updateEndpointStatusForm";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
})
{
   const session = await getSession()
       if(!session?.user)
       {
           redirect("/auth/login")
       }
    const {id} = await params
  
    const data = await prisma.endpoint.findFirst({
    where: {
        userId: session?.user.id,
        id
    }
   })
    
   if(!data)
   {
       notFound()
   }
 const {
  createdAt,
  description,
  disabledReason,
  eventTypes,
  id: ID,
  rateLimitPerSec: rateLimit,
  status,
  updatedAt,
  url,
} = data;
    return(
            <div className="px-8 py-16 container mx-auto max-w-full space-y-8 flex justify-between ">
                <div>

            <div className="space-y-8 ">
                <h1 className="text-3xl font-bold ">Endpoint Details</h1>
            </div>
            ID: {ID} <br />
            URL: {url} <br />
            Status: {status} <br />
            Rate Limit Per Second: {rateLimit} <br />
            Descripton: {description} <br />
            eventTypes: {eventTypes?.map((evt) => {
                return <div key={evt}><li>{evt}</li></div>
            })} <br />
            Disabled Reason: {status === 'disabled' ? disabledReason : 'nill'} <br />
            Created At: {createdAt?.toLocaleDateString()} <br />
            Updated At: {updatedAt?.toLocaleDateString()} <br />
            </div>
            <div>

            <Dialog>
            <DialogTrigger asChild>
                <Button variant={"outline"} size={"lg"}>    
                Update Endpoint Status
                </Button>
                </DialogTrigger>
            <DialogContent>
            <DialogHeader>
            <DialogTitle>Update Endpoint Status</DialogTitle>
            <DialogDescription>
                    Update the status of endpoint
            </DialogDescription>
            </DialogHeader>
            {
                status !== 'disabled' &&
            <EditEndpointStatusForm status={status} id={id}  /> 
            }
            </DialogContent>
            </Dialog>
            </div>
            </div>
        )
}
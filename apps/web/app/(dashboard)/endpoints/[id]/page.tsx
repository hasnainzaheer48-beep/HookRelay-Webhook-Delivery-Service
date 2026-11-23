import getSession from "@/lib/session";
import { prisma } from "@hookrelay/shared";
import { notFound, redirect } from "next/navigation";

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
  userId,
} = data;
    return(
            <div className="px-8 py-16 container mx-auto max-w-full space-y-8  ">
    
            <div className="space-y-8 ">
                <h1 className="text-3xl font-bold ">Endpoint Details</h1>
            </div>
            ID: {ID} <br />
            User Id: {userId} <br />
            URL: {url} <br />
            Status: {status} <br />
            Descripton: {description} <br />
            eventTypes: {eventTypes?.map((evt) => {
                return <div><li>{evt}</li></div>
            })} <br />
            Disabled Reason: {status === 'disabled' ? disabledReason : 'nill'} <br />
            Created At: {createdAt?.toLocaleDateString()} <br />
            Updated At: {updatedAt?.toLocaleDateString()} <br />
         
            </div>
        )
}
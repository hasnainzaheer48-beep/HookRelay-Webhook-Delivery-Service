import { generateEndpointToken } from "@/lib/utils"
import { endpointSchema } from "@/schemas/endpoint.schema"
import { prisma, z } from "@hookrelay/shared"
import { EndpointStatus } from "@hookrelay/shared/src/generated/prisma/enums"


type endpointData = z.infer<typeof endpointSchema> & {
userId: string
}

 export async function createEndpointService(endpointData : endpointData){

         const {url , description, eventTypes, rateLimitPerSec , userId} = endpointData   

     await prisma.endpoint.create({
         data: {
             url,
             secret: generateEndpointToken('whsec_', 32), 
             description,
             eventTypes,
             rateLimitPerSec,
             userId,
             createdAt: new Date()
            }
        })
    }

export async function editEndpointService(endpointId: string, endpointData : endpointData)
{   
    const {url , description, eventTypes, rateLimitPerSec, userId} = endpointData   
    
    const db = await prisma.endpoint.updateMany({
        where: {
            id: endpointId,
            userId: userId,
            status: {not: "disabled"}
        },
        data: {
            url,
            description,
            eventTypes,
            rateLimitPerSec,
            updatedAt: new Date()
        }
    })

    if(db.count === 0)
    {
        throw new Error("Not Found")
    }
}

export async function editEndpointStatusService(endpointId: string, endpointData : { status: EndpointStatus , userId: string})
{
    const {status, userId} = endpointData

    const result = await prisma.endpoint.updateMany({
        where: {
            id: endpointId,
            userId: userId,
            status: {not: "disabled"}
        },
        data: {
             status
        }

    })

    if(result.count === 0)
    {
        throw new Error("Not Found")
    }
}

export async function deleteEndpointService(endpointId: string, userId: string){
    
        const result = await prisma.endpoint.deleteMany({
            where:{
                id: endpointId,
                userId
            }
        })

         if(result.count === 0)
        {
            throw new Error("Not Found")
        }
   
}
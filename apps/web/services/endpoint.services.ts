import { generateEndpointToken } from "@/lib/utils"
import { endpointSchema } from "@/schemas/endpoint.schema"
import { prisma, z } from "@hookrelay/shared"

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
             userId
            }
        })
    }
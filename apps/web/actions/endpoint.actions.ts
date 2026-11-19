"use server"

import getSession from "@/lib/session"
import { generateEndpointToken } from "@/lib/utils";
import {prisma} from '@hookrelay/shared'
import { revalidatePath } from "next/cache";
import { endpointSchema } from "@/schemas/endpoint.schema";



//Create Endpoint
export async function createEndpoint(formData: FormData) {


    const session = await getSession()
    if(!session?.user) {
        throw new Error('Unauthorized')
    }
    const result = endpointSchema.safeParse({
        description: formData.get('description') ?? '',
        url: formData.get('url'),
        eventTypes: formData.get('eventTypes') ?? '',
        rateLimitPerSec: formData.get('rateLimitPerSec') || undefined
    })

    if(!result.success)
    {
        const problems = result.error.issues.map((i) => `  - ${i.path.join('.')}: ${i.message}`).join('\n');
        throw new Error(`Invalid Inputs:\n${problems}`);
    }

    const {url , description, eventTypes, rateLimitPerSec} = result.data

    
    await prisma.endpoint.create({
        data: {
            url,
            secret: generateEndpointToken('whsec_', 32), 
            description,
            eventTypes,
            rateLimitPerSec,
            userId: session.user.id
        }
    })

    revalidatePath('/endpoints')
    

}


"use server"

import getSession from "@/lib/session"
import { generateEndpointToken } from "@/lib/utils";
import {prisma, z} from '@hookrelay/shared'


const typeNameRegex = /^[a-z0-9._]+$/;
const endpointSchema = z.object({
    description: z.string(),
    url: z.url().refine(
        (val) => { 
            if(process.env.NODE_ENV === 'production'){
                return new URL(val).protocol === "https:"
            }
            return true
        }),
    eventTypes: z.string().transform(
        (val) => val.split(",").map(
            (itm) => itm.trim()
        ).filter(Boolean)).pipe(
            z.array(z.string().regex(typeNameRegex,  'Only lowercase letters, numbers, dots, and underscores are allowed'))
        ),
    rateLimitPerSec: z.coerce.number().int().min(1, 'Rate Limit must be at least 1').max(100, 'Rate Limit is 100 at max')
    //Add a default value 10 in form input 
})



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
    

}


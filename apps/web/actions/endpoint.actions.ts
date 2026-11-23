"use server"

import getSession from "@/lib/session"
import { revalidatePath } from "next/cache";
import { endpointSchema } from "@/schemas/endpoint.schema";
import { createEndpointService, editEndpointService } from "@/services/endpoint.services";



//Create Endpoint
export async function createEndpoint(formData: FormData) {
    
    const session = await getSession()
    //This checks if user is authenticated
    if(!session?.user) {
        throw new Error('Unauthorized')
    }

    //this will check fordata using Zod
    const result = endpointSchema.safeParse({
        description: formData.get('description') ?? '',
        url: formData.get('url'),
        eventTypes: formData.get('eventTypes') ?? '',
        rateLimitPerSec: formData.get('rateLimitPerSec') || undefined
    })


    //checks if validation is succesful
    if(!result.success)
    {
        const problems = result.error.issues.map((i) => `  - ${i.path.join('.')}: ${i.message}`).join('\n');
        throw new Error(`Invalid Inputs:\n${problems}`);
    }

    //this sends data to the create endpoint prisma service
    await createEndpointService({...result.data , userId: session.user.id})

    revalidatePath('/endpoints')
    

}

export async function editEndpoint(endpointId: string,  formData: FormData) {
    const session = await getSession()
    //This checks if user is authenticated
    if(!session?.user) {
        throw new Error('Unauthorized')
    }

    //this will check formdata using Zod
    const result = endpointSchema.safeParse({
        description: formData.get('description') ?? '',
        url: formData.get('url'),
        eventTypes: formData.get('eventTypes') ?? '',
        rateLimitPerSec: formData.get('rateLimitPerSec') || undefined
    })

     //checks if validation is succesful
    if(!result.success)
    {
        const problems = result.error.issues.map((i) => `  - ${i.path.join('.')}: ${i.message}`).join('\n');
        throw new Error(`Invalid Inputs:\n${problems}`);
    }

    //this sends data to the create endpoint prisma service
    await editEndpointService(endpointId , {...result.data, userId: session.user.id})
}
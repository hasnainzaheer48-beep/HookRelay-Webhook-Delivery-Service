"use server"

import getSession from "@/lib/session"
import { revalidatePath } from "next/cache";
import { endpointSchema } from "@/schemas/endpoint.schema";
import { createEndpointService } from "@/services/endpoint.services";



//Create Endpoint
export async function createEndpoint(formData: FormData) {

    //This checks if user is authenticated
    const session = await getSession()
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


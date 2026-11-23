"use server"

import getSession from "@/lib/session"
import { revalidatePath } from "next/cache";
import { endpointSchema } from "@/schemas/endpoint.schema";
import { createEndpointService, editEndpointService } from "@/services/endpoint.services";



//Create Endpoint
export async function createEndpoint(initialState: any, formData: FormData) {
    
    const session = await getSession()
    //This checks if user is authenticated
    if(!session?.user) {
        return { message: "Unauthorized" };
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
       return {
      message: result.error.flatten().fieldErrors,
    }
    }

    try {
        //this sends data to the create endpoint prisma service
        await createEndpointService({...result.data , userId: session.user.id})
    
        revalidatePath('/endpoints')
        return {message: "Endpoint created succesfully"}
        
    } catch (error) {
        return {message: "Failed to create the endpoint"}
    }
    

}

export async function editEndpoint( endpointId: string, initialState: any,  formData: FormData) {
    const session = await getSession()
    //This checks if user is authenticated
    if(!session?.user) {
        return { message: "Unauthorized" };
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
         return {
      message: result.error.flatten().fieldErrors,
    }
    }

    
    try {
        //this sends data to the create endpoint prisma service
        await editEndpointService(endpointId , {...result.data, userId: session.user.id})
        revalidatePath('/endpoints')
        
        return {message: "Endpoint edited succesfully"}
        
    } catch (error) {
        return {message: "Failed to edit the endpoint"}
    }

}
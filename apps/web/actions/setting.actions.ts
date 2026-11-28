"use server"

import getSession from "@/lib/session";
import { APIIdschema, APIschema } from "@/schemas/api.schema";
import { createAPIservice, revokeAPIservice } from "@/services/api.services";
import { revalidatePath } from "next/cache";

export async function createAPI( formData : FormData )
{
    const session = await getSession()
        if(!session?.user) {
            throw new Error('Unauthorized')
        }
    
    const result = APIschema.safeParse({
        name: formData.get('name')
    })

    if(!result.success)
    {
        const problems = result.error.issues.map((i) => `  - ${i.path.join('.')}: ${i.message}`).join('\n');
        throw new Error(`Invalid Inputs:\n${problems}`);
    }

    const {name} = result.data
    const {id} = session.user
    
    try{
        const result = await createAPIservice({
            name,
            id,
        })
        revalidatePath("/settings")
        return {
            success: true,
            key: result
        }
    }
    catch
    {
        
        return{
            success: false,
            message: "Failed to create the API key"
        }
    }
}

export async function revokeAPI({id}: {id:string})
{
     const session = await getSession()
        if(!session?.user) {
            throw new Error('Unauthorized')
        }
    
        const result = APIIdschema.safeParse(id)

        if(!result.success)
        {
        const problems = result.error.issues.map((i) => `  - ${i.path.join('.')}: ${i.message}`).join('\n');
        throw new Error(`Invalid Inputs:\n${problems}`);
        }

        
        
        try{
        const result = await revokeAPIservice({id, userId: session.user.id })
        revalidatePath("/settings")
        return {
            success: true,
        }
    }
    catch(error)
    {
        console.error(error)
        return{
            success: false,
            message: "Failed to create the API key"
        }
    }

}
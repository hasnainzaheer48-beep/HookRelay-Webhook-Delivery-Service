"use server"

import getSession from "@/lib/session";
import { generateAPIToken } from "@/lib/utils";
import { APIschema } from "@/schemas/api.schema";
import { createAPIservice } from "@/services/api.services";
import { createHash } from "crypto";
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
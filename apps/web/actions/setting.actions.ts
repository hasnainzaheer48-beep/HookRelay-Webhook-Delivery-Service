"use server"

import getSession from "@/lib/session";
import { generateAPIToken } from "@/lib/utils";
import { prisma, z } from "@hookrelay/shared";
import { createHash } from "node:crypto";


const APIschema = z.object({
    name: z.string().min(0, "API must be given a name")
})

export async function createAPI(formData : FormData )
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
    const token = generateAPIToken("hr_live_", 32);

    const hash = createHash('sha256').update(token).digest('hex')

    await prisma.apiKey.create({
        data: {
            userId: session.user.id,
            name,
            keyPrefix: token.substring(0,12),
            keyHash: hash
        }
    })

}
import { generateAPIToken } from "@/lib/utils";
import { prisma } from "@hookrelay/shared";
import { createHash } from "node:crypto";

export async function createAPIservice({id, name}: {id: string, name:string})
{
    const token = generateAPIToken("hr_live_", 32);

    const hash = createHash('sha256').update(token).digest('hex')

    await prisma.apiKey.create({
        data: {
            userId: id,
            name,
            keyPrefix: token.substring(0,12),
            keyHash: hash
        }
    })

    return token
}

export async function revokeAPIservice({id, userId} : {id: string, userId: string})
{
    const result  = await prisma.apiKey.updateMany({
        where: {
            id,
            userId,
            revokedAt: null
        },
        data:
        {
            revokedAt: new Date()
        }
    })

    if(result.count === 0)
    {
        throw new Error("Not Found")
    }
}
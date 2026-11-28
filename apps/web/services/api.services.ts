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
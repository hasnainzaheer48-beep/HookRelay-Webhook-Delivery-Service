import { generateAPIToken } from "@/lib/utils";
import { prisma } from "@hookrelay/shared";
import { createHash } from "node:crypto";

export async function createAPIservice({id, name, token, hash}: {id: string, name:string, token: string, hash: string})
{
  

    await prisma.apiKey.create({
        data: {
            userId: id,
            name,
            keyPrefix: token,
            keyHash: hash
        }
    })
}
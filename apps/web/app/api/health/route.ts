import { prisma, redis } from "@hookrelay/shared"
import { NextResponse } from "next/server"

type dbStatus = "ok" | "error"

const checkDB  = async() : Promise<dbStatus > => {
    try {
        await prisma.$queryRaw` select 1 `;
        return "ok"
        
    } catch (err) {
        console.error(err)
        return "error"
    }
}

const checkRedis = async() : Promise<"ok"|"error"> => {
    try{
        await redis.ping();
        return "ok"
    }
    catch(err)
    {
        console.error(err)
        return "error"
    }

}


export async function GET()
{
    const db = await checkDB();
    const redis = await checkRedis()

    if(db === "error" || redis === "error" )
    {
        return NextResponse.json({
        db: db,
        redis: redis}, {status: 503})
    }

    return NextResponse.json({
        db: db,
        redis: "ok"
    })
 
  
}
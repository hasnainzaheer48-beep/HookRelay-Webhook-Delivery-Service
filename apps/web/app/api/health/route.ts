import { prisma } from "@hookrelay/shared"
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

export async function GET()
{
    const db = await checkDB();

    if(db === "error")
    {
        return NextResponse.json({
        db: db,
        redis: "ok"}, {status: 503})
    }

    return NextResponse.json({
        db: db,
        redis: "ok"
    })
 
  
}
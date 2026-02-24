import { NextResponse } from "next/server";
import {prisma} from '../../../../lib/prisma'



export async function GET(){
    try{
        const events = await prisma.event.findMany({
            orderBy: {
                id: 'desc'
            },
            include: {
                category: true,
                city: true
            }
        })
        return NextResponse.json(events, {status: 200})
    } catch(error){
        console.error('Error ', error)
        return NextResponse.json({error: 'server error GET'}, {status: 500})
    }
}
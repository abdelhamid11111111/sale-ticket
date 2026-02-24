import { NextRequest, NextResponse } from "next/server";
import {prisma} from '../../../../lib/prisma'


export async function GET(req: NextRequest){
    try{
        // const searchParams = req.nextUrl.searchParams;
        // const categoryId = searchParams.get('categoryId')

        

    }catch(error){
        console.error('Error ', error)
        return NextResponse.json({error: 'server error GET'}, {status: 500})
    }
}
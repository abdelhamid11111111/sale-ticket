import { NextResponse } from "next/server";
import {prisma} from '../../../../lib/prisma'


export async function GET(){
    try{

    }catch(error){
        console.error('Error ', error)
        return NextResponse.json({error: 'server error GET'}, {status: 500})
    }
}
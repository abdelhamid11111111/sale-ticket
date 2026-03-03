import { NextResponse } from "next/server";
import {prisma} from '../../../../lib/prisma'



export async function GET() {
    try{
        // we create array for 7 elements
        const days = Array.from({length: 7}, (_, i) => {
            // create new date object
            const date = new Date()
            // setDate change from 4 to March 4
            date.setDate(date.getDate() - (6 - i)) // <- getDate() return the day of the month: 10 March -> 10, (6 - i) moves each date back from 6 days ago to today.
            return date
        })

        // Promise.all() runs multiple async operations in parallel and waits for all of them to finish.
        const data = await Promise.all(

            // We loop over each day, each day we count its start and end then compare it with createdAt in db then get quantity
            days.map(async (date) => {

                const start = new Date(date)
                // Beginning of that day
                start.setHours(0, 0, 0, 0)

                const end = new Date(date)
                // End of that day
                end.setHours(23, 59, 59, 999)

                const result = await prisma.ticket.aggregate({
                    where: {
                        createdAt: {gte: start, lte: end}
                    },
                    _sum: { quantity: true }
                })
                return {
                    day: date.toLocaleDateString('en-US', { weekday: 'short'}),
                    sales: result._sum.quantity ?? 0
                }
            })
        )

        return NextResponse.json(data, {status: 200})

    } catch(error){
        console.error('Error ', error);
        return NextResponse.json({error: 'server error'}, {status: 500})
    }
}
import { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../lib/prisma'


export default async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const songs = await prisma.song.findMany({
            select: {
                id: true,
                duration: true,
                image: true,
                name: true,
                url: true,
                artist: {
                    select: {
                        id: true,
                        name: true
                    }
                }
            }
        })

        res.status(200)
        res.json(songs)

    } catch(e) {
        console.error(e)
        res.status(404)
        res.json({error: 'No songs found'})
        return
    }
}
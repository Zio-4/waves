import { NextApiRequest, NextApiResponse } from 'next'
import { validateRoute } from '../../lib/auth'
import prisma from '../../lib/prisma'

export default validateRoute(async (req: NextApiRequest, res: NextApiResponse, user) => {
    if (req.method === 'PATCH') {
        const { songId } = req.body

        try {
            await prisma.user.update({
                where: {
                    id: user.id
                }, 
                data: {
                    favorites: {
                        connect: { id: songId}
                    }
                }
            })
            res.status(200)
            res.json({ message: 'SUCCESS'})
        } catch(e) {
            console.error('Song was not added: ', e)
            res.status(404)
            res.json({ error: 'FAILED'})
            return
        }

    } else if (req.method === 'DELETE') {
        const { songId } = req.body

        try {
            await prisma.user.update({
                where: {
                    id: user.id
                },
                data: {
                    favorites: {
                        disconnect: { id: songId}
                    }
                }
            })


            res.status(200)
            res.json({message: 'SUCCESS'})
        } catch(e) {
            console.error('Song was not deleted: ', e)
            res.status(404)
            res.json({ error: 'FAILED'})
            return
        }
    }
  })
import { NextApiRequest, NextApiResponse } from 'next'
import { validateRoute } from '../../lib/auth'
import prisma from '../../lib/prisma'

export default validateRoute(async (req: NextApiRequest, res: NextApiResponse, user) => {
    const { songName } = req.body

    if (req.method === 'PATCH') {

        try {
            await prisma.user.update({
                where: {
                    id: user.id
                }, 
                data: {
                    favorites: {
                        push: songName
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
        try {
            const favoritesArr = await prisma.user.findUnique({
                where: {
                    id: user.id
                },
                select: {
                    favorites: true
                }
            })

            const removedFavorite = favoritesArr.favorites.filter(song => song !== songName)

            await prisma.user.update({
                where: {
                    id: user.id
                },
                data: {
                    favorites: removedFavorite
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
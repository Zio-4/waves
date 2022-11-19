import { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../lib/prisma'


export default async (req: NextApiRequest, res: NextApiResponse) => {
    let userId

    if (req.body) {
        userId = req.body.userId
    }

    if (req.method === 'POST') {

        if (userId) {
            try {
                const favoriteSongs = await prisma.user.findUnique({
                    where: {
                      id: userId,
                    }, 
                    select: {
                      favorites: {
                        select: {
                          id: true
                        }
                      }
                    }
                  })
                  
                  // turning an array of objects to an array of id's for easier use on the frontend
                  let favoriteSongsByID = []
    
                  for(let i = 0; i < favoriteSongs.favorites.length; i++) {
                    favoriteSongsByID.push(favoriteSongs.favorites[i].id)
                  }
    
                return res.status(200).json(favoriteSongsByID)
    
            } catch (error) {
                console.error(error)
                return res.status(404).json({error: 'no songs founds'})
            }
        } else {
            return res.status(200).json({message: 'user is not signed in'})
        }

        
    } else if (req.method === 'GET') {
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
}
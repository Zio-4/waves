import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import cookie from 'cookie'
import prisma from '../../lib/prisma'
import { NextApiRequest, NextApiResponse } from 'next'
import { artistsData } from '../../prisma/songsData'

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const salt = bcrypt.genSaltSync()

    const { email, password, firstName, lastName } = req.body

    let user

    try {
        user = await prisma.user.create({
            data: {
                email,
                password: bcrypt.hashSync(password, salt),
                firstName: firstName,
                lastName: lastName
            }
        })

        await Promise.all(artistsData.map( async (artist) => {
            // upsert: Create or update
            return prisma.artist.upsert({
                where: { name: artist.name },
                update: {},
                create: {
                    name: artist.name,
                        songs: {
                            create: artist.songs.map(song => ({
                                name: song.name,
                                duration: song.duration,
                                url: song.url,
                                image: song.image
                            }))
                        }
                } 
            })
        }))

        const songs = await prisma.song.findMany({})
        await Promise.all(new Array(1).fill(1).map( async (_, i) => {
            return prisma.playlist.create({
                data: {
                    name: `Playlist #${i + 1}`,
                    // To make sure Prisma connects the user with this id to the user on this playlist
                    user: {
                        connect: { id: user.id },
                        },
                        songs: {
                            connect: songs.map((song) => ({
                                id: song.id,
                            }))
                    }
                }
            })
        }))


    } catch (e) {
        console.error(e)
        res.status(401).json({ error: 'User already exists' })
        return
    }

    const token = jwt.sign({
        email: user.email,
        id: user.id,
        time: Date.now()
        // Add env variable
    }, process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN })

    res.setHeader(
        'Set-Cookie',
        cookie.serialize('WAVES_ACCESS_TOKEN', token, {
            httpOnly: true,
            maxAge: 8 * 60 * 60,
            path: '/',
            sameSite: 'lax',
            secure: process.env.NODE_ENV === 'production',
        })
    )

    res.json(user)
}
import jwt from 'jsonwebtoken'
import prisma from './prisma'
import { NextApiRequest, NextApiResponse} from 'next'

// Takes in a route hanlder function
export const validateRoute = (handler) => {
    return async (req: NextApiRequest, res: NextApiResponse) => {
        // Add as env variable
        const token = req.cookies.WAVES_ACCESS_TOKEN

        if (token) {
            let user

            try {
                const { id } = jwt.verify(token, 'hello')
                user = await prisma.user.findUnique({ where: { id } })

                if (!user) throw new Error("Not a real user");
                
            } catch (e) {
                console.error(e)
                res.status(401).json({ error: 'Not Authorized' })
                return
            }

            return handler(req, res, user)
        }

        // No token
        res.status(401).json({ error: 'Not Authorized' })
    }
}
import { NextApiRequest, NextApiResponse } from "next"
import cookie from 'cookie'

const signout = (req: NextApiRequest, res: NextApiResponse) => {
  // Delete cookie with token
  res.setHeader('Set-Cookie',
    cookie.serialize('WAVES_ACCESS_TOKEN', '', {
      maxAge: -1,
      path: '/',
    }),
  );

  res.writeHead(302, { Location: '/api/signin' });
  res.end();
  // Navigate user back to sign in
}

export default signout

// res.setHeader('Set-Cookie', cookie.serialize('WAVES_ACCESS_TOKEN', token, {
//     httpOnly: true,
//     maxAge: 8 * 60 * 60,
//     path: '/',
//     sameSite: 'lax',
//     secure: process.env.NODE_ENV === 'production',
// }))
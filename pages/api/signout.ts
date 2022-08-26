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
}

export default signout
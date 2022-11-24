// Does not run in a Node environement!
import { NextResponse } from 'next/server'

const signedInPages = ['/favorites',]

// runs before any page request
export default function middleware(req) {

    if (signedInPages.find((p) => p === req.nextUrl.pathname)) {
        const token = req.cookies.WAVES_ACCESS_TOKEN

        if (!token) {
            return NextResponse.redirect('/signin')
        }
    }
}
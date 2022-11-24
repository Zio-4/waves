// Does not run in a Node environement!
import { NextResponse } from 'next/server'

const signedInPages = ['/favorites', '/library','/newplaylist']

// runs before any page request
export default function middleware(req) {
    let path = req.nextUrl.pathname

    // Temporary while these features are implemented
    if (path === '/library' || path === '/newplaylist') {
        return NextResponse.redirect('/')
    }

    if (signedInPages.find((p) => p === path)) {
        const token = req.cookies.WAVES_ACCESS_TOKEN

        if (!token) {
            return NextResponse.redirect('/signin')
        }
    }
}
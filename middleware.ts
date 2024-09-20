import { RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

const publicRoutes: string[] = ['/login', '/signup'];

export default async function middleware(
  req: NextRequest,
): Promise<NextResponse<unknown>> {
  const path: string = req.nextUrl.pathname;
  const token: RequestCookie | undefined = cookies().get('accessToken');
  const pathIsPublic: boolean = publicRoutes.includes(path);

  if (pathIsPublic && token) {
    return NextResponse.redirect(new URL('/', req.url));
  }
  if (!token && !pathIsPublic) {
    return NextResponse.redirect(new URL('/login', req.url));
  }
  return NextResponse.next();
}

export const config: {
  matcher: string[];
} = {
  matcher: [
    `/((?!api|_next/static|favicon.ico|images|_next/image|icons|.*\\.png$).*)`,
  ],
};

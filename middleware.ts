// middleware.ts  (project root)
import { NextRequest, NextResponse } from 'next/server';

const CMS_PREFIX  = '/cms';
const LOGIN_PATH  = '/login';

export async function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();

  /* 1️⃣  ALLOW public read of products  */
  if (url.pathname === '/cms/requests/products' && req.method === 'GET') {
    return NextResponse.next();
  }

  /* 2️⃣  skip non-CMS routes  */
  if (!url.pathname.startsWith(CMS_PREFIX)) {
    return NextResponse.next();
  }

  /* 3️⃣  read session cookie  */
  const sessionCookie = req.cookies.get('better-auth.session_token');
  const isAuthenticated = !!sessionCookie;

  /* 4️⃣  unauthenticated → login  */
  if (!isAuthenticated) {
    url.pathname = LOGIN_PATH;
    url.searchParams.set('redirectTo', req.nextUrl.pathname);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/cms/:path*'],
};




// // middleware.ts  (place in project root)
// import { NextRequest, NextResponse } from 'next/server';
// import { getSessionCookie } from 'better-auth/cookies';   // or your own cookie reader

// const CMS_PREFIX  = '/cms';
// const LOGIN_PATH  = '/login';

// export async function middleware(req: NextRequest) {
//   const url = req.nextUrl.clone();

//   /* ----------  only protect /cms/*  ---------- */
//   if (!url.pathname.startsWith(CMS_PREFIX)) {
//     return NextResponse.next();
//   }

//   /* ----------  read session cookie  ---------- */
//   const sessionCookie = req.cookies.get('better-auth.session_token'); // adjust name if you changed it
//   const isAuthenticated = !!sessionCookie;

//   /* ----------  unauthenticated → redirect to login  ---------- */
//   if (!isAuthenticated) {
//     url.pathname = LOGIN_PATH;
//     url.searchParams.set('redirectTo', req.nextUrl.pathname); // optional: return after login
//     return NextResponse.redirect(url);
//   }

//   /* ----------  authenticated → continue  ---------- */
//   return NextResponse.next();
// }

// /* ----------  matcher: run only on /cms/*  ---------- */
// export const config = {
//   matcher: ['/cms/:path*'],
// };
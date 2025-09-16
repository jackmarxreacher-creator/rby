// app/api/auth/[...all]/route.ts
import { auth } from '@/lib/auth';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  if (req.method === 'OPTIONS') {
    return new NextResponse(null, {
      status: 204,
      headers: {
        'Access-Control-Allow-Origin':  '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    });
  }
  return auth.handler(req);
}

export async function POST(req: NextRequest) {
  if (req.method === 'OPTIONS') {
    return new NextResponse(null, {
      status: 204,
      headers: {
        'Access-Control-Allow-Origin':  '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    });
  }
  return auth.handler(req);
}




// // app/api/auth/[...all]/route.ts
// import { auth } from '@/lib/auth';
// import { NextRequest, NextResponse } from 'next/server';

// /*  reply to OPTIONS immediately with CORS headers  */
// function preflight(req: NextRequest) {
//   if (req.method !== 'OPTIONS') return null;

//   return new NextResponse(null, {
//     status: 204,
//     headers: {
//       'Access-Control-Allow-Origin':  '*',
//       'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
//       'Access-Control-Allow-Headers': 'Content-Type, Authorization',
//     },
//   });
// }

// export async function GET(req: NextRequest) {
//   const res = preflight(req);
//   if (res) return res;
//   return auth.handler(req);
// }

// export async function POST(req: NextRequest) {
//   const res = preflight(req);
//   if (res) return res;
//   return auth.handler(req);
// }



// import { auth } from '@/lib/auth';
// import { cors } from '@/lib/cors';
// import { NextRequest, NextResponse } from 'next/server';

// export async function GET(req: NextRequest) {
//   await cors(req, new NextResponse(), async () => {
//     return auth.handler(req);
//   });
// }

// export async function POST(req: NextRequest) {
//   await cors(req, new NextResponse(), async () => {
//     return auth.handler(req);
//   });
// }




// import { auth } from '@/lib/auth';
// import { cors } from '@/lib/cors'; // Import the updated CORS middleware
// import { NextRequest, NextResponse } from 'next/server';

// export async function GET(req: NextRequest) {
//   // Apply CORS middleware
//   const response = await cors(req, new NextResponse(null, { status: 200 }));
//   if (response) return response;

//   // Call the auth handler
//   return auth.handler(req);
// }

// export async function POST(req: NextRequest) {
//   // Apply CORS middleware
//   const response = await cors(req, new NextResponse(null, { status: 200 }));
//   if (response) return response;

//   // Call the auth handler
//   return auth.handler(req);
// }




// import { auth } from '@/lib/auth';
// import { cors } from '@/lib/cors'; // Import the updated CORS middleware
// import { NextRequest, NextResponse } from 'next/server';

// export async function GET(req: NextRequest) {
//   await cors(req, new NextResponse(), async () => {
//     return auth.handler(req);
//   });
// }

// export async function POST(req: NextRequest) {
//   await cors(req, new NextResponse(), async () => {
//     return auth.handler(req);
//   });
// }





// import { auth } from '@/lib/auth';
// import { cors } from '@/lib/cors'; // Import the updated CORS middleware
// import { NextRequest, NextResponse } from 'next/server';

// export async function GET(req: NextRequest) {
//   await cors(req, new NextResponse(), async () => {
//     return auth.handler(req);
//   });
// }

// export async function POST(req: NextRequest) {
//   await cors(req, new NextResponse(), async () => {
//     return auth.handler(req);
//   });
// }




// import { auth } from '@/lib/auth';
// import { cors } from '@/lib/cors'; // Import the CORS middleware

// // Apply CORS middleware
// export async function GET(req: Request) {
//   await cors(req, new Response(), () => {}); // Apply CORS for GET requests
//   return auth.handler(req);
// }

// export async function POST(req: Request) {
//   await cors(req, new Response(), () => {}); // Apply CORS for POST requests
//   return auth.handler(req);
// }




// import { auth } from '@/lib/auth'
// import { toNextJsHandler } from 'better-auth/next-js'

// export const { GET, POST } = toNextJsHandler(auth.handler)
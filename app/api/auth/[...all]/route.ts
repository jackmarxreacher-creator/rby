import { auth } from '@/lib/auth';
import { cors } from '@/lib/cors'; // Import the updated CORS middleware
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  await cors(req, new NextResponse(), async () => {
    return auth.handler(req);
  });
}

export async function POST(req: NextRequest) {
  await cors(req, new NextResponse(), async () => {
    return auth.handler(req);
  });
}





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
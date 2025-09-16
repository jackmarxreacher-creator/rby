// app/api/auth/[...all]/route.ts
import { auth } from '@/lib/auth';
import { cors } from '@//lib/cors';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const preflight = cors(req);
  if (preflight) return preflight; // OPTIONS reply
  return auth.handler(req);        // normal request
}

export async function POST(req: NextRequest) {
  const preflight = cors(req);
  if (preflight) return preflight;
  return auth.handler(req);
}




// import { auth } from '@/lib/auth';
// import { NextRequest, NextResponse } from 'next/server';

// export async function GET(req: NextRequest) {
//   if (req.method === 'OPTIONS') {
//     return new NextResponse(null, {
//       status: 204,
//       headers: {
//         'Access-Control-Allow-Origin': '*',
//         'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
//         'Access-Control-Allow-Headers': 'Content-Type, Authorization',
//       },
//     });
//   }
//   return auth.handler(req);
// }

// export async function POST(req: NextRequest) {
//   if (req.method === 'OPTIONS') {
//     return new NextResponse(null, {
//       status: 204,
//       headers: {
//         'Access-Control-Allow-Origin': '*',
//         'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
//         'Access-Control-Allow-Headers': 'Content-Type, Authorization',
//       },
//     });
//   }
//   return auth.handler(req);
// }
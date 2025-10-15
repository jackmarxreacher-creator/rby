// app/api/auth/[...all]/route.ts
import { auth } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

const allowedOrigins = ["https://www.rbygh.com", "https://rbygh.com", "http://localhost:3000"];

function getAllowedOrigin(requestOrigin: string | null): string {
  if (requestOrigin && allowedOrigins.includes(requestOrigin)) {
    return requestOrigin;
  }
  return "https://www.rbygh.com"; // default to www version
}

async function handleRequest(req: NextRequest) {
  const response = await auth.handler(req);
  const origin = getAllowedOrigin(req.headers.get("origin"));

  const headers = new Headers(response.headers);
  headers.set("Access-Control-Allow-Origin", origin);
  headers.set("Access-Control-Allow-Credentials", "true");
  headers.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");

  return new NextResponse(response.body, { status: response.status, headers });
}

export { handleRequest as GET, handleRequest as POST, handleRequest as PUT, handleRequest as DELETE };

export async function OPTIONS(req: NextRequest) {
  const origin = getAllowedOrigin(req.headers.get("origin"));
  
  return new NextResponse(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": origin,
      "Access-Control-Allow-Credentials": "true",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });
}



// import { auth } from "@/lib/auth";
// import { cors } from "@/lib/cors";
// import { NextRequest, NextResponse } from "next/server";

// //const allowedOrigin = "https://rbygh.com";
// const allowedOrigin = "https://localhost:3000";


// async function handleRequest(req: NextRequest) {
//   const response = await auth.handler(req);

//   const newHeaders = new Headers(response.headers);
//   newHeaders.set("Access-Control-Allow-Origin", allowedOrigin);
//   newHeaders.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
//   newHeaders.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
//   newHeaders.set("Access-Control-Allow-Credentials", "true");

//   return new NextResponse(response.body, {
//     status: response.status,
//     headers: newHeaders,
//   });
// }

// export async function OPTIONS(req: NextRequest) {
//   const preflight = cors(req);
//   if (preflight) return preflight;
//   return new NextResponse(null, {
//     status: 204,
//     headers: {
//       "Access-Control-Allow-Origin": allowedOrigin,
//       "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
//       "Access-Control-Allow-Headers": "Content-Type, Authorization",
//       "Access-Control-Allow-Credentials": "true",
//     },
//   });
// }

// export async function GET(req: NextRequest) {
//   const preflight = cors(req);
//   if (preflight) return preflight;
//   return handleRequest(req);
// }

// export async function POST(req: NextRequest) {
//   const preflight = cors(req);
//   if (preflight) return preflight;
//   return handleRequest(req);
// }

// export async function PUT(req: NextRequest) {
//   const preflight = cors(req);
//   if (preflight) return preflight;
//   return handleRequest(req);
// }

// export async function DELETE(req: NextRequest) {
//   const preflight = cors(req);
//   if (preflight) return preflight;
//   return handleRequest(req);
// }





// import { auth } from '@/lib/auth';
// import { cors } from '@/lib/cors';
// import { NextRequest, NextResponse } from 'next/server';

// const allowedOrigin = 'https://rbygh.com'; // your real domain now

// async function handleRequest(req: NextRequest) {
//   const response = await auth.handler(req);

//   const newHeaders = new Headers(response.headers);
//   newHeaders.set('Access-Control-Allow-Origin', allowedOrigin);
//   newHeaders.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
//   newHeaders.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//   newHeaders.set('Access-Control-Allow-Credentials', 'true');

//   return new NextResponse(response.body, {
//     status: response.status,
//     headers: newHeaders,
//   });
// }

// export async function GET(req: NextRequest) {
//   const preflight = cors(req);
//   if (preflight) return preflight;
//   return handleRequest(req);
// }

// export async function POST(req: NextRequest) {
//   const preflight = cors(req);
//   if (preflight) return preflight;
//   return handleRequest(req);
// }






// // app/api/auth/[...all]/route.ts
// import { auth } from '@/lib/auth';
// import { cors } from '@/lib/cors';  // fixed import path from '@//lib/cors' to '@/lib/cors'
// import { NextRequest, NextResponse } from 'next/server';

// const allowedOrigin = 'https://rby-pid9.vercel.app';

// async function handleRequest(req: NextRequest) {
//   const response = await auth.handler(req);

//   // Clone response and add CORS headers
//   const newHeaders = new Headers(response.headers);
//   newHeaders.set('Access-Control-Allow-Origin', allowedOrigin);
//   newHeaders.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
//   newHeaders.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');

//   // Return new response with CORS headers
//   return new NextResponse(response.body, {
//     status: response.status,
//     headers: newHeaders,
//   });
// }

// export async function GET(req: NextRequest) {
//   const preflight = cors(req);
//   if (preflight) return preflight;
//   return handleRequest(req);
// }

// export async function POST(req: NextRequest) {
//   const preflight = cors(req);
//   if (preflight) return preflight;
//   return handleRequest(req);
// }




// // app/api/auth/[...all]/route.ts
// import { auth } from '@/lib/auth';
// import { cors } from '@//lib/cors';
// import { NextRequest, NextResponse } from 'next/server';

// export async function GET(req: NextRequest) {
//   const preflight = cors(req);
//   if (preflight) return preflight; // OPTIONS reply
//   return auth.handler(req);        // normal request
// }

// export async function POST(req: NextRequest) {
//   const preflight = cors(req);
//   if (preflight) return preflight;
//   return auth.handler(req);
// }




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
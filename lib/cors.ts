import { NextRequest, NextResponse } from 'next/server';

const allowedOrigins = ['https://www.rbygh.com', 'https://rbygh.com', 'http://localhost:3000'];

function getAllowedOrigin(requestOrigin: string | null): string {
  if (requestOrigin && allowedOrigins.includes(requestOrigin)) {
    return requestOrigin;
  }
  return 'https://www.rbygh.com'; // default to www version
}

export function cors(req: NextRequest): NextResponse | null {
  if (req.method === 'OPTIONS') {
    const origin = getAllowedOrigin(req.headers.get('origin'));
    
    return new NextResponse(null, {
      status: 204,
      headers: {
        'Access-Control-Allow-Origin': origin,
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Access-Control-Allow-Credentials': 'true',
        'Access-Control-Max-Age': '86400',
      },
    });
  }
  return null; // Continue normal processing for other methods
}






// // lib/cors.ts
// import { NextRequest, NextResponse } from 'next/server';

// const allowedOrigin = 'https://rbygh.com';

// /**
//  * Adds CORS headers and immediately replies 204 to OPTIONS.
//  * Returns the 204 response for OPTIONS, or null for normal requests.
//  */
// export function cors(req: NextRequest): NextResponse | null {
//   if (req.method === 'OPTIONS') {
//     return new NextResponse(null, {
//       status: 204,
//       headers: {
//         'Access-Control-Allow-Origin': allowedOrigin,
//         'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
//         'Access-Control-Allow-Headers': 'Content-Type, Authorization',
//       },
//     });
//   }
//   return null; // continue normal flow
// }





// // lib/cors.ts
// import { NextRequest, NextResponse } from 'next/server';

// /**
//  * Adds CORS headers and immediately replies 204 to OPTIONS.
//  * Returns the 204 response for OPTIONS, or null for normal requests.
//  */
// export function cors(req: NextRequest): NextResponse | null {
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
//   return null; // continue normal flow
// }




// import { NextRequest, NextResponse } from 'next/server';

// export const cors = (req: NextRequest, res: NextResponse, next: () => void) => {
//   res.headers.set('Access-Control-Allow-Origin', '*');
//   res.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
//   res.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');

//   if (req.method === 'OPTIONS') {
//     return new NextResponse(null, { status: 204 });
//   }

//   next();
// };




// import { NextRequest, NextResponse } from 'next/server';

// export const cors = async (req: NextRequest, res: NextResponse) => {
//   res.headers.set('Access-Control-Allow-Origin', '*');
//   res.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
//   res.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');

//   if (req.method === 'OPTIONS') {
//     return new NextResponse(null, { status: 204 });
//   }

//   return null; // Return null if not an OPTIONS request
// };






// import { NextRequest, NextResponse } from 'next/server';

// export const cors = (req: NextRequest, res: NextResponse, next: () => void) => {
//   res.headers.set('Access-Control-Allow-Origin', '*');
//   res.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
//   res.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');

//   if (req.method === 'OPTIONS') {
//     return new NextResponse(null, { status: 204 });
//   }

//   next();
// };







// import { NextRequest, NextResponse } from 'next/server';

// export const cors = (req: NextRequest, res: NextResponse, next: () => void) => {
//   res.headers.set('Access-Control-Allow-Origin', '*');
//   res.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
//   res.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');

//   if (req.method === 'OPTIONS') {
//     res.status(200).end();
//     return;
//   }

//   next();
// };




// import { NextApiRequest, NextApiResponse } from 'next';

// export const cors = (req: NextApiRequest, res: NextApiResponse, next: () => void) => {
//   res.setHeader('Access-Control-Allow-Origin', '*');
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
//   res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

//   if (req.method === 'OPTIONS') {
//     res.status(200).end();
//     return;
//   }

//   next();
// };
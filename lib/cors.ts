import { NextRequest, NextResponse } from 'next/server';

export const cors = (req: NextRequest, res: NextResponse, next: () => void) => {
  res.headers.set('Access-Control-Allow-Origin', '*');
  res.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return new NextResponse(null, { status: 204 });
  }

  next();
};




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
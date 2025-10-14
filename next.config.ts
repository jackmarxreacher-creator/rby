import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Webpack alias to resolve 'emitter' -> 'events' for html-pdf-node dependencies
  webpack(config) {
    config.resolve = config.resolve || {};
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      emitter: "events",
    };
    return config;
  },

  async headers() {
    return [
      {
        source: "/contact",
        headers: [
          {
            key: "Content-Security-Policy",
            value: "frame-src https://www.google.com https://maps.google.com ;",
          },
        ],
      },
    ];
  },
};

export default nextConfig;




// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   /* existing config options */

//   async headers() {
//     return [
//       {
//         source: "/contact",
//         headers: [
//           {
//             key: "Content-Security-Policy",
//             value: "frame-src https://www.google.com https://maps.google.com;",
//           },
//         ],
//       },
//     ];
//   },
// };

// export default nextConfig;







// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   /* config options here */
// };

// export default nextConfig;

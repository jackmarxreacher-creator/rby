// app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PathnameWrapper from "@/utils/PathnameWrapper";
import { prisma } from "@/lib/prisma";
import { Toaster } from "@/components/ui/toaster"; // ← toast provider

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ricky Boakye Yiadom Ltd.",
  description: "Ricky Boakye Yiadom Ltd official website",
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  // Try to fetch blog posts, fallback to empty array if table doesn't exist
  let posts: Array<{ title: string; coverImage: string | null; slug: string }> = [];
  try {
    posts = await prisma.blogPost.findMany({
      where: { isPublished: true },
      take: 3,
      orderBy: { createdAt: "desc" },
      select: { title: true, coverImage: true, slug: true },
    });
  } catch (error) {
    // BlogPost table doesn't exist or other database error - use empty array
    console.warn("BlogPost table not found, using empty posts array");
  }

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <PathnameWrapper posts={posts}>{children}</PathnameWrapper>
        <Toaster /> {/* ← global toast outlet */}
      </body>
    </html>
  );
}





// // app/layout.tsx
// import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
// import "./globals.css";
// import Header from "@/components/layout/Header";
// import Footer from "@/components/layout/Footer"; // ← back to plain client
// import PathnameWrapper from "@/utils/PathnameWrapper";
// import { prisma } from "@/lib/prisma"; // ← server fetch

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

// export const metadata: Metadata = {
//   title: "Ricky Boakye Yiadom Ltd.",
//   description: "Ricky Boakye Yiadom Ltd official website",
// };

// export default async function RootLayout({
//   children,
// }: Readonly<{ children: React.ReactNode }>) {
//   // 1.  fetch ONCE on the server
//   const posts = await prisma.blogPost.findMany({
//     where: { isPublished: true },
//     take: 3,
//     orderBy: { createdAt: "desc" },
//     select: { title: true, coverImage: true, slug: true },
//   });

//   return (
//     <html lang="en">
//       <body className={`${geistSans.variable} ${geistMono.variable}`}>
//         <PathnameWrapper posts={posts}>{children}</PathnameWrapper>
//       </body>
//     </html>
//   );
// }


// import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
// import "./globals.css";
// import Header from "@/components/layout/Header";
// import Footer from "@/components/layout/Footer";
// import PathnameWrapper from "@/utils/PathnameWrapper";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

// export const metadata: Metadata = {
//   title: "Ricky Boakye Yiadom Ltd.",
//   description: "Ricky Boakye Yiadom Ltd official website",
// };

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <html lang="en">
//       <body className={`${geistSans.variable} ${geistMono.variable}`}>
//         <PathnameWrapper>{children}</PathnameWrapper>
//       </body>
//     </html>
//   );
// }






// import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
// import "./globals.css";
// import Header from "@/components/layout/Header";
// import Footer from "@/components/layout/Footer";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

// export const metadata: Metadata = {
//   title: "Ricky Boakye Yiadom Ltd.",
//   description: "Ricky Boakye Yiadom Ltd official website",
// };

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <html lang="en">
//       <body className={`${geistSans.variable} ${geistMono.variable}`}>
//         {/* Global header & footer will show only for non-CMS routes */}
//         <Header />
//         {children}
//         <Footer />
//       </body>
//     </html>
//   );
// }





// import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
// import "./globals.css";
// import Header from "@/components/layout/Header";
// import Footer from "@/components/layout/Footer";
// import PathnameWrapper from "@/utils/pathname-provider";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

// export const metadata: Metadata = {
//   title: "Ricky Boakye Yiadom Ltd.",
//   description: "Ricky Boakye Yiadom Ltd official website",
// };

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <html lang="en">
//       <body className={`${geistSans.variable} ${geistMono.variable}`}>
//         <PathnameWrapper>{children}</PathnameWrapper>
//       </body>
//     </html>
//   );
// }




// // import type { Metadata } from "next";
// // import { Geist, Geist_Mono } from "next/font/google";
// // import "./globals.css";
// // import Header from "@/components/layout/Header";
// // import Footer from "@/components/layout/Footer";
// // import { PathnameProvider } from "../utils/pathname-provider";

// // const geistSans = Geist({
// //   variable: "--font-geist-sans",
// //   subsets: ["latin"],
// // });

// // const geistMono = Geist_Mono({
// //   variable: "--font-geist-mono",
// //   subsets: ["latin"],
// // });

// // export const metadata: Metadata = {
// //   title: "Ricky Boakye Yiadom Ltd.",
// //   description: "Ricky Boakye Yiadom Ltd official website",
// // };

// // export default function RootLayout({
// //   children,
// // }: Readonly<{
// //   children: React.ReactNode;
// // }>) {
// //   return (
// //     <html lang="en">
// //       <body className={`${geistSans.variable} ${geistMono.variable}`}>
// //         <PathnameProvider>
// //           {({ pathname }) => {
// //             const isCms = pathname.startsWith("/cms");

// //             return (
// //               <>
// //                 {!isCms && <Header />}
// //                 <main>{children}</main>
// //                 {!isCms && <Footer />}
// //               </>
// //             );
// //           }}
// //         </PathnameProvider>
// //       </body>
// //     </html>
// //   );
// // }




// // import type { Metadata } from "next";
// // import { Geist, Geist_Mono } from "next/font/google";
// // import "./globals.css";
// // import Header from "@/components/layout/Header";
// // import Footer from "@/components/layout/Footer";

// // const geistSans = Geist({
// //   variable: "--font-geist-sans",
// //   subsets: ["latin"],
// // });

// // const geistMono = Geist_Mono({
// //   variable: "--font-geist-mono",
// //   subsets: ["latin"],
// // });

// // export const metadata: Metadata = {
// //   title: "Ricky Boakye Yiadom Ltd.",
// //   description: "Ricky Boakye Yiadom Ltd official website",
// // };

// // export default function RootLayout({
// //   children,
// // }: Readonly<{
// //   children: React.ReactNode;
// // }>) {
// //   return (
// //     <html lang="en">
// //       <body className={`${geistSans.variable} ${geistMono.variable}`}>
// //         <Header />
// //         <main>{children}</main>
// //         <Footer />
// //       </body>
// //     </html>
// //   );
// // }

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PathnameWrapper from "@/utils/PathnameWrapper";

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <PathnameWrapper>{children}</PathnameWrapper>
      </body>
    </html>
  );
}






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

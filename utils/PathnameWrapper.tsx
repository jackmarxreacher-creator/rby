// utils/PathnameWrapper.tsx
"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer"; // ← plain client

interface BlogPost {
  title: string;
  coverImage: string | null;
  slug: string;
}

export default function PathnameWrapper({
  children,
  posts,
}: {
  children: React.ReactNode;
  posts: BlogPost[]; // ← plain data
}) {
  const pathname = usePathname();
  const isCms = pathname.startsWith("/cms");
  const isLogin = pathname === "/login";
  const hideLayout = isCms || isLogin;

  return (
    <>
      {!hideLayout && <Header />}
      <main>{children}</main>
      {!hideLayout && <Footer posts={posts} />} {/* ← plain data */}
    </>
  );
}


// "use client";

// import { usePathname } from "next/navigation";
// import Header from "@/components/layout/Header";
// import Footer from "@/components/layout/Footer";

// export default function PathnameWrapper({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   const pathname = usePathname();

//   const isCms = pathname.startsWith("/cms");
//   const isLogin = pathname === "/login";

//   // hide header/footer on CMS and login pages
//   const hideLayout = isCms || isLogin;

//   return (
//     <>
//       {!hideLayout && <Header />}
//       <main>{children}</main>
//       {!hideLayout && <Footer />}
//     </>
//   );
// }





// "use client";

// import { usePathname } from "next/navigation";
// import Header from "@/components/layout/Header";
// import Footer from "@/components/layout/Footer";

// export default function PathnameWrapper({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   const pathname = usePathname();
//   const isCms = pathname.startsWith("/cms");

//   return (
//     <>
//       {!isCms && <Header />}
//       <main>{children}</main>
//       {!isCms && <Footer />}
//     </>
//   );
// }

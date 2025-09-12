"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function PathnameWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isCms = pathname.startsWith("/cms");

  return (
    <>
      {!isCms && <Header />}
      <main>{children}</main>
      {!isCms && <Footer />}
    </>
  );
}

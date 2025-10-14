// components/layout/FooterServer.tsx
import { prisma } from "@/lib/prisma";
import Footer from "./Footer";

export default async function FooterServer() {
  const posts = await prisma.blogPost.findMany({
    where: { isPublished: true },
    take: 3,
    orderBy: { createdAt: "desc" },
    select: { title: true, coverImage: true, slug: true },
  });

  return <Footer posts={posts} />;
}
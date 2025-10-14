import { prisma } from "@/lib/prisma";
import BlogPreview from "./BlogPreview";

interface Props {
  showCta?: boolean; // ← new prop
}

export default async function BlogPreviewWrapper({ showCta = true }: Props) {
  const posts = await prisma.blogPost.findMany({
    where: { isPublished: true },
    take: 3,
    orderBy: { createdAt: "desc" },
    select: {
      title: true,
      excerpt: true,
      coverImage: true,
      slug: true,
    },
  });

  return <BlogPreview posts={posts} showCta={showCta} />;
}




// import { prisma } from "@/lib/prisma";
// import BlogPreview from "./BlogPreview";

// export default async function BlogPreviewWrapper() {
//   const posts = await prisma.blogPost.findMany({
//     where: { isPublished: true },
//     take: 3,
//     orderBy: { createdAt: "desc" },
//     select: {
//       title: true,
//       excerpt: true,
//       coverImage: true,
//       slug: true,
//     },
//   });

//   return <BlogPreview posts={posts} />;
// }



// import { prisma } from '@/lib/prisma'; // Adjust this import path to your prisma client path
// import BlogPreview from './BlogPreview';

// interface BlogPost {
//   title: string;
//   excerpt: string;
//   coverImage?: string | null;
//   slug: string;
// }

// export default async function BlogPreviewWrapper() {
//   const posts = await prisma.blogPost.findMany({
//     take: 6,
//     orderBy: { createdAt: 'desc' },
//     select: {
//       title: true,
//       excerpt: true,
//       coverImage: true,
//       slug: true,
//     },
//   });

//   return <BlogPreview posts={posts} />;
// }





// import { prisma } from '@/lib/prisma'; // Adjust path to your prisma client
// import BlogPreview from './BlogPreview';

// interface BlogPost {
//   title: string;
//   excerpt: string;
//   image: string;
//   slug: string;
// }

// export default async function BlogPreviewWrapper() {
//   // Fetch blog posts from Prisma
//   const posts = await prisma.blogPost.findMany({
//     take: 6, // Limit to latest 6 posts
//     orderBy: { createdAt: 'desc' },
//     select: {
//       title: true,
//       excerpt: true,
//       image: true,
//       slug: true,
//     },
//   });

//   return <BlogPreview posts={posts} />;
// }

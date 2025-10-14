// -------- Added Created By and Updated By fields to blogPost model in Prisma schema --------
import { prisma } from '@/lib/prisma';
import type { BlogCategory } from '@prisma/client';

/* helper: strip text & truncate */
function generateExcerpt(contentJson: any, max = 160): string {
  const textNodes: string[] = [];
  function walk(node: any) {
    if (node.type === "text" && node.text) textNodes.push(node.text);
    if (node.content?.length) node.content.forEach(walk);
  }
  walk(contentJson);
  const plain = textNodes.join(" ").replace(/\s+/g, " ").trim();
  if (plain.length <= max) return plain;
  return plain.slice(0, max).replace(/\s+\S*$/, "") + "…";
}

export const createPost = (data: any, userId: string) => {
  const excerpt = generateExcerpt(data.content);
  return prisma.blogPost.create({
    data: {
      ...data,
      content: data.content,
      excerpt,
      createdById: userId,
    },
  });
};

export const updatePost = (id: string, data: any, userId: string) => {
  const excerpt = generateExcerpt(data.content);
  return prisma.blogPost.update({
    where: { id },
    data: {
      ...data,
      content: data.content,
      excerpt,
      updatedById: userId,
    },
  });
};

export const deletePost = (id: string) =>
  prisma.blogPost.delete({ where: { id } });

export const listPosts = (publishedOnly = false, category?: BlogCategory) =>
  prisma.blogPost.findMany({
    where: {
      ...(publishedOnly && { isPublished: true }),
      ...(category && { category }),
    },
    orderBy: { createdAt: 'desc' },
  });

export const getPostById = (id: string) =>
  prisma.blogPost.findUnique({ where: { id } });

export const getPostBySlug = (slug: string) =>
  prisma.blogPost.findUnique({ where: { slug } });



// // -------- Added Created By and Udated By fields to blogPost model in Prisma schema --------
// import { prisma } from '@/lib/prisma';
// import type { BlogCategory } from '@prisma/client';

// export const createPost = (data: any, userId: string) =>
//   prisma.blogPost.create({
//     data: {
//       ...data,
//       content: data.content,
//       createdById: userId,
//     },
//   });

// export const updatePost = (id: string, data: any, userId: string) =>
//   prisma.blogPost.update({
//     where: { id },
//     data: {
//       ...data,
//       content: data.content,
//       updatedById: userId,
//     },
//   });

// export const deletePost = (id: string) =>
//   prisma.blogPost.delete({ where: { id } });

// export const listPosts = (publishedOnly = false, category?: BlogCategory) =>
//   prisma.blogPost.findMany({
//     where: {
//       ...(publishedOnly && { isPublished: true }),
//       ...(category && { category }),
//     },
//     orderBy: { createdAt: 'desc' },
//   });

// export const getPostById = (id: string) =>
//   prisma.blogPost.findUnique({ where: { id } });

// export const getPostBySlug = (slug: string) =>
//   prisma.blogPost.findUnique({ where: { slug } });







// // app/cms/blog/_utils/blogMutations.server.ts
// import { prisma } from '@/lib/prisma';
// import type { BlogCategory } from '@prisma/client'; // <-- enum lives here

// export const createPost = (data: any) =>
//   prisma.blogPost.create({ data: { ...data, content: data.content } });

// export const updatePost = (id: string, data: any) =>
//   prisma.blogPost.update({ where: { id }, data: { ...data, content: data.content } });

// export const deletePost = (id: string) =>
//   prisma.blogPost.delete({ where: { id } });

// export const listPosts = (publishedOnly = false, category?: BlogCategory) =>
//   prisma.blogPost.findMany({
//     where: {
//       ...(publishedOnly && { isPublished: true }),
//       ...(category && { category }),
//     },
//     orderBy: { createdAt: 'desc' },
//   });

// export const getPostById = (id: string) =>
//   prisma.blogPost.findUnique({ where: { id } });

// export const getPostBySlug = (slug: string) =>
//   prisma.blogPost.findUnique({ where: { slug } });




// import { prisma } from '@/lib/prisma';
// import { BlogCategory } from '@prisma/client';

// /* ---------- thin CRUD wrappers ---------- */
// export const createPost = (data: any) =>
//   prisma.blogPost.create({ data: { ...data, content: data.content } });

// export const updatePost = (id: string, data: any) =>
//   prisma.blogPost.update({ where: { id }, data: { ...data, content: data.content } });

// export const deletePost = (id: string) =>
//   prisma.blogPost.delete({ where: { id } });

// /**
//  * List posts with optional filters:
//  * @param publishedOnly  - return only published posts
//  * @param category       - filter by category (exact match)
//  */
// export const listPosts = (publishedOnly = false, category?: BlogCategory) =>
//   prisma.blogPost.findMany({
//     where: {
//       ...(publishedOnly && { isPublished: true }),
//       ...(category && { category }),
//     },
//     orderBy: { createdAt: 'desc' },
//   });

// export const getPostById = (id: string) =>
//   prisma.blogPost.findUnique({ where: { id } });

// export const getPostBySlug = (slug: string) =>
//   prisma.blogPost.findUnique({ where: { slug } });


// WORKING BEFORE BLOG CATEGORY 
// import { prisma } from '@/lib/prisma';

// /* ---------- thin CRUD wrappers ---------- */
// export const createPost = (data: any) =>
//   prisma.blogPost.create({ data: { ...data, content: data.content } });

// export const updatePost = (id: string, data: any) =>
//   prisma.blogPost.update({ where: { id }, data: { ...data, content: data.content } });

// export const deletePost = (id: string) =>
//   prisma.blogPost.delete({ where: { id } });

// export const listPosts = (publishedOnly = false) =>
//   prisma.blogPost.findMany({
//     where: publishedOnly ? { isPublished: true } : {},
//     orderBy: { createdAt: 'desc' },
//   });

// export const getPostById = (id: string) =>
//   prisma.blogPost.findUnique({ where: { id } });

// export const getPostBySlug = (slug: string) =>
//   prisma.blogPost.findUnique({ where: { slug } });
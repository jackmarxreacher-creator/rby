// app/cms/blog/_utils/blogMutations.server.ts
import { prisma } from '@/lib/prisma';
import type { BlogCategory } from '@prisma/client'; // <-- enum lives here

export const createPost = (data: any) =>
  prisma.blogPost.create({ data: { ...data, content: data.content } });

export const updatePost = (id: string, data: any) =>
  prisma.blogPost.update({ where: { id }, data: { ...data, content: data.content } });

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
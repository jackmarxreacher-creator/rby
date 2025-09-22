"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { createPost, updatePost, deletePost } from "./_utils/blogMutations.server";

const schema = z.object({
  id: z.string().optional(),
  title: z.string().min(1).max(120),
  subHeading: z.string().max(180).optional(),
  caption: z.string().max(280).optional(),
  slug: z.string().regex(/^[\w-]+$/),
  coverImage: z.string().optional(),
  content: z.string(),
  isPublished: z.boolean().default(false),
});

export async function saveBlogPost(data: z.infer<typeof schema>) {
  const parsed = schema.parse(data);
  parsed.content = JSON.parse(parsed.content);
  if (parsed.id) {
    await updatePost(parsed.id, parsed);
    return { id: parsed.id };
  }
  const created = await createPost(parsed);
  revalidatePath("/cms/blog");
  return { id: created.id };
}

export async function removeBlogPost(id: string) {
  await deletePost(id);
  revalidatePath("/cms/blog");
}





// 'use server';

// import { revalidatePath } from 'next/cache';
// import { z } from 'zod';
// import { createPost, updatePost, deletePost } from './_utils/blogMutations.server';

// const schema = z.object({
//   id: z.string().optional(),
//   title: z.string().min(1).max(120),
//   subHeading: z.string().max(180).optional(),
//   caption: z.string().max(280).optional(),
//   slug: z.string().regex(/^[\w-]+$/),
//   coverImage: z.string().optional(),
//   content: z.string(),
//   isPublished: z.boolean().default(false),
// });

// export async function saveBlogPost(data: z.infer<typeof schema>) {
//   const parsed = schema.parse(data);
//   parsed.content = JSON.parse(parsed.content); // store as JSONB

//   let result;
//   if (parsed.id) {
//     result = await updatePost(parsed.id, parsed);
//   } else {
//     result = await createPost(parsed);
//   }

//   revalidatePath('/cms/blog');
//   return { id: result.id }; // ← used for client-side redirect
// }

// export async function removeBlogPost(id: string) {
//   await deletePost(id);
//   revalidatePath('/cms/blog');
// }




// 'use server';

// import { revalidatePath } from 'next/cache';
// import { z } from 'zod';
// import { createPost, updatePost, deletePost } from './_utils/blogMutations.server';

// const schema = z.object({
//   id: z.string().optional(),
//   title: z.string().min(1).max(120),
//   subHeading: z.string().max(180).optional(),
//   caption: z.string().max(280).optional(),
//   slug: z.string().regex(/^[\w-]+$/),
//   coverImage: z.string().optional(),
//   content: z.string(),
//   isPublished: z.boolean().default(false),
// });

// export async function saveBlogPost(data: z.infer<typeof schema>) {
//   const parsed = schema.parse(data);
//   parsed.content = JSON.parse(parsed.content); // store as JSONB
//   if (parsed.id) await updatePost(parsed.id, parsed);
//   else await createPost(parsed);
//   revalidatePath('/cms/blog');
// }

// export async function removeBlogPost(id: string) {
//   await deletePost(id);
//   revalidatePath('/cms/blog');
// }
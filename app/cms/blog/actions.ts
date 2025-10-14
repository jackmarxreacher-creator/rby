// ------- Added Logging of Created By and Updated By ------- //
"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { createPost, updatePost, deletePost } from "./_utils/blogMutations.server";
import { getAuth } from "@/lib/auth"; // Better-Auth server helper
import { logUserActivity } from "@/lib/logging"; // import logging helper

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

type Result = { ok: boolean; message: string };

export async function saveBlogPost(data: z.infer<typeof schema>): Promise<Result> {
  try {
    const session = await getAuth();
    if (!session?.user?.id) throw new Error("Unauthorized");

    const parsed = schema.parse(data);
    parsed.content = JSON.parse(parsed.content);

    if (parsed.id) {
      await updatePost(parsed.id, parsed, session.user.id);

      // Log update blog post activity
      await logUserActivity(
        session.user.id,
        "update_blog_post",
        `User updated blog post with id=${parsed.id}`,
        { blogPostId: parsed.id }
      );

      revalidatePath("/cms/blog");
      return { ok: true, message: "Blog post updated" };
    }

    const created = await createPost(parsed, session.user.id);

    // Log create blog post activity
    await logUserActivity(
      session.user.id,
      "create_blog_post",
      `User created a new blog post with id=${created.id}`,
      { blogPostId: created.id }
    );

    revalidatePath("/cms/blog");
    return { ok: true, message: "Blog post created" };
  } catch (err: any) {
    return { ok: false, message: err?.message ?? "An error occurred" };
  }
}

export async function removeBlogPost(id: string): Promise<Result> {
  try {
    const session = await getAuth();
    if (!session?.user?.id) throw new Error("Unauthorized");

    await deletePost(id);

    // Log delete blog post activity
    await logUserActivity(
      session.user.id,
      "delete_blog_post",
      `User deleted blog post with id=${id}`,
      { blogPostId: id }
    );

    revalidatePath("/cms/blog");
    return { ok: true, message: "Blog post deleted" };
  } catch (err: any) {
    return { ok: false, message: err?.message ?? "An error occurred" };
  }
}




// // ------- Added Logging of Created By and Updated By ------- //
// "use server";

// import { revalidatePath } from "next/cache";
// import { z } from "zod";
// import { createPost, updatePost, deletePost } from "./_utils/blogMutations.server";
// import { getAuth } from "@/lib/auth"; // Better-Auth server helper
// import { logUserActivity } from "@/lib/logging"; // import logging helper

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
//   const session = await getAuth();
//   if (!session?.user?.id) throw new Error("Unauthorized");

//   const parsed = schema.parse(data);
//   parsed.content = JSON.parse(parsed.content);

//   if (parsed.id) {
//     await updatePost(parsed.id, parsed, session.user.id);

//     // Log update blog post activity
//     await logUserActivity(
//       session.user.id,
//       "update_blog_post",
//       `User updated blog post with id=${parsed.id}`,
//       { blogPostId: parsed.id }
//     );

//     return { id: parsed.id };
//   }
//   const created = await createPost(parsed, session.user.id);

//   // Log create blog post activity
//   await logUserActivity(
//     session.user.id,
//     "create_blog_post",
//     `User created a new blog post with id=${created.id}`,
//     { blogPostId: created.id }
//   );

//   revalidatePath("/cms/blog");
//   return { id: created.id };
// }

// export async function removeBlogPost(id: string) {
//   const session = await getAuth();
//   if (!session?.user?.id) throw new Error("Unauthorized");

//   await deletePost(id);

//   // Log delete blog post activity
//   await logUserActivity(
//     session.user.id,
//     "delete_blog_post",
//     `User deleted blog post with id=${id}`,
//     { blogPostId: id }
//   );

//   revalidatePath("/cms/blog");
// }





// // ------- Added Logging of Created By and Updated By ------- //
// "use server";

// import { revalidatePath } from "next/cache";
// import { z } from "zod";
// import { createPost, updatePost, deletePost } from "./_utils/blogMutations.server";

// import { getCurrentUser } from "@/lib/auth-server";
// import { logUserActivity } from "@/lib/logging"; // import logging helper

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
//   const user = await getCurrentUser();
//   if (!user?.id) throw new Error("Unauthorized");

//   const parsed = schema.parse(data);
//   parsed.content = JSON.parse(parsed.content);

//   if (parsed.id) {
//     await updatePost(parsed.id, parsed, user.id);

//     // Log update blog post activity
//     await logUserActivity(
//       user.id,
//       "update_blog_post",
//       `User updated blog post with id=${parsed.id}`,
//       { blogPostId: parsed.id }
//     );

//     return { id: parsed.id };
//   }
//   const created = await createPost(parsed, user.id);

//   // Log create blog post activity
//   await logUserActivity(
//     user.id,
//     "create_blog_post",
//     `User created a new blog post with id=${created.id}`,
//     { blogPostId: created.id }
//   );

//   revalidatePath("/cms/blog");
//   return { id: created.id };
// }

// export async function removeBlogPost(id: string) {
//   const user = await getCurrentUser();
//   if (!user?.id) throw new Error("Unauthorized");

//   await deletePost(id);

//   // Log delete blog post activity
//   await logUserActivity(
//     user.id,
//     "delete_blog_post",
//     `User deleted blog post with id=${id}`,
//     { blogPostId: id }
//   );

//   revalidatePath("/cms/blog");
// }






// // Added Created By and Updated By fields to blog posts
// "use server";

// import { revalidatePath } from "next/cache";
// import { z } from "zod";
// import { createPost, updatePost, deletePost } from "./_utils/blogMutations.server";

// import { getCurrentUser } from "@/lib/auth-server";

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
//   const user = await getCurrentUser();
//   if (!user?.id) throw new Error("Unauthorized");

//   const parsed = schema.parse(data);
//   parsed.content = JSON.parse(parsed.content);

//   if (parsed.id) {
//     await updatePost(parsed.id, parsed, user.id);
//     return { id: parsed.id };
//   }
//   const created = await createPost(parsed, user.id);
//   revalidatePath("/cms/blog");
//   return { id: created.id };
// }

// export async function removeBlogPost(id: string) {
//   await deletePost(id);
//   revalidatePath("/cms/blog");
// }






// "use server";

// import { revalidatePath } from "next/cache";
// import { z } from "zod";
// import { createPost, updatePost, deletePost } from "./_utils/blogMutations.server";

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
//   parsed.content = JSON.parse(parsed.content);
//   if (parsed.id) {
//     await updatePost(parsed.id, parsed);
//     return { id: parsed.id };
//   }
//   const created = await createPost(parsed);
//   revalidatePath("/cms/blog");
//   return { id: created.id };
// }

// export async function removeBlogPost(id: string) {
//   await deletePost(id);
//   revalidatePath("/cms/blog");
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
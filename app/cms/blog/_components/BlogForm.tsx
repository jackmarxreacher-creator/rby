"use client";

import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { useRouter } from "next/navigation";
import TiptapEditor from "./TiptapEditor";

/* ----------  ZOD SCHEMA  ---------- */
const BlogSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1).max(120),
  subHeading: z.string().max(180).optional(),
  caption: z.string().max(280).optional(),
  slug: z.string().regex(/^[\w-]+$/),
  coverImage: z.string().optional(),
  content: z.string(),
  category: z.enum(["Distribution", "Logistics", "Partnerships", "Innovation", "Sustainability", "News"]).default("News"),
  isPublished: z.boolean().default(false),
});

export type BlogInputs = z.infer<typeof BlogSchema> & { isPublished: boolean };

/* ----------  EMPTY DEFAULT  ---------- */
const empty: BlogInputs = {
  title: "",
  subHeading: "",
  caption: "",
  slug: "",
  coverImage: "",
  content: "",
  category: "News",
  isPublished: false,
};

/* ----------  PROPS  ---------- */
interface Props {
  post?: BlogInputs;
  onSave: (data: BlogInputs) => Promise<{ ok: boolean; message: string }>;
}

/* ----------  COMPONENT  ---------- */
export default function BlogForm({ post, onSave }: Props) {
  const router = useRouter();
  const [uploading, setUploading] = useState(false);
  const [willPublish, setWillPublish] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<BlogInputs>({
    resolver: zodResolver(BlogSchema as any), // <-- cast away subtle mismatch
    defaultValues: post || empty,
  });

  const content = watch("content");

  /* ----------  SUBMIT  ---------- */
  const onSubmit: SubmitHandler<BlogInputs> = async (data) => {
    const res = await onSave({ ...data, isPublished: willPublish });
    if (res?.ok) router.push("/cms/blog");
  };

  /* ----------  IMAGE UPLOAD  ---------- */
  const uploadImage = async (file: File) => {
    setUploading(true);
    const reader = new FileReader();
    return new Promise<string>((resolve, reject) => {
      reader.onload = async (e) => {
        const dataUrl = e.target?.result as string;
        try {
          const res = await fetch("/api/blog-image", {
            method: "POST",
            body: new URLSearchParams({ image: dataUrl }),
          });
          const { url } = (await res.json()) as { url: string };
          resolve(url);
        } catch (err) {
          reject(err);
        } finally {
          setUploading(false);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  /* ----------  RENDER  ---------- */
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Title */}
      <input
        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
        placeholder="Title *"
        {...register("title")}
      />
      {errors.title && <Err msg={errors.title.message} />}

      {/* Sub-heading */}
      <input
        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
        placeholder="Sub-heading"
        {...register("subHeading")}
      />

      {/* Caption */}
      <textarea
        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
        placeholder="Short caption"
        rows={2}
        {...register("caption")}
      />

      {/* Slug */}
      <input
        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
        placeholder="URL-slug * (e.g. my-post)"
        {...register("slug")}
      />
      {errors.slug && <Err msg={errors.slug.message} />}

      {/* Category */}
      <label className="block text-sm font-medium text-foreground">Category</label>
      <select
        {...register("category")}
        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
      >
        <option value="Distribution">Distribution</option>
        <option value="Logistics">Logistics</option>
        <option value="Partnerships">Partnerships</option>
        <option value="Innovation">Innovation</option>
        <option value="Sustainability">Sustainability</option>
        <option value="News">News</option>
      </select>

      {/* Cover Image */}
      <label className="block text-sm font-medium text-foreground">Cover image</label>
      <input
        type="file"
        accept="image/*"
        disabled={uploading}
        onChange={async (e) => {
          const file = e.target.files?.[0];
          if (!file) return;
          const url = await uploadImage(file);
          setValue("coverImage", url);
        }}
      />
      {watch("coverImage") && (
        <img
          src={watch("coverImage")}
          alt="cover"
          className="mt-2 h-32 rounded-lg border border-border"
        />
      )}

      {/* Body */}
      <label className="block text-sm font-medium text-foreground">Body *</label>
      <TiptapEditor
        content={watch("content")}
        onChange={(json) => setValue("content", json, { shouldValidate: true })}
        uploadImage={uploadImage}
      />
      {errors.content && <Err msg={errors.content.message} />}

      {/* Action Buttons */}
      <div className="flex items-center gap-2">
        <button
          type="submit"
          onClick={() => setWillPublish(false)}
          disabled={isSubmitting || uploading}
          className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground hover:bg-accent hover:text-accent-foreground focus:outline-none focus:ring-2 focus:ring-ring disabled:opacity-50"
        >
          Save as draft
        </button>

        <button
          type="submit"
          onClick={() => setWillPublish(true)}
          disabled={isSubmitting || uploading}
          className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-ring disabled:opacity-50"
        >
          {post?.id ? "Update & publish" : "Publish now"}
        </button>

        <button
          type="button"
          onClick={() => window.history.back()}
          className="inline-flex items-center justify-center rounded-md border border-border bg-secondary px-4 py-2 text-sm font-medium text-secondary-foreground hover:bg-secondary/80 focus:outline-none focus:ring-2 focus:ring-ring"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

const Err = ({ msg }: { msg?: string }) => (
  <p className="text-sm text-destructive">{msg}</p>
);



// WORKING BEFORE BLOG CATEGORY
// "use client";

// import { useForm, type SubmitHandler } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { z } from "zod";
// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import TiptapEditor from "./TiptapEditor";

// export const BlogSchema = z.object({
//   id: z.string().optional(),
//   title: z.string().min(1).max(120),
//   subHeading: z.string().max(180).optional(),
//   caption: z.string().max(280).optional(),
//   slug: z.string().regex(/^[\w-]+$/),
//   coverImage: z.string().optional(),
//   content: z.string(),
//   isPublished: z.boolean().default(false),
// });

// export type BlogInputs = z.infer<typeof BlogSchema> & { isPublished: boolean };

// const empty: BlogInputs = {
//   title: "",
//   subHeading: "",
//   caption: "",
//   slug: "",
//   coverImage: "",
//   content: "",
//   isPublished: false,
// };

// interface Props {
//   post?: BlogInputs;
//   onSave: (data: BlogInputs) => Promise<{ id: string }>;
// }

// export default function BlogForm({ post, onSave }: Props) {
//   const router = useRouter();
//   const [uploading, setUploading] = useState(false);
//   const [willPublish, setWillPublish] = useState<boolean>(false); // which button pressed

//   const {
//     register,
//     handleSubmit,
//     setValue,
//     watch,
//     formState: { errors, isSubmitting },
//   } = useForm<BlogInputs>({
//     resolver: zodResolver(BlogSchema as any),
//     defaultValues: post || empty,
//   });

//   const content = watch("content");

//   /* ---------- submit ---------- */
//   const onSubmit: SubmitHandler<BlogInputs> = async (data) => {
//     await onSave({ ...data, isPublished: willPublish });
//     router.push("/cms/blog");
//   };

//   /* ---------- image upload ---------- */
//   const uploadImage = async (file: File) => {
//     setUploading(true);
//     const reader = new FileReader();
//     return new Promise<string>((resolve, reject) => {
//       reader.onload = async (e) => {
//         const dataUrl = e.target?.result as string;
//         try {
//           const res = await fetch("/api/blog-image", {
//             method: "POST",
//             body: new URLSearchParams({ image: dataUrl }),
//           });
//           const { url } = (await res.json()) as { url: string };
//           resolve(url);
//         } catch (err) {
//           reject(err);
//         } finally {
//           setUploading(false);
//         }
//       };
//       reader.readAsDataURL(file);
//     });
//   };

//   return (
//     <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//       <input
//         className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
//         placeholder="Title *"
//         {...register("title")}
//       />
//       {errors.title && <Err msg={errors.title.message} />}

//       <input
//         className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
//         placeholder="Sub-heading"
//         {...register("subHeading")}
//       />
//       <textarea
//         className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
//         placeholder="Short caption"
//         rows={2}
//         {...register("caption")}
//       />

//       <input
//         className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
//         placeholder="URL-slug * (e.g. my-post)"
//         {...register("slug")}
//       />
//       {errors.slug && <Err msg={errors.slug.message} />}

//       <label className="block text-sm font-medium text-foreground">Cover image</label>
//       <input
//         type="file"
//         accept="image/*"
//         disabled={uploading}
//         onChange={async (e) => {
//           const file = e.target.files?.[0];
//           if (!file) return;
//           const url = await uploadImage(file);
//           setValue("coverImage", url);
//         }}
//       />
//       {watch("coverImage") && (
//         <img
//           src={watch("coverImage")}
//           alt="cover"
//           className="mt-2 h-32 rounded-lg border border-border"
//         />
//       )}

//       <label className="block text-sm font-medium text-foreground">Body *</label>
//       <TiptapEditor
//         content={content}
//         onChange={(json) => setValue("content", json, { shouldValidate: true })}
//         uploadImage={uploadImage}
//       />
//       {errors.content && <Err msg={errors.content.message} />}

//       {/* ---------- action buttons ---------- */}
//       <div className="flex items-center gap-2">
//         <button
//           type="submit"
//           onClick={() => setWillPublish(false)}
//           disabled={isSubmitting || uploading}
//           className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground hover:bg-accent hover:text-accent-foreground focus:outline-none focus:ring-2 focus:ring-ring disabled:opacity-50"
//         >
//           Save as draft
//         </button>

//         <button
//           type="submit"
//           onClick={() => setWillPublish(true)}
//           disabled={isSubmitting || uploading}
//           className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-ring disabled:opacity-50"
//         >
//           {post?.id ? "Update & publish" : "Publish now"}
//         </button>

//         <button
//           type="button"
//           onClick={() => window.history.back()}
//           className="inline-flex items-center justify-center rounded-md border border-border bg-secondary px-4 py-2 text-sm font-medium text-secondary-foreground hover:bg-secondary/80 focus:outline-none focus:ring-2 focus:ring-ring"
//         >
//           Cancel
//         </button>
//       </div>
//     </form>
//   );
// }

// const Err = ({ msg }: { msg?: string }) => (
//   <p className="text-sm text-destructive">{msg}</p>
// );



// 'use client';

// import { useForm } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { z } from 'zod';
// import { useState } from 'react';
// import { useRouter } from 'next/navigation';
// import TiptapEditor from './TiptapEditor';

// /* ---------------- schema ---------------- */
// export const BlogSchema = z.object({
//   id: z.string().optional(),
//   title: z.string().min(1).max(120),
//   subHeading: z.string().max(180).optional(),
//   caption: z.string().max(280).optional(),
//   slug: z.string().regex(/^[\w-]+$/),
//   coverImage: z.string().optional(),
//   content: z.string(),
//   isPublished: z.boolean().default(false),
// });

// export type BlogInputs = z.infer<typeof BlogSchema> & { isPublished: boolean };

// const empty: BlogInputs = {
//   title: '',
//   subHeading: '',
//   caption: '',
//   slug: '',
//   coverImage: '',
//   content: '',
//   isPublished: false,
// };

// interface Props {
//   post?: BlogInputs;
//   onSave: (data: BlogInputs) => Promise<{ id: string }>;
// }

// export default function BlogForm({ post, onSave }: Props) {
//   const router = useRouter();
//   const {
//     register,
//     handleSubmit,
//     setValue,
//     watch,
//     formState: { errors, isSubmitting },
//   } = useForm<BlogInputs>({
//     resolver: zodResolver(BlogSchema as any),
//     defaultValues: post || empty,
//   });

//   const content = watch('content');
//   const [uploading, setUploading] = useState(false);

//   /*  upload helper  */
//   const uploadImage = async (file: File) => {
//     setUploading(true);
//     const reader = new FileReader();
//     return new Promise<string>((resolve, reject) => {
//       reader.onload = async (e) => {
//         const dataUrl = e.target?.result as string;
//         try {
//           const res = await fetch('/api/blog-image', {
//             method: 'POST',
//             body: new URLSearchParams({ image: dataUrl }),
//           });
//           const { url } = (await res.json()) as { url: string };
//           resolve(url);
//         } catch (err) {
//           reject(err);
//         } finally {
//           setUploading(false);
//         }
//       };
//       reader.readAsDataURL(file);
//     });
//   };

//   /*  submit wrapper  */
//   const submitForm = (willPublish: boolean) => async () => {
//     setValue('isPublished', willPublish);
//     await new Promise((r) => setTimeout(r, 0)); // let setValue flush
//     await handleSubmit(onSave)(); // server action
//     router.push('/cms/blog'); // redirect after success
//   };

//   return (
//     <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
//       {/* ---------- meta ---------- */}
//       <input
//         className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
//         placeholder="Title *"
//         {...register('title')}
//       />
//       {errors.title && <Err msg={errors.title.message} />}

//       <input
//         className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
//         placeholder="Sub-heading"
//         {...register('subHeading')}
//       />

//       <textarea
//         className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
//         placeholder="Short caption"
//         rows={2}
//         {...register('caption')}
//       />

//       <input
//         className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
//         placeholder="URL-slug * (e.g. my-post)"
//         {...register('slug')}
//       />
//       {errors.slug && <Err msg={errors.slug.message} />}

//       {/* ---------- cover image ---------- */}
//       <label className="block text-sm font-medium text-foreground">Cover image</label>
//       <input
//         type="file"
//         accept="image/*"
//         disabled={uploading}
//         onChange={async (e) => {
//           const file = e.target.files?.[0];
//           if (!file) return;
//           const url = await uploadImage(file);
//           setValue('coverImage', url);
//         }}
//       />
//       {watch('coverImage') && (
//         <img src={watch('coverImage')} alt="cover" className="mt-2 h-32 rounded-lg border border-border" />
//       )}

//       {/* ---------- body ---------- */}
//       <label className="block text-sm font-medium text-foreground">Body *</label>
//       <TiptapEditor
//         content={content}
//         onChange={(json) => setValue('content', json, { shouldValidate: true })}
//         uploadImage={uploadImage}
//       />
//       {errors.content && <Err msg={errors.content.message} />}

//       {/* ---------- buttons ---------- */}
//       <div className="flex gap-2">
//         <button
//           type="button"
//           onClick={() => submitForm(false)}
//           disabled={isSubmitting || uploading}
//           className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground hover:bg-accent hover:text-accent-foreground focus:outline-none focus:ring-2 focus:ring-ring disabled:opacity-50"
//         >
//           Save as draft
//         </button>

//         <button
//           type="button"
//           onClick={() => submitForm(true)}
//           disabled={isSubmitting || uploading}
//           className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-ring disabled:opacity-50"
//         >
//           {post?.id ? 'Update & publish' : 'Publish now'}
//         </button>

//         <button
//           type="button"
//           onClick={() => router.push('/cms/blog')}
//           className="inline-flex items-center justify-center rounded-md border border-border bg-secondary px-4 py-2 text-sm font-medium text-secondary-foreground hover:bg-secondary/80 focus:outline-none focus:ring-2 focus:ring-ring"
//         >
//           Cancel
//         </button>
//       </div>
//     </form>
//   );
// }

// const Err = ({ msg }: { msg?: string }) => (
//   <p className="text-sm text-destructive">{msg}</p>
// );



// 'use client';

// import { useForm } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { z } from 'zod';
// import { useState } from 'react';
// import TiptapEditor from './TiptapEditor';

// /* ---------------- schema ---------------- */
// export const BlogSchema = z.object({
//   id: z.string().optional(),
//   title: z.string().min(1).max(120),
//   subHeading: z.string().max(180).optional(),
//   caption: z.string().max(280).optional(),
//   slug: z.string().regex(/^[\w-]+$/),
//   coverImage: z.string().optional(),
//   content: z.string(),
//   isPublished: z.boolean().default(false),
// });

// export type BlogInputs = z.infer<typeof BlogSchema> & { isPublished: boolean };

// /* ---------------- empty stub ---------------- */
// const empty: BlogInputs = {
//   title: '',
//   subHeading: '',
//   caption: '',
//   slug: '',
//   coverImage: '',
//   content: '',
//   isPublished: false,
// };

// interface Props {
//   post?: BlogInputs;
//   onSave: (data: BlogInputs) => Promise<void>;
// }

// export default function BlogForm({ post, onSave }: Props) {
//   const {
//     register,
//     handleSubmit,
//     setValue,
//     watch,
//     formState: { errors, isSubmitting },
//   } = useForm<BlogInputs>({
//     resolver: zodResolver(BlogSchema as any),
//     defaultValues: post || empty,
//   });

//   const content = watch('content');
//   const [uploading, setUploading] = useState(false);

//   /*  image upload  */
//   const uploadImage = async (file: File) => {
//     setUploading(true);
//     const reader = new FileReader();
//     return new Promise<string>((resolve, reject) => {
//       reader.onload = async (e) => {
//         const dataUrl = e.target?.result as string;
//         try {
//           const res = await fetch('/api/blog-image', {
//             method: 'POST',
//             body: new URLSearchParams({ image: dataUrl }),
//           });
//           const { url } = (await res.json()) as { url: string };
//           resolve(url);
//         } catch (err) {
//           reject(err);
//         } finally {
//           setUploading(false);
//         }
//       };
//       reader.readAsDataURL(file);
//     });
//   };

//   /*  submit handler – called by both buttons  */
//   const submitForm = (willPublish: boolean) => async (e: React.MouseEvent) => {
//     e.preventDefault();
//     setValue('isPublished', willPublish);
//     // small delay so setValue finishes
//     await new Promise((r) => setTimeout(r, 0));
//     handleSubmit(onSave)();
//   };

//   return (
//     <form className="space-y-4">
//       {/* ---------- metadata inputs ---------- */}
//       <input
//         className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
//         placeholder="Title *"
//         {...register('title')}
//       />
//       {errors.title && <Err msg={errors.title.message} />}

//       <input
//         className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
//         placeholder="Sub-heading"
//         {...register('subHeading')}
//       />

//       <textarea
//         className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
//         placeholder="Short caption"
//         rows={2}
//         {...register('caption')}
//       />

//       <input
//         className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
//         placeholder="URL-slug * (e.g. my-post)"
//         {...register('slug')}
//       />
//       {errors.slug && <Err msg={errors.slug.message} />}

//       {/* ---------- cover image ---------- */}
//       <label className="block text-sm font-medium text-foreground">Cover image</label>
//       <input
//         type="file"
//         accept="image/*"
//         disabled={uploading}
//         onChange={async (e) => {
//           const file = e.target.files?.[0];
//           if (!file) return;
//           const url = await uploadImage(file);
//           setValue('coverImage', url);
//         }}
//       />
//       {watch('coverImage') && (
//         <img src={watch('coverImage')} alt="cover" className="mt-2 h-32 rounded-lg border border-border" />
//       )}

//       {/* ---------- body (TipTap) ---------- */}
//       <label className="block text-sm font-medium text-foreground">Body *</label>
//       <TiptapEditor
//         content={content}
//         onChange={(json) => setValue('content', json, { shouldValidate: true })}
//         uploadImage={uploadImage}
//       />
//       {errors.content && <Err msg={errors.content.message} />}

//       {/* ---------- action buttons ---------- */}
//       <div className="flex gap-2">
//         <button
//           type="button"
//           onClick={submitForm(false)}
//           disabled={isSubmitting || uploading}
//           className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground hover:bg-accent hover:text-accent-foreground focus:outline-none focus:ring-2 focus:ring-ring disabled:opacity-50"
//         >
//           Save as draft
//         </button>

//         <button
//           type="button"
//           onClick={submitForm(true)}
//           disabled={isSubmitting || uploading}
//           className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-ring disabled:opacity-50"
//         >
//           {post?.id ? 'Update & publish' : 'Publish now'}
//         </button>
//       </div>
//     </form>
//   );
// }

// /* ---------- small helper ---------- */
// const Err = ({ msg }: { msg?: string }) => (
//   <p className="text-sm text-destructive">{msg}</p>
// );
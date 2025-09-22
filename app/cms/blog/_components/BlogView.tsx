"use client";

import { useRouter } from "next/navigation";
import { BlogViewServer } from "./BlogViewServer";
import { Button } from "@/components/ui/button";
import type { BlogPost } from "@prisma/client";

interface Props {
  html: string;
  post: BlogPost; // full Prisma type includes slug
}

export function BlogView({ html, post }: Props) {
  const router = useRouter();

  return (
    <article className="bg-[#fcfbf8] w-full px-6 py-8 rounded-xl border border-[#cccccc] shadow-sm">
      {/* cover image - regular <img> for CMS preview */}
      {post.coverImage && (
        <img
          src={post.coverImage}
          alt="Cover"
          className="w-full h-80 object-cover rounded-xl shadow-md mb-8"
        />
      )}

      {/* meta header */}
      <header className="mb-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-4xl font-bold text-[#1c1c1c]">{post.title}</h1>
            {post.subHeading && (
              <p className="text-xl text-[#4a4a4a] mt-2">{post.subHeading}</p>
            )}
            {post.caption && (
              <p className="text-sm text-[#6b6b6b] mt-1">{post.caption}</p>
            )}
            <div className="mt-4 text-sm text-[#9b7c4a]">
              {new Date(post.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </div>
          </div>

          <span
            className={`px-3 py-1 rounded-full text-xs font-medium ${
              post.isPublished
                ? "bg-green-100 text-green-800"
                : "bg-yellow-100 text-yellow-800"
            }`}
          >
            {post.isPublished ? "Published" : "Draft"}
          </span>
        </div>
      </header>

      {/* body content */}
      <div
        className="prose prose-lg prose-[#1c1c1c] max-w-none
                   prose-headings:text-[#1c1c1c]
                   prose-a:text-[#be965b]
                   prose-strong:text-[#1c1c1c]
                   prose-code:text-[#be965b]
                   prose-img:rounded-xl prose-img:shadow
                   prose-video:rounded-xl prose-video:shadow"
        dangerouslySetInnerHTML={{ __html: html }}
      />

      {/* action buttons */}
      <footer className="mt-8 flex items-center gap-3">
        <Button
          onClick={() => router.push(`/cms/blog/${post.id}`)}
          className="bg-[#be965b] hover:bg-[#a88248] text-black"
        >
          Edit this post
        </Button>

        {post.isPublished && (
          <Button
            variant="outline"
            onClick={() => router.push(`/blog/${post.slug}`)}
            className="border-[#be965b] text-[#be965b] hover:bg-[#f3ede5]"
          >
            View public version
          </Button>
        )}
      </footer>
    </article>
  );
}





// "use client";

// import { useRouter } from "next/navigation";
// import { Button } from "@/components/ui/button";

// interface Props {
//   html: string;
//   post: {
//     id: string;
//     slug: string; // <-- add this
//     title: string;
//     subHeading?: string | null;
//     caption?: string | null;
//     coverImage?: string | null;
//     isPublished: boolean;
//     createdAt: Date;
//   };
// }

// export function BlogView({ html, post }: Props) {
//   const router = useRouter();

//   return (
//     <article className="bg-[#fcfbf8] w-full px-6 py-8 rounded-xl border border-[#cccccc] shadow-sm">
//       {post.coverImage && (
//         <img
//           src={post.coverImage}
//           alt="Cover"
//           className="w-full h-80 object-cover rounded-xl shadow-md mb-8"
//         />
//       )}

//       <header className="mb-6">
//         <div className="flex items-start justify-between gap-4">
//           <div>
//             <h1 className="text-4xl font-bold text-[#1c1c1c]">{post.title}</h1>
//             {post.subHeading && (
//               <p className="text-xl text-[#4a4a4a] mt-2">{post.subHeading}</p>
//             )}
//             {post.caption && (
//               <p className="text-sm text-[#6b6b6b] mt-1">{post.caption}</p>
//             )}
//             <div className="mt-4 text-sm text-[#9b7c4a]">
//               {new Date(post.createdAt).toLocaleDateString("en-US", {
//                 year: "numeric",
//                 month: "long",
//                 day: "numeric",
//               })}
//             </div>
//           </div>

//           <span
//             className={`px-3 py-1 rounded-full text-xs font-medium ${
//               post.isPublished
//                 ? "bg-green-100 text-green-800"
//                 : "bg-yellow-100 text-yellow-800"
//             }`}
//           >
//             {post.isPublished ? "Published" : "Draft"}
//           </span>
//         </div>
//       </header>

//       <div
//         className="prose prose-lg prose-[#1c1c1c] max-w-none
//                    prose-headings:text-[#1c1c1c]
//                    prose-a:text-[#be965b]
//                    prose-strong:text-[#1c1c1c]
//                    prose-code:text-[#be965b]
//                    prose-img:rounded-xl prose-img:shadow
//                    prose-video:rounded-xl prose-video:shadow"
//         dangerouslySetInnerHTML={{ __html: html }}
//       />

//       <footer className="mt-8 flex items-center gap-3">
//         <Button
//           onClick={() => router.push(`/cms/blog/${post.id}`)}
//           className="bg-[#be965b] hover:bg-[#a88248] text-black"
//         >
//           Edit this post
//         </Button>

//         {post.isPublished && (
//           <Button
//             variant="outline"
//             onClick={() => router.push(`/blog/${post.slug}`)}
//             className="border-[#be965b] text-[#be965b] hover:bg-[#f3ede5]"
//           >
//             View public version
//           </Button>
//         )}
//       </footer>
//     </article>
//   );
// }




// "use client";

// import { useRouter } from "next/navigation";
// import { generateHTML } from "@tiptap/html";
// import StarterKit from "@tiptap/starter-kit";
// import Image from "@tiptap/extension-image";
// import Youtube from "@tiptap/extension-youtube";
// import { Button } from "@/components/ui/button";
// import type { BlogPost } from "@prisma/client";

// interface Props {
//   post: BlogPost;
// }

// export function BlogView({ post }: Props) {
//   const router = useRouter();

//   /* cast JsonValue → JSONContent (safe for preview) */
//   const html = generateHTML(
//     (post.content || { type: "doc", content: [] }) as any,
//     [StarterKit, Image, Youtube]
//   );

//   return (
//     <article className="bg-[#fcfbf8] w-full px-6 py-8 rounded-xl border border-[#cccccc] shadow-sm">
//       {/* ----  cover  ---- */}
//       {post.coverImage && (
//         <img
//           src={post.coverImage}
//           alt="Cover"
//           className="w-full h-80 object-cover rounded-xl shadow-md mb-8"
//         />
//       )}

//       {/* ----  meta  ---- */}
//       <header className="mb-6">
//         <div className="flex items-start justify-between gap-4">
//           <div>
//             <h1 className="text-4xl font-bold text-[#1c1c1c]">{post.title}</h1>
//             {post.subHeading && (
//               <p className="text-xl text-[#4a4a4a] mt-2">{post.subHeading}</p>
//             )}
//             {post.caption && (
//               <p className="text-sm text-[#6b6b6b] mt-1">{post.caption}</p>
//             )}
//             <div className="mt-4 text-sm text-[#9b7c4a]">
//               {new Date(post.createdAt).toLocaleDateString("en-US", {
//                 year: "numeric",
//                 month: "long",
//                 day: "numeric",
//               })}
//             </div>
//           </div>

//           <span
//             className={`px-3 py-1 rounded-full text-xs font-medium ${
//               post.isPublished
//                 ? "bg-green-100 text-green-800"
//                 : "bg-yellow-100 text-yellow-800"
//             }`}
//           >
//             {post.isPublished ? "Published" : "Draft"}
//           </span>
//         </div>
//       </header>

//       {/* ----  body  ---- */}
//       <div
//         className="prose prose-lg prose-[#1c1c1c] max-w-none
//                    prose-headings:text-[#1c1c1c]
//                    prose-a:text-[#be965b]
//                    prose-strong:text-[#1c1c1c]
//                    prose-code:text-[#be965b]
//                    prose-img:rounded-xl prose-img:shadow
//                    prose-video:rounded-xl prose-video:shadow"
//         dangerouslySetInnerHTML={{ __html: html }}
//       />

//       {/* ----  back to edit  ---- */}
//       <footer className="mt-8 flex items-center gap-3">
//         <Button
//           onClick={() => router.push(`/cms/blog/${post.id}`)}
//           className="bg-[#be965b] hover:bg-[#a88248] text-black"
//         >
//           Edit this post
//         </Button>

//         {post.isPublished && (
//           <Button
//             variant="outline"
//             onClick={() => router.push(`/blog/${post.slug}`)}
//             className="border-[#be965b] text-[#be965b] hover:bg-[#f3ede5]"
//           >
//             View public version
//           </Button>
//         )}
//       </footer>
//     </article>
//   );
// }



// "use client";

// import { useRouter } from "next/navigation";
// import { generateHTML } from "@tiptap/html";
// import StarterKit from "@tiptap/starter-kit";
// import Image from "@tiptap/extension-image";
// import Youtube from "@tiptap/extension-youtube";
// import { Button } from "@/components/ui/button";
// import type { BlogPost } from "@prisma/client";

// interface Props {
//   post: BlogPost;
// }

// export function BlogView({ post }: Props) {
//   const router = useRouter();
//   const html = generateHTML(post.content, [StarterKit, Image, Youtube]);

//   return (
//     <article className="bg-[#fcfbf8] w-full px-6 py-8 rounded-xl border border-[#cccccc] shadow-sm">
//       {/* ----  cover  ---- */}
//       {post.coverImage && (
//         <img
//           src={post.coverImage}
//           alt="Cover"
//           className="w-full h-80 object-cover rounded-xl shadow-md mb-8"
//         />
//       )}

//       {/* ----  meta  ---- */}
//       <header className="mb-6">
//         <div className="flex items-start justify-between gap-4">
//           <div>
//             <h1 className="text-4xl font-bold text-[#1c1c1c]">{post.title}</h1>
//             {post.subHeading && (
//               <p className="text-xl text-[#4a4a4a] mt-2">{post.subHeading}</p>
//             )}
//             {post.caption && (
//               <p className="text-sm text-[#6b6b6b] mt-1">{post.caption}</p>
//             )}
//             <div className="mt-4 text-sm text-[#9b7c4a]">
//               {new Date(post.createdAt).toLocaleDateString('en-US', {
//                 year: 'numeric',
//                 month: 'long',
//                 day: 'numeric',
//               })}
//             </div>
//           </div>

//           <span
//             className={`px-3 py-1 rounded-full text-xs font-medium ${
//               post.isPublished
//                 ? 'bg-green-100 text-green-800'
//                 : 'bg-yellow-100 text-yellow-800'
//             }`}
//           >
//             {post.isPublished ? 'Published' : 'Draft'}
//           </span>
//         </div>
//       </header>

//       {/* ----  body  ---- */}
//       <div
//         className="prose prose-lg prose-[#1c1c1c] max-w-none
//                    prose-headings:text-[#1c1c1c]
//                    prose-a:text-[#be965b]
//                    prose-strong:text-[#1c1c1c]
//                    prose-code:text-[#be965b]
//                    prose-img:rounded-xl prose-img:shadow
//                    prose-video:rounded-xl prose-video:shadow"
//         dangerouslySetInnerHTML={{ __html: html }}
//       />

//       {/* ----  back to edit  ---- */}
//       <footer className="mt-8 flex items-center gap-3">
//         <Button
//           onClick={() => router.push(`/cms/blog/${post.id}`)}
//           className="bg-[#be965b] hover:bg-[#a88248] text-black"
//         >
//           Edit this post
//         </Button>

//         {post.isPublished && (
//           <Button
//             variant="outline"
//             onClick={() => router.push(`/blog/${post.slug}`)}
//             className="border-[#be965b] text-[#be965b] hover:bg-[#f3ede5]"
//           >
//             View public version
//           </Button>
//         )}
//       </footer>
//     </article>
//   );
// }
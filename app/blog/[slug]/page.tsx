import { notFound } from "next/navigation";
import { getPostBySlug } from "@/app/cms/blog/_utils/blogMutations.server";
import { generateHTML } from "@tiptap/html";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Youtube from "@tiptap/extension-youtube";
import Link from "next/link";
import PageHero from "@/app/common/PageHero";
import type { BlogPost } from "@prisma/client";

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post || !post.isPublished) notFound();

  const html = generateHTML(
    (post.content || { type: "doc", content: [] }) as any,
    [StarterKit, Image, Youtube]
  );

  /* assemble hero props */
  const heroTitle = post.title;
  const heroDescription = [post.subHeading, post.caption].filter(Boolean).join(" · ");
  const metaLine = [
    post.category,
    new Date(post.createdAt).toLocaleDateString("en-US", { dateStyle: "medium" }),
  ]
    .filter(Boolean)
    .join(" · ");

  return (
    <>
      <PageHero
        title={heroTitle}
        description={`${heroDescription} · ${metaLine}`}
        backgroundImage={post.coverImage || "/images/banners/blog_fallback.webp"}
      />

      <article className="bg-[#fcfbf8] px-4 md:px-8 py-10">
        <div className="max-w-4xl mx-auto">
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

          <footer className="mt-12 flex items-center gap-3">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 rounded-md border border-[#be965b] bg-transparent px-4 py-2 text-sm font-medium text-[#be965b] hover:bg-[#f3ede5]"
            >
              ← Back to posts
            </Link>
          </footer>
        </div>
      </article>
    </>
  );
}




// import { notFound } from "next/navigation";
// import { getPostBySlug } from "@/app/cms/blog/_utils/blogMutations.server";
// import { generateHTML } from "@tiptap/html";
// import StarterKit from "@tiptap/starter-kit";
// import Image from "@tiptap/extension-image";
// import Youtube from "@tiptap/extension-youtube";
// import Link from "next/link";
// import type { BlogPost } from "@prisma/client";

// export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
//   const { slug } = await params; // ← Next.js 15 async params
//   const post = await getPostBySlug(slug);
//   if (!post || !post.isPublished) notFound();

//   const html = generateHTML(
//     (post.content || { type: "doc", content: [] }) as any,
//     [StarterKit, Image, Youtube]
//   );

//   return (
//     <article className="bg-[#fcfbf8] min-h-screen px-4 md:px-8 py-10">
//       <div className="max-w-4xl mx-auto">
//         {/* Cover */}
//         {post.coverImage && (
//           <img
//             src={post.coverImage}
//             alt="Cover"
//             className="w-full h-100 object-cover rounded-xl shadow-md mb-8"
//           />
//         )}

//         {/* Meta */}
//         <header className="mb-6">
//           <div className="flex items-start justify-between gap-4">
//             <div>
//               <h1 className="text-4xl font-bold text-[#1c1c1c]">{post.title}</h1>
//               {post.subHeading && (
//                 <p className="text-xl text-[#4a4a4a] mt-2">{post.subHeading}</p>
//               )}
//               {post.caption && (
//                 <p className="text-sm text-[#6b6b6b] mt-1">{post.caption}</p>
//               )}
//               <div className="mt-4 text-sm text-[#9b7c4a]">
//                 {new Date(post.createdAt).toLocaleDateString("en-US", {
//                   year: "numeric",
//                   month: "long",
//                   day: "numeric",
//                 })}
//               </div>
//             </div>

//             <span className="px-3 py-1 rounded-full text-xs font-medium bg-[#f3ede5] text-[#5c4b3f]">
//               {post.category}
//             </span>
//           </div>
//         </header>

//         {/* Body */}
//         <div
//           className="prose prose-lg prose-[#1c1c1c] max-w-none
//                      prose-headings:text-[#1c1c1c]
//                      prose-a:text-[#be965b]
//                      prose-strong:text-[#1c1c1c]
//                      prose-code:text-[#be965b]
//                      prose-img:rounded-xl prose-img:shadow
//                      prose-video:rounded-xl prose-video:shadow"
//           dangerouslySetInnerHTML={{ __html: html }}
//         />

//         {/* Back to list */}
//         <footer className="mt-12 flex items-center gap-3">
//           <Link
//             href="/blog"
//             className="inline-flex items-center gap-2 rounded-md border border-[#be965b] bg-transparent px-4 py-2 text-sm font-medium text-[#be965b] hover:bg-[#f3ede5]"
//           >
//             ← Back to posts
//           </Link>
//         </footer>
//       </div>
//     </article>
//   );
// }




// import { notFound } from "next/navigation";
// import { getPostBySlug } from "@/app/cms/blog/_utils/blogMutations.server";
// import { generateHTML } from "@tiptap/html";
// import StarterKit from "@tiptap/starter-kit";
// import Image from "@tiptap/extension-image";
// import Youtube from "@tiptap/extension-youtube";
// import Link from "next/link";
// import type { BlogPost } from "@prisma/client";

// export default async function BlogPostPage({ params }: { params: { slug: string } }) {
//   const post = await getPostBySlug(params.slug);
//   if (!post || !post.isPublished) notFound();

//   const html = generateHTML(
//     (post.content || { type: "doc", content: [] }) as any,
//     [StarterKit, Image, Youtube]
//   );

//   return (
//     <article className="bg-[#fcfbf8] min-h-screen px-4 md:px-8 py-10">
//       <div className="max-w-4xl mx-auto">
//         {/* Cover */}
//         {post.coverImage && (
//           <img
//             src={post.coverImage}
//             alt="Cover"
//             className="w-full h-100 object-center rounded-xl shadow-md mb-8"
//           />
//         )}

//         {/* Meta */}
//         <header className="mb-6">
//           <div className="flex items-start justify-between gap-4">
//             <div>
//               <h1 className="text-4xl font-bold text-[#1c1c1c]">{post.title}</h1>
//               {post.subHeading && (
//                 <p className="text-xl text-[#4a4a4a] mt-2">{post.subHeading}</p>
//               )}
//               {post.caption && (
//                 <p className="text-sm text-[#6b6b6b] mt-1">{post.caption}</p>
//               )}
//               <div className="mt-4 text-sm text-[#9b7c4a]">
//                 {new Date(post.createdAt).toLocaleDateString("en-US", {
//                   year: "numeric",
//                   month: "long",
//                   day: "numeric",
//                 })}
//               </div>
//             </div>

//             <span className="px-3 py-1 rounded-full text-xs font-medium bg-[#f3ede5] text-[#5c4b3f]">
//               {post.category}
//             </span>
//           </div>
//         </header>

//         {/* Body */}
//         <div
//           className="prose prose-lg prose-[#1c1c1c] max-w-none
//                      prose-headings:text-[#1c1c1c]
//                      prose-a:text-[#be965b]
//                      prose-strong:text-[#1c1c1c]
//                      prose-code:text-[#be965b]
//                      prose-img:rounded-xl prose-img:shadow
//                      prose-video:rounded-xl prose-video:shadow"
//           dangerouslySetInnerHTML={{ __html: html }}
//         />

//         {/* Back to list */}
//         <footer className="mt-12 flex items-center gap-3">
//           <Link
//             href="/blog"
//             className="inline-flex items-center gap-2 rounded-md border border-[#be965b] bg-transparent px-4 py-2 text-sm font-medium text-[#be965b] hover:bg-[#f3ede5]"
//           >
//             ← Back to posts
//           </Link>
//         </footer>
//       </div>
//     </article>
//   );
// }
"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { BlogActions } from "./BlogActions";
import { ViewModal } from "./ViewModal"; // <-- NEW
import type { BlogPost } from "@prisma/client";

interface Props {
  posts: BlogPost[];
}

const ITEMS_PER_PAGE = 8;

export function BlogCard({ posts }: Props) {
  const [currentPage, setCurrentPage] = useState(1);
  const [preview, setPreview] = useState<BlogPost | null>(null); // <-- NEW

  const totalPages = Math.ceil(posts.length / ITEMS_PER_PAGE);
  const currentRows = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return posts.slice(start, start + ITEMS_PER_PAGE);
  }, [currentPage, posts]);

  const goToPage = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {currentRows.map((post) => (
          <Card
            key={post.id}
            className="bg-[#fcfbf8] border border-[#cccccc] rounded-xl shadow-sm hover:shadow-lg"
          >
            <CardHeader className="p-3">
              <Image
                src={post.coverImage || "/placeholder.jpg"}
                alt={post.title}
                width={225}
                height={150}
                className="w-full h-40 object-cover rounded-t-xl"
              />
            </CardHeader>

            <CardContent className="p-4">
              <CardTitle className="text-lg text-[#1c1c1c] line-clamp-2">
                {post.title}
              </CardTitle>
              <CardDescription className="text-sm text-[#4a4a4a] mt-1 line-clamp-2">
                {post.subHeading}
              </CardDescription>

              <div className="mt-3 flex items-center gap-2 text-xs">
                <span
                  className={`px-2 py-1 rounded ${
                    post.isPublished
                      ? 'bg-green-100 text-green-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}
                >
                  {post.isPublished ? 'Published' : 'Draft'}
                </span>
                <span className="text-muted-foreground">
                  {new Date(post.createdAt).toLocaleDateString()}
                </span>
              </div>
            </CardContent>

            {/* ACTIONS ROW */}
            <CardFooter className="p-4 border-t border-[#cccccc] flex items-center gap-2">
              <button
                onClick={() => setPreview(post)}
                className="px-3 py-1 rounded border border-[#be965b] text-[#be965b] hover:bg-[#f3ede5] text-sm"
              >
                Preview
              </button>
              <BlogActions post={post} />
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* PAGINATION */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 mt-8">
          <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 rounded border disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#f3ede5]"
          >
            Previous
          </button>

          <span className="font-medium text-sm">
            Page {currentPage} of {totalPages}
          </span>

          <button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 rounded border disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#f3ede5]"
          >
            Next
          </button>
        </div>
      )}

      {/* MODAL PORTAL */}
      {preview && (
        <ViewModal post={preview} onClose={() => setPreview(null)} />
      )}
    </>
  );
}





// "use client";

// import { useMemo, useState } from "react";
// import Image from "next/image";
// import {
//   Card,
//   CardHeader,
//   CardTitle,
//   CardDescription,
//   CardContent,
//   CardFooter,
// } from "@/components/ui/card";
// import { BlogActions } from "./BlogActions";
// import type { BlogPost } from "@prisma/client";

// interface Props {
//   posts: BlogPost[];
// }

// const ITEMS_PER_PAGE = 8; // 2×4 grid

// export function BlogCard({ posts }: Props) {
//   const [currentPage, setCurrentPage] = useState(1);

//   const totalPages = Math.ceil(posts.length / ITEMS_PER_PAGE);
//   const currentRows = useMemo(() => {
//     const start = (currentPage - 1) * ITEMS_PER_PAGE;
//     return posts.slice(start, start + ITEMS_PER_PAGE);
//   }, [currentPage, posts]);

//   const goToPage = (page: number) => {
//     if (page < 1 || page > totalPages) return;
//     setCurrentPage(page);
//   };

//   return (
//     <>
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//         {currentRows.map((post) => (
//           <Card
//             key={post.id}
//             className="bg-[#fcfbf8] border border-[#cccccc] rounded-xl shadow-sm hover:shadow-lg"
//           >
//             <CardHeader className="p-3">
//               <Image
//                 src={post.coverImage || "/placeholder.jpg"}
//                 alt={post.title}
//                 width={225}
//                 height={150}
//                 className="w-full h-40 object-cover rounded-t-xl"
//               />
//             </CardHeader>

//             <CardContent className="p-4">
//               <CardTitle className="text-lg text-[#1c1c1c] line-clamp-2">
//                 {post.title}
//               </CardTitle>
//               <CardDescription className="text-sm text-[#4a4a4a] mt-1 line-clamp-2">
//                 {post.subHeading}
//               </CardDescription>

//               <div className="mt-3 flex items-center gap-2 text-xs">
//                 <span
//                   className={`px-2 py-1 rounded ${
//                     post.isPublished
//                       ? 'bg-green-100 text-green-800'
//                       : 'bg-yellow-100 text-yellow-800'
//                   }`}
//                 >
//                   {post.isPublished ? 'Published' : 'Draft'}
//                 </span>
//                 <span className="text-muted-foreground">
//                   {new Date(post.createdAt).toLocaleDateString()}
//                 </span>
//               </div>
//             </CardContent>

//             <CardFooter className="p-4 border-t border-[#cccccc]">
//               <BlogActions post={post} />
//             </CardFooter>
//           </Card>
//         ))}
//       </div>

//       {/* ----  PAGINATION  ---- */}
//       {totalPages > 1 && (
//         <div className="flex justify-center items-center gap-4 mt-8">
//           <button
//             onClick={() => goToPage(currentPage - 1)}
//             disabled={currentPage === 1}
//             className="px-4 py-2 rounded border disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#f3ede5]"
//           >
//             Previous
//           </button>

//           <span className="font-medium text-sm">
//             Page {currentPage} of {totalPages}
//           </span>

//           <button
//             onClick={() => goToPage(currentPage + 1)}
//             disabled={currentPage === totalPages}
//             className="px-4 py-2 rounded border disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#f3ede5]"
//           >
//             Next
//           </button>
//         </div>
//       )}
//     </>
//   );
// }




// 'use client';

// import Link from 'next/link';

// interface Props {
//   id: string;
//   title: string;
//   subHeading?: string | null;
//   coverImage?: string | null;
//   slug: string;
//   isPublished: boolean;
// }

// export default function BlogCard({ id, title, subHeading, coverImage, slug, isPublished }: Props) {
//   return (
//     <div className="rounded-lg border border-border bg-card p-4 shadow-sm">
//       {coverImage && (
//         <img src={coverImage} alt="cover" className="mb-3 h-40 w-full rounded object-cover" />
//       )}
//       <div className="flex items-start justify-between">
//         <div>
//           <h3 className="font-semibold text-card-foreground">{title}</h3>
//           {subHeading && <p className="text-sm text-muted-foreground">{subHeading}</p>}
//           <span
//             className={`mt-2 inline-block rounded px-2 py-1 text-xs ${
//               isPublished ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
//             }`}
//           >
//             {isPublished ? 'Published' : 'Draft'}
//           </span>
//         </div>
//         <div className="flex gap-2">
//           <Link href={`/cms/blog/${id}`} className="text-sm text-primary hover:underline">
//             Edit
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// }
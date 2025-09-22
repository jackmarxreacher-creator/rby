"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { BlogActions } from "./BlogActions";
import { ViewModal } from "./ViewModal"; // NEW
import type { BlogPost } from "@prisma/client";

interface Props {
  posts: BlogPost[];
}

const ITEMS_PER_PAGE = 8;

export function BlogTable({ posts }: Props) {
  const [currentPage, setCurrentPage] = useState(1);
  const [preview, setPreview] = useState<BlogPost | null>(null); // NEW

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
      <div className="overflow-x-auto rounded-lg border border-[#cccccc]">
        <table className="min-w-full bg-[#fcfbf8]">
          <thead className="bg-[#f3ede5]">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-semibold text-[#1c1c1c]">
                Title
              </th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-[#1c1c1c]">
                Slug
              </th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-[#1c1c1c]">
                Status
              </th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-[#1c1c1c]">
                Created
              </th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-[#1c1c1c]">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#cccccc]">
            {currentRows.map((p) => (
              <tr key={p.id} className="hover:bg-[#f3ede5]/50">
                <td className="px-4 py-2 text-sm text-[#1c1c1c] font-medium">
                  {p.title}
                </td>
                <td className="px-4 py-2 text-sm text-[#4a4a4a]">{p.slug}</td>
                <td className="px-4 py-2">
                  <span
                    className={`rounded px-2 py-1 text-xs ${
                      p.isPublished
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}
                  >
                    {p.isPublished ? 'Published' : 'Draft'}
                  </span>
                </td>
                <td className="px-4 py-2 text-sm text-[#4a4a4a]">
                  {new Date(p.createdAt).toLocaleDateString()}
                </td>
                <td className="px-4 py-2 flex items-center gap-2">
                  <button
                    onClick={() => setPreview(p)}
                    className="px-2 py-1 rounded border border-[#be965b] text-[#be965b] hover:bg-[#f3ede5] text-xs"
                  >
                    Preview
                  </button>
                  <BlogActions post={p} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* =====  PAGINATION  ===== */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 mt-6">
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
// import Link from "next/link";
// import { BlogActions } from "./BlogActions";
// import type { BlogPost } from "@prisma/client";

// interface Props {
//   posts: BlogPost[];
// }

// const ITEMS_PER_PAGE = 8;

// export function BlogTable({ posts }: Props) {
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
//       <div className="overflow-x-auto rounded-lg border border-[#cccccc]">
//         <table className="min-w-full bg-[#fcfbf8]">
//           <thead className="bg-[#f3ede5]">
//             <tr>
//               <th className="px-4 py-2 text-left text-sm font-semibold text-[#1c1c1c]">
//                 Title
//               </th>
//               <th className="px-4 py-2 text-left text-sm font-semibold text-[#1c1c1c]">
//                 Slug
//               </th>
//               <th className="px-4 py-2 text-left text-sm font-semibold text-[#1c1c1c]">
//                 Status
//               </th>
//               <th className="px-4 py-2 text-left text-sm font-semibold text-[#1c1c1c]">
//                 Created
//               </th>
//               <th className="px-4 py-2 text-left text-sm font-semibold text-[#1c1c1c]">
//                 Actions
//               </th>
//             </tr>
//           </thead>
//           <tbody className="divide-y divide-[#cccccc]">
//             {currentRows.map((p) => (
//               <tr key={p.id} className="hover:bg-[#f3ede5]/50">
//                 <td className="px-4 py-2 text-sm text-[#1c1c1c] font-medium">
//                   {p.title}
//                 </td>
//                 <td className="px-4 py-2 text-sm text-[#4a4a4a]">{p.slug}</td>
//                 <td className="px-4 py-2">
//                   <span
//                     className={`rounded px-2 py-1 text-xs ${
//                       p.isPublished
//                         ? 'bg-green-100 text-green-800'
//                         : 'bg-yellow-100 text-yellow-800'
//                     }`}
//                   >
//                     {p.isPublished ? 'Published' : 'Draft'}
//                   </span>
//                 </td>
//                 <td className="px-4 py-2 text-sm text-[#4a4a4a]">
//                   {new Date(p.createdAt).toLocaleDateString()}
//                 </td>
//                 <td className="px-4 py-2">
//                   <BlogActions post={p} />
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* =====  PAGINATION  ===== */}
//       {totalPages > 1 && (
//         <div className="flex justify-center items-center gap-4 mt-6">
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


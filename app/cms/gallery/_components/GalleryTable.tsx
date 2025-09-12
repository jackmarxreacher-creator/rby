"use client";

import { useMemo, useState } from "react";
import { GalleryActions } from "./GalleryActions";

interface Props {
  galleryItems: {
    id: string;
    type: "photo" | "video";
    title: string;
    thumbnail: string;
    src: string;
    createdAt: string;
    updatedAt: string;
  }[];
}

const ITEMS_PER_PAGE = 8;

export function GalleryTable({ galleryItems }: Props) {
  const [currentPage, setCurrentPage] = useState(1);

  /* ----------  slice for current page  ---------- */
  const totalPages = Math.ceil(galleryItems.length / ITEMS_PER_PAGE);
  const currentRows = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return galleryItems.slice(start, start + ITEMS_PER_PAGE);
  }, [currentPage, galleryItems]);

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
                Preview
              </th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-[#1c1c1c]">
                Title
              </th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-[#1c1c1c]">
                Type
              </th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-[#1c1c1c]">
                Date
              </th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-[#1c1c1c]">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#cccccc]">
            {currentRows.map((item) => {
              const createdTime = new Date(item.createdAt).getTime();
              const updatedTime = new Date(item.updatedAt).getTime();
              const displayDate =
                updatedTime > createdTime ? item.updatedAt : item.createdAt;

              return (
                <tr key={item.id} className="hover:bg-[#f3ede5]/50">
                  <td className="p-2 max-w-[100px]">
                    {item.type === "photo" ? (
                      <img
                        src={item.thumbnail || "/placeholder.jpg"}
                        alt={item.title}
                        className="rounded object-cover w-24 h-16"
                      />
                    ) : (
                      <img
                        src={item.thumbnail || "/placeholder-video.jpg"}
                        alt={`${item.title} video thumbnail`}
                        className="rounded object-cover w-24 h-16"
                      />
                    )}
                  </td>
                  <td className="px-4 py-2 text-sm text-[#1c1c1c] font-medium">
                    {item.title}
                  </td>
                  <td className="px-4 py-2 text-sm text-[#4a4a4a]">{item.type}</td>
                  <td className="px-4 py-2 text-sm text-[#4a4a4a]">
                    {new Date(displayDate).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-2">
                    <GalleryActions galleryItem={item} />
                  </td>
                </tr>
              );
            })}
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
    </>
  );
}






// "use client";

// import { GalleryActions } from "./GalleryActions";

// interface Props {
//   galleryItems: {
//     id: string;
//     type: "photo" | "video";
//     title: string;
//     thumbnail: string;
//     src: string;
//     createdAt: string;
//     updatedAt: string;
//   }[];
// }

// export function GalleryTable({ galleryItems }: Props) {
//   return (
//     <div className="overflow-x-auto rounded-lg border border-[#cccccc]">
//       <table className="min-w-full bg-[#fcfbf8]">
//         <thead className="bg-[#f3ede5]">
//           <tr>
//             <th className="px-4 py-2 text-left text-sm font-semibold text-[#1c1c1c]">
//               Preview
//             </th>
//             <th className="px-4 py-2 text-left text-sm font-semibold text-[#1c1c1c]">
//               Title
//             </th>
//             <th className="px-4 py-2 text-left text-sm font-semibold text-[#1c1c1c]">
//               Type
//             </th>
//             <th className="px-4 py-2 text-left text-sm font-semibold text-[#1c1c1c]">
//               Date
//             </th>
//             <th className="px-4 py-2 text-left text-sm font-semibold text-[#1c1c1c]">
//               Actions
//             </th>
//           </tr>
//         </thead>
//         <tbody className="divide-y divide-[#cccccc]">
//           {galleryItems.map((item) => {
//             // Show updatedAt if different from createdAt
//             const createdTime = new Date(item.createdAt).getTime();
//             const updatedTime = new Date(item.updatedAt).getTime();
//             const displayDate =
//               updatedTime > createdTime ? item.updatedAt : item.createdAt;

//             return (
//               <tr key={item.id} className="hover:bg-[#f3ede5]/50">
//                 <td className="p-2 max-w-[100px]">
//                   {item.type === "photo" ? (
//                     <img
//                       src={item.thumbnail || "/placeholder.jpg"}
//                       alt={item.title}
//                       className="rounded object-cover w-24 h-16"
//                     />
//                   ) : (
//                     <img
//                       src={item.thumbnail || "/placeholder-video.jpg"}
//                       alt={`${item.title} video thumbnail`}
//                       className="rounded object-cover w-24 h-16"
//                     />
//                   )}
//                 </td>
//                 <td className="px-4 py-2 text-sm text-[#1c1c1c] font-medium">{item.title}</td>
//                 <td className="px-4 py-2 text-sm text-[#4a4a4a]">{item.type}</td>
//                 <td className="px-4 py-2 text-sm text-[#4a4a4a]">
//                   {new Date(displayDate).toLocaleDateString()}
//                 </td>
//                 <td className="px-4 py-2">
//                   <GalleryActions galleryItem={item} />
//                 </td>
//               </tr>
//             );
//           })}
//         </tbody>
//       </table>
//     </div>
//   );
// }

"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { UserActions } from "./UserActions";

interface Props {
  users: {
    id: string;
    name: string;
    email: string;
    role: "ADMIN" | "EDITOR" | "VIEWER";
    phoneNumber?: string | null;
    image?: string | null;
  }[];
}

const ITEMS_PER_PAGE = 8;

export function UserTable({ users }: Props) {
  const [currentPage, setCurrentPage] = useState(1);

  /* ----------  slice for current page  ---------- */
  const totalPages = Math.ceil(users.length / ITEMS_PER_PAGE);
  const currentRows = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return users.slice(start, start + ITEMS_PER_PAGE);
  }, [currentPage, users]);

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
                image
              </th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-[#1c1c1c]">
                Name
              </th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-[#1c1c1c]">
                Email
              </th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-[#1c1c1c]">
                Role
              </th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-[#1c1c1c]">
                Phone
              </th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-[#1c1c1c]">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#cccccc]">
            {currentRows.map((u) => (
              <tr key={u.id} className="hover:bg-[#f3ede5]/50">
                <td className="p-2">
                  <Image
                    src={u.image || "/images/user.jpg"}
                    alt={u.name}
                    width={40}
                    height={40}
                    className="rounded-full object-cover"
                  />
                </td>
                <td className="px-4 py-2 text-sm text-[#1c1c1c] font-medium">
                  {u.name}
                </td>
                <td className="px-4 py-2 text-sm text-[#4a4a4a]">{u.email}</td>
                <td className="px-4 py-2 text-sm text-[#be965b] font-semibold">
                  {u.role}
                </td>
                <td className="px-4 py-2 text-sm text-[#4a4a4a]">
                  {u.phoneNumber ?? "—"}
                </td>
                <td className="px-4 py-2">
                  <UserActions user={u} />
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
    </>
  );
}





// "use client";
// import Image from "next/image";
// import { UserActions } from "./UserActions";

// interface Props {
//   users: {
//     id: string;
//     name: string;
//     email: string;
//     role: "ADMIN" | "EDITOR" | "VIEWER";
//     phoneNumber?: string | null;
//     image?: string | null;
//   }[];
// }

// export function UserTable({ users }: Props) {
//   return (
//     <div className="overflow-x-auto rounded-lg border border-[#cccccc]">
//       <table className="min-w-full bg-[#fcfbf8]">
//         <thead className="bg-[#f3ede5]">
//           <tr>
//             <th className="px-4 py-2 text-left text-sm font-semibold text-[#1c1c1c]">
//               image
//             </th>
//             <th className="px-4 py-2 text-left text-sm font-semibold text-[#1c1c1c]">
//               Name
//             </th>
//             <th className="px-4 py-2 text-left text-sm font-semibold text-[#1c1c1c]">
//               Email
//             </th>
//             <th className="px-4 py-2 text-left text-sm font-semibold text-[#1c1c1c]">
//               Role
//             </th>
//             <th className="px-4 py-2 text-left text-sm font-semibold text-[#1c1c1c]">
//               Phone
//             </th>
//             <th className="px-4 py-2 text-left text-sm font-semibold text-[#1c1c1c]">
//               Actions
//             </th>
//           </tr>
//         </thead>
//         <tbody className="divide-y divide-[#cccccc]">
//           {users.map((u) => (
//             <tr key={u.id} className="hover:bg-[#f3ede5]/50">
//               <td className="p-2">
//                 <Image
//                   src={u.image || "/images/user.jpg"}
//                   alt={u.name}
//                   width={40}
//                   height={40}
//                   className="rounded-full object-cover"
//                 />
//               </td>
//               <td className="px-4 py-2 text-sm text-[#1c1c1c] font-medium">
//                 {u.name}
//               </td>
//               <td className="px-4 py-2 text-sm text-[#4a4a4a]">{u.email}</td>
//               <td className="px-4 py-2 text-sm text-[#be965b] font-semibold">
//                 {u.role}
//               </td>
//               <td className="px-4 py-2 text-sm text-[#4a4a4a]">
//                 {u.phoneNumber ?? "—"}
//               </td>
//               <td className="px-4 py-2">
//                 <UserActions user={u} />
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

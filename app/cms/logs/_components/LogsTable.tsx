"use client";

import { useState, useMemo, useEffect } from "react";

const ITEMS_PER_PAGE = 8;

interface UserActivityLog {
  id: string;
  userId: string;
  action: string;
  description: string;
  metadata: any;
  timestamp: string;
  user?: {
    id: string;
    name: string | null;
    email: string | null;
  };
}

interface LogsTableProps {
  logs: UserActivityLog[];
  totalCount: number;
  actions: string[];
  users: { id: string; name: string | null; email: string | null }[];
  onFilterChange: (userId: string, action: string) => void;
  initialUserFilter?: string;
  initialActionFilter?: string;
}

export function LogsTable({
  logs,
  totalCount,
  actions,
  users,
  onFilterChange,
  initialUserFilter = "",
  initialActionFilter = "",
}: LogsTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [userFilter, setUserFilter] = useState(initialUserFilter);
  const [actionFilter, setActionFilter] = useState(initialActionFilter);

  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);

  const currentRows = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return logs.slice(start, start + ITEMS_PER_PAGE);
  }, [currentPage, logs]);

  useEffect(() => {
    onFilterChange(userFilter, actionFilter);
    setCurrentPage(1); // Reset page on filter change
  }, [userFilter, actionFilter]);

  const goToPage = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  return (
    <>
      <div className="mb-4 flex space-x-4">
        {/* User Filter */}
        <select
          value={userFilter}
          onChange={(e) => setUserFilter(e.target.value)}
          className="px-2 py-1 rounded border border-[#cccccc]"
        >
          <option value="">All Users</option>
          {users.map((u) => (
            <option key={u.id} value={u.id}>
              {u.name ?? u.email ?? "Unknown"}
            </option>
          ))}
        </select>

        {/* Action Filter */}
        <select
          value={actionFilter}
          onChange={(e) => setActionFilter(e.target.value)}
          className="px-2 py-1 rounded border border-[#cccccc]"
        >
          <option value="">All Actions</option>
          {actions.map((a) => (
            <option key={a} value={a}>
              {a}
            </option>
          ))}
        </select>
      </div>

      <div className="overflow-x-auto rounded-lg border border-[#cccccc] bg-[#fcfbf8]">
        <table className="min-w-full">
          <thead className="bg-[#f3ede5]">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-semibold text-[#1c1c1c]">User</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-[#1c1c1c]">Action</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-[#1c1c1c]">Description</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-[#1c1c1c]">Timestamp</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#cccccc]">
            {currentRows.map((log) => (
              <tr key={log.id} className="hover:bg-[#f3ede5]/50">
                <td className="px-4 py-2 text-sm text-[#1c1c1c] font-medium">
                  {log.user?.name ?? log.user?.email ?? "Unknown User"}
                </td>
                <td className="px-4 py-2 text-sm text-[#4a4a4a]">{log.action}</td>
                <td className="px-4 py-2 text-sm text-[#4a4a4a]">{log.description}</td>
                <td className="px-4 py-2 text-sm text-[#4a4a4a]">
                  {new Date(log.timestamp).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

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

// import { useState, useMemo } from "react";

// const ITEMS_PER_PAGE = 8;

// interface UserActivityLog {
//   id: string;
//   userId: string;
//   action: string;
//   description: string;
//   metadata: any;
//   timestamp: string;
//   user?: {
//     id: string;
//     name: string | null;
//     email: string | null;
//   };
// }

// interface LogsTableProps {
//   logs: UserActivityLog[];
//   totalCount: number;
// }

// export function LogsTable({ logs, totalCount }: LogsTableProps) {
//   const [currentPage, setCurrentPage] = useState(1);
//   const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);

//   const currentRows = useMemo(() => {
//     const start = (currentPage - 1) * ITEMS_PER_PAGE;
//     return logs.slice(start, start + ITEMS_PER_PAGE);
//   }, [currentPage, logs]);

//   const goToPage = (page: number) => {
//     if (page < 1 || page > totalPages) return;
//     setCurrentPage(page);
//   };

//   return (
//     <>
//       <div className="overflow-x-auto rounded-lg border border-[#cccccc] bg-[#fcfbf8]">
//         <table className="min-w-full">
//           <thead className="bg-[#f3ede5]">
//             <tr>
//               <th className="px-4 py-2 text-left text-sm font-semibold text-[#1c1c1c]">User</th>
//               <th className="px-4 py-2 text-left text-sm font-semibold text-[#1c1c1c]">Action</th>
//               <th className="px-4 py-2 text-left text-sm font-semibold text-[#1c1c1c]">Description</th>
//               <th className="px-4 py-2 text-left text-sm font-semibold text-[#1c1c1c]">Timestamp</th>
//             </tr>
//           </thead>
//           <tbody className="divide-y divide-[#cccccc]">
//             {currentRows.map((log) => (
//               <tr key={log.id} className="hover:bg-[#f3ede5]/50">
//                 <td className="px-4 py-2 text-sm text-[#1c1c1c] font-medium">
//                   {log.user?.name ?? log.user?.email ?? "Unknown User"}
//                 </td>
//                 <td className="px-4 py-2 text-sm text-[#4a4a4a]">{log.action}</td>
//                 <td className="px-4 py-2 text-sm text-[#4a4a4a]">{log.description}</td>
//                 <td className="px-4 py-2 text-sm text-[#4a4a4a]">
//                   {new Date(log.timestamp).toLocaleString()}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

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





// "use client";

// import { useState, useMemo } from "react";

// const ITEMS_PER_PAGE = 8;

// interface UserActivityLog {
//   id: string;
//   userId: string;
//   action: string;
//   description: string;
//   metadata: any;
//   timestamp: string;
//   user?: {
//     id: string;
//     name: string | null;
//     email: string | null;
//   };
// }

// interface LogsTableProps {
//   logs: UserActivityLog[];
//   totalCount: number;
// }

// export function LogsTable({ logs, totalCount }: LogsTableProps) {
//   const [currentPage, setCurrentPage] = useState(1);
//   const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);

//   const currentRows = useMemo(() => {
//     const start = (currentPage - 1) * ITEMS_PER_PAGE;
//     return logs.slice(start, start + ITEMS_PER_PAGE);
//   }, [currentPage, logs]);

//   const goToPage = (page: number) => {
//     if (page < 1 || page > totalPages) return;
//     setCurrentPage(page);
//   };

//   return (
//     <>
//       <div className="overflow-x-auto rounded-lg border border-[#cccccc] bg-[#fcfbf8]">
//         <table className="min-w-full">
//           <thead className="bg-[#f3ede5]">
//             <tr>
//               <th className="px-4 py-2 text-left text-sm font-semibold text-[#1c1c1c]">User</th>
//               <th className="px-4 py-2 text-left text-sm font-semibold text-[#1c1c1c]">Action</th>
//               <th className="px-4 py-2 text-left text-sm font-semibold text-[#1c1c1c]">Description</th>
//               <th className="px-4 py-2 text-left text-sm font-semibold text-[#1c1c1c]">Timestamp</th>
//             </tr>
//           </thead>
//           <tbody className="divide-y divide-[#cccccc]">
//             {currentRows.map((log) => (
//               <tr key={log.id} className="hover:bg-[#f3ede5]/50">
//                 <td className="px-4 py-2 text-sm text-[#1c1c1c] font-medium">
//                   {log.user?.name ?? log.user?.email ?? "Unknown User"}
//                 </td>
//                 <td className="px-4 py-2 text-sm text-[#4a4a4a]">{log.action}</td>
//                 <td className="px-4 py-2 text-sm text-[#4a4a4a]">{log.description}</td>
//                 <td className="px-4 py-2 text-sm text-[#4a4a4a]">
//                   {new Date(log.timestamp).toLocaleString()}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

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

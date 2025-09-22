"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Eye, Edit, Trash } from "lucide-react";
import { removeBlogPost } from "../actions";

interface Props {
  post: { id: string; slug: string };
}

export function BlogActions({ post }: Props) {
  const router = useRouter();

  const handleDelete = async () => {
    if (!confirm("Delete this post?")) return;
    await removeBlogPost(post.id);
    router.refresh();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {/* plain "Actions" button instead of three dots */}
        <Button
          variant="outline"
          size="sm"
          className="w-full border-[#be965b] text-[#be965b] hover:bg-[#f3ede5]"
        >
          Actions
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="center">
        <DropdownMenuItem
          onClick={() => router.push(`/blog/${post.slug}`)}
          className="gap-2"
        >
          <Eye className="h-4 w-4" /> View
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => router.push(`/cms/blog/${post.id}`)}
          className="gap-2"
        >
          <Edit className="h-4 w-4" /> Edit
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={handleDelete}
          className="gap-2 text-red-600"
        >
          <Trash className="h-4 w-4" /> Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}




// "use client";

// import { useRouter } from "next/navigation";
// import { Button } from "@/components/ui/button";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import { Eye, Edit, Trash, MoreHorizontal } from "lucide-react";
// import { removeBlogPost } from "../actions";

// interface Props {
//   post: { id: string; slug: string };
// }

// export function BlogActions({ post }: Props) {
//   const router = useRouter();

//   const handleDelete = async () => {
//     if (!confirm("Delete this post?")) return;
//     await removeBlogPost(post.id);
//     router.refresh();
//   };

//   return (
//     <DropdownMenu>
//       <DropdownMenuTrigger asChild>
//         <Button variant="ghost" className="h-8 w-8 p-0">
//           <span className="sr-only">Open menu</span>
//           <MoreHorizontal className="h-4 w-4" />
//         </Button>
//       </DropdownMenuTrigger>
//       <DropdownMenuContent align="center">
//         <DropdownMenuItem
//           onClick={() => router.push(`/blog/${post.slug}`)}
//           className="gap-2"
//         >
//           <Eye className="h-4 w-4" /> View
//         </DropdownMenuItem>
//         <DropdownMenuItem
//           onClick={() => router.push(`/cms/blog/${post.id}`)}
//           className="gap-2"
//         >
//           <Edit className="h-4 w-4" /> Edit
//         </DropdownMenuItem>
//         <DropdownMenuItem
//           onClick={handleDelete}
//           className="gap-2 text-red-600"
//         >
//           <Trash className="h-4 w-4" /> Delete
//         </DropdownMenuItem>
//       </DropdownMenuContent>
//     </DropdownMenu>
//   );
// }





// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { Eye, Edit, Trash } from "lucide-react";
// import { removeBlogPost } from "../actions";

// interface Props {
//   post: { id: string; slug: string };
// }

// export function BlogActions({ post }: Props) {
//   const router = useRouter();
//   const [open, setOpen] = useState(false);

//   const handleDelete = async () => {
//     if (!confirm("Delete this post?")) return;
//     await removeBlogPost(post.id);
//     router.refresh();
//   };

//   return (
//     <div className="relative">
//       {/* three-dot trigger */}
//       <button
//         onClick={() => setOpen((v) => !v)}
//         className="h-8 w-8 grid place-items-center rounded hover:bg-accent"
//         aria-label="Actions"
//       >
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           className="h-4 w-4 text-muted-foreground"
//           fill="none"
//           viewBox="0 0 24 24"
//           stroke="currentColor"
//         >
//           <path
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             strokeWidth={2}
//             d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
//           />
//         </svg>
//       </button>

//       {/* dropdown */}
//       {open && (
//         <>
//           {/* click-outside */}
//           <div
//             className="fixed inset-0 z-10"
//             onClick={() => setOpen(false)}
//           />
//           <div className="absolute right-0 top-8 z-20 w-36 rounded-md border border-border bg-background shadow-lg">
//             <button
//               onClick={() => {
//                 router.push(`/blog/${post.slug}`);
//                 setOpen(false);
//               }}
//               className="flex w-full items-center gap-2 px-3 py-2 text-sm hover:bg-accent"
//             >
//               <Eye className="h-4 w-4" /> View
//             </button>
//             <button
//               onClick={() => {
//                 router.push(`/cms/blog/${post.id}`);
//                 setOpen(false);
//               }}
//               className="flex w-full items-center gap-2 px-3 py-2 text-sm hover:bg-accent"
//             >
//               <Edit className="h-4 w-4" /> Edit
//             </button>
//             <button
//               onClick={() => {
//                 setOpen(false);
//                 handleDelete();
//               }}
//               className="flex w-full items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-accent"
//             >
//               <Trash className="h-4 w-4" /> Delete
//             </button>
//           </div>
//         </>
//       )}
//     </div>
//   );
// }
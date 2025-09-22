"use client";

import { useEffect } from "react";
import { BlogView } from "./BlogView";
import { BlogViewServer } from "./BlogViewServer";
import type { BlogPost } from "@prisma/client";

interface Props {
  post: BlogPost;
  onClose: () => void;
}

export function ViewModal({ post, onClose }: Props) {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", handleEsc);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const html = BlogViewServer(post); // server-side only

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={onClose}
    >
      <div
        className="relative max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-xl bg-[#fcfbf8] p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 grid h-8 w-8 place-items-center rounded-full bg-white/70 hover:bg-white"
          aria-label="Close preview"
        >
          ✕
        </button>
        <BlogView html={html} post={post} />
      </div>
    </div>
  );
}




// "use client";

// import { useEffect } from "react";
// import { BlogView } from "./BlogView";
// import { BlogViewServer } from "./BlogViewServer";
// import type { BlogPost } from "@prisma/client";

// interface Props {
//   post: BlogPost;
//   onClose: () => void;
// }

// export function ViewModal({ post, onClose }: Props) {
//   useEffect(() => {
//     const handleEsc = (e: KeyboardEvent) => e.key === "Escape" && onClose();
//     document.addEventListener("keydown", handleEsc);
//     document.body.style.overflow = "hidden";
//     return () => {
//       document.removeEventListener("keydown", handleEsc);
//       document.body.style.overflow = "";
//     };
//   }, [onClose]);

//   /* server-side HTML generation */
//   const html = BlogViewServer(post);

//   return (
//     <div
//       className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
//       onClick={onClose}
//     >
//       <div
//         className="relative max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-xl bg-[#fcfbf8] p-6 shadow-2xl"
//         onClick={(e) => e.stopPropagation()}
//       >
//         <button
//           onClick={onClose}
//           className="absolute top-3 right-3 grid h-8 w-8 place-items-center rounded-full bg-white/70 hover:bg-white"
//           aria-label="Close preview"
//         >
//           ✕
//         </button>
//         <BlogView html={html} post={post} />
//       </div>
//     </div>
//   );
// }



// "use client";

// import { useEffect } from "react";
// import { BlogView } from "./BlogView";
// import type { BlogPost } from "@prisma/client";

// interface Props {
//   post: BlogPost;
//   onClose: () => void;
// }

// export function ViewModal({ post, onClose }: Props) {
//   /* lock body scroll + ESC key */
//   useEffect(() => {
//     const handleEsc = (e: KeyboardEvent) => e.key === "Escape" && onClose();
//     document.addEventListener("keydown", handleEsc);
//     document.body.style.overflow = "hidden";
//     return () => {
//       document.removeEventListener("keydown", handleEsc);
//       document.body.style.overflow = "";
//     };
//   }, [onClose]);

//   return (
//     <div
//       className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
//       onClick={onClose}
//     >
//       <div
//         className="relative max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-xl bg-[#fcfbf8] p-6 shadow-2xl"
//         onClick={(e) => e.stopPropagation()} // keep inside click
//       >
//         {/* close button */}
//         <button
//           onClick={onClose}
//           className="absolute top-3 right-3 grid h-8 w-8 place-items-center rounded-full bg-white/70 hover:bg-white"
//           aria-label="Close preview"
//         >
//           ✕
//         </button>

//         <BlogView post={post} />
//       </div>
//     </div>
//   );
// }
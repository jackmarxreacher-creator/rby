import { generateHTML } from "@tiptap/html";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Youtube from "@tiptap/extension-youtube";
import type { BlogPost } from "@prisma/client";

export function BlogViewServer(post: BlogPost) {
  const html = generateHTML(
    (post.content || { type: "doc", content: [] }) as any,
    [StarterKit, Image, Youtube]
  );
  return html; // string
}



// import { generateHTML } from "@tiptap/html";
// import StarterKit from "@tiptap/starter-kit";
// import Image from "@tiptap/extension-image";
// import Youtube from "@tiptap/extension-youtube";
// import type { BlogPost } from "@prisma/client";

// export function BlogViewServer(post: BlogPost) {
//   const html = generateHTML(
//     (post.content || { type: "doc", content: [] }) as any,
//     [StarterKit, Image, Youtube]
//   );
//   return html; // string only
// }
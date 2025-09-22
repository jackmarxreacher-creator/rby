"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import { BubbleMenu } from "@tiptap/react/menus";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Youtube from "@tiptap/extension-youtube";
import BubbleMenuExtension from "@tiptap/extension-bubble-menu";
import type { Editor } from "@tiptap/react";

interface Props {
  content: string;
  onChange: (json: string) => void;
  uploadImage: (file: File) => Promise<string>;
}

export default function TiptapEditor({ content, onChange, uploadImage }: Props) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Image.configure({ inline: true, allowBase64: true }),
      Youtube,
      BubbleMenuExtension,
    ],
    content: content || "",
    onUpdate: ({ editor }) => onChange(JSON.stringify(editor.getJSON())),
    editorProps: {
      handlePaste(view, event) {
        const items = Array.from(event.clipboardData?.items || []);
        for (const item of items) {
          if (item.type.startsWith("image")) {
            const file = item.getAsFile();
            if (file) handleImage(file);
            return true;
          }
        }
        return false;
      },
      handleDrop(view, event) {
        const files = Array.from(event.dataTransfer?.files || []);
        for (const file of files) {
          if (file.type.startsWith("image")) {
            handleImage(file);
            return true;
          }
        }
        return false;
      },
    },
  });

  if (!editor) return null; // client-only

  const handleImage = async (file: File) => {
    const src = await uploadImage(file);
    editor.chain().focus().setImage({ src }).run();
  };

  return (
    <div className="rounded border border-border bg-card p-3">
      <BubbleMenu editor={editor}>
        <div className="flex gap-1 rounded border border-border bg-background p-1 shadow">
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleBold().run()}
            className="px-2 py-1 rounded hover:bg-accent"
          >
            B
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className="px-2 py-1 rounded hover:bg-accent"
          >
            I
          </button>
          <button
            type="button"
            onClick={() => {
              const url = prompt("YouTube URL");
              if (url) editor.chain().focus().setYoutubeVideo({ src: url }).run();
            }}
            className="px-2 py-1 rounded hover:bg-accent"
          >
            YT
          </button>
          <button
            type="button"
            onClick={() => {
              const src = prompt("Image URL (or paste)");
              if (src) editor.chain().focus().setImage({ src }).run();
            }}
            className="px-2 py-1 rounded hover:bg-accent"
          >
            Img
          </button>
        </div>
      </BubbleMenu>
      <EditorContent className="prose prose-sm dark:prose-invert max-w-none" editor={editor} />
    </div>
  );
}





// "use client";

// import { useEditor, EditorContent } from "@tiptap/react";
// import StarterKit from "@tiptap/starter-kit";
// import Image from "@tiptap/extension-image";
// import Youtube from "@tiptap/extension-youtube";
// import BubbleMenu from "@tiptap/extension-bubble-menu";
// import type { Editor } from "@tiptap/react";

// interface Props {
//   content: string;
//   onChange: (json: string) => void;
//   uploadImage: (file: File) => Promise<string>;
// }

// export default function TiptapEditor({ content, onChange, uploadImage }: Props) {
//   const editor = useEditor({
//     extensions: [
//       StarterKit,
//       Image.configure({ inline: true, allowBase64: true }),
//       Youtube,
//       BubbleMenu.configure({ tippyOptions: { duration: 100 } }), // Correct BubbleMenu extension setup
//     ],
//     content: content || "",
//     onUpdate: ({ editor }) => onChange(JSON.stringify(editor.getJSON())),
//     editorProps: {
//       handlePaste(view, event) {
//         const items = Array.from(event.clipboardData?.items || []);
//         for (const item of items) {
//           if (item.type.startsWith("image")) {
//             const file = item.getAsFile();
//             if (file) handleImage(file);
//             return true;
//           }
//         }
//         return false;
//       },
//       handleDrop(view, event) {
//         const files = Array.from(event.dataTransfer?.files || []);
//         for (const file of files) {
//           if (file.type.startsWith("image")) {
//             handleImage(file);
//             return true;
//           }
//         }
//         return false;
//       },
//     },
//   });

//   if (!editor) return null; // client-only

//   const handleImage = async (file: File) => {
//     const src = await uploadImage(file);
//     editor.chain().focus().setImage({ src }).run();
//   };

//   return (
//     <div className="rounded border border-border bg-card p-3">
//       <BubbleMenu editor={editor}>
//         <div className="flex gap-1 rounded border border-border bg-background p-1 shadow">
//           <button
//             type="button"
//             onClick={() => editor.chain().focus().toggleBold().run()}
//             className="px-2 py-1 rounded hover:bg-accent"
//           >
//             B
//           </button>
//           <button
//             type="button"
//             onClick={() => editor.chain().focus().toggleItalic().run()}
//             className="px-2 py-1 rounded hover:bg-accent"
//           >
//             I
//           </button>
//           <button
//             type="button"
//             onClick={() => {
//               const url = prompt("YouTube URL");
//               if (url) editor.chain().focus().setYoutubeVideo({ src: url }).run();
//             }}
//             className="px-2 py-1 rounded hover:bg-accent"
//           >
//             YT
//           </button>
//           <button
//             type="button"
//             onClick={() => {
//               const src = prompt("Image URL (or paste)");
//               if (src) editor.chain().focus().setImage({ src }).run();
//             }}
//             className="px-2 py-1 rounded hover:bg-accent"
//           >
//             Img
//           </button>
//         </div>
//       </BubbleMenu>
//       <EditorContent className="prose prose-sm dark:prose-invert max-w-none" editor={editor} />
//     </div>
//   );
// }






// "use client";

// import { useEditor, EditorContent, BubbleMenu } from "@tiptap/react";
// import StarterKit from "@tiptap/starter-kit";
// import Image from "@tiptap/extension-image";
// import Youtube from "@tiptap/extension-youtube";
// import BubbleMenuExt from "@tiptap/extension-bubble-menu";
// import type { Editor } from "@tiptap/react";

// interface Props {
//   content: string;
//   onChange: (json: string) => void;
//   uploadImage: (file: File) => Promise<string>;
// }

// export default function TiptapEditor({ content, onChange, uploadImage }: Props) {
//   const editor = useEditor({
//     extensions: [
//       StarterKit,
//       Image.configure({ inline: true, allowBase64: true }),
//       Youtube,
//       BubbleMenuExt, // bubble menu
//     ],
//     content: content || "",
//     onUpdate: ({ editor }) => onChange(JSON.stringify(editor.getJSON())),
//     editorProps: {
//       handlePaste(view, event) {
//         const items = Array.from(event.clipboardData?.items || []);
//         for (const item of items) {
//           if (item.type.startsWith("image")) {
//             const file = item.getAsFile();
//             if (file) handleImage(file);
//             return true;
//           }
//         }
//         return false;
//       },
//       handleDrop(view, event) {
//         const files = Array.from(event.dataTransfer?.files || []);
//         for (const file of files) {
//           if (file.type.startsWith("image")) {
//             handleImage(file);
//             return true;
//           }
//         }
//         return false;
//       },
//     },
//   });

//   if (!editor) return null; // client-only

//   const handleImage = async (file: File) => {
//     const src = await uploadImage(file);
//     editor.chain().focus().setImage({ src }).run();
//   };

//   return (
//     <div className="rounded border border-border bg-card p-3">
//       <BubbleMenu editor={editor} tippyOptions={{ duration: 100 }}>
//         <div className="flex gap-1 rounded border border-border bg-background p-1 shadow">
//           <button
//             type="button"
//             onClick={() => editor.chain().focus().toggleBold().run()}
//             className="px-2 py-1 rounded hover:bg-accent"
//           >
//             B
//           </button>
//           <button
//             type="button"
//             onClick={() => editor.chain().focus().toggleItalic().run()}
//             className="px-2 py-1 rounded hover:bg-accent"
//           >
//             I
//           </button>
//           <button
//             type="button"
//             onClick={() => {
//               const url = prompt("YouTube URL");
//               if (url) editor.chain().focus().setYoutubeVideo({ src: url }).run();
//             }}
//             className="px-2 py-1 rounded hover:bg-accent"
//           >
//             YT
//           </button>
//           <button
//             type="button"
//             onClick={() => {
//               const src = prompt("Image URL (or paste)");
//               if (src) editor.chain().focus().setImage({ src }).run();
//             }}
//             className="px-2 py-1 rounded hover:bg-accent"
//           >
//             Img
//           </button>
//         </div>
//       </BubbleMenu>
//       <EditorContent className="prose prose-sm dark:prose-invert max-w-none" editor={editor} />
//     </div>
//   );
// }




// 'use client';

// import { useEditor, EditorContent } from '@tiptap/react';
// import { BubbleMenu } from '@tiptap/react'; // ✅ React wrapper
// import StarterKit from '@tiptap/starter-kit';
// import Image from '@tiptap/extension-image';
// import Youtube from '@tiptap/extension-youtube';

// interface Props {
//   content: string;
//   onChange: (json: string) => void;
//   uploadImage: (file: File) => Promise<string>;
// }

// export default function TiptapEditor({ content, onChange, uploadImage }: Props) {
//   const editor = useEditor({
//     extensions: [StarterKit, Image.configure({ inline: true }), Youtube],
//     content: content || '',
//     onUpdate: ({ editor }) => onChange(JSON.stringify(editor.getJSON())),
//     editorProps: {
//       handlePaste(view, event) {
//         const items = Array.from(event.clipboardData?.items || []);
//         for (const item of items) {
//           if (item.type.startsWith('image')) {
//             const file = item.getAsFile();
//             if (file) handleImage(file);
//             return true;
//           }
//         }
//         return false;
//       },
//       handleDrop(view, event) {
//         const files = Array.from(event.dataTransfer?.files || []);
//         for (const file of files) {
//           if (file.type.startsWith('image')) {
//             handleImage(file);
//             return true;
//           }
//         }
//         return false;
//       },
//     },
//   });

//   const handleImage = async (file: File) => {
//     if (!editor) return;
//     const src = await uploadImage(file);
//     editor.chain().focus().setImage({ src }).run();
//   };

//   if (!editor) return null;

//   return (
//     <div className="rounded border border-border bg-card p-3">
//       <BubbleMenu editor={editor} tippyOptions={{ duration: 100 }}>
//         <div className="flex gap-1 rounded border border-border bg-background p-1 shadow">
//           <Btn onclick={() => editor.chain().focus().toggleBold().run()}>B</Btn>
//           <Btn onclick={() => editor.chain().focus().toggleItalic().run()}>I</Btn>
//           <Btn
//             onclick={() => {
//               const url = prompt('YouTube URL');
//               if (url) editor.chain().focus().setYoutubeVideo({ src: url }).run();
//             }}
//           >
//             YT
//           </Btn>
//         </div>
//       </BubbleMenu>
//       <EditorContent className="prose prose-sm dark:prose-invert max-w-none" editor={editor} />
//     </div>
//   );
// }

// const Btn = ({ children, onclick }: { children: React.ReactNode; onclick?: () => void }) => (
//   <button
//     type="button"
//     onClick={onclick}
//     className="px-2 py-1 rounded hover:bg-accent hover:text-accent-foreground"
//   >
//     {children}
//   </button>
// );
"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { IoArrowBack } from "react-icons/io5";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ImageUpload } from "./ImageUpload";

interface GalleryItem {
  id?: string;
  type: "photo" | "video";
  title: string;
  thumbnail?: string;
  src: string;
}

interface Props {
  initial?: GalleryItem;
  onSave: (data: FormData) => Promise<void>;
}

export function GalleryForm({ initial, onSave }: Props) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [type, setType] = useState<"photo" | "video">(initial?.type || "photo");
  const [selectedPhoto, setSelectedPhoto] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(initial?.thumbnail || null);
  const [thumbnailUrl, setThumbnailUrl] = useState(initial?.thumbnail || "");
  const [instantPreview, setInstantPreview] = useState<string | null>(null); // NEW

  const inputFileRef = useRef<HTMLInputElement | null>(null);

  /* ----------  SUBMIT  ---------- */
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const form = new FormData(e.currentTarget);
    form.set("type", type);

    /* ----------  PHOTO  ---------- */
    if (type === "photo") {
      if (selectedPhoto) form.set("photo", selectedPhoto);
      if (!selectedPhoto && initial?.thumbnail) {
        form.set("existingThumbnail", initial.thumbnail);
      }
    }

    /* ----------  VIDEO  ---------- */
    if (type === "video") {
      if (selectedPhoto) {
        form.set("thumbnail", selectedPhoto);
      } else if (thumbnailUrl.startsWith("http")) {
        form.set("thumbnail", thumbnailUrl);
      }
    }

    await onSave(form);
    setLoading(false);
    router.push("/cms/gallery");
  }

  /* ----------  FILE DIALOG TRIGGER  ---------- */
  const openFileDialog = () => inputFileRef.current?.click();

  /* ----------  ON VIDEO THUMBNAIL CHANGE  ---------- */
  const onVideoThumbnailChange = (file: File | null) => {
    if (file) {
      setSelectedPhoto(file);
      setThumbnailUrl(""); // clear external URL
      setInstantPreview(URL.createObjectURL(file)); // instant preview
    } else {
      setSelectedPhoto(null);
      setInstantPreview(null);
    }
  };

  /* ----------  RENDER  ---------- */
  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => router.back()}
        className="mb-4 flex items-center gap-1 text-[#be965b] hover:text-[#a88248]"
      >
        <IoArrowBack size={16} />
        Back
      </Button>

      <div>
        <Label>Title</Label>
        <Input name="title" defaultValue={initial?.title} required />
      </div>

      <div>
        <Label>Type</Label>
        <select
          name="type"
          value={type}
          onChange={(e) => setType(e.target.value as "photo" | "video")}
          required
          className="flex h-10 w-full rounded-md border border-[#cccccc] bg-transparent px-3 py-2"
        >
          <option value="photo">Photo</option>
          <option value="video">Video</option>
        </select>
      </div>

      {type === "photo" && (
        <div>
          <Label>Photo</Label>
          <ImageUpload
            value={photoPreview ?? undefined}
            onChange={(file) => {
              setSelectedPhoto(file);
              if (!file) setPhotoPreview(null);
            }}
          />
        </div>
      )}

      {type === "video" && (
        <>
          <div>
            <Label>YouTube Video Link</Label>
            <Input
              type="url"
              name="src"
              defaultValue={initial?.src}
              placeholder="https://www.youtube.com/watch?v=..."
              required
            />
          </div>

          <div>
            <Label>Thumbnail</Label>
            <div className="flex items-center gap-2">
              <Input
                value={thumbnailUrl}
                onChange={(e) => {
                  setThumbnailUrl(e.target.value);
                  if (e.target.value) setInstantPreview(null); // clear file preview
                }}
                placeholder="Video preview image URL (optional)"
              />
              <Button type="button" onClick={openFileDialog}>
                Select Image
              </Button>
            </div>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              ref={inputFileRef}
              onChange={(e) => onVideoThumbnailChange(e.target.files?.[0] ?? null)}
            />

            {/* INSTANT PREVIEW */}
            {instantPreview && (
              <div className="mt-2">
                <img
                  src={instantPreview}
                  alt="Selected thumbnail"
                  className="h-32 object-cover rounded border"
                />
              </div>
            )}
            {!instantPreview && thumbnailUrl && (
              <div className="mt-2">
                <img
                  src={thumbnailUrl}
                  alt="External thumbnail"
                  className="h-32 object-cover rounded border"
                />
              </div>
            )}
          </div>
        </>
      )}

      <div className="flex gap-3">
        <Button type="submit" size="sm" disabled={loading} className="bg-[#be965b] text-black">
          {loading ? "Saving…" : "Save"}
        </Button>
        <Button
          type="button"
          size="sm"
          variant="outline"
          onClick={() => router.back()}
          className="border-[#cccccc] text-[#4a4a4a]"
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}




// "use client";

// import { useState, useRef } from "react";
// import { useRouter } from "next/navigation";
// import { IoArrowBack } from "react-icons/io5";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Button } from "@/components/ui/button";
// import { ImageUpload } from "./ImageUpload";

// interface GalleryItem {
//   id?: string;
//   type: "photo" | "video";
//   title: string;
//   thumbnail?: string;
//   src: string;
// }

// interface Props {
//   initial?: GalleryItem;
//   onSave: (data: FormData) => Promise<void>;
// }

// export function GalleryForm({ initial, onSave }: Props) {
//   const [loading, setLoading] = useState(false);
//   const router = useRouter();
//   const [type, setType] = useState<"photo" | "video">(initial?.type || "photo");
//   const [selectedPhoto, setSelectedPhoto] = useState<File | null>(null);
//   const [photoPreview, setPhotoPreview] = useState<string | null>(initial?.thumbnail || null);
//   const [thumbnailUrl, setThumbnailUrl] = useState(initial?.thumbnail || "");

//   const inputFileRef = useRef<HTMLInputElement | null>(null);

//   /* ----------  SUBMIT  ---------- */
//   async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
//     e.preventDefault();
//     setLoading(true);
//     const form = new FormData(e.currentTarget);
//     form.set("type", type);

//     /* ----------  PHOTO  ---------- */
//     if (type === "photo") {
//       if (selectedPhoto) form.set("photo", selectedPhoto);
//       if (!selectedPhoto && initial?.thumbnail) {
//         form.set("existingThumbnail", initial.thumbnail);
//       }
//     }

//     /* ----------  VIDEO  ---------- */
//     if (type === "video") {
//       // 1.  User picked a file → send the File
//       if (selectedPhoto) {
//         form.set("thumbnail", selectedPhoto);
//       }
//       // 2.  External URL
//       else if (thumbnailUrl.startsWith("http")) {
//         form.set("thumbnail", thumbnailUrl);
//       }
//       // 3.  Nothing → server keeps existing or null
//     }

//     await onSave(form);
//     setLoading(false);
//     router.push("/cms/gallery");
//   }

//   /* ----------  FILE DIALOG TRIGGER  ---------- */
//   const openFileDialog = () => inputFileRef.current?.click();

//   /* ----------  RENDER  ---------- */
//   return (
//     <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
//       <Button
//         variant="ghost"
//         size="sm"
//         onClick={() => router.back()}
//         className="mb-4 flex items-center gap-1 text-[#be965b] hover:text-[#a88248]"
//       >
//         <IoArrowBack size={16} />
//         Back
//       </Button>

//       <div>
//         <Label>Title</Label>
//         <Input name="title" defaultValue={initial?.title} required />
//       </div>

//       <div>
//         <Label>Type</Label>
//         <select
//           name="type"
//           value={type}
//           onChange={(e) => setType(e.target.value as "photo" | "video")}
//           required
//           className="flex h-10 w-full rounded-md border border-[#cccccc] bg-transparent px-3 py-2"
//         >
//           <option value="photo">Photo</option>
//           <option value="video">Video</option>
//         </select>
//       </div>

//       {type === "photo" && (
//         <div>
//           <Label>Photo</Label>
//           <ImageUpload
//             value={photoPreview ?? undefined}
//             onChange={(file) => {
//               setSelectedPhoto(file);
//               if (!file) setPhotoPreview(null);
//             }}
//           />
//         </div>
//       )}

//       {type === "video" && (
//         <>
//           <div>
//             <Label>YouTube Video Link</Label>
//             <Input
//               type="url"
//               name="src"
//               defaultValue={initial?.src}
//               placeholder="https://www.youtube.com/watch?v=..."
//               required
//             />
//           </div>

//           <div>
//             <Label>Thumbnail</Label>
//             <div className="flex items-center gap-2">
//               <Input
//                 value={thumbnailUrl}
//                 onChange={(e) => setThumbnailUrl(e.target.value)}
//                 placeholder="Video preview image URL (optional)"
//               />
//               <Button type="button" onClick={openFileDialog}>
//                 Select Image
//               </Button>
//             </div>
//             <input
//               type="file"
//               accept="image/*"
//               className="hidden"
//               ref={inputFileRef}
//               onChange={(e) => {
//                 const file = e.target.files?.[0] ?? null;
//                 if (file) {
//                   setSelectedPhoto(file); // keep the File
//                   setThumbnailUrl("");    // clear external URL
//                 }
//               }}
//             />
//             {thumbnailUrl && (
//               <div className="mt-2">
//                 <img
//                   src={thumbnailUrl}
//                   alt="Video Thumbnail Preview"
//                   className="h-32 object-cover rounded"
//                 />
//               </div>
//             )}
//           </div>
//         </>
//       )}

//       <div className="flex gap-3">
//         <Button
//           type="submit"
//           size="sm"
//           disabled={loading}
//           className="bg-[#be965b] text-black"
//         >
//           {loading ? "Saving…" : "Save"}
//         </Button>
//         <Button
//           type="button"
//           size="sm"
//           variant="outline"
//           onClick={() => router.back()}
//           className="border-[#cccccc] text-[#4a4a4a]"
//         >
//           Cancel
//         </Button>
//       </div>
//     </form>
//   );
// }




// "use client";

// import { useState, useRef } from "react";
// import { useRouter } from "next/navigation";
// import { IoArrowBack } from "react-icons/io5";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Button } from "@/components/ui/button";
// import { ImageUpload } from "./ImageUpload";

// interface GalleryItem {
//   id?: string;
//   type: "photo" | "video";
//   title: string;
//   thumbnail?: string;
//   src: string;
// }

// interface Props {
//   initial?: GalleryItem;
//   onSave: (data: FormData) => Promise<void>;
// }

// export function GalleryForm({ initial, onSave }: Props) {
//   const [loading, setLoading] = useState(false);
//   const router = useRouter();
//   const [type, setType] = useState<"photo" | "video">(initial?.type || "photo");
//   const [selectedPhoto, setSelectedPhoto] = useState<File | null>(null);
//   const [photoPreview, setPhotoPreview] = useState<string | null>(initial?.thumbnail || null);
//   const [thumbnailUrl, setThumbnailUrl] = useState(initial?.thumbnail || "");

//   const inputFileRef = useRef<HTMLInputElement | null>(null);

//   async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
//     e.preventDefault();
//     setLoading(true);
//     const form = new FormData(e.currentTarget);

//     form.set("type", type);

//     if (type === "photo" && selectedPhoto) {
//       form.set("photo", selectedPhoto);
//     }
//     if (type === "photo" && !selectedPhoto && initial?.thumbnail) {
//       form.set("existingThumbnail", initial.thumbnail);
//     }

//     // For video, ensure thumbnail URL is set from state (which syncs input or file)
//     if (type === "video") {
//       form.set("thumbnail", thumbnailUrl);
//     }

//     await onSave(form);
//     setLoading(false);
//     router.push("/cms/gallery");
//   }

//   // Handle thumbnail file selected in video mode
//   const onVideoThumbnailChange = (file: File | null) => {
//     if (file) {
//       const objectUrl = URL.createObjectURL(file);
//       setThumbnailUrl(objectUrl);
//       setSelectedPhoto(file);
//       if (!file) setPhotoPreview(null);
//     }
//   };

//   // Trigger hidden file input for video thumbnail select
//   const openFileDialog = () => {
//     inputFileRef.current?.click();
//   };

//   return (
//     <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
//       <Button
//         variant="ghost"
//         size="sm"
//         onClick={() => router.back()}
//         className="mb-4 flex items-center gap-1 text-[#be965b] hover:text-[#a88248]"
//       >
//         <IoArrowBack size={16} />
//         Back
//       </Button>

//       <div>
//         <Label>Title</Label>
//         <Input name="title" defaultValue={initial?.title} required />
//       </div>

//       <div>
//         <Label>Type</Label>
//         <select
//           name="type"
//           value={type}
//           onChange={(e) => setType(e.target.value as "photo" | "video")}
//           required
//           className="flex h-10 w-full rounded-md border border-[#cccccc] bg-transparent px-3 py-2"
//         >
//           <option value="photo">Photo</option>
//           <option value="video">Video</option>
//         </select>
//       </div>

//       {type === "photo" && (
//         <div>
//           <Label>Photo</Label>
//           <ImageUpload
//             value={photoPreview ?? undefined}
//             onChange={(file) => {
//               setSelectedPhoto(file);
//               if (!file) setPhotoPreview(null);
//             }}
//           />
//         </div>
//       )}

//       {type === "video" && (
//         <>
//           <div>
//             <Label>YouTube Video Link</Label>
//             <Input
//               type="url"
//               name="src"
//               defaultValue={initial?.src}
//               placeholder="https://www.youtube.com/watch?v= ..."
//               required
//             />
//           </div>
//           <div>
//             <Label>Thumbnail URL (optional)</Label>
//             <div className="flex items-center gap-2">
//               <Input
//                 name="thumbnail"
//                 value={thumbnailUrl}
//                 placeholder="Video preview image URL"
//                 onChange={(e) => setThumbnailUrl(e.target.value)}
//               />
//               <Button type="button" onClick={openFileDialog}>
//                 Select Image
//               </Button>
//             </div>
//             <input
//               type="file"
//               accept="image/*"
//               className="hidden"
//               ref={inputFileRef}
//               onChange={(e) => {
//                 const file = e.target.files?.[0] ?? null;
//                 onVideoThumbnailChange(file);
//               }}
//             />
//             {thumbnailUrl && (
//               <div className="mt-2">
//                 <img
//                   src={thumbnailUrl}
//                   alt="Video Thumbnail Preview"
//                   className="h-32 object-cover rounded"
//                 />
//               </div>
//             )}
//           </div>
//         </>
//       )}

//       <div className="flex gap-3">
//         <Button type="submit" size="sm" disabled={loading} className="bg-[#be965b] text-black">
//           {loading ? "Saving…" : "Save"}
//         </Button>
//         <Button
//           type="button"
//           size="sm"
//           variant="outline"
//           onClick={() => router.back()}
//           className="border-[#cccccc] text-[#4a4a4a]"
//         >
//           Cancel
//         </Button>
//       </div>
//     </form>
//   );
// }



// "use client";

// import { useState, useRef } from "react";
// import { useRouter } from "next/navigation";
// import { IoArrowBack } from "react-icons/io5";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Button } from "@/components/ui/button";
// import { ImageUpload } from "./ImageUpload";

// interface GalleryItem {
//   id?: string;
//   type: "photo" | "video";
//   title: string;
//   thumbnail?: string;
//   src: string;
// }

// interface Props {
//   initial?: GalleryItem;
//   onSave: (data: FormData) => Promise<void>;
// }

// export function GalleryForm({ initial, onSave }: Props) {
//   const [loading, setLoading] = useState(false);
//   const router = useRouter();
//   const [type, setType] = useState<"photo" | "video">(initial?.type || "photo");
//   const [selectedPhoto, setSelectedPhoto] = useState<File | null>(null);
//   const [photoPreview, setPhotoPreview] = useState<string | null>(initial?.thumbnail || null);
//   const [thumbnailUrl, setThumbnailUrl] = useState(initial?.thumbnail || "");

//   const inputFileRef = useRef<HTMLInputElement | null>(null);

//   async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
//     e.preventDefault();
//     setLoading(true);
//     const form = new FormData(e.currentTarget);

//     form.set("type", type);

//     if (type === "photo" && selectedPhoto) {
//       form.set("photo", selectedPhoto);
//     }
//     if (type === "photo" && !selectedPhoto && initial?.thumbnail) {
//       form.set("existingThumbnail", initial.thumbnail);
//     }

//     // For video, ensure thumbnail URL is set from state (which syncs input or file)
//     if (type === "video") {
//       form.set("thumbnail", thumbnailUrl);
//     }

//     await onSave(form);
//     setLoading(false);
//     router.push("/cms/gallery");
//   }

//   // Handle thumbnail file selected in video mode
//   const onVideoThumbnailChange = (file: File | null) => {
//     if (file) {
//       const objectUrl = URL.createObjectURL(file);
//       setThumbnailUrl(objectUrl);
//       setSelectedPhoto(file);
//       if (!file) setPhotoPreview(null);
//     }
//   };

//   // Trigger hidden file input for video thumbnail select
//   const openFileDialog = () => {
//     inputFileRef.current?.click();
//   };

//   return (
//     <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
//       <Button
//         variant="ghost"
//         size="sm"
//         onClick={() => router.back()}
//         className="mb-4 flex items-center gap-1 text-[#be965b] hover:text-[#a88248]"
//       >
//         <IoArrowBack size={16} />
//         Back
//       </Button>

//       <div>
//         <Label>Title</Label>
//         <Input name="title" defaultValue={initial?.title} required />
//       </div>

//       <div>
//         <Label>Type</Label>
//         <select
//           name="type"
//           value={type}
//           onChange={(e) => setType(e.target.value as "photo" | "video")}
//           required
//           className="flex h-10 w-full rounded-md border border-[#cccccc] bg-transparent px-3 py-2"
//         >
//           <option value="photo">Photo</option>
//           <option value="video">Video</option>
//         </select>
//       </div>

//       {type === "photo" && (
//         <div>
//           <Label>Photo</Label>
//           <ImageUpload
//             value={photoPreview ?? undefined}
//             onChange={(file) => {
//               setSelectedPhoto(file);
//               if (!file) setPhotoPreview(null);
//             }}
//           />
//         </div>
//       )}

//       {type === "video" && (
//         <>
//           <div>
//             <Label>YouTube Video Link</Label>
//             <Input
//               type="url"
//               name="src"
//               defaultValue={initial?.src}
//               placeholder="https://www.youtube.com/watch?v= ..."
//               required
//             />
//           </div>
//           <div>
//             <Label>Thumbnail URL (optional)</Label>
//             <div className="flex items-center gap-2">
//               <Input
//                 name="thumbnail"
//                 value={thumbnailUrl}
//                 placeholder="Video preview image URL"
//                 onChange={(e) => setThumbnailUrl(e.target.value)}
//               />
//               <Button type="button" onClick={openFileDialog}>
//                 Select Image
//               </Button>
//             </div>
//             <input
//               type="file"
//               accept="image/*"
//               className="hidden"
//               ref={inputFileRef}
//               onChange={(e) => {
//                 const file = e.target.files?.[0] ?? null;
//                 onVideoThumbnailChange(file);
//               }}
//             />
//             {thumbnailUrl && (
//               <div className="mt-2">
//                 <img
//                   src={thumbnailUrl}
//                   alt="Video Thumbnail Preview"
//                   className="h-32 object-cover rounded"
//                 />
//               </div>
//             )}
//           </div>
//         </>
//       )}

//       <div className="flex gap-3">
//         <Button type="submit" size="sm" disabled={loading} className="bg-[#be965b] text-black">
//           {loading ? "Saving…" : "Save"}
//         </Button>
//         <Button
//           type="button"
//           size="sm"
//           variant="outline"
//           onClick={() => router.back()}
//           className="border-[#cccccc] text-[#4a4a4a]"
//         >
//           Cancel
//         </Button>
//       </div>
//     </form>
//   );
// }







// "use client";

// import { useState, useRef } from "react";
// import { useRouter } from "next/navigation";
// import { IoArrowBack } from "react-icons/io5";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Button } from "@/components/ui/button";
// import { ImageUpload } from "./ImageUpload";

// interface GalleryItem {
//   id?: string;
//   type: "photo" | "video";
//   title: string;
//   thumbnail?: string;
//   src: string;
// }

// interface Props {
//   initial?: GalleryItem;
//   onSave: (data: FormData) => Promise<void>;
// }

// export function GalleryForm({ initial, onSave }: Props) {
//   const [loading, setLoading] = useState(false);
//   const router = useRouter();
//   const [type, setType] = useState<"photo" | "video">(initial?.type || "photo");
//   const [selectedPhoto, setSelectedPhoto] = useState<File | null>(null);
//   const [photoPreview, setPhotoPreview] = useState<string | null>(initial?.thumbnail || null);
//   const [thumbnailUrl, setThumbnailUrl] = useState(initial?.thumbnail || "");

//   const inputFileRef = useRef<HTMLInputElement | null>(null);

//   async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
//     e.preventDefault();
//     setLoading(true);
//     const form = new FormData(e.currentTarget);

//     form.set("type", type);

//     if (type === "photo" && selectedPhoto) {
//       form.set("photo", selectedPhoto);
//     }
//     if (type === "photo" && !selectedPhoto && initial?.thumbnail) {
//       form.set("existingThumbnail", initial.thumbnail);
//     }

//     // For video, ensure thumbnail URL is set from state (which syncs input or file)
//     if (type === "video") {
//       form.set("thumbnail", thumbnailUrl);
//     }

//     await onSave(form);
//     setLoading(false);
//     router.push("/cms/gallery");
//   }

//   // Handle thumbnail file selected in video mode
//   const onVideoThumbnailChange = (file: File | null) => {
//     if (file) {
//       const objectUrl = URL.createObjectURL(file);
//       setThumbnailUrl(objectUrl);
//       setSelectedPhoto(file);
//       if (!file) setPhotoPreview(null);
//     }
//   };

//   // Trigger hidden file input for video thumbnail select
//   const openFileDialog = () => {
//     inputFileRef.current?.click();
//   };

//   return (
//     <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
//       <Button
//         variant="ghost"
//         size="sm"
//         onClick={() => router.back()}
//         className="mb-4 flex items-center gap-1 text-[#be965b] hover:text-[#a88248]"
//       >
//         <IoArrowBack size={16} />
//         Back
//       </Button>

//       <div>
//         <Label>Title</Label>
//         <Input name="title" defaultValue={initial?.title} required />
//       </div>

//       <div>
//         <Label>Type</Label>
//         <select
//           name="type"
//           value={type}
//           onChange={(e) => setType(e.target.value as "photo" | "video")}
//           required
//           className="flex h-10 w-full rounded-md border border-[#cccccc] bg-transparent px-3 py-2"
//         >
//           <option value="photo">Photo</option>
//           <option value="video">Video</option>
//         </select>
//       </div>

//       {type === "photo" && (
//         <div>
//           <Label>Photo</Label>
//           <ImageUpload
//             value={photoPreview ?? undefined}
//             onChange={(file) => {
//               setSelectedPhoto(file);
//               if (!file) setPhotoPreview(null);
//             }}
//           />
//         </div>
//       )}

//       {type === "video" && (
//         <>
//           <div>
//             <Label>YouTube Video Link</Label>
//             <Input
//               type="url"
//               name="src"
//               defaultValue={initial?.src}
//               placeholder="https://www.youtube.com/watch?v=..."
//               required
//             />
//           </div>
//           <div>
//             <Label>Thumbnail URL (optional)</Label>
//             <div className="flex items-center gap-2">
//               <Input
//                 name="thumbnail"
//                 value={thumbnailUrl}
//                 placeholder="Video preview image URL"
//                 onChange={(e) => setThumbnailUrl(e.target.value)}
//               />
//               <Button type="button" onClick={openFileDialog}>
//                 Select Image
//               </Button>
//             </div>
//             <input
//               type="file"
//               accept="image/*"
//               className="hidden"
//               ref={inputFileRef}
//               onChange={(e) => {
//                 const file = e.target.files?.[0] ?? null;
//                 onVideoThumbnailChange(file);
//               }}
//             />
//             {thumbnailUrl && (
//               <div className="mt-2">
//                 <img
//                   src={thumbnailUrl}
//                   alt="Video Thumbnail Preview"
//                   className="h-32 object-cover rounded"
//                 />
//               </div>
//             )}
//           </div>
//         </>
//       )}

//       <div className="flex gap-3">
//         <Button type="submit" size="sm" disabled={loading} className="bg-[#be965b] text-black">
//           {loading ? "Saving…" : "Save"}
//         </Button>
//         <Button
//           type="button"
//           size="sm"
//           variant="outline"
//           onClick={() => router.back()}
//           className="border-[#cccccc] text-[#4a4a4a]"
//         >
//           Cancel
//         </Button>
//       </div>
//     </form>
//   );
// }

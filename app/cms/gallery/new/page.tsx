// app/cms/gallery/new/page.tsx
import { createGalleryItem } from "../actions";
import GalleryFormWrapper from "../_components/GalleryFormWrapper";
import { getAuth } from "@/lib/auth"; // Better-Auth server helper
import { redirect } from "next/navigation";

export default async function NewGalleryPage() {
  const session = await getAuth();
  if (!session?.user?.id) redirect("/login");

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-charcoal">Add Gallery Item</h1>
  <GalleryFormWrapper />
    </div>
  );
}



// // app/cms/gallery/new/page.tsx
// import { createGalleryItem } from "../actions";
// import { GalleryForm } from "../_components/GalleryForm";
// import { auth } from "@/lib/auth";
// import { headers } from "next/headers";

// export default async function NewGalleryPage() {
//   const session = await auth.api.getSession({ headers: await headers() });
//   if (!session) throw new Error("Unauthorized");

//   async function handleCreate(data: FormData) {
//     "use server";
//     if (!session) throw new Error("Unauthorized"); // extra guard for TS
//     await createGalleryItem(data, session.user.id);
//   }

//   return (
//     <div className="p-6 max-w-2xl mx-auto">
//       <h1 className="text-2xl font-bold mb-6 text-charcoal">Add Gallery Item</h1>
//       <GalleryForm onSave={handleCreate} />
//     </div>
//   );
// }




// import { createGalleryItem } from "../actions";
// import { GalleryForm } from "../_components/GalleryForm";

// export default async function NewGalleryPage() {
//   // Server-action wrapper that matches (data: FormData) => Promise<void>
//   async function handleCreate(data: FormData) {
//     "use server";
//     await createGalleryItem(data);
//   }

//   return (
//     <div className="p-6 max-w-2xl mx-auto">
//       <h1 className="text-2xl font-bold mb-6 text-charcoal">Add Gallery Item</h1>
//       <GalleryForm onSave={handleCreate} />
//     </div>
//   );
// }





// import { createGalleryItem } from "../actions";
// import { GalleryForm } from "../_components/GalleryForm";

// export default async function NewGalleryPage() {
//   return (
//     <div className="p-6 max-w-2xl mx-auto">
//       <h1 className="text-2xl font-bold mb-6 text-charcoal">Add Gallery Item</h1>
//       <GalleryForm onSave={createGalleryItem} />
//     </div>
//   );
// }

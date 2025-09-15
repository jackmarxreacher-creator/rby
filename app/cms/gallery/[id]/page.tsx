// app/cms/gallery/[id]/page.tsx
import { notFound } from "next/navigation";
import { GalleryForm } from "../_components/GalleryForm";
import { updateGalleryItem } from "../actions";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EditGalleryPage({ params }: PageProps) {
  const { id } = await params;

  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) notFound();

  async function handleUpdate(data: FormData) {
    "use server";
    if (!session) throw new Error("Unauthorized"); // extra guard for TS
    await updateGalleryItem(id, data, session.user.id);
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Edit Gallery Item</h1>
      <GalleryForm onSave={handleUpdate} />
    </div>
  );
}









// // app/cms/gallery/[id]/page.tsx
// import { notFound } from "next/navigation";
// import { GalleryForm } from "../_components/GalleryForm";
// import { updateGalleryItem } from "../actions";
// import { authClient } from "@/lib/auth-client"; // ← or wherever your client lives

// interface PageProps {
//   params: Promise<{ id: string }>;
// }

// export default async function EditGalleryPage({ params }: PageProps) {
//   const { id } = await params;

//   // Server-action wrapper that matches (data: FormData) => Promise<void>
//   async function handleUpdate(data: FormData) {
//     "use server";
//     const session = await authClient.session; // or await authClient.useSession() if you fixed the Atom issue
//     if (!session?.data?.user?.id) throw new Error("Unauthorized");
//     await updateGalleryItem(id, data, session.data.user.id);
//   }

//   return (
//     <div>
//       <h1 className="text-2xl font-bold mb-4">Edit Gallery Item</h1>
//       <GalleryForm onSave={handleUpdate} />
//     </div>
//   );
// }





// import { notFound } from "next/navigation";
// import { GalleryForm } from "../_components/GalleryForm";
// import { updateGalleryItem } from "../actions";

// interface PageProps {
//   params: Promise<{ id: string }>;
// }

// export default async function EditGalleryPage({ params }: PageProps) {
//   const { id } = await params;

//   // Server-action wrapper that matches (data: FormData) => Promise<void>
//   async function handleUpdate(data: FormData) {
//     "use server";
//     await updateGalleryItem(id, data);
//   }

//   return (
//     <div>
//       <h1 className="text-2xl font-bold mb-4">Edit Gallery Item</h1>
//       <GalleryForm onSave={handleUpdate} />
//     </div>
//   );
// }





// import { prisma } from "@/lib/prisma";
// import { GalleryForm } from "../_components/GalleryForm";
// import { redirect } from "next/navigation";
// import { updateGalleryItem } from "../actions";

// export default async function EditGalleryPage({ params }: { params: { id: string } }) {
//   const { id } = params;

//   const galleryItem = await prisma.galleryItem.findUnique({
//     where: { id },
//     select: {
//       id: true,
//       type: true,
//       title: true,
//       thumbnail: true,
//       src: true,
//       createdAt: true,
//       updatedAt: true,
//     },
//   });

//   if (!galleryItem) {
//     redirect("/cms/gallery");
//   }

//   // Bind the ID for update action
//   const boundUpdateGalleryItem = updateGalleryItem.bind(null, id);

//   return (
//     <div>
//       <h1 className="text-2xl font-bold mb-4">Edit Gallery Item</h1>
//       <GalleryForm initial={galleryItem} onSave={boundUpdateGalleryItem} />
//     </div>
//   );
// }


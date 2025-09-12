import { prisma } from "@/lib/prisma";
import { GalleryForm } from "../_components/GalleryForm";
import { redirect } from "next/navigation";
import { updateGalleryItem } from "../actions";

export default async function EditGalleryPage({ params }: { params: { id: string } }) {
  const { id } = params;

  const galleryItem = await prisma.galleryItem.findUnique({
    where: { id },
    select: {
      id: true,
      type: true,
      title: true,
      thumbnail: true,
      src: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  if (!galleryItem) {
    redirect("/cms/gallery");
  }

  // Bind the ID for update action
  const boundUpdateGalleryItem = updateGalleryItem.bind(null, id);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Edit Gallery Item</h1>
      <GalleryForm initial={galleryItem} onSave={boundUpdateGalleryItem} />
    </div>
  );
}


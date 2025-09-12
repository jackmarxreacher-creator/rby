import { createGalleryItem } from "../actions";
import { GalleryForm } from "../_components/GalleryForm";

export default async function NewGalleryPage() {
  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-charcoal">Add Gallery Item</h1>
      <GalleryForm onSave={createGalleryItem} />
    </div>
  );
}

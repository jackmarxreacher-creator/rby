import { getGalleryItems } from "./actions";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { GalleryTable } from "./_components/GalleryTable";
import { ViewToggle, ViewType } from "@/components/ui/ViewToggle";
import ClientGalleryGridWrapper from "./_components/ClientGalleryGridWrapper";

export default async function GalleryPage({
  searchParams,
}: {
  searchParams: Promise<{ view?: string }>;
}) {
  const { view } = await searchParams;
  const currentView: ViewType = view === "table" ? "table" : "card";

  const galleryItems = await getGalleryItems();

  return (
    <div className="p-6 bg-[#fcfbf8] min-h-screen">
      <div className="flex items-center justify-between p-5 shadow-lg mb-8">
        <h1 className="text-3xl font-bold text-[#1c1c1c]">Gallery</h1>
        <div className="flex items-center gap-4">
          <ViewToggle current={currentView} basePath="/cms/gallery" />
          <Button className="bg-[#be965b] hover:bg-[#a88248] text-black">
            <Link href="/cms/gallery/new">Add Gallery Item</Link>
          </Button>
        </div>
      </div>

      {galleryItems.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-[#4a4a4a] text-lg">No gallery items yet.</p>
          <Button
            variant="outline"
            className="mt-4 border-[#be965b] text-[#be965b] hover:bg-[#f3ede5]"
          >
            <Link href="/cms/gallery/new">Create your first gallery item</Link>
          </Button>
        </div>
      ) : currentView === "table" ? (
        <GalleryTable galleryItems={galleryItems} />
      ) : (
        <ClientGalleryGridWrapper galleryItems={galleryItems} />
      )}
    </div>
  );
}








// import { getGalleryItems } from "./actions";
// import Link from "next/link";
// import { Button } from "@/components/ui/button";
// import { GalleryCard } from "./_components/GalleryCard";
// import { GalleryTable } from "./_components/GalleryTable";
// import { ViewToggle, ViewType } from "@/components/ui/ViewToggle";

// export default async function GalleryPage({
//   searchParams,
// }: {
//   searchParams: Promise<{ view?: string }>;
// }) {
//   const { view } = await searchParams;
//   const currentView: ViewType = view === "table" ? "table" : "card";

//   const galleryItems = await getGalleryItems();

//   return (
//     <div className="p-6 bg-[#fcfbf8] min-h-screen">
//       <div className="flex items-center justify-between p-5 shadow-lg mb-8">
//         <h1 className="text-3xl font-bold text-[#1c1c1c]">Gallery</h1>
//         <div className="flex items-center gap-4">
//           <ViewToggle current={currentView} basePath="/cms/gallery" />
//           <Button className="bg-[#be965b] hover:bg-[#a88248] text-black">
//             <Link href="/cms/gallery/new">Add Gallery Item</Link>
//           </Button>
//         </div>
//       </div>

//       {galleryItems.length === 0 ? (
//         <div className="text-center py-10">
//           <p className="text-[#4a4a4a] text-lg">No gallery items yet.</p>
//           <Button
//             variant="outline"
//             className="mt-4 border-[#be965b] text-[#be965b] hover:bg-[#f3ede5]"
//           >
//             <Link href="/cms/gallery/new">Create your first gallery item</Link>
//           </Button>
//         </div>
//       ) : currentView === "table" ? (
//         <GalleryTable galleryItems={galleryItems} />
//       ) : (
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//           {galleryItems.map((item) => (
//             <GalleryCard key={item.id} galleryItem={item} />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

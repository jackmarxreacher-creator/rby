import PageHero from "@/app/common/PageHero";
import GalleryGrid from "./sections/GalleryGrid";
import { getGalleryItems } from "./actions";

export default async function GalleryPage() {
  const galleryItems = await getGalleryItems(); // ← from DB

  return (
    <>
      <PageHero
        title="Our Gallery"
        description="A glimpse into our events, moments, and celebrations."
        backgroundImage="/images/banners/gallery_hero.webp"
      />

      <GalleryGrid galleryItems={galleryItems} />
    </>
  );
}






// import PageHero from "@/app/common/PageHero";
// import GalleryGrid from "./sections/GalleryGrid";

// export default function GalleryPage() {
//   return (
//     <>
//       <PageHero
//         title="Our Gallery"
//         description="A glimpse into our events, moments, and celebrations."
//         backgroundImage="/images/banners/gallery_hero.jpg"
//       />

//       <GalleryGrid />
//     </>
//   );
// }

import PageHero from "@/app/common/PageHero";
import GalleryGrid from "./sections/GalleryGrid";
import { getGalleryItems } from "./actions";

export default async function GalleryPage() {
  const rawItems = await getGalleryItems();

  const galleryItems = rawItems.map((item) => ({
    id: item.id,
    type: item.type,
    title: item.title,
    thumbnail: item.thumbnail,
    src: item.src,
    date: item.createdAt.toISOString(), // ✅ string
  }));

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
// import { getGalleryItems } from "./actions";

// export default async function GalleryPage() {
//   const galleryItems = await getGalleryItems(); // ← from DB

//   return (
//     <>
//       <PageHero
//         title="Our Gallery"
//         description="A glimpse into our events, moments, and celebrations."
//         backgroundImage="/images/banners/gallery_hero.webp"
//       />

//       <GalleryGrid galleryItems={galleryItems} />
//     </>
//   );
// }






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

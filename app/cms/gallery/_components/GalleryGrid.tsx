"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Video from "yet-another-react-lightbox/plugins/video";

type FilterType = "all" | "photo" | "video";

interface GalleryItem {
  id: string;
  type: "photo" | "video";
  title: string;
  thumbnail: string;
  src: string;
  date: string; // ← required by GalleryTable / lightbox
}

interface Props {
  galleryItems: GalleryItem[];
}

export default function GalleryGrid({ galleryItems }: Props) {
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState<FilterType>("all");
  const [lightboxIndex, setLightboxIndex] = useState(-1);

  const itemsPerPage = 12;

  const filteredItems =
    filter === "all"
      ? galleryItems
      : galleryItems.filter((item) => item.type === filter);

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredItems.slice(startIndex, startIndex + itemsPerPage);

  const handleFilterChange = (type: FilterType) => {
    setFilter(type);
    setCurrentPage(1);
  };

  // Map items into Lightbox format
  const lightboxSlides = currentItems.map((item) =>
    item.type === "photo"
      ? {
          src: item.src,
          title: item.title,
          description: item.date,
        }
      : {
          type: "video" as const, // ← typed literal
          width: 1280,
          height: 720,
          sources: [{ src: item.src, type: "video/mp4" }],
          poster: item.thumbnail,
          title: item.title,
          description: item.date,
          muted: true,
          controls: true,
          preload: "metadata",
          autoPlay: false,
        }
  );

  return (
    <section className="py-16 px-4 md:px-8 bg-[#fcfbf8]">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8 text-[#be965b]">Our Gallery</h2>

        {/* Filter Buttons */}
        <div className="flex justify-center space-x-4 mb-10">
          <Button variant={filter === "all" ? "default" : "outline"} onClick={() => handleFilterChange("all")}>All</Button>
          <Button variant={filter === "photo" ? "default" : "outline"} onClick={() => handleFilterChange("photo")}>Photos</Button>
          <Button variant={filter === "video" ? "default" : "outline"} onClick={() => handleFilterChange("video")}>Videos</Button>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {currentItems.map((item, idx) => (
            <motion.div
              key={item.id}
              className="bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden cursor-pointer relative"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              onClick={() => setLightboxIndex(idx)}
            >
              {item.type === "photo" ? (
                <Image src={item.thumbnail} alt={item.title} width={400} height={250} className="w-full h-48 object-cover" />
              ) : (
                <div className="relative">
                  <video
                    src={item.src}
                    poster={item.thumbnail}
                    className="w-full h-48 object-cover"
                    muted
                    controls={false}
                    preload="metadata"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                    <svg className="w-12 h-12 text-white opacity-90" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M14.752 11.168l-5.197-3.029A1 1 0 008 9.03v5.94a1 1 0 001.555.832l5.197-3.03a1 1 0 000-1.664z" />
                    </svg>
                  </div>
                </div>
              )}
              <div className="p-4">
                <h3 className="font-semibold text-gray-800">{item.title}</h3>
                <p className="text-sm text-gray-500">{item.date}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center space-x-4 mt-10">
            <Button variant="outline" size="sm" onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))} disabled={currentPage === 1}>Previous</Button>
            <span className="text-gray-700">Page {currentPage} of {totalPages}</span>
            <Button variant="outline" size="sm" onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))} disabled={currentPage === totalPages}>Next</Button>
          </div>
        )}

        {/* Lightbox Viewer */}
        {lightboxIndex >= 0 && (
          <Lightbox
            open={lightboxIndex >= 0}
            close={() => setLightboxIndex(-1)}
            index={lightboxIndex}
            slides={lightboxSlides}
            plugins={[Fullscreen, Zoom, Video]}
            video={{ autoPlay: false, muted: true, controls: true, preload: "metadata" }}
          />
        )}
      </div>
    </section>
  );
}





// "use client";

// import { useState, useEffect } from "react";
// import Image from "next/image";
// import { Button } from "@/components/ui/button";
// import { motion } from "framer-motion";
// import Lightbox from "yet-another-react-lightbox";
// import "yet-another-react-lightbox/styles.css";

// // Plugins
// import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
// import Zoom from "yet-another-react-lightbox/plugins/zoom";
// import Video from "yet-another-react-lightbox/plugins/video";

// type FilterType = "all" | "photo" | "video";

// interface GalleryItem {
//   id: string;
//   type: "photo" | "video";
//   title: string;
//   thumbnail: string;
//   src: string;
//   date: string;
// }

// interface Props {
//   galleryItems: GalleryItem[];
// }

// export default function GalleryGrid({ galleryItems }: Props) {
//   const [currentPage, setCurrentPage] = useState(1);
//   const [filter, setFilter] = useState<FilterType>("all");
//   const [lightboxIndex, setLightboxIndex] = useState(-1);

//   const itemsPerPage = 12;

//   const filteredItems =
//     filter === "all"
//       ? galleryItems
//       : galleryItems.filter((item) => item.type === filter);

//   const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
//   const startIndex = (currentPage - 1) * itemsPerPage;
//   const currentItems = filteredItems.slice(startIndex, startIndex + itemsPerPage);

//   const handleFilterChange = (type: FilterType) => {
//     setFilter(type);
//     setCurrentPage(1);
//   };

//   // Map items into Lightbox format
//   const lightboxSlides = currentItems.map((item) =>
//     item.type === "photo"
//       ? {
//           src: item.src,
//           title: item.title,
//           description: item.date,
//         }
//       : {
//           type: "video",
//           width: 1280,
//           height: 720,
//           sources: [{ src: item.src, type: "video/mp4" }],
//           poster: item.thumbnail,
//           title: item.title,
//           description: item.date,
//           muted: true,
//           controls: true,
//           preload: "metadata",
//           autoPlay: false,
//         }
//   );

//   return (
//     <section className="py-16 px-4 md:px-8 bg-[#fcfbf8]">
//       <div className="max-w-6xl mx-auto">
//         {/* Title */}
//         <h2 className="text-3xl font-bold text-center mb-8 text-[#be965b]">Our Gallery</h2>

//         {/* Filter Buttons */}
//         <div className="flex justify-center space-x-4 mb-10">
//           <Button
//             variant={filter === "all" ? "default" : "outline"}
//             onClick={() => handleFilterChange("all")}
//           >
//             All
//           </Button>
//           <Button
//             variant={filter === "photo" ? "default" : "outline"}
//             onClick={() => handleFilterChange("photo")}
//           >
//             Photos
//           </Button>
//           <Button
//             variant={filter === "video" ? "default" : "outline"}
//             onClick={() => handleFilterChange("video")}
//           >
//             Videos
//           </Button>
//         </div>

//         {/* Grid */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//           {currentItems.map((item, idx) => (
//             <motion.div
//               key={item.id}
//               className="bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden cursor-pointer relative"
//               initial={{ opacity: 0, y: 30 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.4, delay: idx * 0.05 }}
//               onClick={() => setLightboxIndex(idx)}
//             >
//               {item.type === "photo" ? (
//                 <Image
//                   src={item.thumbnail}
//                   alt={item.title}
//                   width={400}
//                   height={250}
//                   className="w-full h-48 object-cover"
//                 />
//               ) : (
//                 <div className="relative">
//                   <video
//                     src={item.src}
//                     poster={item.thumbnail}
//                     className="w-full h-48 object-cover"
//                     muted
//                     controls={false}
//                     preload="metadata"
//                   />
//                   <div className="absolute inset-0 flex items-center justify-center bg-black/30">
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       className="w-12 h-12 text-white opacity-90"
//                       fill="none"
//                       viewBox="0 0 24 24"
//                       stroke="currentColor"
//                       strokeWidth="2"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         d="M14.752 11.168l-5.197-3.029A1 1 0 008 9.03v5.94a1 1 0 001.555.832l5.197-3.03a1 1 0 000-1.664z"
//                       />
//                     </svg>
//                   </div>
//                 </div>
//               )}
//               <div className="p-4">
//                 <h3 className="font-semibold text-gray-800">{item.title}</h3>
//                 <p className="text-sm text-gray-500">{item.date}</p>
//               </div>
//             </motion.div>
//           ))}
//         </div>

//         {/* Pagination */}
//         {totalPages > 1 && (
//           <div className="flex justify-center items-center space-x-4 mt-10">
//             <Button
//               variant="outline"
//               size="sm"
//               onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
//               disabled={currentPage === 1}
//             >
//               Previous
//             </Button>
//             <span className="text-gray-700">
//               Page {currentPage} of {totalPages}
//             </span>
//             <Button
//               variant="outline"
//               size="sm"
//               onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
//               disabled={currentPage === totalPages}
//             >
//               Next
//             </Button>
//           </div>
//         )}

//         {/* Lightbox Viewer */}
//         {lightboxIndex >= 0 && (
//           <Lightbox
//             open={lightboxIndex >= 0}
//             close={() => setLightboxIndex(-1)}
//             index={lightboxIndex}
//             slides={lightboxSlides}
//             plugins={[Fullscreen, Zoom, Video]}
//             video={{ autoPlay: false, muted: true, controls: true, preload: "metadata" }}
//             render={{ slide: ({ slide, rect }) => {
//               if (slide.type === "video") {
//                 return (
//                   <video
//                     key={slide.sources[0].src}
//                     src={slide.sources[0].src}
//                     poster={slide.poster}
//                     controls
//                     muted
//                     preload="metadata"
//                     className="yarl__slide_image"
//                     style={{ width: rect.width, height: rect.height }}
//                     ref={(el) => el?.play().catch(() => {})}
//                   />
//                 );
//               }
//               return null; // use default render for photos
//             }}}
//           />
//         )}
//       </div>
//     </section>
//   );
// }




// "use client";

// import { useState, useEffect, useRef } from "react";
// import Image from "next/image";
// import { Button } from "@/components/ui/button";
// import { motion } from "framer-motion";
// import Lightbox from "yet-another-react-lightbox";
// import "yet-another-react-lightbox/styles.css";

// // Plugins
// import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
// import Zoom from "yet-another-react-lightbox/plugins/zoom";
// import Video from "yet-another-react-lightbox/plugins/video";

// type FilterType = "all" | "photo" | "video";

// interface GalleryItem {
//   id: string;
//   type: "photo" | "video";
//   title: string;
//   thumbnail: string;
//   src: string;
//   date: string;
// }

// interface Props {
//   galleryItems: GalleryItem[];
// }

// export default function GalleryGrid({ galleryItems }: Props) {
//   const [currentPage, setCurrentPage] = useState(1);
//   const [filter, setFilter] = useState<FilterType>("all");
//   const [lightboxIndex, setLightboxIndex] = useState(-1);
//   const videoRef = useRef<HTMLVideoElement | null>(null); // ← NEW

//   const itemsPerPage = 12;

//   const filteredItems =
//     filter === "all"
//       ? galleryItems
//       : galleryItems.filter((item) => item.type === filter);

//   const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
//   const startIndex = (currentPage - 1) * itemsPerPage;
//   const currentItems = filteredItems.slice(startIndex, startIndex + itemsPerPage);

//   const handleFilterChange = (type: FilterType) => {
//     setFilter(type);
//     setCurrentPage(1);
//   };

//   // Map items into Lightbox format
//   const lightboxSlides = currentItems.map((item) =>
//     item.type === "photo"
//       ? {
//           src: item.src,
//           title: item.title,
//           description: item.date,
//         }
//       : {
//           type: "video",
//           width: 1280,
//           height: 720,
//           sources: [{ src: item.src, type: "video/mp4" }],
//           poster: item.thumbnail,
//           title: item.title,
//           description: item.date,
//           muted: true,
//           controls: true,
//           preload: "metadata",
//           autoPlay: false, // we start it manually
//         }
//   );

//   /* START the video after the lightbox renders */
//   useEffect(() => {
//     if (lightboxIndex >= 0) {
//       const slide = lightboxSlides[lightboxIndex];
//       if (slide?.type === "video") {
//         setTimeout(() => {
//           const vid = document.querySelector(
//             "yet-another-react-lightbox video"
//           ) as HTMLVideoElement;
//           if (vid) vid.play().catch(() => {});
//         }, 100);
//       }
//     }
//   }, [lightboxIndex, lightboxSlides]);

//   return (
//     <section className="py-16 px-4 md:px-8 bg-[#fcfbf8]">
//       <div className="max-w-6xl mx-auto">
//         {/* Title */}
//         <h2 className="text-3xl font-bold text-center mb-8 text-[#be965b]">Our Gallery</h2>

//         {/* Filter Buttons */}
//         <div className="flex justify-center space-x-4 mb-10">
//           <Button
//             variant={filter === "all" ? "default" : "outline"}
//             onClick={() => handleFilterChange("all")}
//           >
//             All
//           </Button>
//           <Button
//             variant={filter === "photo" ? "default" : "outline"}
//             onClick={() => handleFilterChange("photo")}
//           >
//             Photos
//           </Button>
//           <Button
//             variant={filter === "video" ? "default" : "outline"}
//             onClick={() => handleFilterChange("video")}
//           >
//             Videos
//           </Button>
//         </div>

//         {/* Grid */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//           {currentItems.map((item, idx) => (
//             <motion.div
//               key={item.id}
//               className="bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden cursor-pointer relative"
//               initial={{ opacity: 0, y: 30 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.4, delay: idx * 0.05 }}
//               onClick={() => setLightboxIndex(idx)}
//             >
//               {item.type === "photo" ? (
//                 <Image
//                   src={item.thumbnail}
//                   alt={item.title}
//                   width={400}
//                   height={250}
//                   className="w-full h-48 object-cover"
//                 />
//               ) : (
//                 <div className="relative">
//                   <video
//                     ref={item.src === currentItems[0]?.src ? videoRef : null}
//                     src={item.src}
//                     poster={item.thumbnail}
//                     className="w-full h-48 object-cover"
//                     muted
//                     controls={false}
//                     preload="metadata"
//                   />
//                   <div className="absolute inset-0 flex items-center justify-center bg-black/30">
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       className="w-12 h-12 text-white opacity-90"
//                       fill="none"
//                       viewBox="0 0 24 24"
//                       stroke="currentColor"
//                       strokeWidth="2"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         d="M14.752 11.168l-5.197-3.029A1 1 0 008 9.03v5.94a1 1 0 001.555.832l5.197-3.03a1 1 0 000-1.664z"
//                       />
//                     </svg>
//                   </div>
//                 </div>
//               )}
//               <div className="p-4">
//                 <h3 className="font-semibold text-gray-800">{item.title}</h3>
//                 <p className="text-sm text-gray-500">{item.date}</p>
//               </div>
//             </motion.div>
//           ))}
//         </div>

//         {/* Pagination */}
//         {totalPages > 1 && (
//           <div className="flex justify-center items-center space-x-4 mt-10">
//             <Button
//               variant="outline"
//               size="sm"
//               onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
//               disabled={currentPage === 1}
//             >
//               Previous
//             </Button>
//             <span className="text-gray-700">
//               Page {currentPage} of {totalPages}
//             </span>
//             <Button
//               variant="outline"
//               size="sm"
//               onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
//               disabled={currentPage === totalPages}
//             >
//               Next
//             </Button>
//           </div>
//         )}

//         {/* Lightbox Viewer */}
//         {lightboxIndex >= 0 && (
//           <Lightbox
//             open={lightboxIndex >= 0}
//             close={() => setLightboxIndex(-1)}
//             index={lightboxIndex}
//             slides={lightboxSlides}
//             plugins={[Fullscreen, Zoom, Video]}
//             video={{ autoPlay: false, muted: true, controls: true, preload: "metadata" }}
//           />
//         )}
//       </div>
//     </section>
//   );
// }






// "use client";

// import { useState } from "react";
// import Image from "next/image";
// import { Button } from "@/components/ui/button";
// import { motion } from "framer-motion";
// import Lightbox from "yet-another-react-lightbox";
// import "yet-another-react-lightbox/styles.css";

// // Plugins
// import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
// import Zoom from "yet-another-react-lightbox/plugins/zoom";
// import Video from "yet-another-react-lightbox/plugins/video";

// type FilterType = "all" | "photo" | "video";

// interface GalleryItem {
//   id: string;
//   type: "photo" | "video";
//   title: string;
//   thumbnail: string;
//   src: string;
//   date: string;
// }

// interface Props {
//   galleryItems: GalleryItem[];
// }

// export default function GalleryGrid({ galleryItems }: Props) {
//   const [currentPage, setCurrentPage] = useState(1);
//   const [filter, setFilter] = useState<FilterType>("all");
//   const [lightboxIndex, setLightboxIndex] = useState(-1);

//   const itemsPerPage = 12;

//   const filteredItems =
//     filter === "all"
//       ? galleryItems
//       : galleryItems.filter((item) => item.type === filter);

//   const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
//   const startIndex = (currentPage - 1) * itemsPerPage;
//   const currentItems = filteredItems.slice(startIndex, startIndex + itemsPerPage);

//   const handleFilterChange = (type: FilterType) => {
//     setFilter(type);
//     setCurrentPage(1);
//   };

//   // Map items into Lightbox format
//   const lightboxSlides = currentItems.map((item) =>
//     item.type === "photo"
//       ? {
//           src: item.src,
//           title: item.title,
//           description: item.date,
//         }
//       : {
//           type: "video",
//           width: 1280,
//           height: 720,
//           sources: [
//             {
//               src: item.src,
//               type: "video/mp4",
//             },
//           ],
//           poster: item.thumbnail,
//           title: item.title,
//           description: item.date,
//           muted: true,
//           controls: true,
//           preload: "metadata",
//           autoPlay: true,
//         }
//   );

//   return (
//     <section className="py-16 px-4 md:px-8 bg-[#fcfbf8]">
//       <div className="max-w-6xl mx-auto">
//         {/* Title */}
//         <h2 className="text-3xl font-bold text-center mb-8 text-[#be965b]">Our Gallery</h2>

//         {/* Filter Buttons */}
//         <div className="flex justify-center space-x-4 mb-10">
//           <Button
//             variant={filter === "all" ? "default" : "outline"}
//             onClick={() => handleFilterChange("all")}
//           >
//             All
//           </Button>
//           <Button
//             variant={filter === "photo" ? "default" : "outline"}
//             onClick={() => handleFilterChange("photo")}
//           >
//             Photos
//           </Button>
//           <Button
//             variant={filter === "video" ? "default" : "outline"}
//             onClick={() => handleFilterChange("video")}
//           >
//             Videos
//           </Button>
//         </div>

//         {/* Grid */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//           {currentItems.map((item, idx) => (
//             <motion.div
//               key={item.id}
//               className="bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden cursor-pointer relative"
//               initial={{ opacity: 0, y: 30 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.4, delay: idx * 0.05 }}
//               onClick={() => setLightboxIndex(idx)}
//             >
//               {item.type === "photo" ? (
//                 <Image
//                   src={item.thumbnail}
//                   alt={item.title}
//                   width={400}
//                   height={250}
//                   className="w-full h-48 object-cover"
//                 />
//               ) : (
//                 <div className="relative">
//                   <video
//                     src={item.src}
//                     poster={item.thumbnail}
//                     className="w-full h-48 object-cover"
//                     muted
//                     controls={false}
//                     preload="metadata"
//                   />
//                   <div className="absolute inset-0 flex items-center justify-center bg-black/30">
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       className="w-12 h-12 text-white opacity-90"
//                       fill="none"
//                       viewBox="0 0 24 24"
//                       stroke="currentColor"
//                       strokeWidth="2"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         d="M14.752 11.168l-5.197-3.029A1 1 0 008 9.03v5.94a1 1 0 001.555.832l5.197-3.03a1 1 0 000-1.664z"
//                       />
//                     </svg>
//                   </div>
//                 </div>
//               )}
//               <div className="p-4">
//                 <h3 className="font-semibold text-gray-800">{item.title}</h3>
//                 <p className="text-sm text-gray-500">{item.date}</p>
//               </div>
//             </motion.div>
//           ))}
//         </div>

//         {/* Pagination */}
//         {totalPages > 1 && (
//           <div className="flex justify-center items-center space-x-4 mt-10">
//             <Button
//               variant="outline"
//               size="sm"
//               onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
//               disabled={currentPage === 1}
//             >
//               Previous
//             </Button>
//             <span className="text-gray-700">
//               Page {currentPage} of {totalPages}
//             </span>
//             <Button
//               variant="outline"
//               size="sm"
//               onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
//               disabled={currentPage === totalPages}
//             >
//               Next
//             </Button>
//           </div>
//         )}

//         {/* Lightbox Viewer */}
//         {lightboxIndex >= 0 && (
//           <Lightbox
//             open={lightboxIndex >= 0}
//             close={() => setLightboxIndex(-1)}
//             index={lightboxIndex}
//             slides={lightboxSlides}
//             plugins={[Fullscreen, Zoom, Video]}
//             video={{ autoPlay: true, muted: true, controls: true, preload: "metadata" }}
//           />
//         )}
//       </div>
//     </section>
//   );
// }






// "use client";

// import { useState, useEffect } from "react";
// import Image from "next/image";
// import { Button } from "@/components/ui/button";
// import { motion } from "framer-motion";
// import Lightbox from "yet-another-react-lightbox";
// import "yet-another-react-lightbox/styles.css";

// // Plugins for the lightbox
// import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
// import Zoom from "yet-another-react-lightbox/plugins/zoom";
// import Video from "yet-another-react-lightbox/plugins/video";

// type FilterType = "all" | "photo" | "video";

// interface GalleryItem {
//   id: string;
//   type: "photo" | "video";
//   title: string;
//   thumbnail: string;
//   src: string;
//   updatedAt: string;
//   createdAt: string;
//   date: string;
// }

// interface GalleryGridProps {
//   galleryItems: GalleryItem[];
// }

// export default function GalleryGrid({ galleryItems }: GalleryGridProps) {
//   const [currentPage, setCurrentPage] = useState(1);
//   const [filter, setFilter] = useState<FilterType>("all");
//   const [lightboxIndex, setLightboxIndex] = useState(-1);

//   const itemsPerPage = 12;

//   const filteredItems =
//     filter === "all"
//       ? galleryItems
//       : galleryItems.filter((item) => item.type === filter);

//   const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
//   const startIndex = (currentPage - 1) * itemsPerPage;
//   const currentItems = filteredItems.slice(startIndex, startIndex + itemsPerPage);

//   const handleFilterChange = (type: FilterType) => {
//     setFilter(type);
//     setCurrentPage(1);
//   };

//   // Map items into slides for lightbox
//   const lightboxSlides = currentItems.map((item) =>
//     item.type === "photo"
//       ? {
//           src: item.src,
//           title: item.title,
//           description: item.date,
//         }
//       : {
//           type: "video",
//           width: 1280,
//           height: 720,
//           sources: [
//             {
//               src: item.src,
//               type: "video/mp4",
//             },
//           ],
//           poster: item.thumbnail,
//           title: item.title,
//           description: item.date,
//         }
//   );

//   return (
//     <section className="py-16 px-4 md:px-8 bg-[#fcfbf8]">
//       <div className="max-w-6xl mx-auto">
//         <h2 className="text-3xl font-bold text-center mb-8 text-[#be965b]">
//           Our Gallery
//         </h2>

//         <div className="flex justify-center space-x-4 mb-10">
//           <Button
//             variant={filter === "all" ? "default" : "outline"}
//             onClick={() => handleFilterChange("all")}
//           >
//             All
//           </Button>
//           <Button
//             variant={filter === "photo" ? "default" : "outline"}
//             onClick={() => handleFilterChange("photo")}
//           >
//             Photos
//           </Button>
//           <Button
//             variant={filter === "video" ? "default" : "outline"}
//             onClick={() => handleFilterChange("video")}
//           >
//             Videos
//           </Button>
//         </div>

//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//           {currentItems.map((item, idx) => (
//             <motion.div
//               key={item.id}
//               className="bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden cursor-pointer relative"
//               initial={{ opacity: 0, y: 30 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.4, delay: idx * 0.05 }}
//               onClick={() => setLightboxIndex(idx)}
//             >
//               {item.type === "photo" ? (
//                 <Image
//                   src={item.thumbnail}
//                   alt={item.title}
//                   width={400}
//                   height={250}
//                   className="w-full h-48 object-cover"
//                 />
//               ) : (
//                 <div className="relative">
//                   <video
//                     src={item.src}
//                     poster={item.thumbnail}
//                     className="w-full h-48 object-cover"
//                   />
//                   <div className="absolute inset-0 flex items-center justify-center bg-black/30">
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       className="w-12 h-12 text-white opacity-90"
//                       fill="none"
//                       viewBox="0 0 24 24"
//                       stroke="currentColor"
//                       strokeWidth="2"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         d="M14.752 11.168l-5.197-3.029A1 1 0 008 9.03v5.94a1 1 0 001.555.832l5.197-3.03a1 1 0 000-1.664z"
//                       />
//                     </svg>
//                   </div>
//                 </div>
//               )}
//               <div className="p-4">
//                 <h3 className="font-semibold text-gray-800">{item.title}</h3>
//                 <p className="text-sm text-gray-500">{item.date}</p>
//               </div>
//             </motion.div>
//           ))}
//         </div>

//         {totalPages > 1 && (
//           <div className="flex justify-center items-center space-x-4 mt-10">
//             <Button
//               variant="outline"
//               size="sm"
//               onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
//               disabled={currentPage === 1}
//             >
//               Previous
//             </Button>
//             <span className="text-gray-700">
//               Page {currentPage} of {totalPages}
//             </span>
//             <Button
//               variant="outline"
//               size="sm"
//               onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
//               disabled={currentPage === totalPages}
//             >
//               Next
//             </Button>
//           </div>
//         )}

//         <Lightbox
//           open={lightboxIndex >= 0}
//           close={() => setLightboxIndex(-1)}
//           index={lightboxIndex}
//           slides={lightboxSlides}
//           plugins={[Fullscreen, Zoom, Video]}
//           video={{ autoPlay: false }}
//         />
//       </div>
//     </section>
//   );
// }

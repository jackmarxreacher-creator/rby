"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

// Plugins
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Zoom from "yet-another-react-lightbox/plugins/zoom";

type FilterType = "all" | "photo" | "video";

interface GalleryItem {
  id: string;
  type: "photo" | "video";
  title: string;
  thumbnail: string;
  src: string;
  date: string;
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

  /* ----------------------------------------------------------
     CLICK  –  photo → light-box ,  video → new tab
     ---------------------------------------------------------- */
  const handleItemClick = (item: GalleryItem, idx: number) => {
    if (item.type === "video") {
      window.open(item.src, "_blank", "noopener,noreferrer");
    } else {
      setLightboxIndex(idx);
    }
  };

  /* ----------------------------------------------------------
     LIGHT-BOX  –  photos only
     ---------------------------------------------------------- */
  const lightboxSlides = currentItems
    .filter((i) => i.type === "photo")
    .map((item) => ({ src: item.src, title: item.title, description: item.date }));

  const photoOnlyIndexes = currentItems
    .map((item, idx) => (item.type === "photo" ? idx : -1))
    .filter((i) => i !== -1);

  return (
    <section className="py-16 px-4 md:px-8 bg-[#fcfbf8]">
      <div className="max-w-6xl mx-auto">
        {/* Title */}
        {/* <h2 className="text-3xl font-bold text-center mb-8 text-[#be965b]">
          Our Gallery
        </h2> */}

        {/* Filter Buttons */}
        <div className="flex justify-center space-x-4 mb-10">
          <Button
            variant={filter === "all" ? "default" : "outline"}
            onClick={() => handleFilterChange("all")}
          >
            All
          </Button>
          <Button
            variant={filter === "photo" ? "default" : "outline"}
            onClick={() => handleFilterChange("photo")}
          >
            Photos
          </Button>
          <Button
            variant={filter === "video" ? "default" : "outline"}
            onClick={() => handleFilterChange("video")}
          >
            Videos
          </Button>
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
              onClick={() => handleItemClick(item, idx)}
            >
              {item.type === "photo" ? (
                <div className="relative w-full h-48">
                  <Image src={item.thumbnail} alt={item.title} fill className="object-cover" />
                </div>
              ) : (
                <div className="relative">
                  <video
                    src={item.src}
                    poster={item.thumbnail}
                    className="w-full h-48 object-cover"
                  />
                  {/* Play overlay */}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-12 h-12 text-white opacity-90"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M14.752 11.168l-5.197-3.029A1 1 0 008 9.03v5.94a1 1 0 001.555.832l5.197-3.03a1 1 0 000-1.664z"
                      />
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
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            <span className="text-gray-700">
              Page {currentPage} of {totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </div>
        )}

        {/* Lightbox Viewer – PHOTOS ONLY */}
        {lightboxIndex >= 0 && (
          <Lightbox
            open={lightboxIndex >= 0}
            close={() => setLightboxIndex(-1)}
            index={lightboxIndex}
            slides={lightboxSlides}
            plugins={[Fullscreen, Zoom]}
          />
        )}
      </div>
    </section>
  );
}




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

//   /* ----------------------------------------------------------
//      1.  Build slides – use embed URL for YouTube videos
//      ---------------------------------------------------------- */
//   const lightboxSlides = currentItems.map((item) =>
//     item.type === "photo"
//       ? { src: item.src, title: item.title, description: item.date }
//       : {
//           type: "youtube", // NOT "video"
//           src: item.src, // expects embed URL  e.g. https://www.youtube.com/embed/XYZ
//           title: item.title,
//           description: item.date,
//         }
//   );

//   return (
//     <section className="py-16 px-4 md:px-8 bg-[#fcfbf8]">
//       <div className="max-w-6xl mx-auto">
//         {/* Title */}
//         <h2 className="text-3xl font-bold text-center mb-8 text-[#be965b]">
//           Our Gallery
//         </h2>

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
//                   />
//                   {/* Play overlay */}
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
//             plugins={[Fullscreen, Zoom]}
//             render={{ slide: ({ slide, rect }) => {
//               if (slide.type === "youtube") {
//                 return (
//                   <iframe
//                     src={slide.src}
//                     title={slide.title}
//                     className="yarl__slide_image"
//                     style={{ width: rect.width, height: rect.height }}
//                     frameBorder="0"
//                     allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//                     allowFullScreen
//                     referrerPolicy="no-referrer"
//                   />
//                 );
//               }
//               return null; // default photo render
//             }}}
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
//           sources: [{ src: item.src, type: "video/mp4" }],
//           poster: item.thumbnail,
//           title: item.title,
//           description: item.date,
//         }
//   );

//   return (
//     <section className="py-16 px-4 md:px-8 bg-[#fcfbf8]">
//       <div className="max-w-6xl mx-auto">
//         {/* Title */}
//         <h2 className="text-3xl font-bold text-center mb-8 text-[#be965b]">
//           Our Gallery
//         </h2>

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
//                   />
//                   {/* Play overlay */}
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
//           />
//         )}
//       </div>
//     </section>
//   );
// }







// "use client";

// import { useState } from "react";
// import { galleryItems } from "@/data/gallery";
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

// export default function GalleryGrid() {
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
//   const currentItems = filteredItems.slice(
//     startIndex,
//     startIndex + itemsPerPage
//   );

//   const handleFilterChange = (type: FilterType) => {
//     setFilter(type);
//     setCurrentPage(1);
//   };

//   // 🔹 Map items into Lightbox format
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
//         {/* Title */}
//         <h2 className="text-3xl font-bold text-center mb-8 text-[#be965b]">
//           Our Gallery
//         </h2>

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
//                   />
//                   {/* Play overlay */}
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
//               onClick={() =>
//                 setCurrentPage((prev) => Math.min(prev + 1, totalPages))
//               }
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
//           />
//         )}
//       </div>
//     </section>
//   );
// }





// "use client";

// import { useState, useEffect } from "react";
// import { useSwipeable } from "react-swipeable";
// import { galleryItems } from "@/data/gallery";
// import Image from "next/image";
// import { Button } from "@/components/ui/button";
// import { motion } from "framer-motion";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";
// import {
//   X,
//   Maximize2,
//   Minimize2,
//   RotateCcw,
// } from "lucide-react";
// import {
//   MdChevronLeft,
//   MdChevronRight,
// } from "react-icons/md";
// import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
// import {
//   Tooltip,
//   TooltipContent,
//   TooltipProvider,
//   TooltipTrigger,
// } from "@/components/ui/tooltip";

// type FilterType = "all" | "photo" | "video";

// export default function GalleryGrid() {
//   const [currentPage, setCurrentPage] = useState(1);
//   const [filter, setFilter] = useState<FilterType>("all");
//   const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
//   const [fullscreen, setFullscreen] = useState(false);
//   const [zoomKey, setZoomKey] = useState(0);

//   const itemsPerPage = 12;

//   const filteredItems =
//     filter === "all"
//       ? galleryItems
//       : galleryItems.filter((item) => item.type === filter);

//   const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
//   const startIndex = (currentPage - 1) * itemsPerPage;
//   const currentItems = filteredItems.slice(
//     startIndex,
//     startIndex + itemsPerPage
//   );

//   const handleFilterChange = (type: FilterType) => {
//     setFilter(type);
//     setCurrentPage(1);
//   };

//   const handlePrev = () => {
//     if (selectedIndex !== null) {
//       setSelectedIndex((prev) =>
//         prev! > 0 ? prev! - 1 : currentItems.length - 1
//       );
//     }
//   };

//   const handleNext = () => {
//     if (selectedIndex !== null) {
//       setSelectedIndex((prev) =>
//         prev! < currentItems.length - 1 ? prev! + 1 : 0
//       );
//     }
//   };

//   const handleResetZoom = () => {
//     setZoomKey((prev) => prev + 1);
//   };

//   const selectedItem =
//     selectedIndex !== null ? currentItems[selectedIndex] : null;

//   // 🔹 Keyboard navigation
//   useEffect(() => {
//     const handleKeyDown = (e: KeyboardEvent) => {
//       if (selectedIndex === null) return;

//       switch (e.key) {
//         case "Escape":
//           setSelectedIndex(null);
//           break;
//         case "ArrowLeft":
//           handlePrev();
//           break;
//         case "ArrowRight":
//           handleNext();
//           break;
//         case "f":
//         case "F":
//           setFullscreen((prev) => !prev);
//           break;
//       }
//     };

//     window.addEventListener("keydown", handleKeyDown);
//     return () => window.removeEventListener("keydown", handleKeyDown);
//   }, [selectedIndex]);

//   // 🔹 Swipe navigation (mobile)
//   const swipeHandlers = useSwipeable({
//     onSwipedLeft: () => handleNext(),
//     onSwipedRight: () => handlePrev(),
//     preventScrollOnSwipe: true,
//     trackMouse: true,
//   });

//   return (
//     <section className="py-16 px-4 md:px-8 bg-[#fcfbf8]">
//       <div className="max-w-6xl mx-auto">
//         {/* Title */}
//         <h2 className="text-3xl font-bold text-center mb-8 text-[#be965b]">
//           Our Gallery
//         </h2>

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
//               onClick={() => {
//                 setSelectedIndex(idx);
//                 setFullscreen(false);
//               }}
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
//                   {/* 🔹 Play overlay */}
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
//               onClick={() =>
//                 setCurrentPage((prev) => Math.min(prev + 1, totalPages))
//               }
//               disabled={currentPage === totalPages}
//             >
//               Next
//             </Button>
//           </div>
//         )}

//         {/* Lightbox Modal */}
//         <Dialog
//           open={selectedIndex !== null}
//           onOpenChange={() => setSelectedIndex(null)}
//         >
//           <DialogContent
//             className={`p-0 bg-black ${
//               fullscreen
//                 ? "fixed inset-0 w-screen h-screen max-w-none max-h-none rounded-none"
//                 : "max-w-3xl max-h-[80vh]"
//             }`}
//             style={
//               fullscreen
//                 ? {
//                     top: 0,
//                     left: 0,
//                     transform: "none", // remove shadcn centering
//                     margin: 0,
//                   }
//                 : {}
//             }
//           >
//             {selectedItem && (
//               <div
//                 {...swipeHandlers}
//                 className="relative flex flex-col h-full bg-black"
//               >
//                 {/* Toolbar */}
//                 <div className="absolute top-0 left-0 w-full flex justify-between items-center bg-black/70 text-white p-2 z-50">
//                   <TooltipProvider>
//                     <div className="flex space-x-2">
//                       <Tooltip>
//                         <TooltipTrigger asChild>
//                           <Button
//                             variant="ghost"
//                             size="icon"
//                             onClick={() => setSelectedIndex(null)}
//                             className="text-white hover:bg-white/20"
//                           >
//                             <X className="h-5 w-5" />
//                           </Button>
//                         </TooltipTrigger>
//                         <TooltipContent className="bg-white text-black shadow-lg rounded-md px-2 py-1 text-sm">
//                           Close
//                         </TooltipContent>
//                       </Tooltip>

//                       <Tooltip>
//                         <TooltipTrigger asChild>
//                           <Button
//                             variant="ghost"
//                             size="icon"
//                             onClick={handlePrev}
//                             className="text-white hover:bg-white/20"
//                           >
//                             <MdChevronLeft className="h-5 w-5" />
//                           </Button>
//                         </TooltipTrigger>
//                         <TooltipContent className="bg-white text-black shadow-lg rounded-md px-2 py-1 text-sm">
//                           Previous
//                         </TooltipContent>
//                       </Tooltip>

//                       <Tooltip>
//                         <TooltipTrigger asChild>
//                           <Button
//                             variant="ghost"
//                             size="icon"
//                             onClick={handleNext}
//                             className="text-white hover:bg-white/20"
//                           >
//                             <MdChevronRight className="h-5 w-5" />
//                           </Button>
//                         </TooltipTrigger>
//                         <TooltipContent className="bg-white text-black shadow-lg rounded-md px-2 py-1 text-sm">
//                           Next
//                         </TooltipContent>
//                       </Tooltip>

//                       <Tooltip>
//                         <TooltipTrigger asChild>
//                           <Button
//                             variant="ghost"
//                             size="icon"
//                             onClick={handleResetZoom}
//                             className="text-white hover:bg-white/20"
//                           >
//                             <RotateCcw className="h-5 w-5" />
//                           </Button>
//                         </TooltipTrigger>
//                         <TooltipContent className="bg-white text-black shadow-lg rounded-md px-2 py-1 text-sm">
//                           Reset Zoom
//                         </TooltipContent>
//                       </Tooltip>

//                       <Tooltip>
//                         <TooltipTrigger asChild>
//                           <Button
//                             variant="ghost"
//                             size="icon"
//                             onClick={() => setFullscreen((prev) => !prev)}
//                             className="text-white hover:bg-white/20"
//                           >
//                             {fullscreen ? (
//                               <Minimize2 className="h-5 w-5" />
//                             ) : (
//                               <Maximize2 className="h-5 w-5" />
//                             )}
//                           </Button>
//                         </TooltipTrigger>
//                         <TooltipContent className="bg-white text-black shadow-lg rounded-md px-2 py-1 text-sm">
//                           {fullscreen ? "Exit Fullscreen" : "Fullscreen"}
//                         </TooltipContent>
//                       </Tooltip>
//                     </div>
//                   </TooltipProvider>
//                 </div>

//                 {/* Media */}
//                 <div className="flex-1 flex justify-center items-center">
//                   {selectedItem.type === "photo" ? (
//                     <TransformWrapper key={zoomKey}>
//                       <TransformComponent>
//                         <Image
//                           src={selectedItem.src}
//                           alt={selectedItem.title}
//                           width={1200}
//                           height={800}
//                           className="max-h-full object-contain"
//                         />
//                       </TransformComponent>
//                     </TransformWrapper>
//                   ) : (
//                     <video
//                       src={selectedItem.src}
//                       controls
//                       autoPlay
//                       className="max-h-full max-w-full"
//                     />
//                   )}
//                 </div>

//                 {/* Caption */}
//                 <div className="p-4 text-white text-center">
//                   <DialogHeader>
//                     <DialogTitle>{selectedItem.title}</DialogTitle>
//                   </DialogHeader>
//                   <p className="text-sm">{selectedItem.date}</p>
//                 </div>
//               </div>
//             )}
//           </DialogContent>
//         </Dialog>
//       </div>
//     </section>
//   );
// }




// "use client";

// import { useState, useEffect } from "react";
// import { useSwipeable } from "react-swipeable";
// import { galleryItems } from "@/data/gallery";
// import Image from "next/image";
// import { Button } from "@/components/ui/button";
// import { motion } from "framer-motion";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";
// import {
//   X,
//   Maximize2,
//   Minimize2,
//   RotateCcw,
// } from "lucide-react";
// import {
//   MdChevronLeft,
//   MdChevronRight,
// } from "react-icons/md";
// import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
// import {
//   Tooltip,
//   TooltipContent,
//   TooltipProvider,
//   TooltipTrigger,
// } from "@/components/ui/tooltip";

// type FilterType = "all" | "photo" | "video";

// export default function GalleryGrid() {
//   const [currentPage, setCurrentPage] = useState(1);
//   const [filter, setFilter] = useState<FilterType>("all");
//   const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
//   const [fullscreen, setFullscreen] = useState(false);
//   const [zoomKey, setZoomKey] = useState(0);

//   const itemsPerPage = 12;

//   const filteredItems =
//     filter === "all"
//       ? galleryItems
//       : galleryItems.filter((item) => item.type === filter);

//   const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
//   const startIndex = (currentPage - 1) * itemsPerPage;
//   const currentItems = filteredItems.slice(
//     startIndex,
//     startIndex + itemsPerPage
//   );

//   const handleFilterChange = (type: FilterType) => {
//     setFilter(type);
//     setCurrentPage(1);
//   };

//   const handlePrev = () => {
//     if (selectedIndex !== null) {
//       setSelectedIndex((prev) =>
//         prev! > 0 ? prev! - 1 : currentItems.length - 1
//       );
//     }
//   };

//   const handleNext = () => {
//     if (selectedIndex !== null) {
//       setSelectedIndex((prev) =>
//         prev! < currentItems.length - 1 ? prev! + 1 : 0
//       );
//     }
//   };

//   const handleResetZoom = () => {
//     setZoomKey((prev) => prev + 1);
//   };

//   const selectedItem =
//     selectedIndex !== null ? currentItems[selectedIndex] : null;

//   // 🔹 Keyboard navigation
//   useEffect(() => {
//     const handleKeyDown = (e: KeyboardEvent) => {
//       if (selectedIndex === null) return;

//       switch (e.key) {
//         case "Escape":
//           setSelectedIndex(null);
//           break;
//         case "ArrowLeft":
//           handlePrev();
//           break;
//         case "ArrowRight":
//           handleNext();
//           break;
//         case "f":
//         case "F":
//           setFullscreen((prev) => !prev);
//           break;
//       }
//     };

//     window.addEventListener("keydown", handleKeyDown);
//     return () => window.removeEventListener("keydown", handleKeyDown);
//   }, [selectedIndex]);

//   // 🔹 Swipe navigation (mobile)
//   const swipeHandlers = useSwipeable({
//     onSwipedLeft: () => handleNext(),
//     onSwipedRight: () => handlePrev(),
//     preventScrollOnSwipe: true,
//     trackMouse: true,
//   });

//   return (
//     <section className="py-16 px-4 md:px-8 bg-[#fcfbf8]">
//       <div className="max-w-6xl mx-auto">
//         {/* Title */}
//         <h2 className="text-3xl font-bold text-center mb-8 text-[#be965b]">
//           Our Gallery
//         </h2>

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
//               onClick={() => {
//                 setSelectedIndex(idx);
//                 setFullscreen(false);
//               }}
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
//                   {/* 🔹 Play overlay */}
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
//               onClick={() =>
//                 setCurrentPage((prev) => Math.min(prev + 1, totalPages))
//               }
//               disabled={currentPage === totalPages}
//             >
//               Next
//             </Button>
//           </div>
//         )}

//         {/* Lightbox Modal */}
//         <Dialog
//           open={selectedIndex !== null}
//           onOpenChange={() => setSelectedIndex(null)}
//         >
//           <DialogContent
//             className={`p-0 bg-black ${
//               fullscreen
//                 ? "fixed inset-0 w-screen h-screen max-w-none max-h-none rounded-none"
//                 : "max-w-3xl max-h-[80vh]"
//             }`}
//             style={
//               fullscreen
//                 ? {
//                     top: 0,
//                     left: 0,
//                     transform: "none", // remove shadcn centering
//                     margin: 0,
//                   }
//                 : {}
//             }
//           >
//             {selectedItem && (
//               <div
//                 {...swipeHandlers}
//                 className="relative flex flex-col h-full bg-black"
//               >
//                 {/* Toolbar */}
//                 <div className="absolute top-0 left-0 w-full flex justify-between items-center bg-black/70 text-white p-2 z-50">
//                   <TooltipProvider>
//                     <div className="flex space-x-2">
//                       <Tooltip>
//                         <TooltipTrigger asChild>
//                           <Button
//                             variant="ghost"
//                             size="icon"
//                             onClick={() => setSelectedIndex(null)}
//                             className="text-white hover:bg-white/20"
//                           >
//                             <X className="h-5 w-5" />
//                           </Button>
//                         </TooltipTrigger>
//                         <TooltipContent className="bg-white text-black shadow-lg rounded-md px-2 py-1 text-sm">
//                           Close
//                         </TooltipContent>
//                       </Tooltip>

//                       <Tooltip>
//                         <TooltipTrigger asChild>
//                           <Button
//                             variant="ghost"
//                             size="icon"
//                             onClick={handlePrev}
//                             className="text-white hover:bg-white/20"
//                           >
//                             <MdChevronLeft className="h-5 w-5" />
//                           </Button>
//                         </TooltipTrigger>
//                         <TooltipContent className="bg-white text-black shadow-lg rounded-md px-2 py-1 text-sm">
//                           Previous
//                         </TooltipContent>
//                       </Tooltip>

//                       <Tooltip>
//                         <TooltipTrigger asChild>
//                           <Button
//                             variant="ghost"
//                             size="icon"
//                             onClick={handleNext}
//                             className="text-white hover:bg-white/20"
//                           >
//                             <MdChevronRight className="h-5 w-5" />
//                           </Button>
//                         </TooltipTrigger>
//                         <TooltipContent className="bg-white text-black shadow-lg rounded-md px-2 py-1 text-sm">
//                           Next
//                         </TooltipContent>
//                       </Tooltip>

//                       <Tooltip>
//                         <TooltipTrigger asChild>
//                           <Button
//                             variant="ghost"
//                             size="icon"
//                             onClick={handleResetZoom}
//                             className="text-white hover:bg-white/20"
//                           >
//                             <RotateCcw className="h-5 w-5" />
//                           </Button>
//                         </TooltipTrigger>
//                         <TooltipContent className="bg-white text-black shadow-lg rounded-md px-2 py-1 text-sm">
//                           Reset Zoom
//                         </TooltipContent>
//                       </Tooltip>

//                       <Tooltip>
//                         <TooltipTrigger asChild>
//                           <Button
//                             variant="ghost"
//                             size="icon"
//                             onClick={() => setFullscreen((prev) => !prev)}
//                             className="text-white hover:bg-white/20"
//                           >
//                             {fullscreen ? (
//                               <Minimize2 className="h-5 w-5" />
//                             ) : (
//                               <Maximize2 className="h-5 w-5" />
//                             )}
//                           </Button>
//                         </TooltipTrigger>
//                         <TooltipContent className="bg-white text-black shadow-lg rounded-md px-2 py-1 text-sm">
//                           {fullscreen ? "Exit Fullscreen" : "Fullscreen"}
//                         </TooltipContent>
//                       </Tooltip>
//                     </div>
//                   </TooltipProvider>
//                 </div>

//                 {/* Media */}
//                 <div className="flex-1 flex justify-center items-center">
//                   {selectedItem.type === "photo" ? (
//                     <TransformWrapper key={zoomKey}>
//                       <TransformComponent>
//                         <Image
//                           src={selectedItem.src}
//                           alt={selectedItem.title}
//                           width={1200}
//                           height={800}
//                           className="max-h-full object-contain"
//                         />
//                       </TransformComponent>
//                     </TransformWrapper>
//                   ) : (
//                     <video
//                       src={selectedItem.src}
//                       controls
//                       autoPlay
//                       className="max-h-full max-w-full"
//                     />
//                   )}
//                 </div>

//                 {/* Caption */}
//                 <div className="p-4 text-white text-center">
//                   <DialogHeader>
//                     <DialogTitle>{selectedItem.title}</DialogTitle>
//                   </DialogHeader>
//                   <p className="text-sm">{selectedItem.date}</p>
//                 </div>
//               </div>
//             )}
//           </DialogContent>
//         </Dialog>
//       </div>
//     </section>
//   );
// }




// "use client";

// import { useState, useEffect } from "react";
// import { useSwipeable } from "react-swipeable";
// import { galleryItems } from "@/data/gallery";
// import Image from "next/image";
// import { Button } from "@/components/ui/button";
// import { motion } from "framer-motion";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";
// import {
//   X,
//   Maximize2,
//   Minimize2,
//   RotateCcw,
// } from "lucide-react";
// import {
//   MdChevronLeft,
//   MdChevronRight,
// } from "react-icons/md";
// import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
// import {
//   Tooltip,
//   TooltipContent,
//   TooltipProvider,
//   TooltipTrigger,
// } from "@/components/ui/tooltip";

// type FilterType = "all" | "photo" | "video";

// export default function GalleryGrid() {
//   const [currentPage, setCurrentPage] = useState(1);
//   const [filter, setFilter] = useState<FilterType>("all");
//   const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
//   const [fullscreen, setFullscreen] = useState(false);
//   const [zoomKey, setZoomKey] = useState(0);

//   const itemsPerPage = 12;

//   const filteredItems =
//     filter === "all"
//       ? galleryItems
//       : galleryItems.filter((item) => item.type === filter);

//   const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
//   const startIndex = (currentPage - 1) * itemsPerPage;
//   const currentItems = filteredItems.slice(
//     startIndex,
//     startIndex + itemsPerPage
//   );

//   const handleFilterChange = (type: FilterType) => {
//     setFilter(type);
//     setCurrentPage(1);
//   };

//   const handlePrev = () => {
//     if (selectedIndex !== null) {
//       setSelectedIndex((prev) =>
//         prev! > 0 ? prev! - 1 : currentItems.length - 1
//       );
//     }
//   };

//   const handleNext = () => {
//     if (selectedIndex !== null) {
//       setSelectedIndex((prev) =>
//         prev! < currentItems.length - 1 ? prev! + 1 : 0
//       );
//     }
//   };

//   const handleResetZoom = () => {
//     setZoomKey((prev) => prev + 1);
//   };

//   const selectedItem =
//     selectedIndex !== null ? currentItems[selectedIndex] : null;

//   // 🔹 Keyboard navigation
//   useEffect(() => {
//     const handleKeyDown = (e: KeyboardEvent) => {
//       if (selectedIndex === null) return;

//       switch (e.key) {
//         case "Escape":
//           setSelectedIndex(null);
//           break;
//         case "ArrowLeft":
//           handlePrev();
//           break;
//         case "ArrowRight":
//           handleNext();
//           break;
//         case "f":
//         case "F":
//           setFullscreen((prev) => !prev);
//           break;
//       }
//     };

//     window.addEventListener("keydown", handleKeyDown);
//     return () => window.removeEventListener("keydown", handleKeyDown);
//   }, [selectedIndex]);

//   // 🔹 Swipe navigation (mobile)
//   const swipeHandlers = useSwipeable({
//     onSwipedLeft: () => handleNext(),
//     onSwipedRight: () => handlePrev(),
//     preventScrollOnSwipe: true,
//     trackMouse: true,
//   });

//   return (
//     <section className="py-16 px-4 md:px-8 bg-[#fcfbf8]">
//       <div className="max-w-6xl mx-auto">
//         {/* Title */}
//         <h2 className="text-3xl font-bold text-center mb-8 text-[#be965b]">
//           Our Gallery
//         </h2>

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
//               onClick={() => {
//                 setSelectedIndex(idx);
//                 setFullscreen(false);
//               }}
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
//                   {/* 🔹 Play overlay */}
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
//               onClick={() =>
//                 setCurrentPage((prev) => Math.min(prev + 1, totalPages))
//               }
//               disabled={currentPage === totalPages}
//             >
//               Next
//             </Button>
//           </div>
//         )}

//         {/* Lightbox Modal */}
//         <Dialog
//           open={selectedIndex !== null}
//           onOpenChange={() => setSelectedIndex(null)}
//         >
//           <DialogContent
//             className={`p-0 bg-black ${
//               fullscreen
//                 ? "fixed inset-0 w-screen h-screen max-w-none max-h-none rounded-none"
//                 : "max-w-3xl max-h-[80vh]"
//             }`}
//             style={
//               fullscreen
//                 ? {
//                     top: 0,
//                     left: 0,
//                     transform: "none", // remove shadcn centering
//                     margin: 0,
//                   }
//                 : {}
//             }
//           >
//             {selectedItem && (
//               <div
//                 {...swipeHandlers}
//                 className="relative flex flex-col h-full bg-black"
//               >
//                 {/* Toolbar */}
//                 <div className="absolute top-0 left-0 w-full flex justify-between items-center bg-black/70 text-white p-2 z-50">
//                   <TooltipProvider>
//                     <div className="flex space-x-2">
//                       <Tooltip>
//                         <TooltipTrigger asChild>
//                           <Button
//                             variant="ghost"
//                             size="icon"
//                             onClick={() => setSelectedIndex(null)}
//                             className="text-white hover:bg-white/20"
//                           >
//                             <X className="h-5 w-5" />
//                           </Button>
//                         </TooltipTrigger>
//                         <TooltipContent className="bg-white text-black shadow-lg rounded-md px-2 py-1 text-sm">
//                           Close
//                         </TooltipContent>
//                       </Tooltip>

//                       <Tooltip>
//                         <TooltipTrigger asChild>
//                           <Button
//                             variant="ghost"
//                             size="icon"
//                             onClick={handlePrev}
//                             className="text-white hover:bg-white/20"
//                           >
//                             <MdChevronLeft className="h-5 w-5" />
//                           </Button>
//                         </TooltipTrigger>
//                         <TooltipContent className="bg-white text-black shadow-lg rounded-md px-2 py-1 text-sm">
//                           Previous
//                         </TooltipContent>
//                       </Tooltip>

//                       <Tooltip>
//                         <TooltipTrigger asChild>
//                           <Button
//                             variant="ghost"
//                             size="icon"
//                             onClick={handleNext}
//                             className="text-white hover:bg-white/20"
//                           >
//                             <MdChevronRight className="h-5 w-5" />
//                           </Button>
//                         </TooltipTrigger>
//                         <TooltipContent className="bg-white text-black shadow-lg rounded-md px-2 py-1 text-sm">
//                           Next
//                         </TooltipContent>
//                       </Tooltip>

//                       <Tooltip>
//                         <TooltipTrigger asChild>
//                           <Button
//                             variant="ghost"
//                             size="icon"
//                             onClick={handleResetZoom}
//                             className="text-white hover:bg-white/20"
//                           >
//                             <RotateCcw className="h-5 w-5" />
//                           </Button>
//                         </TooltipTrigger>
//                         <TooltipContent className="bg-white text-black shadow-lg rounded-md px-2 py-1 text-sm">
//                           Reset Zoom
//                         </TooltipContent>
//                       </Tooltip>

//                       <Tooltip>
//                         <TooltipTrigger asChild>
//                           <Button
//                             variant="ghost"
//                             size="icon"
//                             onClick={() => setFullscreen((prev) => !prev)}
//                             className="text-white hover:bg-white/20"
//                           >
//                             {fullscreen ? (
//                               <Minimize2 className="h-5 w-5" />
//                             ) : (
//                               <Maximize2 className="h-5 w-5" />
//                             )}
//                           </Button>
//                         </TooltipTrigger>
//                         <TooltipContent className="bg-white text-black shadow-lg rounded-md px-2 py-1 text-sm">
//                           {fullscreen ? "Exit Fullscreen" : "Fullscreen"}
//                         </TooltipContent>
//                       </Tooltip>
//                     </div>
//                   </TooltipProvider>
//                 </div>

//                 {/* Media */}
//                 <div className="flex-1 flex justify-center items-center">
//                   {selectedItem.type === "photo" ? (
//                     <TransformWrapper key={zoomKey}>
//                       <TransformComponent>
//                         <Image
//                           src={selectedItem.src}
//                           alt={selectedItem.title}
//                           width={1200}
//                           height={800}
//                           className="max-h-full object-contain"
//                         />
//                       </TransformComponent>
//                     </TransformWrapper>
//                   ) : (
//                     <video
//                       src={selectedItem.src}
//                       controls
//                       autoPlay
//                       className="max-h-full max-w-full"
//                     />
//                   )}
//                 </div>

//                 {/* Caption */}
//                 <div className="p-4 text-white text-center">
//                   <DialogHeader>
//                     <DialogTitle>{selectedItem.title}</DialogTitle>
//                   </DialogHeader>
//                   <p className="text-sm">{selectedItem.date}</p>
//                 </div>
//               </div>
//             )}
//           </DialogContent>
//         </Dialog>
//       </div>
//     </section>
//   );
// }





// "use client";

// import { useState, useEffect } from "react";
// import { useSwipeable } from "react-swipeable";
// import { galleryItems } from "@/data/gallery";
// import Image from "next/image";
// import { Button } from "@/components/ui/button";
// import { motion } from "framer-motion";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";
// import { X, Maximize2, Minimize2, RotateCcw } from "lucide-react";
// import { MdChevronLeft, MdChevronRight } from "react-icons/md";
// import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
// import {
//   Tooltip,
//   TooltipContent,
//   TooltipProvider,
//   TooltipTrigger,
// } from "@/components/ui/tooltip";

// type FilterType = "all" | "photo" | "video";

// export default function GalleryGrid() {
//   const [currentPage, setCurrentPage] = useState(1);
//   const [filter, setFilter] = useState<FilterType>("all");
//   const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
//   const [fullscreen, setFullscreen] = useState(false);
//   const [zoomKey, setZoomKey] = useState(0);

//   const itemsPerPage = 12;

//   const filteredItems =
//     filter === "all"
//       ? galleryItems
//       : galleryItems.filter((item) => item.type === filter);

//   const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
//   const startIndex = (currentPage - 1) * itemsPerPage;
//   const currentItems = filteredItems.slice(
//     startIndex,
//     startIndex + itemsPerPage
//   );

//   const handleFilterChange = (type: FilterType) => {
//     setFilter(type);
//     setCurrentPage(1);
//   };

//   const handlePrev = () => {
//     if (selectedIndex !== null) {
//       setSelectedIndex((prev) =>
//         prev! > 0 ? prev! - 1 : currentItems.length - 1
//       );
//     }
//   };

//   const handleNext = () => {
//     if (selectedIndex !== null) {
//       setSelectedIndex((prev) =>
//         prev! < currentItems.length - 1 ? prev! + 1 : 0
//       );
//     }
//   };

//   const handleResetZoom = () => {
//     setZoomKey((prev) => prev + 1);
//   };

//   const selectedItem =
//     selectedIndex !== null ? currentItems[selectedIndex] : null;

//   // 🔹 Keyboard navigation
//   useEffect(() => {
//     const handleKeyDown = (e: KeyboardEvent) => {
//       if (selectedIndex === null) return;

//       switch (e.key) {
//         case "Escape":
//           setSelectedIndex(null);
//           break;
//         case "ArrowLeft":
//           handlePrev();
//           break;
//         case "ArrowRight":
//           handleNext();
//           break;
//         case "f":
//         case "F":
//           setFullscreen((prev) => !prev);
//           break;
//       }
//     };

//     window.addEventListener("keydown", handleKeyDown);
//     return () => window.removeEventListener("keydown", handleKeyDown);
//   }, [selectedIndex]);

//   // 🔹 Swipe navigation (mobile)
//   const swipeHandlers = useSwipeable({
//     onSwipedLeft: () => handleNext(),
//     onSwipedRight: () => handlePrev(),
//     preventScrollOnSwipe: true,
//     trackMouse: true,
//   });

//   return (
//     <section className="py-16 px-4 md:px-8 bg-[#fcfbf8]">
//       <div className="max-w-6xl mx-auto">
//         {/* Title */}
//         <h2 className="text-3xl font-bold text-center mb-8 text-[#be965b]">
//           Our Gallery
//         </h2>

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
//               onClick={() => {
//                 setSelectedIndex(idx);
//                 setFullscreen(false);
//               }}
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
//                   {/* 🔹 Play overlay */}
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
//               onClick={() =>
//                 setCurrentPage((prev) => Math.min(prev + 1, totalPages))
//               }
//               disabled={currentPage === totalPages}
//             >
//               Next
//             </Button>
//           </div>
//         )}

//         {/* Lightbox Modal */}
//         <Dialog
//           open={selectedIndex !== null}
//           onOpenChange={() => setSelectedIndex(null)}
//         >
//           <DialogContent
//             className={`p-0 ${
//               fullscreen
//                 ? "fixed inset-0 w-full h-full max-w-full max-h-full bg-black"
//                 : "max-w-3xl max-h-[80vh]"
//             }`}
//           >
//             {selectedItem && (
//               <div
//                 {...swipeHandlers}
//                 className="relative flex flex-col h-full bg-black"
//               >
//                 {/* Toolbar */}
//                 <div className="flex justify-between items-center bg-black/70 text-white p-2 z-50">
//                   <TooltipProvider>
//                     <div className="flex space-x-2">
//                       <Tooltip>
//                         <TooltipTrigger asChild>
//                           <Button
//                             variant="ghost"
//                             size="icon"
//                             onClick={() => setSelectedIndex(null)}
//                             className="text-white hover:bg-white/20"
//                           >
//                             <X className="h-5 w-5" />
//                           </Button>
//                         </TooltipTrigger>
//                         <TooltipContent className="bg-white text-black">
//                           Close
//                         </TooltipContent>
//                       </Tooltip>

//                       <Tooltip>
//                         <TooltipTrigger asChild>
//                           <Button
//                             variant="ghost"
//                             size="icon"
//                             onClick={handlePrev}
//                             className="text-white hover:bg-white/20"
//                           >
//                             <MdChevronLeft className="h-5 w-5" />
//                           </Button>
//                         </TooltipTrigger>
//                         <TooltipContent className="bg-white text-black">
//                           Previous
//                         </TooltipContent>
//                       </Tooltip>

//                       <Tooltip>
//                         <TooltipTrigger asChild>
//                           <Button
//                             variant="ghost"
//                             size="icon"
//                             onClick={handleNext}
//                             className="text-white hover:bg-white/20"
//                           >
//                             <MdChevronRight className="h-5 w-5" />
//                           </Button>
//                         </TooltipTrigger>
//                         <TooltipContent className="bg-white text-black">
//                           Next
//                         </TooltipContent>
//                       </Tooltip>

//                       <Tooltip>
//                         <TooltipTrigger asChild>
//                           <Button
//                             variant="ghost"
//                             size="icon"
//                             onClick={handleResetZoom}
//                             className="text-white hover:bg-white/20"
//                           >
//                             <RotateCcw className="h-5 w-5" />
//                           </Button>
//                         </TooltipTrigger>
//                         <TooltipContent className="bg-white text-black">
//                           Reset Zoom
//                         </TooltipContent>
//                       </Tooltip>

//                       <Tooltip>
//                         <TooltipTrigger asChild>
//                           <Button
//                             variant="ghost"
//                             size="icon"
//                             onClick={() => setFullscreen((prev) => !prev)}
//                             className="text-white hover:bg-white/20"
//                           >
//                             {fullscreen ? (
//                               <Minimize2 className="h-5 w-5" />
//                             ) : (
//                               <Maximize2 className="h-5 w-5" />
//                             )}
//                           </Button>
//                         </TooltipTrigger>
//                         <TooltipContent className="bg-white text-black">
//                           {fullscreen ? "Exit Fullscreen" : "Fullscreen"}
//                         </TooltipContent>
//                       </Tooltip>
//                     </div>
//                   </TooltipProvider>
//                 </div>

//                 {/* Media */}
//                 <div
//                   className={`flex-1 flex justify-center items-center ${
//                     fullscreen ? "w-full h-full" : ""
//                   }`}
//                 >
//                   {selectedItem.type === "photo" ? (
//                     <TransformWrapper key={zoomKey}>
//                       <TransformComponent>
//                         <Image
//                           src={selectedItem.src}
//                           alt={selectedItem.title}
//                           width={1200}
//                           height={800}
//                           className="max-h-full object-contain"
//                         />
//                       </TransformComponent>
//                     </TransformWrapper>
//                   ) : (
//                     <video
//                       src={selectedItem.src}
//                       controls
//                       autoPlay
//                       className="max-h-full max-w-full"
//                     />
//                   )}
//                 </div>

//                 {/* Caption */}
//                 <div className="p-4 text-white text-center">
//                   <DialogHeader>
//                     <DialogTitle>{selectedItem.title}</DialogTitle>
//                   </DialogHeader>
//                   <p className="text-sm">{selectedItem.date}</p>
//                 </div>
//               </div>
//             )}
//           </DialogContent>
//         </Dialog>
//       </div>
//     </section>
//   );
// }





// "use client";

// import { useState, useEffect } from "react";
// import { useSwipeable } from "react-swipeable";
// import { galleryItems } from "@/data/gallery";
// import Image from "next/image";
// import { Button } from "@/components/ui/button";
// import { motion } from "framer-motion";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";
// import {
//   X,
//   Maximize2,
//   Minimize2,
//   RotateCcw,
// } from "lucide-react";
// import {
//   MdChevronLeft,
//   MdChevronRight,
// } from "react-icons/md";
// import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
// import {
//   Tooltip,
//   TooltipContent,
//   TooltipProvider,
//   TooltipTrigger,
// } from "@/components/ui/tooltip";

// type FilterType = "all" | "photo" | "video";

// export default function GalleryGrid() {
//   const [currentPage, setCurrentPage] = useState(1);
//   const [filter, setFilter] = useState<FilterType>("all");
//   const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
//   const [fullscreen, setFullscreen] = useState(false);
//   const [zoomKey, setZoomKey] = useState(0);

//   const itemsPerPage = 12;

//   const filteredItems =
//     filter === "all"
//       ? galleryItems
//       : galleryItems.filter((item) => item.type === filter);

//   const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
//   const startIndex = (currentPage - 1) * itemsPerPage;
//   const currentItems = filteredItems.slice(
//     startIndex,
//     startIndex + itemsPerPage
//   );

//   const handleFilterChange = (type: FilterType) => {
//     setFilter(type);
//     setCurrentPage(1);
//   };

//   const handlePrev = () => {
//     if (selectedIndex !== null) {
//       setSelectedIndex((prev) =>
//         prev! > 0 ? prev! - 1 : currentItems.length - 1
//       );
//     }
//   };

//   const handleNext = () => {
//     if (selectedIndex !== null) {
//       setSelectedIndex((prev) =>
//         prev! < currentItems.length - 1 ? prev! + 1 : 0
//       );
//     }
//   };

//   const handleResetZoom = () => {
//     setZoomKey((prev) => prev + 1);
//   };

//   const selectedItem =
//     selectedIndex !== null ? currentItems[selectedIndex] : null;

//   // 🔹 Keyboard navigation
//   useEffect(() => {
//     const handleKeyDown = (e: KeyboardEvent) => {
//       if (selectedIndex === null) return;

//       switch (e.key) {
//         case "Escape":
//           setSelectedIndex(null);
//           break;
//         case "ArrowLeft":
//           handlePrev();
//           break;
//         case "ArrowRight":
//           handleNext();
//           break;
//         case "f":
//         case "F":
//           setFullscreen((prev) => !prev);
//           break;
//       }
//     };

//     window.addEventListener("keydown", handleKeyDown);
//     return () => window.removeEventListener("keydown", handleKeyDown);
//   }, [selectedIndex]);

//   // 🔹 Swipe navigation (mobile)
//   const swipeHandlers = useSwipeable({
//     onSwipedLeft: () => handleNext(),
//     onSwipedRight: () => handlePrev(),
//     preventScrollOnSwipe: true,
//     trackMouse: true,
//   });

//   return (
//     <section className="py-16 px-4 md:px-8 bg-[#fcfbf8]">
//       <div className="max-w-6xl mx-auto">
//         {/* Title */}
//         <h2 className="text-3xl font-bold text-center mb-8 text-[#be965b]">
//           Our Gallery
//         </h2>

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
//               onClick={() => {
//                 setSelectedIndex(idx);
//                 setFullscreen(false);
//               }}
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
//                   {/* 🔹 Play overlay */}
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
//               onClick={() =>
//                 setCurrentPage((prev) => Math.min(prev + 1, totalPages))
//               }
//               disabled={currentPage === totalPages}
//             >
//               Next
//             </Button>
//           </div>
//         )}

//         {/* Lightbox Modal */}
//         <Dialog
//           open={selectedIndex !== null}
//           onOpenChange={() => setSelectedIndex(null)}
//         >
//           <DialogContent
//             className={`p-0 ${
//               fullscreen
//                 ? "fixed inset-0 w-full h-full max-w-full max-h-full"
//                 : "max-w-3xl max-h-[80vh]"
//             }`}
//           >
//             {selectedItem && (
//               <div
//                 {...swipeHandlers}
//                 className="relative flex flex-col h-full bg-black"
//               >
//                 {/* Toolbar */}
//                 <div className="flex justify-between items-center bg-black text-white p-2">
//                   <TooltipProvider>
//                     <div className="flex space-x-2">
//                       <Tooltip>
//                         <TooltipTrigger asChild>
//                           <Button
//                             variant="ghost"
//                             size="icon"
//                             onClick={() => setSelectedIndex(null)}
//                             className="text-white hover:bg-white/20"
//                           >
//                             <X className="h-5 w-5" />
//                           </Button>
//                         </TooltipTrigger>
//                         <TooltipContent className="bg-white text-black shadow-lg rounded-md px-2 py-1 text-sm">
//                           Close
//                         </TooltipContent>
//                       </Tooltip>

//                       <Tooltip>
//                         <TooltipTrigger asChild>
//                           <Button
//                             variant="ghost"
//                             size="icon"
//                             onClick={handlePrev}
//                             className="text-white hover:bg-white/20"
//                           >
//                             <MdChevronLeft className="h-5 w-5" />
//                           </Button>
//                         </TooltipTrigger>
//                         <TooltipContent className="bg-white text-black shadow-lg rounded-md px-2 py-1 text-sm">
//                           Previous
//                         </TooltipContent>
//                       </Tooltip>

//                       <Tooltip>
//                         <TooltipTrigger asChild>
//                           <Button
//                             variant="ghost"
//                             size="icon"
//                             onClick={handleNext}
//                             className="text-white hover:bg-white/20"
//                           >
//                             <MdChevronRight className="h-5 w-5" />
//                           </Button>
//                         </TooltipTrigger>
//                         <TooltipContent className="bg-white text-black shadow-lg rounded-md px-2 py-1 text-sm">
//                           Next
//                         </TooltipContent>
//                       </Tooltip>

//                       <Tooltip>
//                         <TooltipTrigger asChild>
//                           <Button
//                             variant="ghost"
//                             size="icon"
//                             onClick={handleResetZoom}
//                             className="text-white hover:bg-white/20"
//                           >
//                             <RotateCcw className="h-5 w-5" />
//                           </Button>
//                         </TooltipTrigger>
//                         <TooltipContent className="bg-white text-black shadow-lg rounded-md px-2 py-1 text-sm">
//                           Reset Zoom
//                         </TooltipContent>
//                       </Tooltip>

//                       <Tooltip>
//                         <TooltipTrigger asChild>
//                           <Button
//                             variant="ghost"
//                             size="icon"
//                             onClick={() => setFullscreen((prev) => !prev)}
//                             className="text-white hover:bg-white/20"
//                           >
//                             {fullscreen ? (
//                               <Minimize2 className="h-5 w-5" />
//                             ) : (
//                               <Maximize2 className="h-5 w-5" />
//                             )}
//                           </Button>
//                         </TooltipTrigger>
//                         <TooltipContent className="bg-white text-black shadow-lg rounded-md px-2 py-1 text-sm">
//                           {fullscreen ? "Exit Fullscreen" : "Fullscreen"}
//                         </TooltipContent>
//                       </Tooltip>
//                     </div>
//                   </TooltipProvider>
//                 </div>

//                 {/* Media */}
//                 <div className="flex-1 flex justify-center items-center">
//                   {selectedItem.type === "photo" ? (
//                     <TransformWrapper key={zoomKey}>
//                       <TransformComponent>
//                         <Image
//                           src={selectedItem.src}
//                           alt={selectedItem.title}
//                           width={1200}
//                           height={800}
//                           className="max-h-full object-contain"
//                         />
//                       </TransformComponent>
//                     </TransformWrapper>
//                   ) : (
//                     <video
//                       src={selectedItem.src}
//                       controls
//                       autoPlay
//                       className="max-h-full max-w-full"
//                     />
//                   )}
//                 </div>

//                 {/* Caption */}
//                 <div className="p-4 text-white text-center">
//                   <DialogHeader>
//                     <DialogTitle>{selectedItem.title}</DialogTitle>
//                   </DialogHeader>
//                   <p className="text-sm">{selectedItem.date}</p>
//                 </div>
//               </div>
//             )}
//           </DialogContent>
//         </Dialog>
//       </div>
//     </section>
//   );
// }





// "use client";

// import { useState, useEffect } from "react";
// import { useSwipeable } from "react-swipeable";
// import { galleryItems } from "@/data/gallery";
// import Image from "next/image";
// import { Button } from "@/components/ui/button";
// import { motion } from "framer-motion";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";
// import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
// import {
//   MdClose,
//   MdFullscreen,
//   MdFullscreenExit,
//   MdChevronLeft,
//   MdChevronRight,
// } from "react-icons/md";
// import { RxReset } from "react-icons/rx";
// import { PlayCircle } from "lucide-react";
// import {
//   Tooltip,
//   TooltipContent,
//   TooltipProvider,
//   TooltipTrigger,
// } from "@/components/ui/tooltip";

// type FilterType = "all" | "photo" | "video";

// export default function GalleryGrid() {
//   const [currentPage, setCurrentPage] = useState(1);
//   const [filter, setFilter] = useState<FilterType>("all");
//   const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
//   const [fullscreen, setFullscreen] = useState(false);

//   const itemsPerPage = 12;

//   const filteredItems =
//     filter === "all"
//       ? galleryItems
//       : galleryItems.filter((item) => item.type === filter);

//   const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
//   const startIndex = (currentPage - 1) * itemsPerPage;
//   const currentItems = filteredItems.slice(
//     startIndex,
//     startIndex + itemsPerPage
//   );

//   const handleFilterChange = (type: FilterType) => {
//     setFilter(type);
//     setCurrentPage(1);
//   };

//   const handlePrev = () => {
//     if (selectedIndex !== null) {
//       setSelectedIndex((prev) =>
//         prev! > 0 ? prev! - 1 : currentItems.length - 1
//       );
//     }
//   };

//   const handleNext = () => {
//     if (selectedIndex !== null) {
//       setSelectedIndex((prev) =>
//         prev! < currentItems.length - 1 ? prev! + 1 : 0
//       );
//     }
//   };

//   const selectedItem =
//     selectedIndex !== null ? currentItems[selectedIndex] : null;

//   // 🔹 Keyboard navigation
//   useEffect(() => {
//     const handleKeyDown = (e: KeyboardEvent) => {
//       if (selectedIndex === null) return;

//       switch (e.key) {
//         case "Escape":
//           setSelectedIndex(null);
//           break;
//         case "ArrowLeft":
//           handlePrev();
//           break;
//         case "ArrowRight":
//           handleNext();
//           break;
//         case "f":
//         case "F":
//           setFullscreen((prev) => !prev);
//           break;
//       }
//     };

//     window.addEventListener("keydown", handleKeyDown);
//     return () => window.removeEventListener("keydown", handleKeyDown);
//   }, [selectedIndex]);

//   // 🔹 Swipe navigation (mobile)
//   const swipeHandlers = useSwipeable({
//     onSwipedLeft: () => handleNext(),
//     onSwipedRight: () => handlePrev(),
//     preventScrollOnSwipe: true,
//     trackMouse: true,
//   });

//   return (
//     <section className="py-16 px-4 md:px-8 bg-[#fcfbf8]">
//       <div className="max-w-6xl mx-auto">
//         {/* Title */}
//         <h2 className="text-3xl font-bold text-center mb-8 text-[#be965b]">
//           Our Gallery
//         </h2>

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
//               onClick={() => {
//                 setSelectedIndex(idx);
//                 setFullscreen(false);
//               }}
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
//                   {/* 🔹 Play overlay */}
//                   <div className="absolute inset-0 flex items-center justify-center bg-black/30">
//                     <PlayCircle className="w-12 h-12 text-white opacity-90" />
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
//               onClick={() =>
//                 setCurrentPage((prev) => Math.min(prev + 1, totalPages))
//               }
//               disabled={currentPage === totalPages}
//             >
//               Next
//             </Button>
//           </div>
//         )}

//         {/* Lightbox Modal */}
//         <Dialog
//           open={selectedIndex !== null}
//           onOpenChange={() => setSelectedIndex(null)}
//         >
//           <DialogContent
//             className={`p-0 ${
//               fullscreen
//                 ? "fixed inset-0 w-full h-full max-w-full max-h-full"
//                 : "max-w-3xl max-h-[80vh]"
//             }`}
//           >
//             {selectedItem && (
//               <div
//                 {...swipeHandlers}
//                 className="relative flex flex-col h-full bg-black"
//               >
//                 {/* Toolbar */}
//                 <div className="flex justify-between items-center bg-black text-white p-2">
//                   <TooltipProvider>
//                     <div className="flex space-x-2">
//                       {/* Close */}
//                       <Tooltip>
//                         <TooltipTrigger asChild>
//                           <Button
//                             variant="ghost"
//                             size="icon"
//                             onClick={() => setSelectedIndex(null)}
//                           >
//                             <MdClose className="h-5 w-5" />
//                           </Button>
//                         </TooltipTrigger>
//                         <TooltipContent>Close</TooltipContent>
//                       </Tooltip>

//                       {/* Prev */}
//                       <Tooltip>
//                         <TooltipTrigger asChild>
//                           <Button variant="ghost" size="icon" onClick={handlePrev}>
//                             <MdChevronLeft className="h-5 w-5" />
//                           </Button>
//                         </TooltipTrigger>
//                         <TooltipContent>Previous</TooltipContent>
//                       </Tooltip>

//                       {/* Next */}
//                       <Tooltip>
//                         <TooltipTrigger asChild>
//                           <Button variant="ghost" size="icon" onClick={handleNext}>
//                             <MdChevronRight className="h-5 w-5" />
//                           </Button>
//                         </TooltipTrigger>
//                         <TooltipContent>Next</TooltipContent>
//                       </Tooltip>

//                       {/* Reset Zoom */}
//                       <Tooltip>
//                         <TooltipTrigger asChild>
//                           <Button
//                             variant="ghost"
//                             size="icon"
//                             onClick={() => {
//                               const resetEvent = new Event("reset-transform");
//                               window.dispatchEvent(resetEvent);
//                             }}
//                           >
//                             <RxReset className="h-5 w-5" />
//                           </Button>
//                         </TooltipTrigger>
//                         <TooltipContent>Reset Zoom</TooltipContent>
//                       </Tooltip>

//                       {/* Fullscreen */}
//                       <Tooltip>
//                         <TooltipTrigger asChild>
//                           <Button
//                             variant="ghost"
//                             size="icon"
//                             onClick={() => setFullscreen((prev) => !prev)}
//                           >
//                             {fullscreen ? (
//                               <MdFullscreenExit className="h-5 w-5" />
//                             ) : (
//                               <MdFullscreen className="h-5 w-5" />
//                             )}
//                           </Button>
//                         </TooltipTrigger>
//                         <TooltipContent>
//                           {fullscreen ? "Exit Fullscreen" : "Fullscreen"}
//                         </TooltipContent>
//                       </Tooltip>
//                     </div>
//                   </TooltipProvider>
//                 </div>

//                 {/* Media */}
//                 <div className="flex-1 flex justify-center items-center">
//                   {selectedItem.type === "photo" ? (
//                     <TransformWrapper>
//                       {({ resetTransform }) => {
//                         useEffect(() => {
//                           const resetHandler = () => resetTransform();
//                           window.addEventListener("reset-transform", resetHandler);
//                           return () =>
//                             window.removeEventListener(
//                               "reset-transform",
//                               resetHandler
//                             );
//                         }, [resetTransform]);

//                         return (
//                           <TransformComponent>
//                             <Image
//                               src={selectedItem.src}
//                               alt={selectedItem.title}
//                               width={1200}
//                               height={800}
//                               className="max-h-full object-contain"
//                             />
//                           </TransformComponent>
//                         );
//                       }}
//                     </TransformWrapper>
//                   ) : (
//                     <video
//                       src={selectedItem.src}
//                       controls
//                       autoPlay
//                       className="max-h-full max-w-full"
//                     />
//                   )}
//                 </div>

//                 {/* Caption */}
//                 <div className="p-4 text-white text-center">
//                   <DialogHeader>
//                     <DialogTitle>{selectedItem.title}</DialogTitle>
//                   </DialogHeader>
//                   <p className="text-sm">{selectedItem.date}</p>
//                 </div>
//               </div>
//             )}
//           </DialogContent>
//         </Dialog>
//       </div>
//     </section>
//   );
// }

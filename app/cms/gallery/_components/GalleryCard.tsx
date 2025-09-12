"use client";

import React from "react";
import Image from "next/image";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { GalleryActions } from "./GalleryActions";

interface Props {
  galleryItem: {
    id: string;
    type: "photo" | "video";
    title: string;
    thumbnail: string;
    src: string;
    createdAt: string;
    updatedAt: string;
  };
  onOpenLightbox: () => void;
}

function getYouTubeId(url: string) {
  const regExp = /^.*(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|embed)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11}).*/;
  const match = url.match(regExp);
  return match ? match[1] : null;
}

export function GalleryCard({ galleryItem, onOpenLightbox }: Props) {
  const createdTime = new Date(galleryItem.createdAt).getTime();
  const updatedTime = new Date(galleryItem.updatedAt).getTime();
  const displayDate =
    updatedTime > createdTime ? galleryItem.updatedAt : galleryItem.createdAt;

  const isYouTube = galleryItem.type === "video" && getYouTubeId(galleryItem.src);

  const videoThumbnail =
    galleryItem.thumbnail ||
    (isYouTube
      ? `https://img.youtube.com/vi/${getYouTubeId(galleryItem.src)}/mqdefault.jpg`
      : "/placeholder-video.jpg");

  return (
    <Card
      className="bg-[#fcfbf8] border border-[#cccccc] rounded-xl shadow-sm hover:shadow-lg cursor-pointer"
      onClick={onOpenLightbox}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          onOpenLightbox();
        }
      }}
    >
      <CardHeader className="p-3 relative">
        {galleryItem.type === "photo" ? (
          <Image
            src={galleryItem.thumbnail || "/placeholder.jpg"}
            alt={galleryItem.title}
            width={225}
            height={150}
            className="w-full h-40 object-cover rounded-t-xl"
          />
        ) : (
          <>
            <Image
              src={videoThumbnail}
              alt={galleryItem.title}
              width={225}
              height={150}
              className="w-full h-40 object-cover rounded-t-xl"
            />
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-16 h-16 text-white opacity-90"
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
          </>
        )}
      </CardHeader>

      <CardContent className="p-4">
        <CardTitle className="text-lg text-[#1c1c1c]">{galleryItem.title}</CardTitle>
        <p className="text-sm text-[#4a4a4a]">{new Date(displayDate).toLocaleDateString()}</p>
      </CardContent>

      <CardFooter
        className="p-4 border-t border-[#cccccc]"
        onClick={(e) => e.stopPropagation()}
      >
        <GalleryActions galleryItem={galleryItem} />
      </CardFooter>
    </Card>
  );
}

// "use client";

// import React, { useState } from "react";
// import Image from "next/image";
// import Lightbox from "yet-another-react-lightbox";
// import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
// import Zoom from "yet-another-react-lightbox/plugins/zoom";
// import Video from "yet-another-react-lightbox/plugins/video";
// import {
//   Card,
//   CardHeader,
//   CardTitle,
//   CardContent,
//   CardFooter,
// } from "@/components/ui/card";
// import { GalleryActions } from "./GalleryActions";

// interface Props {
//   galleryItem: {
//     id: string;
//     type: "photo" | "video";
//     title: string;
//     thumbnail: string;
//     src: string;
//     createdAt: string;
//     updatedAt: string;
//   };
// }

// function getYouTubeId(url: string) {
//   const regExp = /^.*(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|embed)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11}).*/;
//   const match = url.match(regExp);
//   return match ? match[1] : null;
// }

// export function GalleryCard({ galleryItem }: Props) {
//   const [lightboxOpen, setLightboxOpen] = useState(false);

//   const createdTime = new Date(galleryItem.createdAt).getTime();
//   const updatedTime = new Date(galleryItem.updatedAt).getTime();
//   const displayDate =
//     updatedTime > createdTime ? galleryItem.updatedAt : galleryItem.createdAt;

//   const isYouTube = galleryItem.type === "video" && getYouTubeId(galleryItem.src);

//   const videoThumbnail =
//     galleryItem.thumbnail ||
//     (isYouTube
//       ? `https://img.youtube.com/vi/${getYouTubeId(galleryItem.src)}/mqdefault.jpg`
//       : "/placeholder-video.jpg");

//   // Prepare slides array for this single gallery item
//   const slides = [
//     galleryItem.type === "photo"
//       ? {
//           src: galleryItem.src,
//           title: galleryItem.title,
//           description: new Date(displayDate).toLocaleDateString(),
//         }
//       : isYouTube
//       ? {
//           type: "youtube-video",
//           src: galleryItem.src,
//           title: galleryItem.title,
//           description: new Date(displayDate).toLocaleDateString(),
//         }
//       : {
//           type: "video",
//           width: 1280,
//           height: 720,
//           sources: [{ src: galleryItem.src, type: "video/mp4" }],
//           poster: videoThumbnail,
//           title: galleryItem.title,
//           description: new Date(displayDate).toLocaleDateString(),
//           autoPlay: false,
//           controls: true,
//           muted: true,
//           preload: "metadata",
//         },
//   ];

//   return (
//     <>
//       <Card
//         className="bg-[#fcfbf8] border border-[#cccccc] rounded-xl shadow-sm hover:shadow-lg cursor-pointer"
//         onClick={() => setLightboxOpen(true)}
//         role="button"
//         tabIndex={0}
//         onKeyDown={(e) => {
//           if (e.key === "Enter" || e.key === " ") {
//             setLightboxOpen(true);
//           }
//         }}
//       >
//         <CardHeader className="p-3 relative">
//           {galleryItem.type === "photo" ? (
//             <Image
//               src={galleryItem.thumbnail || "/placeholder.jpg"}
//               alt={galleryItem.title}
//               width={225}
//               height={150}
//               className="w-full h-40 object-cover rounded-t-xl"
//             />
//           ) : (
//             <>
//               <Image
//                 src={videoThumbnail}
//                 alt={galleryItem.title}
//                 width={225}
//                 height={150}
//                 className="w-full h-40 object-cover rounded-t-xl"
//               />
//               <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   className="w-16 h-16 text-white opacity-90"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   stroke="currentColor"
//                   strokeWidth="2"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     d="M14.752 11.168l-5.197-3.029A1 1 0 008 9.03v5.94a1 1 0 001.555.832l5.197-3.03a1 1 0 000-1.664z"
//                   />
//                 </svg>
//               </div>
//             </>
//           )}
//         </CardHeader>

//         <CardContent className="p-4">
//           <CardTitle className="text-lg text-[#1c1c1c]">{galleryItem.title}</CardTitle>
//           <p className="text-sm text-[#4a4a4a]">{new Date(displayDate).toLocaleDateString()}</p>
//         </CardContent>

//         <CardFooter
//           className="p-4 border-t border-[#cccccc]"
//           onClick={(e) => e.stopPropagation()}
//         >
//           <GalleryActions galleryItem={galleryItem} />
//         </CardFooter>
//       </Card>

//       <Lightbox
//         open={lightboxOpen}
//         close={() => setLightboxOpen(false)}
//         slides={slides}
//         plugins={[Fullscreen, Zoom, Video]}
//         video={{ autoPlay: false, controls: true, muted: true }}
//       />
//     </>
//   );
// }



////////////////////////////////////////////////////////



// "use client";

// import React from "react";
// import Image from "next/image";
// import {
//   Card,
//   CardHeader,
//   CardTitle,
//   CardContent,
//   CardFooter,
// } from "@/components/ui/card";
// import { GalleryActions } from "./GalleryActions";

// interface Props {
//   galleryItem: {
//     id: string;
//     type: "photo" | "video";
//     title: string;
//     thumbnail: string;
//     src: string;
//     createdAt: string;
//     updatedAt: string;
//   };
//   onOpenLightbox: () => void;
// }

// function getYouTubeId(url: string) {
//   const regExp = /^.*(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|embed)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11}).*/;
//   const match = url.match(regExp);
//   return match ? match[1] : null;
// }

// export function GalleryCard({ galleryItem, onOpenLightbox }: Props) {
//   const createdTime = new Date(galleryItem.createdAt).getTime();
//   const updatedTime = new Date(galleryItem.updatedAt).getTime();
//   const displayDate =
//     updatedTime > createdTime ? galleryItem.updatedAt : galleryItem.createdAt;

//   const isYouTube = galleryItem.type === "video" && getYouTubeId(galleryItem.src);

//   const videoThumbnail =
//     galleryItem.thumbnail ||
//     (isYouTube
//       ? `https://img.youtube.com/vi/${getYouTubeId(galleryItem.src)}/mqdefault.jpg`
//       : "/placeholder-video.jpg");

//   return (
//     <Card
//       className="bg-[#fcfbf8] border border-[#cccccc] rounded-xl shadow-sm hover:shadow-lg cursor-pointer"
//       onClick={onOpenLightbox}
//       role="button"
//       tabIndex={0}
//       onKeyDown={(e) => {
//         if (e.key === "Enter" || e.key === " ") {
//           onOpenLightbox();
//         }
//       }}
//     >
//       <CardHeader className="p-3 relative">
//         {galleryItem.type === "photo" ? (
//           <Image
//             src={galleryItem.thumbnail || "/placeholder.jpg"}
//             alt={galleryItem.title}
//             width={225}
//             height={150}
//             className="w-full h-40 object-cover rounded-t-xl"
//           />
//         ) : (
//           <>
//             <Image
//               src={videoThumbnail}
//               alt={galleryItem.title}
//               width={225}
//               height={150}
//               className="w-full h-40 object-cover rounded-t-xl"
//             />
//             <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="w-16 h-16 text-white opacity-90"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//                 strokeWidth="2"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   d="M14.752 11.168l-5.197-3.029A1 1 0 008 9.03v5.94a1 1 0 001.555.832l5.197-3.03a1 1 0 000-1.664z"
//                 />
//               </svg>
//             </div>
//           </>
//         )}
//       </CardHeader>

//       <CardContent className="p-4">
//         <CardTitle className="text-lg text-[#1c1c1c]">{galleryItem.title}</CardTitle>
//         <p className="text-sm text-[#4a4a4a]">{new Date(displayDate).toLocaleDateString()}</p>
//       </CardContent>

//       <CardFooter
//         className="p-4 border-t border-[#cccccc]"
//         onClick={(e) => e.stopPropagation()}
//       >
//         <GalleryActions galleryItem={galleryItem} />
//       </CardFooter>
//     </Card>
//   );
// }


////////////////////////////////////////////////////////////////



// "use client";

// import React from "react";
// import Image from "next/image";
// import {
//   Card,
//   CardHeader,
//   CardTitle,
//   CardContent,
//   CardFooter,
// } from "@/components/ui/card";
// import { GalleryActions } from "./GalleryActions";

// interface Props {
//   galleryItem: {
//     id: string;
//     type: "photo" | "video";
//     title: string;
//     thumbnail: string;
//     src: string;
//     createdAt: string;
//     updatedAt: string;
//   };
//   onOpenLightbox: () => void;
// }

// function getYouTubeId(url: string) {
//   const regExp = /^.*(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|embed)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11}).*/;
//   const match = url.match(regExp);
//   return match ? match[1] : null;
// }

// export function GalleryCard({ galleryItem, onOpenLightbox }: Props) {
//   const createdTime = new Date(galleryItem.createdAt).getTime();
//   const updatedTime = new Date(galleryItem.updatedAt).getTime();
//   const displayDate =
//     updatedTime > createdTime ? galleryItem.updatedAt : galleryItem.createdAt;

//   const isYouTube = galleryItem.type === "video" && getYouTubeId(galleryItem.src);

//   return (
//     <Card
//       className="bg-[#fcfbf8] border border-[#cccccc] rounded-xl shadow-sm hover:shadow-lg cursor-pointer"
//       onClick={onOpenLightbox}
//       role="button"
//       tabIndex={0}
//       onKeyDown={(e) => {
//         if (e.key === "Enter" || e.key === " ") {
//           onOpenLightbox();
//         }
//       }}
//     >
//       <CardHeader className="p-3 relative">
//         {galleryItem.type === "photo" ? (
//           <Image
//             src={galleryItem.thumbnail || "/placeholder.jpg"}
//             alt={galleryItem.title}
//             width={225}
//             height={150}
//             className="w-full h-40 object-cover rounded-t-xl"
//           />
//         ) : isYouTube ? (
//           <>
//             <Image
//               src={
//                 galleryItem.thumbnail ||
//                 `https://img.youtube.com/vi/${getYouTubeId(galleryItem.src)}/mqdefault.jpg`
//               }
//               alt={galleryItem.title}
//               width={225}
//               height={150}
//               className="w-full h-40 object-cover rounded-t-xl"
//             />
//             <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="w-16 h-16 text-white opacity-90"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//                 strokeWidth="2"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   d="M14.752 11.168l-5.197-3.029A1 1 0 008 9.03v5.94a1 1 0 001.555.832l5.197-3.03a1 1 0 000-1.664z"
//                 />
//               </svg>
//             </div>
//           </>
//         ) : (
//           <div className="w-full h-40 rounded-t-xl overflow-hidden bg-black flex items-center justify-center relative">
//             <video
//               src={galleryItem.src}
//               poster={galleryItem.thumbnail}
//               className="w-full h-full object-cover"
//               muted
//             />
//             <div className="absolute inset-0 flex items-center justify-center bg-black/30 pointer-events-none">
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="w-12 h-12 text-white opacity-90"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//                 strokeWidth="2"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   d="M14.752 11.168l-5.197-3.029A1 1 0 008 9.03v5.94a1 1 0 001.555.832l5.197-3.03a1 1 0 000-1.664z"
//                 />
//               </svg>
//             </div>
//           </div>
//         )}
//       </CardHeader>

//       <CardContent className="p-4">
//         <CardTitle className="text-lg text-[#1c1c1c]">{galleryItem.title}</CardTitle>
//         <p className="text-sm text-[#4a4a4a]">{new Date(displayDate).toLocaleDateString()}</p>
//       </CardContent>

//       <CardFooter
//         className="p-4 border-t border-[#cccccc]"
//         onClick={(e) => e.stopPropagation()}
//       >
//         <GalleryActions galleryItem={galleryItem} />
//       </CardFooter>
//     </Card>
//   );
// }


///////////////////////////////////////////////////////


// "use client";

// import React from "react";
// import Image from "next/image";
// import {
//   Card,
//   CardHeader,
//   CardTitle,
//   CardContent,
//   CardFooter,
// } from "@/components/ui/card";
// import { GalleryActions } from "./GalleryActions";

// interface Props {
//   galleryItem: {
//     id: string;
//     type: "photo" | "video";
//     title: string;
//     thumbnail: string;
//     src: string;
//     createdAt: string;
//     updatedAt: string;
//   };
//   onOpenLightbox: () => void; // Just a callback
// }

// function getYouTubeId(url: string) {
//   const regExp = /^.*(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|embed)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11}).*/;
//   const match = url.match(regExp);
//   return match ? match[1] : null;
// }

// export function GalleryCard({ galleryItem, onOpenLightbox }: Props) {
//   const createdTime = new Date(galleryItem.createdAt).getTime();
//   const updatedTime = new Date(galleryItem.updatedAt).getTime();
//   const displayDate =
//     updatedTime > createdTime ? galleryItem.updatedAt : galleryItem.createdAt;

//   const isYouTube = galleryItem.type === "video" && getYouTubeId(galleryItem.src);

//   return (
//     <Card
//       className="bg-[#fcfbf8] border border-[#cccccc] rounded-xl shadow-sm hover:shadow-lg cursor-pointer"
//       onClick={onOpenLightbox}
//       role="button"
//       tabIndex={0}
//       onKeyDown={(e) => {
//         if (e.key === "Enter" || e.key === " ") {
//           onOpenLightbox();
//         }
//       }}
//     >
//       <CardHeader className="p-3 relative">
//         {galleryItem.type === "photo" ? (
//           <Image
//             src={galleryItem.thumbnail || "/placeholder.jpg"}
//             alt={galleryItem.title}
//             width={225}
//             height={150}
//             className="w-full h-40 object-cover rounded-t-xl"
//           />
//         ) : isYouTube ? (
//           // Show thumbnail + play icon for YouTube videos in cards (no player or <video>)
//           <>
//             <Image
//               src={galleryItem.thumbnail || `/https://img.youtube.com/vi/${getYouTubeId(galleryItem.src)}/mqdefault.jpg`}
//               alt={galleryItem.title}
//               width={225}
//               height={150}
//               className="w-full h-40 object-cover rounded-t-xl"
//             />
//             <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="w-16 h-16 text-white opacity-90"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//                 strokeWidth="2"
//               >
//                 <path 
//                   strokeLinecap="round" 
//                   strokeLinejoin="round" 
//                   d="M14.752 11.168l-5.197-3.029A1 1 0 008 9.03v5.94a1 1 0 001.555.832l5.197-3.03a1 1 0 000-1.664z" 
//                 />
//               </svg>
//             </div>
//           </>
//         ) : (
//           // fallback local video showing <video>
//           <div className="w-full h-40 rounded-t-xl overflow-hidden bg-black flex items-center justify-center relative">
//             <video
//               src={galleryItem.src}
//               poster={galleryItem.thumbnail}
//               className="w-full h-full object-cover"
//               muted
//             />
//             <div className="absolute inset-0 flex items-center justify-center bg-black/30 pointer-events-none">
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="w-12 h-12 text-white opacity-90"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//                 strokeWidth="2"
//               >
//                 <path 
//                   strokeLinecap="round" 
//                   strokeLinejoin="round" 
//                   d="M14.752 11.168l-5.197-3.029A1 1 0 008 9.03v5.94a1 1 0 001.555.832l5.197-3.03a1 1 0 000-1.664z" 
//                 />
//               </svg>
//             </div>
//           </div>
//         )}
//       </CardHeader>

//       <CardContent className="p-4">
//         <CardTitle className="text-lg text-[#1c1c1c]">{galleryItem.title}</CardTitle>
//         <p className="text-sm text-[#4a4a4a]">{new Date(displayDate).toLocaleDateString()}</p>
//       </CardContent>

//       <CardFooter
//         className="p-4 border-t border-[#cccccc]"
//         onClick={(e) => e.stopPropagation()}
//       >
//         <GalleryActions galleryItem={galleryItem} />
//       </CardFooter>
//     </Card>
//   );
// }






// "use client";

// import React from "react";
// import Image from "next/image";
// import {
//   Card,
//   CardHeader,
//   CardTitle,
//   CardContent,
//   CardFooter,
// } from "@/components/ui/card";
// import { GalleryActions } from "./GalleryActions";

// interface Props {
//   galleryItem: {
//     id: string;
//     type: "photo" | "video";
//     title: string;
//     thumbnail: string;
//     src: string;
//     createdAt: string;
//     updatedAt: string;
//   };
//   onOpenLightbox: () => void; // just a callback
// }

// export function GalleryCard({ galleryItem, onOpenLightbox }: Props) {
//   const createdTime = new Date(galleryItem.createdAt).getTime();
//   const updatedTime = new Date(galleryItem.updatedAt).getTime();
//   const displayDate =
//     updatedTime > createdTime ? galleryItem.updatedAt : galleryItem.createdAt;

//   return (
//     <Card
//       className="bg-[#fcfbf8] border border-[#cccccc] rounded-xl shadow-sm hover:shadow-lg cursor-pointer"
//       onClick={onOpenLightbox}
//       role="button"
//       tabIndex={0}
//       onKeyDown={(e) => {
//         if (e.key === "Enter" || e.key === " ") {
//           onOpenLightbox();
//         }
//       }}
//     >
//       <CardHeader className="p-3">
//         {galleryItem.type === "photo" ? (
//           <Image
//             src={galleryItem.thumbnail || "/placeholder.jpg"}
//             alt={galleryItem.title}
//             width={225}
//             height={150}
//             className="w-full h-40 object-cover rounded-t-xl"
//           />
//         ) : (
//           <div className="w-full h-40 rounded-t-xl overflow-hidden bg-black flex items-center justify-center relative">
//             <video
//               src={galleryItem.src}
//               poster={galleryItem.thumbnail}
//               className="w-full h-full object-cover"
//               muted
//             />
//             <div className="absolute inset-0 flex items-center justify-center bg-black/30 pointer-events-none">
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="w-12 h-12 text-white opacity-90"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//                 strokeWidth="2"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   d="M14.752 11.168l-5.197-3.029A1 1 0 008 9.03v5.94a1 1 0 001.555.832l5.197-3.03a1 1 0 000-1.664z"
//                 />
//               </svg>
//             </div>
//           </div>
//         )}
//       </CardHeader>

//       <CardContent className="p-4">
//         <CardTitle className="text-lg text-[#1c1c1c]">{galleryItem.title}</CardTitle>
//         <p className="text-sm text-[#4a4a4a]">{new Date(displayDate).toLocaleDateString()}</p>
//       </CardContent>

//       <CardFooter
//         className="p-4 border-t border-[#cccccc]"
//         onClick={(e) => e.stopPropagation()}
//       >
//         <GalleryActions galleryItem={galleryItem} />
//       </CardFooter>
//     </Card>
//   );
// }




// "use client";

// import React from "react";
// import Image from "next/image";
// import {
//   Card,
//   CardHeader,
//   CardTitle,
//   CardContent,
//   CardFooter,
// } from "@/components/ui/card";
// import { GalleryActions } from "./GalleryActions";

// interface Props {
//   galleryItem: {
//     id: string;
//     type: "photo" | "video";
//     title: string;
//     thumbnail: string;
//     src: string;
//     createdAt: string;
//     updatedAt: string;
//   };
//   onOpenLightbox: (e: React.MouseEvent) => void; // Receive event to stop propagation
// }

// export function GalleryCard({ galleryItem, onOpenLightbox }: Props) {
//   const createdTime = new Date(galleryItem.createdAt).getTime();
//   const updatedTime = new Date(galleryItem.updatedAt).getTime();
//   const displayDate =
//     updatedTime > createdTime ? galleryItem.updatedAt : galleryItem.createdAt;

//   return (
//     <Card
//       className="bg-[#fcfbf8] border border-[#cccccc] rounded-xl shadow-sm hover:shadow-lg cursor-pointer"
//       onClick={onOpenLightbox}
//       role="button"
//       tabIndex={0}
//       onKeyDown={(e) => {
//         if (e.key === "Enter" || e.key === " ") {
//           onOpenLightbox(e as unknown as React.MouseEvent);
//         }
//       }}
//     >
//       <CardHeader className="p-3">
//         {galleryItem.type === "photo" ? (
//           <Image
//             src={galleryItem.thumbnail || "/placeholder.jpg"}
//             alt={galleryItem.title}
//             width={225}
//             height={150}
//             className="w-full h-40 object-cover rounded-t-xl"
//           />
//         ) : (
//           <div className="w-full h-40 rounded-t-xl overflow-hidden bg-black flex items-center justify-center relative">
//             <video
//               src={galleryItem.src}
//               poster={galleryItem.thumbnail}
//               className="w-full h-full object-cover"
//               muted
//             />
//             <div className="absolute inset-0 flex items-center justify-center bg-black/30 pointer-events-none">
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="w-12 h-12 text-white opacity-90"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//                 strokeWidth="2"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   d="M14.752 11.168l-5.197-3.029A1 1 0 008 9.03v5.94a1 1 0 001.555.832l5.197-3.03a1 1 0 000-1.664z"
//                 />
//               </svg>
//             </div>
//           </div>
//         )}
//       </CardHeader>

//       <CardContent className="p-4">
//         <CardTitle className="text-lg text-[#1c1c1c]">{galleryItem.title}</CardTitle>
//         <p className="text-sm text-[#4a4a4a]">{new Date(displayDate).toLocaleDateString()}</p>
//       </CardContent>

//       <CardFooter
//         className="p-4 border-t border-[#cccccc]"
//         onClick={(e) => e.stopPropagation()} // Prevent card click (lightbox) when clicking actions
//       >
//         <GalleryActions galleryItem={galleryItem} />
//       </CardFooter>
//     </Card>
//   );
// }




// "use client";

// import React from "react";
// import Image from "next/image";
// import {
//   Card,
//   CardHeader,
//   CardTitle,
//   CardContent,
//   CardFooter,
// } from "@/components/ui/card";
// import { GalleryActions } from "./GalleryActions";

// interface Props {
//   galleryItem: {
//     id: string;
//     type: "photo" | "video";
//     title: string;
//     thumbnail: string;
//     src: string;
//     createdAt: string;
//     updatedAt: string;
//   };
//   onOpenLightbox: () => void; // Callback to open lightbox passed from parent
// }

// export function GalleryCard({ galleryItem, onOpenLightbox }: Props) {
//   const createdTime = new Date(galleryItem.createdAt).getTime();
//   const updatedTime = new Date(galleryItem.updatedAt).getTime();
//   const displayDate =
//     updatedTime > createdTime ? galleryItem.updatedAt : galleryItem.createdAt;

//   // Clicking anywhere on the card triggers opening the lightbox at this item
//   return (
//     <Card
//       className="bg-[#fcfbf8] border border-[#cccccc] rounded-xl shadow-sm hover:shadow-lg cursor-pointer"
//       onClick={onOpenLightbox}
//       role="button"
//       tabIndex={0}
//       onKeyDown={(e) => {
//         if (e.key === "Enter" || e.key === " ") {
//           onOpenLightbox();
//         }
//       }}
//     >
//       <CardHeader className="p-3">
//         {galleryItem.type === "photo" ? (
//           <Image
//             src={galleryItem.thumbnail || "/placeholder.jpg"}
//             alt={galleryItem.title}
//             width={225}
//             height={150}
//             className="w-full h-40 object-cover rounded-t-xl"
//           />
//         ) : (
//           <div className="w-full h-40 rounded-t-xl overflow-hidden bg-black flex items-center justify-center relative">
//             <video
//               src={galleryItem.src}
//               poster={galleryItem.thumbnail}
//               className="w-full h-full object-cover"
//               muted
//             />
//             <div className="absolute inset-0 flex items-center justify-center bg-black/30 pointer-events-none">
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="w-12 h-12 text-white opacity-90"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//                 strokeWidth="2"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   d="M14.752 11.168l-5.197-3.029A1 1 0 008 9.03v5.94a1 1 0 001.555.832l5.197-3.03a1 1 0 000-1.664z"
//                 />
//               </svg>
//             </div>
//           </div>
//         )}
//       </CardHeader>

//       <CardContent className="p-4">
//         <CardTitle className="text-lg text-[#1c1c1c]">{galleryItem.title}</CardTitle>
//         <p className="text-sm text-[#4a4a4a]">
//           {new Date(displayDate).toLocaleDateString()}
//         </p>
//       </CardContent>

//       <CardFooter className="p-4 border-t border-[#cccccc]">
//         <GalleryActions galleryItem={galleryItem} />
//       </CardFooter>
//     </Card>
//   );
// }






// "use client";

// import React from "react";
// import Image from "next/image";
// import {
//   Card,
//   CardHeader,
//   CardTitle,
//   CardContent,
//   CardFooter,
// } from "@/components/ui/card";
// import { GalleryActions } from "./GalleryActions";

// interface Props {
//   galleryItem: {
//     id: string;
//     type: "photo" | "video";
//     title: string;
//     thumbnail: string;
//     src: string;
//     createdAt: string;
//     updatedAt: string;
//   };
//   onOpenLightbox: () => void;  // callback to open lightbox, passed from parent
// }

// export function GalleryCard({ galleryItem, onOpenLightbox }: Props) {
//   const createdTime = new Date(galleryItem.createdAt).getTime();
//   const updatedTime = new Date(galleryItem.updatedAt).getTime();
//   const displayDate =
//     updatedTime > createdTime ? galleryItem.updatedAt : galleryItem.createdAt;

//   return (
//     <Card
//       className="bg-[#fcfbf8] border border-[#cccccc] rounded-xl shadow-sm hover:shadow-lg cursor-pointer"
//       onClick={onOpenLightbox}
//       role="button"
//       tabIndex={0}
//       onKeyDown={(e) => {
//         if (e.key === "Enter" || e.key === " ") {
//           onOpenLightbox();
//         }
//       }}
//     >
//       <CardHeader className="p-3">
//         {galleryItem.type === "photo" ? (
//           <Image
//             src={galleryItem.thumbnail || "/placeholder.jpg"}
//             alt={galleryItem.title}
//             width={225}
//             height={150}
//             className="w-full h-40 object-cover rounded-t-xl"
//           />
//         ) : (
//           <div className="w-full h-40 rounded-t-xl overflow-hidden bg-black flex items-center justify-center relative">
//             <video
//               src={galleryItem.src}
//               poster={galleryItem.thumbnail}
//               className="w-full h-full object-cover"
//               muted
//             />
//             <div className="absolute inset-0 flex items-center justify-center bg-black/30 pointer-events-none">
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="w-12 h-12 text-white opacity-90"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//                 strokeWidth="2"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   d="M14.752 11.168l-5.197-3.029A1 1 0 008 9.03v5.94a1 1 0 001.555.832l5.197-3.03a1 1 0 000-1.664z"
//                 />
//               </svg>
//             </div>
//           </div>
//         )}
//       </CardHeader>

//       <CardContent className="p-4">
//         <CardTitle className="text-lg text-[#1c1c1c]">{galleryItem.title}</CardTitle>
//         <p className="text-sm text-[#4a4a4a]">{new Date(displayDate).toLocaleDateString()}</p>
//       </CardContent>

//       <CardFooter className="p-4 border-t border-[#cccccc]">
//         <GalleryActions galleryItem={galleryItem} />
//       </CardFooter>
//     </Card>
//   );
// }



// "use client";

// import React, { useState } from "react";
// import Image from "next/image";
// import {
//   Card,
//   CardHeader,
//   CardTitle,
//   CardContent,
//   CardFooter,
// } from "@/components/ui/card";
// import { GalleryActions } from "./GalleryActions";
// import Lightbox from "yet-another-react-lightbox";
// import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
// import Zoom from "yet-another-react-lightbox/plugins/zoom";
// import Video from "yet-another-react-lightbox/plugins/video";
// import "yet-another-react-lightbox/styles.css";

// interface Props {
//   galleryItem: {
//     id: string;
//     type: "photo" | "video";
//     title: string;
//     thumbnail: string;
//     src: string;
//     createdAt: string;
//     updatedAt: string;
//   };
// }

// export function GalleryCard({ galleryItem }: Props) {
//   const createdTime = new Date(galleryItem.createdAt).getTime();
//   const updatedTime = new Date(galleryItem.updatedAt).getTime();
//   const displayDate =
//     updatedTime > createdTime ? galleryItem.updatedAt : galleryItem.createdAt;

//   const [openLightbox, setOpenLightbox] = useState(false);

//   const slide =
//     galleryItem.type === "photo"
//       ? {
//           src: galleryItem.src,
//           title: galleryItem.title,
//           description: new Date(displayDate).toLocaleDateString(),
//         }
//       : {
//           type: "video",
//           width: 1280,
//           height: 720,
//           sources: [
//             {
//               src: galleryItem.src,
//               type: "video/mp4",
//             },
//           ],
//           poster: galleryItem.thumbnail,
//           title: galleryItem.title,
//           description: new Date(displayDate).toLocaleDateString(),
//         };

//   return (
//     <>
//       <Card className="bg-[#fcfbf8] border border-[#cccccc] rounded-xl shadow-sm hover:shadow-lg cursor-pointer">
//         <CardHeader
//           className="p-3"
//           onClick={() => setOpenLightbox(true)}
//           role="button"
//           tabIndex={0}
//           onKeyDown={(e) => {
//             if (e.key === "Enter" || e.key === " ") setOpenLightbox(true);
//           }}
//         >
//           {galleryItem.type === "photo" ? (
//             <Image
//               src={galleryItem.thumbnail || "/placeholder.jpg"}
//               alt={galleryItem.title}
//               width={225}
//               height={150}
//               className="w-full h-40 object-cover rounded-t-xl"
//             />
//           ) : (
//             <div className="w-full h-40 rounded-t-xl overflow-hidden bg-black flex items-center justify-center relative">
//               <video
//                 src={galleryItem.src}
//                 poster={galleryItem.thumbnail}
//                 className="w-full h-full object-cover"
//                 muted
//               />
//               <div className="absolute inset-0 flex items-center justify-center bg-black/30 pointer-events-none">
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   className="w-12 h-12 text-white opacity-90"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   stroke="currentColor"
//                   strokeWidth="2"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     d="M14.752 11.168l-5.197-3.029A1 1 0 008 9.03v5.94a1 1 0 001.555.832l5.197-3.03a1 1 0 000-1.664z"
//                   />
//                 </svg>
//               </div>
//             </div>
//           )}
//         </CardHeader>

//         <CardContent className="p-4">
//           <CardTitle className="text-lg text-[#1c1c1c]">{galleryItem.title}</CardTitle>
//           <p className="text-sm text-[#4a4a4a]">{new Date(displayDate).toLocaleDateString()}</p>
//         </CardContent>

//         <CardFooter className="p-4 border-t border-[#cccccc]">
//           <GalleryActions galleryItem={galleryItem} />
//         </CardFooter>
//       </Card>

//       {openLightbox && (
//         <Lightbox
//           open={openLightbox}
//           close={() => setOpenLightbox(false)}
//           slides={[slide]}
//           plugins={[Fullscreen, Zoom, Video]}
//         />
//       )}
//     </>
//   );
// }

"use client";

import dynamic from "next/dynamic";

const GalleryGrid = dynamic(() => import("./GalleryGrid"), {
  ssr: false,
});

export default function ClientGalleryGridWrapper(props: any) {
  return <GalleryGrid {...props} />;
}

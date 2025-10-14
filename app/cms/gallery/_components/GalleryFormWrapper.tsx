"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useServerAction } from "@/lib/use-server-action";
import { createGalleryItem } from "../actions";
import { GalleryForm } from "./GalleryForm";

export function GalleryFormWrapper() {
  const router = useRouter();
  const wrapped = useServerAction(createGalleryItem);

  const handleSave = async (data: FormData) => {
    const res = await wrapped(data);
    if (res.ok) {
      router.push("/cms/gallery");
    }
  };

  return <GalleryForm onSave={handleSave} />;
}

export default GalleryFormWrapper;

"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useServerAction } from "@/lib/use-server-action";
import { updateGalleryItem } from "../actions";
import { GalleryForm } from "./GalleryForm";

interface Props {
  id: string;
  initial?: any;
}

export function GalleryEditFormWrapper({ id, initial }: Props) {
  const router = useRouter();
  const wrapped = useServerAction(updateGalleryItem as any);

  const handleSave = async (data: FormData) => {
    // call wrapped with bound id first
    const res = await wrapped(id, data);
    if (res.ok) {
      router.push("/cms/gallery");
    }
  };

  return <GalleryForm initial={initial} onSave={handleSave} />;
}

export default GalleryEditFormWrapper;

"use client";
import { useState } from "react";
import Image from "next/image";

interface Props {
  value?: string;
  onChange: (url: string) => void;
}

export function ImageUpload({ value, onChange }: Props) {
  const [preview, setPreview] = useState<string | null>(value ?? null);

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setPreview(reader.result as string);
      onChange(reader.result as string); // base64 preview only, actual upload happens on form submit
    };
    reader.readAsDataURL(file);
  }

  return (
    <div className="space-y-2">
      <input type="file" accept="image/*" onChange={handleFile} />
      {preview && (
        <Image
          src={preview}
          alt="preview"
          width={300}
          height={200}
          className="h-32 w-auto rounded-md border border-ash object-cover"
        />
      )}
    </div>
  );
}
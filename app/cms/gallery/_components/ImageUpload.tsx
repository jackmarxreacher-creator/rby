"use client";
import { useState } from "react";
import Image from "next/image";
import imageCompression from "browser-image-compression";

interface Props {
  value?: string; // existing thumbnail URL or base64 preview
  onChange: (file: File | null) => void;
}

export function ImageUpload({ value, onChange }: Props) {
  const [preview, setPreview] = useState<string | null>(value ?? null);
  const [isCompressing, setIsCompressing] = useState(false);

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    let file = e.target.files?.[0] ?? null;
    if (!file) {
      onChange(null);
      setPreview(null);
      setIsCompressing(false);
      return;
    }

    setIsCompressing(true);
    try {
      const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 1920,
        useWebWorker: true,
        maxIteration: 10,
        initialQuality: 0.8,
      };
      const compressedFile = await imageCompression(file, options);

      const compressedFileWithName = new File(
        [compressedFile],
        file.name,
        { type: compressedFile.type }
      );

      const reader = new FileReader();
      reader.onload = () => {
        setPreview(reader.result as string);
        setIsCompressing(false);
      };
      reader.readAsDataURL(compressedFileWithName);

      onChange(compressedFileWithName);
    } catch {
      // Fallback to original file if compression fails
      const reader = new FileReader();
      reader.onload = () => {
        setPreview(reader.result as string);
        setIsCompressing(false);
      };
      reader.readAsDataURL(file);

      onChange(file);
    }
  }

  return (
    <div className="space-y-2">
      <input type="file" accept="image/*" onChange={handleFileChange} />
      {isCompressing && (
        <p className="text-sm text-blue-600 font-medium">Optimizing Image...</p>
      )}
      {preview && !isCompressing && (
        <Image
          src={preview}
          alt="Preview"
          width={300}
          height={200}
          className="h-32 w-auto rounded-md border border-ash object-cover"
          unoptimized
        />
      )}
    </div>
  );
}


"use server";

import fs from "fs/promises";
import path from "path";
import { prisma } from "@/lib/prisma";
import { GalleryItemType } from "@prisma/client";
import { revalidatePath } from "next/cache";

const UPLOAD_DIR = path.join(process.cwd(), "public", "images", "gallery");
const VIDEO_THUMBNAIL_DIR = path.join(process.cwd(), "public", "videos", "thumbnails");

export async function createGalleryItem(data: FormData, userId: string) {
  let thumbnailPath: string | null = null;

  if (data.get("type") === "photo") {
    // Handle photo upload
    const photo = data.get("photo") as File;
    if (photo && photo.size > 0) {
      const photoName = `${Date.now()}-${photo.name}`;
      const photoPath = path.join(UPLOAD_DIR, photoName);
      const buffer = Buffer.from(await photo.arrayBuffer());
      await fs.writeFile(photoPath, buffer);
      thumbnailPath = `/images/gallery/${photoName}`;
    }
  } else if (data.get("type") === "video") {
    // Handle video thumbnail upload (if thumbnail file, save it)
    const videoThumbnail = data.get("thumbnail") as File | string | null;
    if (videoThumbnail && videoThumbnail instanceof File && videoThumbnail.size > 0) {
      const thumbnailName = `${Date.now()}-${videoThumbnail.name}`;
      const thumbnailPathDisk = path.join(VIDEO_THUMBNAIL_DIR, thumbnailName);
      const buffer = Buffer.from(await videoThumbnail.arrayBuffer());
      await fs.writeFile(thumbnailPathDisk, buffer);
      thumbnailPath = `/videos/thumbnails/${thumbnailName}`;
    } else if (typeof videoThumbnail === "string") {
      thumbnailPath = videoThumbnail;
    } else {
      thumbnailPath = null;
    }
  }

  // For photos, set src to thumbnailPath or empty string. For videos, set from form input.
  const src =
    data.get("type") === "photo"
      ? thumbnailPath || ""
      : (data.get("src") as string) || "";

  await prisma.galleryItem.create({
    data: {
      type: GalleryItemType[data.get("type") as keyof typeof GalleryItemType],
      title: data.get("title") as string,
      thumbnail: thumbnailPath || "",
      src,
      createdById: userId,
    },
  });

  revalidatePath("/cms/gallery");
}

export async function updateGalleryItem(id: string, data: FormData, userId: string) {
  let thumbnailPath: string | null = null;

  if (data.get("type") === "photo") {
    const photo = data.get("photo") as File;
    if (photo && photo.size > 0) {
      const photoName = `${Date.now()}-${photo.name}`;
      const photoPath = path.join(UPLOAD_DIR, photoName);
      const buffer = Buffer.from(await photo.arrayBuffer());
      await fs.writeFile(photoPath, buffer);
      thumbnailPath = `/images/gallery/${photoName}`;
    }
  } else if (data.get("type") === "video") {
    const videoThumbnail = data.get("thumbnail") as File | string | null;
    if (videoThumbnail && videoThumbnail instanceof File && videoThumbnail.size > 0) {
      const thumbnailName = `${Date.now()}-${videoThumbnail.name}`;
      const thumbnailPathDisk = path.join(VIDEO_THUMBNAIL_DIR, thumbnailName);
      const buffer = Buffer.from(await videoThumbnail.arrayBuffer());
      await fs.writeFile(thumbnailPathDisk, buffer);
      thumbnailPath = `/videos/thumbnails/${thumbnailName}`;
    } else if (typeof videoThumbnail === "string") {
      thumbnailPath = videoThumbnail;
    } else {
      thumbnailPath = null;
    }
  }

  // For photos, set src to thumbnailPath or existing thumbnail or empty string. For videos, take from form input.
  const src =
    data.get("type") === "photo"
      ? thumbnailPath || (data.get("existingThumbnail") as string) || ""
      : (data.get("src") as string) || "";

  await prisma.galleryItem.update({
    where: { id },
    data: {
      type: GalleryItemType[data.get("type") as keyof typeof GalleryItemType],
      title: data.get("title") as string,
      thumbnail: thumbnailPath || (data.get("existingThumbnail") as string) || "",
      src,
      updatedById: userId,
    },
  });

  revalidatePath("/cms/gallery");
}

export async function deleteGalleryItem(id: string, userId: string) {
  await prisma.galleryItem.delete({
    where: { id },
  });

  revalidatePath("/cms/gallery");
}

export async function getGalleryItems() {
  return await prisma.galleryItem.findMany({
    orderBy: { createdAt: "desc" },
  });
}

export async function getGalleryItem(id: string) {
  return await prisma.galleryItem.findUnique({
    where: { id },
  });
}




// "use server";

// import fs from "fs/promises";
// import path from "path";
// import { prisma } from "@/lib/prisma";
// import { GalleryItemType } from "@prisma/client";
// import { revalidatePath } from "next/cache";

// const UPLOAD_DIR = path.join(process.cwd(), "public", "images", "gallery");
// const VIDEO_THUMBNAIL_DIR = path.join(process.cwd(), "public", "videos", "thumbnails");

// export async function createGalleryItem(data: FormData, userId: string) {
//   let thumbnailPath: string | null = null;

//   if (data.get("type") === "photo") {
//     // Handle photo upload
//     const photo = data.get("photo") as File;
//     if (photo && photo.size > 0) {
//       const photoName = `${Date.now()}-${photo.name}`;
//       const photoPath = path.join(UPLOAD_DIR, photoName);
//       const buffer = Buffer.from(await photo.arrayBuffer());
//       await fs.writeFile(photoPath, buffer);
//       thumbnailPath = `/images/gallery/${photoName}`;
//     }
//   } else if (data.get("type") === "video") {
//     // Handle video thumbnail upload (if thumbnail file, save it)
//     const videoThumbnail = data.get("thumbnail") as File | string | null;
//     if (videoThumbnail && videoThumbnail instanceof File && videoThumbnail.size > 0) {
//       const thumbnailName = `${Date.now()}-${videoThumbnail.name}`;
//       const thumbnailPathDisk = path.join(VIDEO_THUMBNAIL_DIR, thumbnailName);
//       const buffer = Buffer.from(await videoThumbnail.arrayBuffer());
//       await fs.writeFile(thumbnailPathDisk, buffer);
//       thumbnailPath = `/videos/thumbnails/${thumbnailName}`;
//     } else if (typeof videoThumbnail === "string") {
//       thumbnailPath = videoThumbnail;
//     } else {
//       thumbnailPath = null;
//     }
//   }

//   // For photos, set src to thumbnailPath or empty string. For videos, set from form input.
//   const src =
//     data.get("type") === "photo"
//       ? thumbnailPath || ""
//       : (data.get("src") as string) || "";

//   await prisma.galleryItem.create({
//     data: {
//       type: GalleryItemType[data.get("type") as keyof typeof GalleryItemType],
//       title: data.get("title") as string,
//       thumbnail: thumbnailPath || "",
//       src,
//       createdById: userId,
//     },
//   });

//   revalidatePath("/cms/gallery");
// }

// export async function updateGalleryItem(id: string, data: FormData, userId: string) {
//   let thumbnailPath: string | null = null;

//   if (data.get("type") === "photo") {
//     const photo = data.get("photo") as File;
//     if (photo && photo.size > 0) {
//       const photoName = `${Date.now()}-${photo.name}`;
//       const photoPath = path.join(UPLOAD_DIR, photoName);
//       const buffer = Buffer.from(await photo.arrayBuffer());
//       await fs.writeFile(photoPath, buffer);
//       thumbnailPath = `/images/gallery/${photoName}`;
//     }
//   } else if (data.get("type") === "video") {
//     const videoThumbnail = data.get("thumbnail") as File | string | null;
//     if (videoThumbnail && videoThumbnail instanceof File && videoThumbnail.size > 0) {
//       const thumbnailName = `${Date.now()}-${videoThumbnail.name}`;
//       const thumbnailPathDisk = path.join(VIDEO_THUMBNAIL_DIR, thumbnailName);
//       const buffer = Buffer.from(await videoThumbnail.arrayBuffer());
//       await fs.writeFile(thumbnailPathDisk, buffer);
//       thumbnailPath = `/videos/thumbnails/${thumbnailName}`;
//     } else if (typeof videoThumbnail === "string") {
//       thumbnailPath = videoThumbnail;
//     } else {
//       thumbnailPath = null;
//     }
//   }

//   // For photos, set src to thumbnailPath or existing thumbnail or empty string. For videos, take from form input.
//   const src =
//     data.get("type") === "photo"
//       ? thumbnailPath || (data.get("existingThumbnail") as string) || ""
//       : (data.get("src") as string) || "";

//   await prisma.galleryItem.update({
//     where: { id },
//     data: {
//       type: GalleryItemType[data.get("type") as keyof typeof GalleryItemType],
//       title: data.get("title") as string,
//       thumbnail: thumbnailPath || (data.get("existingThumbnail") as string) || "",
//       src,
//       updatedById: userId,
//     },
//   });

//   revalidatePath("/cms/gallery");
// }

// export async function deleteGalleryItem(id: string, userId: string) {
//   await prisma.galleryItem.delete({
//     where: { id },
//   });

//   revalidatePath("/cms/gallery");
// }

// export async function getGalleryItems() {
//   return await prisma.galleryItem.findMany({
//     orderBy: { createdAt: "desc" },
//   });
// }

// export async function getGalleryItem(id: string) {
//   return await prisma.galleryItem.findUnique({
//     where: { id },
//   });
// }





// "use server";

// import fs from "fs/promises";
// import path from "path";
// import { prisma } from "@/lib/prisma";
// import { GalleryItemType } from "@prisma/client";
// import { revalidatePath } from "next/cache";

// const UPLOAD_DIR = path.join(process.cwd(), "public", "images", "gallery");
// const VIDEO_THUMBNAIL_DIR = path.join(process.cwd(), "public", "videos", "thumbnails");

// export async function createGalleryItem(data: FormData, userId: string) {
//   let thumbnailPath: string | null = null;

//   if (data.get("type") === "photo") {
//     // Handle photo upload
//     const photo = data.get("photo") as File;
//     if (photo && photo.size > 0) {
//       const photoName = `${Date.now()}-${photo.name}`;
//       const photoPath = path.join(UPLOAD_DIR, photoName);
//       const buffer = Buffer.from(await photo.arrayBuffer());
//       await fs.writeFile(photoPath, buffer);
//       thumbnailPath = `/images/gallery/${photoName}`;
//     }
//   } else if (data.get("type") === "video") {
//     // Handle video thumbnail upload (if thumbnail file, save it)
//     const videoThumbnail = data.get("thumbnail") as File | string | null;
//     if (videoThumbnail && videoThumbnail instanceof File && videoThumbnail.size > 0) {
//       const thumbnailName = `${Date.now()}-${videoThumbnail.name}`;
//       const thumbnailPathDisk = path.join(VIDEO_THUMBNAIL_DIR, thumbnailName);
//       const buffer = Buffer.from(await videoThumbnail.arrayBuffer());
//       await fs.writeFile(thumbnailPathDisk, buffer);
//       thumbnailPath = `/videos/thumbnails/${thumbnailName}`;
//     } else if (typeof videoThumbnail === "string") {
//       thumbnailPath = videoThumbnail;
//     } else {
//       thumbnailPath = null;
//     }
//   }

//   // For photos, set src to thumbnailPath or empty string. For videos, set from form input.
//   const src =
//     data.get("type") === "photo"
//       ? thumbnailPath || ""
//       : (data.get("src") as string) || "";

//   await prisma.galleryItem.create({
//     data: {
//       type: GalleryItemType[data.get("type") as keyof typeof GalleryItemType],
//       title: data.get("title") as string,
//       thumbnail: thumbnailPath || "",
//       src,
//       createdById: userId,
//     },
//   });

//   revalidatePath("/cms/gallery");
// }

// export async function updateGalleryItem(id: string, data: FormData, userId: string) {
//   let thumbnailPath: string | null = null;

//   if (data.get("type") === "photo") {
//     const photo = data.get("photo") as File;
//     if (photo && photo.size > 0) {
//       const photoName = `${Date.now()}-${photo.name}`;
//       const photoPath = path.join(UPLOAD_DIR, photoName);
//       const buffer = Buffer.from(await photo.arrayBuffer());
//       await fs.writeFile(photoPath, buffer);
//       thumbnailPath = `/images/gallery/${photoName}`;
//     }
//   } else if (data.get("type") === "video") {
//     const videoThumbnail = data.get("thumbnail") as File | string | null;
//     if (videoThumbnail && videoThumbnail instanceof File && videoThumbnail.size > 0) {
//       const thumbnailName = `${Date.now()}-${videoThumbnail.name}`;
//       const thumbnailPathDisk = path.join(VIDEO_THUMBNAIL_DIR, thumbnailName);
//       const buffer = Buffer.from(await videoThumbnail.arrayBuffer());
//       await fs.writeFile(thumbnailPathDisk, buffer);
//       thumbnailPath = `/videos/thumbnails/${thumbnailName}`;
//     } else if (typeof videoThumbnail === "string") {
//       thumbnailPath = videoThumbnail;
//     } else {
//       thumbnailPath = null;
//     }
//   }

//   // For photos, set src to thumbnailPath or existing thumbnail or empty string. For videos, take from form input.
//   const src =
//     data.get("type") === "photo"
//       ? thumbnailPath || (data.get("existingThumbnail") as string) || ""
//       : (data.get("src") as string) || "";

//   await prisma.galleryItem.update({
//     where: { id },
//     data: {
//       type: GalleryItemType[data.get("type") as keyof typeof GalleryItemType],
//       title: data.get("title") as string,
//       thumbnail: thumbnailPath || (data.get("existingThumbnail") as string) || "",
//       src,
//       updatedById: userId,
//     },
//   });

//   revalidatePath("/cms/gallery");
// }

// export async function deleteGalleryItem(id: string, userId: string) {
//   await prisma.galleryItem.delete({
//     where: { id },
//   });

//   revalidatePath("/cms/gallery");
// }

// export async function getGalleryItems() {
//   return await prisma.galleryItem.findMany({
//     orderBy: { createdAt: "desc" },
//   });
// }

// export async function getGalleryItem(id: string) {
//   return await prisma.galleryItem.findUnique({
//     where: { id },
//   });
// }

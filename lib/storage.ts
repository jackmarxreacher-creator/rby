import fs from "fs/promises";
import path from "path";
import { randomUUID } from "crypto";
import { v2 as cloudinary } from "cloudinary";

const isProd = !!process.env.VERCEL;
const hasCloudinary = Boolean(
  process.env.CLOUDINARY_CLOUD_NAME &&
  process.env.CLOUDINARY_API_KEY &&
  process.env.CLOUDINARY_API_SECRET
);
const CLOUDINARY_FOLDER = process.env.CLOUDINARY_FOLDER || "rby";

if (hasCloudinary) {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
    api_key: process.env.CLOUDINARY_API_KEY!,
    api_secret: process.env.CLOUDINARY_API_SECRET!,
    secure: true,
  });
}

function sanitize(name: string) {
  return name.replace(/\s+/g, "_").replace(/[^a-zA-Z0-9._-]/g, "");
}

/**
 * Upload a File to storage and return a public URL or a public path (dev).
 * - In production (Vercel), uses Vercel Blob with public access
 * - In local/dev, writes to public/<subdir> and returns /<subdir>/<filename>
 */
export async function uploadPublicFile(file: File, subdir: string): Promise<string | undefined> {
  if (!file || file.size === 0) return undefined;

  const filename = `${randomUUID()}-${sanitize(file.name)}`;

  // Prefer Cloudinary when configured (both dev and prod)
  if (hasCloudinary) {
    const buffer = Buffer.from(await file.arrayBuffer());
    const folder = `${CLOUDINARY_FOLDER}/${subdir}`.replace(/\/+/, "/");
    const resource_type = "auto"; // handle images or videos if needed
    const upload = () =>
      new Promise<string>((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder, resource_type, public_id: filename.replace(/\.[^.]+$/, "") },
          (error: any, result: any) => {
            if (error) return reject(error);
            if (!result?.secure_url) return reject(new Error("Cloudinary upload failed"));
            resolve(result.secure_url);
          }
        );
        stream.end(buffer);
      });

    try {
      return await upload();
    } catch (err: any) {
      // Provide a clearer hint in production
      if (isProd && !hasCloudinary) {
        throw new Error(
          "Cloudinary not configured. Set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET."
        );
      }
      throw err;
    }
  }

  // Local/dev: write under public
  const fullDir = path.join(process.cwd(), "public", subdir);
  await fs.mkdir(fullDir, { recursive: true });
  const fullPath = path.join(fullDir, filename);
  await fs.writeFile(fullPath, Buffer.from(await file.arrayBuffer()));
  return `/${subdir}/${filename}`;
}

/**
 * Upload a base64 data URL (e.g., from canvas/editor) to storage and return a public URL.
 * - In Cloudinary mode, uploads directly using data URL.
 * - Locally, writes under public/<subdir>.
 */
export async function uploadDataUrlPublic(dataUrl: string, subdir: string): Promise<string> {
  if (!dataUrl || !/^data:\w+\/[-+.\w]+;base64,/.test(dataUrl)) {
    throw new Error("Invalid data URL");
  }

  if (hasCloudinary) {
    const folder = `${CLOUDINARY_FOLDER}/${subdir}`.replace(/\/+/, "/");
    const res = await cloudinary.uploader.upload(dataUrl, {
      folder,
      resource_type: "image",
    } as any);
    if (!res?.secure_url) throw new Error("Cloudinary upload failed");
    return res.secure_url as string;
  }

  // Fallback to local file write
  const [meta, base64] = dataUrl.split(';base64,');
  const ext = meta.split('/')[1]?.split(';')[0] || 'png';
  const filename = `${randomUUID()}.${ext}`;
  const fullDir = path.join(process.cwd(), "public", subdir);
  await fs.mkdir(fullDir, { recursive: true });
  const fullPath = path.join(fullDir, filename);
  await fs.writeFile(fullPath, Buffer.from(base64, 'base64'));
  return `/${subdir}/${filename}`;
}

/**
 * Best-effort delete helper for local dev paths. For blob URLs, deletion is skipped by default.
 */
export async function deletePublicFileIfLocal(publicPathOrUrl: string | null | undefined) {
  if (!publicPathOrUrl) return;
  if (publicPathOrUrl.startsWith("http")) {
    // Optionally integrate `del` from @vercel/blob if you want hard deletes for blob assets.
    return;
  }
  try {
    const filePath = path.join(process.cwd(), "public", publicPathOrUrl.replace(/^\//, ""));
    await fs.unlink(filePath);
  } catch {
    // ignore
  }
}

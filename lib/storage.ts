import fs from "fs/promises";
import path from "path";
import { randomUUID } from "crypto";
import { put } from "@vercel/blob";

const isProd = !!process.env.VERCEL;

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

  if (isProd) {
    // Upload to Vercel Blob storage
    const arrayBuffer = await file.arrayBuffer();
    const { url } = await put(`${subdir}/${filename}`, new Uint8Array(arrayBuffer), {
      access: "public",
      token: process.env.BLOB_READ_WRITE_TOKEN, // optional if project configured with Integration
    });
    return url;
  }

  // Local/dev: write under public
  const fullDir = path.join(process.cwd(), "public", subdir);
  await fs.mkdir(fullDir, { recursive: true });
  const fullPath = path.join(fullDir, filename);
  await fs.writeFile(fullPath, Buffer.from(await file.arrayBuffer()));
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

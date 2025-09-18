import { writeFile } from "fs/promises";
import { join } from "path";
import { randomUUID } from "crypto";

const PUBLIC_DIR = join(process.cwd(), "public", "images", "customers");

export async function uploadCustomerImage(file: File): Promise<string> {
  await ensureDir(PUBLIC_DIR);

  const buffer = Buffer.from(await file.arrayBuffer());
  const ext = file.name.split(".").pop();
  const fileName = `${randomUUID()}.${ext}`;
  const fullPath = join(PUBLIC_DIR, fileName);
  const publicPath = `/images/customers/${fileName}`;

  await writeFile(fullPath, buffer);
  return publicPath;
}

async function ensureDir(dir: string) {
  try {
    await import("fs/promises").then((fs) => fs.mkdir(dir, { recursive: true }));
  } catch {}
}
import { writeFile } from 'fs/promises';
import { join } from 'path';
import { randomUUID } from 'crypto';

const BLOG_IMG_DIR = join(process.cwd(), 'public', 'images', 'blog');

export async function saveBlogImage(dataUrl: string): Promise<string> {
  const [meta, base64] = dataUrl.split(';base64,');
  const ext = meta.split('/')[1]; // png | jpeg | webp
  const name = `${randomUUID()}.${ext}`;
  const buffer = Buffer.from(base64, 'base64');
  await writeFile(join(BLOG_IMG_DIR, name), buffer);
  return `/images/blog/${name}`;
}
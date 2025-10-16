import { uploadDataUrlPublic } from '@/lib/storage';

export async function saveBlogImage(dataUrl: string): Promise<string> {
  return uploadDataUrlPublic(dataUrl, 'images/blog');
}
import { uploadPublicFile } from "@/lib/storage";

export async function uploadCustomerImage(file: File): Promise<string> {
  const url = await uploadPublicFile(file, "images/customers");
  if (!url) throw new Error("Failed to upload customer image");
  return url;
}
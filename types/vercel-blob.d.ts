declare module "@vercel/blob" {
  export function put(
    key: string,
    body: ArrayBufferView | ArrayBuffer | Blob,
    opts?: { access?: "public" | "private"; token?: string }
  ): Promise<{ url: string; pathname?: string; downloadUrl?: string }>;
}

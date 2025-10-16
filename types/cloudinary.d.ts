declare module "cloudinary" {
  export const v2: {
    config: (cfg: {
      cloud_name: string;
      api_key: string;
      api_secret: string;
      secure?: boolean;
    }) => void;
    uploader: {
      upload: (
        file: string | Buffer,
        options?: {
          folder?: string;
          resource_type?: "auto" | "image" | "video" | string;
          public_id?: string;
        }
      ) => Promise<{ secure_url?: string }>;
      upload_stream: (
        options: {
          folder?: string;
          resource_type?: "auto" | "image" | "video" | string;
          public_id?: string;
        },
        callback: (error: any, result?: { secure_url?: string }) => void
      ) => NodeJS.WritableStream;
    };
  };
}

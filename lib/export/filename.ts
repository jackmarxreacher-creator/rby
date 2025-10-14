import { format } from "date-fns";

export function sanitizeFilename(str: string) {
  return str.replace(/[^a-z0-9]/gi, "_").toLowerCase();
}

export function timestamp() {
  return format(new Date(), "yyyy-MM-dd-HHmm");
}
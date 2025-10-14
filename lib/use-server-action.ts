"use client";

import { useToast } from "@/components/ui/use-toast";

type Result = { ok: boolean; message: string };

/*  toast shape that accepts variant  */
type ToastParams = {
  title?: string;
  description?: string;
  variant?: "default" | "destructive";
};

export function useServerAction<T extends (...args: any[]) => Promise<Result>>(action: T) {
  const { toast } = useToast();

  return async (...args: Parameters<T>) => {
    const res = await action(...args);
    toast({
      title: res.ok ? "Success" : "Error",
      description: res.message,
      variant: res.ok ? "default" : "destructive",
    } as ToastParams); // <-- cast with our local type
    return res;
  };
}
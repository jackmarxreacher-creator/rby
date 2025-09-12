"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";

export type ViewType = "card" | "table";

interface ViewToggleProps {
  current: ViewType;
  basePath: string; // Base path to update URL on toggle
}

export function ViewToggle({ current, basePath }: ViewToggleProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const setView = (v: ViewType) => {
    const params = new URLSearchParams(searchParams);
    if (v === "table") params.set("view", "table");
    else params.delete("view");
    router.replace(`${basePath}?${params.toString()}`);
  };

  return (
    <div className="flex gap-1 border border-[#cccccc] rounded-lg p-1">
      <Button
        size="sm"
        variant={current === "card" ? "default" : "outline"}
        className={
          current === "card"
            ? "bg-[#be965b] text-black"
            : "text-[#4a4a4a] hover:bg-[#f3ede5]"
        }
        onClick={() => setView("card")}
      >
        Card
      </Button>
      <Button
        size="sm"
        variant={current === "table" ? "default" : "outline"}
        className={
          current === "table"
            ? "bg-[#be965b] text-black"
            : "text-[#4a4a4a] hover:bg-[#f3ede5]"
        }
        onClick={() => setView("table")}
      >
        Table
      </Button>
    </div>
  );
}

"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";

export function ViewToggle({ current }: { current: "card" | "table" }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const setView = (v: "card" | "table") => {
    const params = new URLSearchParams(searchParams);
    if (v === "table") params.set("view", "table");
    else params.delete("view");
    router.replace(`/cms/products?${params.toString()}`);
  };

  return (
    <div className="flex gap-1 border border-[#cccccc] rounded-lg p-1">
      <Button
        size="sm"
        variant={current === "card" ? "default" : "outline"}
        className={current === "card" ? "bg-[#be965b] text-black" : "text-[#4a4a4a]"}
        onClick={() => setView("card")}
      >
        Card
      </Button>
      <Button
        size="sm"
        variant={current === "table" ? "default" : "outline"}
        className={current === "table" ? "bg-[#be965b] text-black" : "text-[#4a4a4a]"}
        onClick={() => setView("table")}
      >
        Table
      </Button>
    </div>
  );
}
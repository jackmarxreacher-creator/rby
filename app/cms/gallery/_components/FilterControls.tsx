"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";

type FilterType = "all" | "photo" | "video";

export default function FilterControls() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const current = (searchParams?.get("filter") as FilterType) || "all";

  function setFilter(f: FilterType) {
    const params = new URLSearchParams(searchParams?.toString() || "");
    if (f === "all") {
      params.delete("filter");
    } else {
      params.set("filter", f);
    }
    // keep other params like view
    const qs = params.toString();
    router.push(qs ? `${pathname}?${qs}` : pathname);
  }

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-2 space-y-2 sm:space-y-0">
      <Button
        variant={current === "all" ? "default" : "outline"}
        size="sm"
        aria-pressed={current === "all"}
        onClick={() => setFilter("all")}
      >
        All
      </Button>
      <Button
        variant={current === "photo" ? "default" : "outline"}
        size="sm"
        aria-pressed={current === "photo"}
        onClick={() => setFilter("photo")}
      >
        Photos
      </Button>
      <Button
        variant={current === "video" ? "default" : "outline"}
        size="sm"
        aria-pressed={current === "video"}
        onClick={() => setFilter("video")}
      >
        Videos
      </Button>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Countdown({ seconds = 5 }: { seconds?: number }) {
  const [left, setLeft] = useState(seconds);
  const router = useRouter();

  useEffect(() => {
    if (left <= 0) {
      router.push("/");
      return;
    }
    const t = setTimeout(() => setLeft((l) => l - 1), 1000);
    return () => clearTimeout(t);
  }, [left, router]);

  return (
    <p className="text-gray-600 mt-4">
      Redirecting you to Homepage in{" "}
      <span className="font-semibold text-[#be965b]">{left}</span> second
      {left === 1 ? "" : "s"}...
    </p>
  );
}
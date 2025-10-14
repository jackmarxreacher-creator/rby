"use client";

import React, { useState } from "react";
import { useServerAction } from "@/lib/use-server-action";
import { updateRequestStatus } from "../actions";

const STATUSES = ["RECEIVED", "CANCELED", "PROCESSING", "SHIPPED", "COMPLETED"] as const;

type Props = {
  id: string;
  current: string;
};

export default function StatusSelect({ id, current }: Props) {
  const [status, setStatus] = useState(current ?? "RECEIVED");
  const wrapped = useServerAction(updateRequestStatus as any);

  const handleChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const next = e.target.value;
    setStatus(next);
    const res = await wrapped(id, next);
    if (res.ok) {
      // optionally: nothing – toast shown by useServerAction, caller can refresh
      // trigger a refresh via location.reload as a pragmatic choice
      window.location.reload();
    }
  };

  return (
    <select
      value={status}
      onChange={handleChange}
      className="border rounded px-2 py-1 text-sm"
    >
      {STATUSES.map((s) => (
        <option key={s} value={s}>
          {s}
        </option>
      ))}
    </select>
  );
}

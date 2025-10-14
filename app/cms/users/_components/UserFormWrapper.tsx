"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useServerAction } from "@/lib/use-server-action";
import { createUser } from "../actions";
import { UserForm } from "./UserForm";

export function UserFormWrapper() {
  const router = useRouter();
  const wrapped = useServerAction(createUser as any);

  const handleSave = async (data: FormData) => {
    const res = await wrapped(data);
    if (res.ok) router.push("/cms/users");
  };

  return <UserForm onSave={handleSave} />;
}

export default UserFormWrapper;

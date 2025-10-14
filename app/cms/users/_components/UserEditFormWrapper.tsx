"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useServerAction } from "@/lib/use-server-action";
import { updateUser } from "../actions";
import { UserForm } from "./UserForm";

interface Props {
  id: string;
  initial: any;
}

export function UserEditFormWrapper({ id, initial }: Props) {
  const router = useRouter();
  const wrapped = useServerAction(updateUser as any);

  const handleSave = async (data: FormData) => {
    const res = await wrapped(id, data);
    if (res.ok) router.push("/cms/users");
  };

  return <UserForm initial={initial} onSave={handleSave} />;
}

export default UserEditFormWrapper;

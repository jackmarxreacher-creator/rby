"use client";

import React from "react";
import { useServerAction } from "@/lib/use-server-action";
import { ProductForm } from "./ProductForm";
import type { Result } from "../actions";

type ServerAction = (data: FormData) => Promise<Result>;

interface Props {
  action: ServerAction;
  initial?: any;
}

export function ProductFormWrapper({ action, initial }: Props) {
  const wrapped = useServerAction(action);

  return <ProductForm initial={initial} onSave={wrapped} />;
}

"use client"

import * as React from "react"
import BlogForm, { type BlogInputs } from "./BlogForm"
import { useServerAction } from "@/lib/use-server-action"

interface Props {
  post?: BlogInputs
  action: (data: BlogInputs) => Promise<{ ok: boolean; message: string }>
}

export default function BlogFormWrapper({ post, action }: Props) {
  const wrapped = useServerAction(action)
  return <BlogForm post={post} onSave={wrapped} />
}

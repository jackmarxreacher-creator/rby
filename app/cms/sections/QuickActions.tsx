"use client";

import { Button } from "@/components/ui/button";
import { UserPlus, FileText, Upload, Download } from "lucide-react";
import Link from "next/link";

export default function QuickActions() {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border">
      <h2 className="font-semibold text-lg mb-4">Quick Actions</h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <Button
          variant="outline"
          className="flex flex-col items-center justify-center py-6"
        >
          <UserPlus className="h-6 w-6 mb-2 text-[#be965b]" />
          <Link href="/cms/customers/new">Add Customer</Link>
        </Button>

        <Button
          variant="outline"
          className="flex flex-col items-center justify-center py-6"
        >
          <FileText className="h-6 w-6 mb-2 text-[#be965b]" />
          <Link href="/cms/blog/new">Add Post</Link>
        </Button>

        <Button
          variant="outline"
          className="flex flex-col items-center justify-center py-6"
        >
          <Upload className="h-6 w-6 mb-2 text-[#be965b]" />
          <Link href="/cms/gallery/new">Add Gallery Item</Link>
        </Button>

        <Button
          variant="outline"
          className="flex flex-col items-center justify-center py-6"
        >
          <Download className="h-6 w-6 mb-2 text-[#be965b]" />
          <span className="text-sm">Export Data</span>
        </Button>
      </div>
    </div>
  );
}

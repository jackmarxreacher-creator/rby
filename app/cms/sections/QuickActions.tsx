"use client";

import { Button } from "@/components/ui/button";
import { UserPlus, FileText, Upload, Download } from "lucide-react";

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
          <span className="text-sm">Add Customer</span>
        </Button>

        <Button
          variant="outline"
          className="flex flex-col items-center justify-center py-6"
        >
          <FileText className="h-6 w-6 mb-2 text-[#be965b]" />
          <span className="text-sm">New Blog Post</span>
        </Button>

        <Button
          variant="outline"
          className="flex flex-col items-center justify-center py-6"
        >
          <Upload className="h-6 w-6 mb-2 text-[#be965b]" />
          <span className="text-sm">Upload Media</span>
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

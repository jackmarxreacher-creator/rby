"use client";

import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { RequestTable } from "./_components/RequestTable";

type Request = any; // your prisma shape

export default function RequestsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [requests, setRequests] = useState<Request[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const { toast } = useToast();

  const [customerName, setCustomerName] = useState(searchParams.get("customerName") ?? "");
  const [productName, setProductName] = useState(searchParams.get("productName") ?? "");
  const [status, setStatus] = useState(searchParams.get("status") ?? "");

  const fetchRequests = async () => {
    setLoading(true);
    const usp = new URLSearchParams();
  if (customerName) usp.set("customerName", customerName);
  if (productName) usp.set("productName", productName);
  if (status) usp.set("status", status);
    const res = await fetch(`/api/requests?${usp.toString()}`);
    const json = await res.json();
    setRequests(Array.isArray(json) ? json : []);
    setLoading(false);
  };

  useEffect(() => {
    fetchRequests();
    const usp = new URLSearchParams(searchParams.toString());
    if (customerName) usp.set("customerName", customerName); else usp.delete("customerName");
    if (productName) usp.set("productName", productName); else usp.delete("productName");
    if (status) usp.set("status", status); else usp.delete("status");
    router.replace(`/cms/requests?${usp.toString()}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [customerName, productName, status]);

  const exportFile = async (format: "excel" | "pdf") => {
  const payload = selectedIds.length ? { format, filters: { selectedIds } } : { format, filters: { customerName, productName, status } };
    // create persistent toast while export is prepared
    const handle = toast({ title: "Export in progress", description: `Preparing ${format.toUpperCase()} export...`, duration: 1000 * 60 * 5 });
    try {
      const res = await fetch("/api/export/requests", { method: "POST", body: JSON.stringify(payload) });
      if (!res.ok) throw new Error("Export failed");
      const arrayBuffer = await res.arrayBuffer();
      const contentType = res.headers.get("Content-Type") ?? "application/octet-stream";
      const cd = res.headers.get("Content-Disposition") ?? "";
      let filename = "export";
      const m = cd.match(/filename\*?=([^;]+)/i);
      if (m && m[1]) {
        filename = m[1].trim();
        filename = filename.replace(/^UTF-8''/, "").replace(/^\"|\"$/g, '');
      }
      if (!filename.includes('.')) {
        if (contentType.includes('spreadsheet')) filename = `${filename}.xlsx`;
        else if (contentType === 'application/pdf') filename = `${filename}.pdf`;
      }
      const blob = new Blob([arrayBuffer], { type: contentType });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      a.click();
      window.URL.revokeObjectURL(url);
      handle.update({ id: handle.id, title: "Export ready", description: `Your ${format.toUpperCase()} export is ready.`, duration: 4000 });
    } catch (err: any) {
      handle.update({ id: handle.id, title: "Export failed", description: err?.message ?? "Unknown error", duration: 6000 });
    }
  };

  const exportSelected = async (format: "excel" | "pdf") => {
    // Deprecated: selection-export handlers removed; export functionality lives in the main export controls.
  };

  return (
    <div className="p-6 bg-[#fcfbf8] min-h-screen">
      <div className="flex items-center justify-between p-5 shadow-lg mb-8">
        {/* <h1 className="text-3xl font-bold text-[#1c1c1c]">Order Requests</h1> */}

        <div className="flex flex-wrap items-center gap-3 w-full">
          <div className="flex flex-wrap items-center gap-2 flex-1 min-w-0">
            <input
              className="border rounded px-2 py-1 text-sm w-full sm:w-auto"
              placeholder="Customer name"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
            />
            <input
              className="border rounded px-2 py-1 text-sm w-full sm:w-auto"
              placeholder="Product name"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
            />
            <select className="border rounded px-2 py-1 text-sm" value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="">All statuses</option>
              <option value="PENDING">Pending</option>
              <option value="RECEIVED">Received</option>
              <option value="PROCESSING">Processing</option>
              <option value="SHIPPED">Shipped</option>
              <option value="COMPLETED">Completed</option>
              <option value="CANCELED">Canceled</option>
            </select>
          </div>

          <div className="flex items-center gap-2 mt-2 sm:mt-0">
            <Button size="sm" variant="outline" onClick={() => exportFile("excel")} disabled={loading}>
              Excel
            </Button>
            <Button size="sm" variant="outline" onClick={() => exportFile("pdf")} disabled={loading}>
              PDF
            </Button>

            <Button size="sm" className="bg-[#be965b] px-4 hover:bg-[#a88248] text-black">
              <Link href="/cms/requests/new">New</Link>
            </Button>
          </div>
        </div>
      </div>

      {requests.length === 0 && !loading ? (
        <div className="text-center py-10">
          <p className="text-[#4a4a4a] text-lg">No requests match filters.</p>
          <Link href="/cms/requests/new">
            <Button variant="outline" className="mt-4 border-[#be965b] text-[#be965b] hover:bg-[#f3ede5]">
              Create your first request
            </Button>
          </Link>
        </div>
      ) : (
        <div>
          <div className="flex gap-2 mb-4 items-center">
            <div className="text-sm text-[#4a4a4a]">Selected:
              <span className="inline-block bg-[#be965b] text-white text-xs px-2 py-0.5 rounded-full ml-2">{selectedIds.length}</span>
            </div>
            <Button size="sm" variant="outline" onClick={async () => {
              // fetch all matching request ids and select them
              const usp = new URLSearchParams();
              if (customerName) usp.set("customerName", customerName);
              if (productName) usp.set("productName", productName);
              if (status) usp.set("status", status);
              const res = await fetch(`/api/requests?${usp.toString()}`);
              if (!res.ok) return toast({ title: "Failed", description: "Could not fetch request ids" });
              const all = await res.json();
              const ids = Array.isArray(all) ? all.map((r: any) => r.id) : [];
              setSelectedIds(ids);
              toast({ title: "Selected", description: `${ids.length} requests selected` });
            }}>
              Select all matching
            </Button>
          </div>
          <RequestTable requests={requests} selectedIds={selectedIds} onSelectionChange={(ids) => setSelectedIds(ids)} />
        </div>
      )}
    </div>
  );
}




// import { getRequests } from "./actions";
// import { RequestTable } from "./_components/RequestTable";
// import { Button } from "@/components/ui/button";
// import Link from "next/link";

// export default async function RequestsPage() {
//   const requests = await getRequests(); // table only

//   return (
//     <div className="p-6 bg-[#fcfbf8] min-h-screen">
//       <div className="flex items-center justify-between p-5 shadow-lg mb-8">
//         <h1 className="text-3xl font-bold text-[#1c1c1c]">Order Requests</h1>

//         <Button className="bg-[#be965b] hover:bg-[#a88248] text-black">
//   );


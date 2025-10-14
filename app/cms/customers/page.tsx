"use client";

import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ViewToggle } from "@/components/ui/ViewToggle";
import CustomerCard from "./_components/CustomerCard";
import { CustomersTable } from "./_components/CustomersTable";
import { ViewType } from "@/components/ui/ViewToggle"; // <-- import union

type Customer = {
  id: string;
  name: string;
  email: string;
  phone: string;
  businessName: string | null;
  businessType: string;
  location: string | null;
  address: string | null;
};

export default function CustomersPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const view = searchParams.get("view");

  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const { toast } = useToast();

  // filter state
  const [customerName, setCustomerName] = useState(searchParams.get("customerName") ?? "");
  const [businessType, setBusinessType] = useState(searchParams.get("businessType") ?? "");

  const currentView: ViewType = view === "table" ? "table" : "card"; // <-- cast here

  const fetchCustomers = async () => {
    setLoading(true);
  const usp = new URLSearchParams();
  if (customerName) usp.set("customerName", customerName);
    if (businessType) usp.set("businessType", businessType);
    const res = await fetch(`/api/customers?${usp.toString()}`);
    const json = await res.json();
    setCustomers(Array.isArray(json) ? json : []);
    setLoading(false);
  };

  useEffect(() => {
    fetchCustomers();
    const usp = new URLSearchParams(searchParams.toString());
    if (customerName) usp.set("customerName", customerName); else usp.delete("customerName");
    if (businessType) usp.set("businessType", businessType); else usp.delete("businessType");
    router.replace(`/cms/customers?${usp.toString()}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [customerName, businessType]);

  const exportFile = async (format: "excel" | "pdf") => {
    const payload = selectedIds.length ? { format, filters: { selectedIds } } : { format, filters: { customerName, businessType } };
    // create a persistent toast while export is prepared (long duration)
    const handle = toast({ title: "Export in progress", description: `Preparing ${format.toUpperCase()} export...`, duration: 1000 * 60 * 5 });
    try {
      const res = await fetch("/api/export/customers", { method: "POST", body: JSON.stringify(payload) });
      if (!res.ok) throw new Error("Export failed");
      const arrayBuffer = await res.arrayBuffer();
      const contentType = res.headers.get("Content-Type") ?? "application/octet-stream";
      const cd = res.headers.get("Content-Disposition") ?? "";
      let filename = "export";
      const m = cd.match(/filename\*?=([^;]+)/i);
      if (m && m[1]) {
        filename = m[1].trim();
        // strip UTF-8'' prefix and surrounding quotes
        filename = filename.replace(/^UTF-8''/, "").replace(/^\"|\"$/g, '');
      }
      // ensure extension matches content type
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
      // update toast to success and shorten duration
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
        {/* <h1 className="text-3xl font-bold text-[#1c1c1c]">Customers</h1> */}

          <div className="flex flex-wrap items-center gap-3 w-full">
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <ViewToggle current={currentView} basePath="/cms/customers" />

              <select
                className="border rounded px-2 py-1 text-sm"
                value={businessType}
                onChange={(e) => setBusinessType(e.target.value)}
              >
                <option value="">All Types</option>
                <option value="Retail">Retail</option>
                <option value="Wholesale">Wholesale</option>
              </select>

              <input
                className="border rounded px-2 py-1 text-sm min-w-0 w-full sm:w-auto"
                placeholder="Customer name"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
              />
            </div>

            <div className="flex items-center gap-2 mt-2 sm:mt-0">
              <Button size="sm" variant="outline" onClick={() => exportFile("excel")} disabled={loading}>
                Excel
              </Button>
              <Button size="sm" variant="outline" onClick={() => exportFile("pdf")} disabled={loading}>
                PDF
              </Button>

              <Button className="bg-[#be965b] hover:bg-[#a88248] text-black">
                <Link href="/cms/customers/new">Add Customer</Link>
              </Button>
            </div>
          </div>
      </div>

      {customers.length === 0 && !loading ? (
        <div className="text-center py-10">
          <p className="text-[#4a4a4a] text-lg">No customers match filters.</p>
          <Link href="/cms/customers/new">
            <Button variant="outline" className="mt-4 border-[#be965b] text-[#be965b] hover:bg-[#f3ede5]">
              Create your first customer
            </Button>
          </Link>
        </div>
      ) : currentView === "table" ? (
        <div>
          <div className="flex gap-2 mb-4 items-center">
            <div className="text-sm text-[#4a4a4a]">Selected:
              <span className="inline-block bg-[#be965b] text-white text-xs px-2 py-0.5 rounded-full ml-2">{selectedIds.length}</span>
            </div>
            <Button size="sm" variant="outline" onClick={async () => {
              // fetch all matching customer ids and select them
              const usp = new URLSearchParams();
              if (customerName) usp.set("customerName", customerName);
              if (businessType) usp.set("businessType", businessType);
              const res = await fetch(`/api/customers?${usp.toString()}`);
              if (!res.ok) return toast({ title: "Failed", description: "Could not fetch customer ids" });
              const all = await res.json();
              const ids = Array.isArray(all) ? all.map((r: any) => r.id) : [];
              setSelectedIds(ids);
              toast({ title: "Selected", description: `${ids.length} customers selected` });
            }}>
              Select all matching
            </Button>
          </div>
          <CustomersTable customers={customers} selectedIds={selectedIds} onSelectionChange={(ids) => setSelectedIds(ids)} />
        </div>
      ) : (
        <CustomerCard customers={customers} />
      )}
    </div>
  );
}




// import { Suspense } from "react";
// import { getCustomers } from "./actions";
// import  CustomerCard  from "./_components/CustomerCard";
// import { CustomersTable } from "./_components/CustomersTable";
// import { Button } from "@/components/ui/button";
// import Link from "next/link";
// import { ViewToggle } from "@/components/ui/ViewToggle";

// export default async function CustomersPage({
//   searchParams,
// }: {
//   searchParams: Promise<{ view?: string }>;
// }) {
//   const { view } = await searchParams;
//   const customers = await getCustomers();
//   const currentView = view === "table" ? "table" : "card";

//   return (
//     <div className="p-6 bg-[#fcfbf8] min-h-screen">
//       <div className="flex items-center justify-between p-5 shadow-lg mb-8">
//         <h1 className="text-3xl font-bold text-[#1c1c1c]">Customers</h1>

//         <div className="flex items-center gap-4">
//           <ViewToggle current={currentView} basePath="/cms/customers" />
//           <Button className="bg-[#be965b] hover:bg-[#a88248] text-black">
//             <Link href="/cms/customers/new">Add Customer</Link>
//           </Button>
//         </div>
//       </div>

//       {customers.length === 0 ? (
//         <div className="text-center py-10">
//           <p className="text-[#4a4a4a] text-lg">No customers yet.</p>
//           <Button
//             variant="outline"
//             className="mt-4 border-[#be965b] text-[#be965b] hover:bg-[#f3ede5]"
//           >
//             <Link href="/cms/customers/new">Create your first customer</Link>
//           </Button>
//         </div>
//       ) : currentView === "table" ? (
//         <CustomersTable customers={customers} />
//       ) : (
//         <CustomerCard customers={customers} />
//       )}
//     </div>
//   );
// }





// import { Suspense } from "react";
// import { getCustomers } from "./actions";
// import { CustomerCard } from "./_components/CustomerCard";
// import { CustomersTable } from "./_components/CustomersTable";
// import { Button } from "@/components/ui/button";
// import Link from "next/link";
// import { ViewToggle } from "@/components/ui/ViewToggle";

// export default async function CustomersPage({
//   searchParams,
// }: {
//   searchParams: Promise<{ view?: string }>;
// }) {
//   const { view } = await searchParams;
//   const customers = await getCustomers();
//   const currentView = view === "table" ? "table" : "card";

//   return (
//     <div className="p-6 bg-[#fcfbf8] min-h-screen">
//       <div className="flex items-center justify-between p-5 shadow-lg mb-8">
//         <h1 className="text-3xl font-bold text-[#1c1c1c]">Customers</h1>

//         <div className="flex items-center gap-4">
//           <ViewToggle current={currentView} basePath="/cms/customers" />
//           <Button className="bg-[#be965b] hover:bg-[#a88248] text-black">
//             <Link href="/cms/customers/new">Add Customer</Link>
//           </Button>
//         </div>
//       </div>

//       {customers.length === 0 ? (
//         <div className="text-center py-10">
//           <p className="text-[#4a4a4a] text-lg">No customers yet.</p>
//           <Button
//             variant="outline"
//             className="mt-4 border-[#be965b] text-[#be965b] hover:bg-[#f3ede5]"
//           >
//             <Link href="/cms/customers/new">Create your first customer</Link>
//           </Button>
//         </div>
//       ) : currentView === "table" ? (
//         <CustomersTable customers={customers} />
//       ) : (
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//           {customers.map((c) => (
//             <CustomerCard key={c.id} customer={c} />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }



// import { getCustomers } from "./actions";
// import { CustomersTable } from "./_components/CustomersTable";
// import { Button } from "@/components/ui/button";
// import Link from "next/link";

// export default async function CustomersPage() {
//   const customers = await getCustomers();

//   return (
//     <section className="p-8">
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-2xl font-bold">Customers</h1>
//         <Button>
//           <Link href="/cms/customers/new">Add Customer</Link>
//         </Button>
//       </div>
//       <CustomersTable customers={customers} />
//     </section>
//   );
// }

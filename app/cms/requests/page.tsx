import { getRequests } from "./actions";
import { RequestTable } from "./_components/RequestTable";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function RequestsPage() {
  const requests = await getRequests(); // table only

  return (
    <div className="p-6 bg-[#fcfbf8] min-h-screen">
      <div className="flex items-center justify-between p-5 shadow-lg mb-8">
        <h1 className="text-3xl font-bold text-[#1c1c1c]">Order Requests</h1>

        <Button className="bg-[#be965b] hover:bg-[#a88248] text-black">
          <Link href="/cms/requests/new">Add Request</Link>
        </Button>
      </div>

      {requests.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-[#4a4a4a] text-lg">No requests yet.</p>
          <Button
            variant="outline"
            className="mt-4 border-[#be965b] text-[#be965b] hover:bg-[#f3ede5]"
          >
            <Link href="/cms/requests/new">Create your first request</Link>
          </Button>
        </div>
      ) : (
        <RequestTable requests={requests} />
      )}
    </div>
  );
}


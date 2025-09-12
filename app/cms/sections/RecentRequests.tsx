"use client";

const requests = [
  {
    id: "RBY-2024-001",
    item: "Coca-Cola 500ml x 24",
    status: "Completed",
  },
  {
    id: "RBY-2024-002",
    item: "Fanta Orange 330ml x 48",
    status: "Pending",
  },
  {
    id: "RBY-2024-003",
    item: "Sprite 1L x 12",
    status: "Processing",
  },
];

const statusColors: Record<string, string> = {
  Completed: "bg-green-100 text-green-600",
  Pending: "bg-yellow-100 text-yellow-600",
  Processing: "bg-blue-100 text-blue-600",
};

export default function RecentRequests() {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-semibold text-lg">Recent Requests</h2>
        <button className="text-sm text-[#be965b] hover:underline">
          View All
        </button>
      </div>
      <ul className="space-y-4">
        {requests.map((r, idx) => (
          <li
            key={idx}
            className="flex items-center justify-between text-sm border-b pb-2 last:border-none"
          >
            <div>
              <p className="font-medium text-gray-800">Order #{r.id}</p>
              <p className="text-xs text-gray-500">{r.item}</p>
            </div>
            <span
              className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[r.status]}`}
            >
              {r.status}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

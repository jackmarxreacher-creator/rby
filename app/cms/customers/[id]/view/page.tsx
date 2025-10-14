import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';

type Props = { params: Promise<{ id: string }> };

export default async function CustomerViewPage({ params }: Props) {
  const { id } = await params;
  // fetch full model (use model type from generated client which includes uom and casePack)
  const customer = await prisma.customer.findUnique({ where: { id } });
  if (!customer) return notFound();

  // counts
  const [totalRequests, completedRequests, pendingRequests] = await Promise.all([
    prisma.order.count({ where: { customerId: id } }),
    prisma.order.count({ where: { customerId: id, status: 'COMPLETED' } }),
    prisma.order.count({ where: { customerId: id, NOT: [{ status: 'COMPLETED' }, { status: 'CANCELED' }] } }),
  ]);

  // recent requests (5)
  const recentRequests = await prisma.order.findMany({
    where: { customerId: id },
    orderBy: { createdAt: 'desc' },
    take: 5,
    include: { orderItems: true },
  });

  const avatar = customer.image ?? '/images/user.jpg';

  return (
    <main className="max-w-6xl mx-auto p-6">
      <div className="mb-6 flex items-start justify-between shadow-lg p-4 rounded-lg gap-4">
        <div className="flex items-center gap-4">
          <Link href="/cms/customers" className="text-sm text-slate-500 hover:underline">← Back</Link>
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 rounded-full overflow-hidden bg-gray-100">
              <Image src={avatar} alt={customer.name} width={80} height={80} unoptimized className="object-cover w-full h-full" />
            </div>
            <div>
              <h1 className="text-2xl font-semibold">{customer.name}</h1>
              <p className="text-sm text-slate-500">{customer.businessName ?? ''}</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <a href={`/api/export/customers/${id}?format=pdf`} className="inline-flex items-center gap-2 px-3 py-1.5 bg-slate-800 text-white rounded-md text-sm hover:opacity-90">Export PDF</a>
          <a href={`/api/export/customers/${id}?format=excel`} className="inline-flex items-center gap-2 px-3 py-1.5 bg-amber-600 text-white rounded-md text-sm hover:opacity-90">Export Excel</a>
        </div>
      </div>

      <section className="bg-white shadow-sm rounded-lg overflow-hidden">
        <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1 flex gap-4 items-start">
            <div className="flex-shrink-0">
              <div className="w-28 h-28 rounded-xl overflow-hidden bg-gray-100">
                <Image src={avatar} alt={customer.name} width={112} height={112} unoptimized className="object-cover w-full h-full" />
              </div>
            </div>
            <div>
              <h2 className="text-xl font-semibold">{customer.name}</h2>
              <p className="text-sm text-slate-500 mt-1">{customer.businessName ?? ''}</p>

              <div className="mt-4 flex flex-wrap gap-2">
                <Link href={`/cms/requests?${new URLSearchParams({ customerId: id }).toString()}`} className="inline-flex items-center gap-3 px-3 py-1 rounded-full bg-slate-50 border hover:bg-slate-100 transition">
                  <span className="text-sm text-slate-700">All</span>
                  <span className="inline-flex items-center justify-center bg-white border text-xs px-2 py-0.5 rounded-full">{totalRequests}</span>
                </Link>

                <Link href={`/cms/requests?${new URLSearchParams({ customerId: id, status: 'PENDING' }).toString()}`} className="inline-flex items-center gap-3 px-3 py-1 rounded-full bg-amber-50 border hover:bg-amber-100 transition">
                  <span className="text-sm text-amber-700">Pending</span>
                  <span className="inline-flex items-center justify-center bg-amber-100 text-xs px-2 py-0.5 rounded-full">{pendingRequests}</span>
                </Link>

                <Link href={`/cms/requests?${new URLSearchParams({ customerId: id, status: 'COMPLETED' }).toString()}`} className="inline-flex items-center gap-3 px-3 py-1 rounded-full bg-emerald-50 border hover:bg-emerald-100 transition">
                  <span className="text-sm text-emerald-700">Completed</span>
                  <span className="inline-flex items-center justify-center bg-emerald-100 text-xs px-2 py-0.5 rounded-full">{completedRequests}</span>
                </Link>
              </div>

              <div className="mt-4 text-sm text-slate-600 space-y-1">
                {customer.email && <div><strong className="text-slate-700">Email:</strong> {customer.email}</div>}
                {customer.phone && <div><strong className="text-slate-700">Phone:</strong> {customer.phone}</div>}
                {customer.address && <div><strong className="text-slate-700">Address:</strong> {customer.address}</div>}
                {/* UOM and Case Pack intentionally hidden on customer detail (displayed on product and request pages only) */}
              </div>
            </div>
          </div>

          <div className="md:col-span-2 grid grid-cols-3 gap-4">
            <div className="p-4 bg-white border rounded-lg shadow-sm flex flex-col justify-between">
              <div className="text-sm text-slate-500">Total requests</div>
              <div className="mt-2 text-2xl font-medium">{totalRequests}</div>
              <div className="mt-3 text-xs text-slate-400">All-time</div>
            </div>

            <div className="p-4 bg-white border rounded-lg shadow-sm flex flex-col justify-between">
              <div className="text-sm text-slate-500">Pending</div>
              <div className="mt-2 text-2xl font-medium text-amber-700">{pendingRequests}</div>
              <div className="mt-3 text-xs text-slate-400">Not completed / not canceled</div>
            </div>

            <div className="p-4 bg-white border rounded-lg shadow-sm flex flex-col justify-between">
              <div className="text-sm text-slate-500">Completed</div>
              <div className="mt-2 text-2xl font-medium text-emerald-600">{completedRequests}</div>
              <div className="mt-3 text-xs text-slate-400">Successful deliveries</div>
            </div>
          </div>
        </div>

        <div className="border-t bg-gray-50 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Recent requests</h2>
            <Link href={`/cms/requests?customerId=${id}`} className="text-sm text-slate-600 hover:underline">View all</Link>
          </div>

          <div className="space-y-3">
            {recentRequests.length === 0 ? (
              <div className="text-sm text-slate-500">No recent requests</div>
            ) : (
              recentRequests.map((r) => (
                <Link key={r.id} href={`/cms/requests/${r.id}/view`} className="block p-3 bg-white rounded-lg border hover:shadow transition">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm font-medium">Order #{r.id}</div>
                      <div className="text-xs text-slate-500 mt-1">{new Date(r.createdAt).toLocaleString()}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium">GHS {r.totalAmount ?? ''}</div>
                      <div className="mt-1 text-xs"><span className="inline-flex items-center px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 text-xs">{r.status}</span></div>
                    </div>
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>
      </section>
    </main>
  );
}

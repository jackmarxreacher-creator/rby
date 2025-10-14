import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import Image from 'next/image';
import StatusSelect from '../../_components/StatusSelect';
import { notFound } from 'next/navigation';

type Props = { params: Promise<{ id: string }> };

export default async function RequestViewPage({ params }: Props) {
  const { id } = await params;
  const order = await prisma.order.findUnique({
    where: { id },
    include: { customer: true, orderItems: { include: { product: true } } },
  });
  if (!order) return notFound();

  const subtotal = order.orderItems.reduce((s, it) => s + (it.amount ?? it.quantity * it.price), 0);
  const businessTypeLabel = order.customer?.businessType
    ? order.customer.businessType === 'WHOLESALE'
      ? 'Wholesale'
      : order.customer.businessType === 'RETAIL'
      ? 'Retail'
      : order.customer.businessType
    : undefined;

  return (
    <main className="max-w-6xl mx-auto p-6">
      <div className="mb-6 flex items-start justify-between">
        <div>
          <Link href="/cms/requests" className="text-sm text-slate-500 hover:underline">← Back to requests</Link>
          <h1 className="text-2xl font-bold mt-3">Request Details</h1>
          <div className="mt-2 text-sm text-slate-600">Order #{order.id}</div>
        </div>

        <div className="flex items-center gap-2">
          <a href={`/api/export/requests/${id}?format=pdf`} className="inline-flex items-center gap-2 px-3 py-1.5 bg-slate-800 text-white rounded-md text-sm hover:opacity-90">PDF</a>
          <a href={`/api/export/requests/${id}?format=excel`} className="inline-flex items-center gap-2 px-3 py-1.5 bg-amber-600 text-white rounded-md text-sm hover:opacity-90">Excel</a>
        </div>
      </div>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <aside className="md:col-span-1 bg-white rounded-lg p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold">Customer</h2>
              <div className="mt-1 flex items-center gap-2">
                <Link href={`/cms/customers/${order.customer?.id}/view`} className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full overflow-hidden bg-gray-100">
                    <Image src={order.customer?.image ?? '/images/user.jpg'} alt={order.customer?.name ?? 'Customer avatar'} width={28} height={28} unoptimized className="object-cover w-full h-full" />
                  </div>
                  <span className="text-sm text-slate-700 hover:underline">{order.customer?.name}</span>
                </Link>
                <Link href={`/cms/customers/${order.customer?.id}`} className="text-xs text-slate-600 border px-2 py-0.5 rounded hover:bg-slate-100">Edit</Link>
              </div>

              <div className="text-xs text-slate-500 mt-1">{order.customer?.email}</div>
              {order.customer?.phone ? (
                <div className="text-xs text-slate-500 mt-2">
                  Phone: <a href={`tel:${order.customer.phone}`} className="text-sm text-slate-700 hover:underline">{order.customer.phone}</a>
                </div>
              ) : null}
              {businessTypeLabel ? (
                <div className="text-xs text-slate-500 mt-1">Business type: <span className="text-sm text-slate-700">{businessTypeLabel}</span></div>
              ) : null}
            </div>
            <div className="text-right">
              <div className="text-sm text-slate-500">Status</div>
                <div className="mt-1">
                  <StatusSelect id={order.id} current={order.status} />
                </div>
            </div>
          </div>

          <div className="mt-4 border-t pt-4">
            <div className="text-sm text-slate-500">Created</div>
            <div className="text-sm text-slate-700 mt-1">{new Date(order.createdAt).toLocaleString()}</div>
          </div>

          <div className="mt-4 border-t pt-4">
            <h3 className="text-sm text-slate-500">Payment</h3>
            <div className="mt-1 text-sm font-medium">GHS {order.totalAmount}</div>
          </div>
        </aside>

        <div className="md:col-span-2">
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <h3 className="text-lg font-semibold mb-3">Items</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead className="text-left text-xs text-slate-500">
                  <tr>
                    <th className="pb-2">Product</th>
                    <th className="pb-2">UOM</th>
                    <th className="pb-2">Case Pack</th>
                    <th className="pb-2">Qty</th>
                    <th className="pb-2">Price</th>
                    <th className="pb-2">Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {order.orderItems.map((it) => (
                    <tr key={it.id} className="align-top">
                      <td className="py-3">{it.product?.name}</td>
                      <td className="py-3">{(it.product as any)?.uom ?? '-'}</td>
                      <td className="py-3">{(it.product as any)?.casePack ?? '-'}</td>
                      <td className="py-3">{it.quantity}</td>
                      <td className="py-3">GHS {it.price}</td>
                      <td className="py-3">GHS {it.amount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-4 flex justify-end">
              <div className="w-full max-w-md">
                <div className="flex justify-between text-sm text-slate-600">
                  <div>Subtotal</div>
                  <div>GHS {subtotal}</div>
                </div>
                <div className="flex justify-between text-sm text-slate-600 mt-2">
                  <div>Tax</div>
                  <div>GHS 0.00</div>
                </div>
                <div className="flex justify-between text-lg font-medium mt-3">
                  <div>Total</div>
                  <div>GHS {order.totalAmount}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

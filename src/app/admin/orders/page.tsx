// src/app/admin/orders/page.tsx
import { prisma } from "@/lib/prisma";
import { format } from "date-fns";

export default async function AdminOrdersPage() {
  const orders = await prisma.order.findMany({
    include: {
      items: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Orders</h1>
      <div className="space-y-4">
        {orders.map((order: any) => (
          <div key={order.id} className="border rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <div>
                <h3 className="font-medium">
                  Order {String(order.id).slice(-8)}
                </h3>
                <p className="text-sm text-gray-600">
                  {order.email} • {format(order.createdAt, "MMM d, yyyy")}
                </p>
              </div>
              <div className="text-right">
                <p className="font-medium">
                  NT$ {(order.amount / 100).toFixed(0)}
                </p>
                <StatusBadge status={order.status} />
              </div>
            </div>

            <div className="space-y-1">
              {order.items.map((item: any) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span>
                    {item.productName} × {item.qty}
                  </span>
                  <span>NT$ {(item.unitPrice / 100).toFixed(0)}</span>
                </div>
              ))}
            </div>

            <div className="mt-3 pt-3 border-t">
              <StatusUpdateForm
                orderId={String(order.id)}
                currentStatus={order.status}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  // 依你的 schema 列舉鍵值配置顏色
  const colors: Record<string, string> = {
    pending: "bg-yellow-100 text-yellow-800",
    paid: "bg-green-100 text-green-800",
    fulfilled: "bg-blue-100 text-blue-800",
    shipped: "bg-blue-100 text-blue-800",
    canceled: "bg-red-100 text-red-800",
  };

  const klass = colors[status] ?? "bg-gray-100 text-gray-800";
  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${klass}`}>
      {status}
    </span>
  );
}

function StatusUpdateForm({
  orderId,
  currentStatus,
}: {
  orderId: string;
  currentStatus: string;
}) {
  return (
    <form action={`/api/admin/orders/${orderId}/status`} method="POST" className="flex gap-2">
      <select
        name="status"
        defaultValue={currentStatus}
        className="border rounded px-2 py-1 text-sm"
      >
        {/* 這裡的選項要與你的 Prisma enum 完全一致 */}
        <option value="pending">Pending</option>
        <option value="paid">Paid</option>
        <option value="fulfilled">Fulfilled</option>
        <option value="shipped">Shipped</option>
        <option value="canceled">Canceled</option>
      </select>
      <button type="submit" className="bg-black text-white px-3 py-1 rounded text-sm">
        Update
      </button>
    </form>
  );
}
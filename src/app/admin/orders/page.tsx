// src/app/admin/orders/page.tsx
import { prisma } from "@/lib/prisma";
import { format } from "date-fns";

type OrderWithItems = Awaited<ReturnType<typeof prisma.order.findMany>>[number];
type OrderStatus = OrderWithItems["status"];

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
        {orders.map((order: OrderWithItems) => (
          <div key={order.id} className="border rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <div>
                <h3 className="font-medium">
                  Order {String(order.id).slice(-8)}
                </h3>
                <p className="text-sm text-gray-600">
                  {order.customerEmail} • {format(order.createdAt, "MMM d, yyyy")}
                </p>
              </div>
              <div className="text-right">
                <p className="font-medium">
                  NT$ {(order.total / 100).toFixed(0)}
                </p>
                <StatusBadge status={order.status as OrderStatus} />
              </div>
            </div>

            <div className="space-y-1">
              {order.items.map((item: OrderWithItems["items"][number]) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span>
                    {item.name} × {item.quantity}
                  </span>
                  <span>NT$ {(item.price / 100).toFixed(0)}</span>
                </div>
              ))}
            </div>

            <div className="mt-3 pt-3 border-t">
              <StatusUpdateForm
                orderId={String(order.id)}
                currentStatus={order.status as OrderStatus}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: OrderStatus }) {
  // 依你的 schema 列舉鍵值配置顏色
  const colors: Record<OrderStatus, string> = {
    PENDING: "bg-yellow-100 text-yellow-800",
    PAID: "bg-green-100 text-green-800",
    SHIPPED: "bg-blue-100 text-blue-800",
    DELIVERED: "bg-gray-100 text-gray-800",
    CANCELLED: "bg-red-100 text-red-800",
    // 若你的 enum 是 CANCELED/FULFILLED 等，請在此同步調整並刪除不需要的鍵
  } as Record<OrderStatus, string>;

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
  currentStatus: OrderStatus;
}) {
  return (
    <form action={`/api/admin/orders/${orderId}/status`} method="POST" className="flex gap-2">
      <select
        name="status"
        defaultValue={currentStatus}
        className="border rounded px-2 py-1 text-sm"
      >
        {/* 這裡的選項要與你的 Prisma enum 完全一致 */}
        <option value="PENDING">Pending</option>
        <option value="PAID">Paid</option>
        <option value="SHIPPED">Shipped</option>
        <option value="DELIVERED">Delivered</option>
        <option value="CANCELLED">Cancelled</option>
        {/* 如果你的 enum 用的是 FULFILLED/CANCELED，請把上面改成對應值 */}
      </select>
      <button type="submit" className="bg-black text-white px-3 py-1 rounded text-sm">
        Update
      </button>
    </form>
  );
}
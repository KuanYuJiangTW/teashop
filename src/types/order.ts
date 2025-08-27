// src/types/order.ts  (新建這個檔)
import type { Order, OrderItem, Product } from "@prisma/client";

export type OrderWithItems = Order & {
  items: (OrderItem & { product: Product })[];
};
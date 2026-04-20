import { client } from "./client";
import type { Order, OrderSummary } from "../types/order";

// 取得訂單列表（輕量摘要）
export const fetchOrders = (): Promise<OrderSummary[]> =>
	client.get<OrderSummary[]>("/orders").then((res) => res.data);

// 取得單筆訂單詳情（完整 discriminated union）
export const fetchOrderById = (id: string): Promise<Order> =>
	client.get<Order>(`/orders/${id}`).then((res) => res.data);

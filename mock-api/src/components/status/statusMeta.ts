import type { OrderStatus } from "../../types/order";

// 每個訂單狀態對應的中文顯示與 Bootstrap contextual class
export const STATUS_META: Record<OrderStatus, { label: string; badgeClass: string; }> = {
	unpaid: { label: "待付款", badgeClass: "bg-secondary" },
	paid: { label: "備貨中", badgeClass: "bg-primary" },
	shipped: { label: "已出貨", badgeClass: "bg-info text-dark" },
	delivered: { label: "已送達", badgeClass: "bg-success" },
	refunded: { label: "已退款", badgeClass: "bg-warning text-dark" },
	cancelled: { label: "已取消", badgeClass: "bg-danger" },
};

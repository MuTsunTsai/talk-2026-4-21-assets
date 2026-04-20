// 訂單狀態：以字面量聯合作為 discriminated union 的判別值
export type OrderStatus =
	| "unpaid"
	| "paid"
	| "shipped"
	| "delivered"
	| "refunded"
	| "cancelled";

// 訂單項目（每張訂單的商品明細）
export interface OrderItem {
	sku: string;
	name: string;
	quantity: number;
	unitPrice: number;
}

// 客戶資訊
export interface Customer {
	name: string;
	phone: string;
	email: string;
	address: string;
}

// 所有訂單共有的基礎欄位
interface OrderBase {
	id: string;
	orderNumber: string;
	customer: Customer;
	items: OrderItem[];
	totalAmount: number;
	createdAt: string;
}

// 未付款：顯示付款入口與期限
export interface UnpaidOrder extends OrderBase {
	status: "unpaid";
	paymentDeadline: string;
	paymentUrl: string;
}

// 已付款、尚未出貨：顯示備貨中與預計出貨日
export interface PaidOrder extends OrderBase {
	status: "paid";
	paidAt: string;
	estimatedShipDate: string;
}

// 物流進度：出貨後的每個里程事件
export interface ShippingEvent {
	timestamp: string;
	location: string;
	note: string;
}

// 已出貨：物流資訊 + 追蹤時間軸
export interface ShippedOrder extends OrderBase {
	status: "shipped";
	paidAt: string;
	shippedAt: string;
	carrier: string;
	trackingNumber: string;
	shippingProgress: ShippingEvent[];
}

// 已送達：送達時間 + 評價狀態
export interface DeliveredOrder extends OrderBase {
	status: "delivered";
	paidAt: string;
	shippedAt: string;
	deliveredAt: string;
	reviewed: boolean;
}

// 已退款：退款詳情
export interface RefundedOrder extends OrderBase {
	status: "refunded";
	refundReason: string;
	refundAmount: number;
	refundedAt: string;
}

// 已取消：取消原因與時間
export interface CancelledOrder extends OrderBase {
	status: "cancelled";
	cancellationReason: string;
	cancelledAt: string;
}

// 訂單聯合型別：元件依 status 進行 narrowing
export type Order =
	| UnpaidOrder
	| PaidOrder
	| ShippedOrder
	| DeliveredOrder
	| RefundedOrder
	| CancelledOrder;

// 列表用的輕量摘要（不含物流時間軸等重欄位）
export interface OrderSummary {
	id: string;
	orderNumber: string;
	customerName: string;
	totalAmount: number;
	status: OrderStatus;
	createdAt: string;
}

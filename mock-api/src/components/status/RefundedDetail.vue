<template>
	<div class="d-flex flex-column gap-3">
		<div class="alert alert-warning mb-0">
			<div class="fw-semibold mb-1">已退款</div>
			<div class="small">
				退款時間：{{ formatDateTime(order.refundedAt) }}
			</div>
		</div>

		<dl class="row mb-0">
			<dt class="col-sm-3 text-secondary">退款原因</dt>
			<dd class="col-sm-9">{{ order.refundReason }}</dd>

			<dt class="col-sm-3 text-secondary">退款金額</dt>
			<dd class="col-sm-9 text-danger fw-semibold">{{ formatAmount(order.refundAmount) }}</dd>

			<dt class="col-sm-3 text-secondary">原訂單金額</dt>
			<dd class="col-sm-9">{{ formatAmount(order.totalAmount) }}</dd>
		</dl>

		<OrderItemsTable :items="order.items" :total-amount="order.totalAmount" />
	</div>
</template>

<script setup lang="ts">
	import OrderItemsTable from "../OrderItemsTable.vue";
	import type { RefundedOrder } from "../../types/order";

	defineProps<{ order: RefundedOrder; }>();

	const formatDateTime = (iso: string): string =>
		new Date(iso).toLocaleString("zh-TW", { dateStyle: "medium", timeStyle: "short" });

	const formatAmount = (value: number): string =>
		new Intl.NumberFormat("zh-TW", { style: "currency", currency: "TWD", maximumFractionDigits: 0 }).format(value);
</script>

<template>
	<div class="d-flex flex-column gap-3">
		<div class="alert alert-primary mb-0">
			<div class="fw-semibold mb-1">備貨中</div>
			<div class="small">
				已於 {{ formatDateTime(order.paidAt) }} 完成付款，預計
				<strong>{{ formatDate(order.estimatedShipDate) }}</strong>
				出貨。
			</div>
		</div>
		<OrderItemsTable :items="order.items" :total-amount="order.totalAmount" />
	</div>
</template>

<script setup lang="ts">
	import OrderItemsTable from "../OrderItemsTable.vue";
	import type { PaidOrder } from "../../types/order";

	defineProps<{ order: PaidOrder; }>();

	const formatDateTime = (iso: string): string =>
		new Date(iso).toLocaleString("zh-TW", { dateStyle: "medium", timeStyle: "short" });

	const formatDate = (iso: string): string =>
		new Date(iso).toLocaleDateString("zh-TW", { dateStyle: "medium" });
</script>

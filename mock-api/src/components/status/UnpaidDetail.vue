<template>
	<div class="d-flex flex-column gap-3">
		<div class="alert alert-warning mb-0">
			<div class="fw-semibold mb-1">此訂單尚未付款</div>
			<div class="small">請於 <strong>{{ formatDateTime(order.paymentDeadline) }}</strong> 前完成付款，逾期將自動取消。</div>
		</div>
		<OrderItemsTable :items="order.items" :total-amount="order.totalAmount" />
		<div class="d-flex justify-content-end">
			<a :href="order.paymentUrl" class="btn btn-primary" target="_blank" rel="noopener">
				前往付款
			</a>
		</div>
	</div>
</template>

<script setup lang="ts">
	import OrderItemsTable from "../OrderItemsTable.vue";
	import type { UnpaidOrder } from "../../types/order";

	defineProps<{ order: UnpaidOrder; }>();

	const formatDateTime = (iso: string): string => {
		return new Date(iso).toLocaleString("zh-TW", {
			dateStyle: "medium",
			timeStyle: "short",
		});
	};
</script>

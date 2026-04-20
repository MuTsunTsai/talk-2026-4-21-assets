<template>
	<div class="d-flex flex-column gap-3">
		<div class="alert alert-success mb-0">
			<div class="fw-semibold mb-1">已送達</div>
			<div class="small">
				訂單已於 <strong>{{ formatDateTime(order.deliveredAt) }}</strong> 送達。
				出貨時間：{{ formatDateTime(order.shippedAt) }}。
			</div>
		</div>

		<div v-if="!order.reviewed" class="card border-success">
			<div class="card-body d-flex justify-content-between align-items-center flex-wrap gap-2">
				<div>
					<div class="fw-semibold">您尚未評價</div>
					<div class="small text-secondary">分享您的使用心得，幫助其他買家。</div>
				</div>
				<button type="button" class="btn btn-success btn-sm">前往評價</button>
			</div>
		</div>
		<div v-else class="text-secondary small">
			感謝您已完成評價。
		</div>

		<OrderItemsTable :items="order.items" :total-amount="order.totalAmount" />
	</div>
</template>

<script setup lang="ts">
	import OrderItemsTable from "../OrderItemsTable.vue";
	import type { DeliveredOrder } from "../../types/order";

	defineProps<{ order: DeliveredOrder; }>();

	const formatDateTime = (iso: string): string =>
		new Date(iso).toLocaleString("zh-TW", { dateStyle: "medium", timeStyle: "short" });
</script>

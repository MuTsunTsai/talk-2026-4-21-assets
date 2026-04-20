<template>
	<div class="d-flex flex-column gap-3">
		<div class="alert alert-danger mb-0">
			<div class="fw-semibold mb-1">訂單已取消</div>
			<div class="small">
				取消時間：{{ formatDateTime(order.cancelledAt) }}
			</div>
		</div>

		<dl class="row mb-0">
			<dt class="col-sm-3 text-secondary">取消原因</dt>
			<dd class="col-sm-9">{{ order.cancellationReason }}</dd>
		</dl>

		<OrderItemsTable :items="order.items" :total-amount="order.totalAmount" />
	</div>
</template>

<script setup lang="ts">
	import OrderItemsTable from "../OrderItemsTable.vue";
	import type { CancelledOrder } from "../../types/order";

	defineProps<{ order: CancelledOrder; }>();

	const formatDateTime = (iso: string): string =>
		new Date(iso).toLocaleString("zh-TW", { dateStyle: "medium", timeStyle: "short" });
</script>

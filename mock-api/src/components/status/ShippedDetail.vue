<template>
	<div class="d-flex flex-column gap-3">
		<div class="card">
			<div class="card-body">
				<div class="d-flex justify-content-between align-items-start flex-wrap gap-2">
					<div>
						<div class="text-secondary small">物流商</div>
						<div class="fw-semibold">{{ order.carrier }}</div>
					</div>
					<div>
						<div class="text-secondary small">追蹤號碼</div>
						<div class="fw-semibold font-monospace">{{ order.trackingNumber }}</div>
					</div>
					<div>
						<div class="text-secondary small">出貨時間</div>
						<div class="fw-semibold">{{ formatDateTime(order.shippedAt) }}</div>
					</div>
				</div>
			</div>
		</div>

		<div>
			<div class="fw-semibold mb-2">物流進度</div>
			<ul class="list-group list-group-flush border rounded">
				<li
					v-for="(event, index) in order.shippingProgress"
					:key="event.timestamp"
					class="list-group-item"
				>
					<div class="d-flex justify-content-between align-items-start gap-3">
						<div>
							<div class="fw-semibold">
								<span v-if="index === 0" class="badge bg-info text-dark me-2">最新</span>
								{{ event.note }}
							</div>
							<div class="small text-secondary">{{ event.location }}</div>
						</div>
						<div class="small text-secondary text-nowrap">{{ formatDateTime(event.timestamp) }}</div>
					</div>
				</li>
			</ul>
		</div>

		<OrderItemsTable :items="order.items" :total-amount="order.totalAmount" />
	</div>
</template>

<script setup lang="ts">
	import OrderItemsTable from "../OrderItemsTable.vue";
	import type { ShippedOrder } from "../../types/order";

	defineProps<{ order: ShippedOrder; }>();

	const formatDateTime = (iso: string): string =>
		new Date(iso).toLocaleString("zh-TW", { dateStyle: "medium", timeStyle: "short" });
</script>

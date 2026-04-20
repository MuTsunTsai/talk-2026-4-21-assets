<template>
	<button
		type="button"
		class="list-group-item list-group-item-action"
		:class="{ active: selected }"
		@click="$emit('select', summary.id)"
	>
		<div class="d-flex justify-content-between align-items-start gap-2">
			<div class="me-auto">
				<div class="fw-semibold font-monospace">{{ summary.orderNumber }}</div>
				<div class="small" :class="selected ? 'text-white-50' : 'text-secondary'">
					{{ summary.customerName }} · {{ formatDate(summary.createdAt) }}
				</div>
			</div>
			<div class="text-end">
				<div class="fw-semibold">{{ formatAmount(summary.totalAmount) }}</div>
				<span class="badge mt-1" :class="STATUS_META[summary.status].badgeClass">
					{{ STATUS_META[summary.status].label }}
				</span>
			</div>
		</div>
	</button>
</template>

<script setup lang="ts">
	import { STATUS_META } from "./status/statusMeta";
	import type { OrderSummary } from "../types/order";

	defineProps<{
		summary: OrderSummary;
		selected: boolean;
	}>();

	defineEmits<{
		select: [id: string];
	}>();

	const formatDate = (iso: string): string =>
		new Date(iso).toLocaleDateString("zh-TW", { dateStyle: "medium" });

	const formatAmount = (value: number): string =>
		new Intl.NumberFormat("zh-TW", { style: "currency", currency: "TWD", maximumFractionDigits: 0 }).format(value);
</script>

<template>
	<div class="table-responsive">
		<table class="table table-sm align-middle mb-0">
			<thead class="table-light">
				<tr>
					<th scope="col">商品</th>
					<th scope="col" class="text-end">單價</th>
					<th scope="col" class="text-center">數量</th>
					<th scope="col" class="text-end">小計</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="item in items" :key="item.sku">
					<td>
						<div class="fw-semibold">{{ item.name }}</div>
						<div class="small text-secondary">SKU：{{ item.sku }}</div>
					</td>
					<td class="text-end">{{ formatAmount(item.unitPrice) }}</td>
					<td class="text-center">{{ item.quantity }}</td>
					<td class="text-end">{{ formatAmount(item.unitPrice * item.quantity) }}</td>
				</tr>
			</tbody>
			<tfoot>
				<tr>
					<td colspan="3" class="text-end fw-semibold">總計</td>
					<td class="text-end fw-semibold">{{ formatAmount(totalAmount) }}</td>
				</tr>
			</tfoot>
		</table>
	</div>
</template>

<script setup lang="ts">
	import type { OrderItem } from "../types/order";

	defineProps<{
		items: OrderItem[];
		totalAmount: number;
	}>();

	// 金額格式化：以新台幣顯示
	const formatAmount = (value: number): string => {
		return new Intl.NumberFormat("zh-TW", {
			style: "currency",
			currency: "TWD",
			maximumFractionDigits: 0,
		}).format(value);
	};
</script>

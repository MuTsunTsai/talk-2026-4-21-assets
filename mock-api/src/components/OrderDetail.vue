<template>
	<div class="d-flex flex-column gap-3">
		<header class="border-bottom pb-2">
			<div class="d-flex justify-content-between align-items-start gap-2 flex-wrap">
				<div>
					<div class="text-secondary small">訂單編號</div>
					<div class="h5 mb-0 font-monospace">{{ order.orderNumber }}</div>
				</div>
				<span class="badge fs-6" :class="STATUS_META[order.status].badgeClass">
					{{ STATUS_META[order.status].label }}
				</span>
			</div>
			<dl class="row g-2 mt-2 mb-0 small">
				<dt class="col-sm-3 text-secondary fw-normal">客戶</dt>
				<dd class="col-sm-9 mb-0">
					<span class="fw-semibold">{{ order.customer.name }}</span>
					<span class="text-secondary">（{{ order.customer.phone }}）</span>
				</dd>

				<dt class="col-sm-3 text-secondary fw-normal">Email</dt>
				<dd class="col-sm-9 mb-0">
					<a :href="`mailto:${order.customer.email}`">{{ order.customer.email }}</a>
				</dd>

				<dt class="col-sm-3 text-secondary fw-normal">寄送地址</dt>
				<dd class="col-sm-9 mb-0">{{ order.customer.address }}</dd>

				<dt class="col-sm-3 text-secondary fw-normal">建立時間</dt>
				<dd class="col-sm-9 mb-0">{{ formatDateTime(order.createdAt) }}</dd>
			</dl>
		</header>

		<!-- 以 status 為判別欄位分派到對應子元件；各子元件的 prop 型別是具體變體 -->
		<UnpaidDetail v-if="order.status === 'unpaid'" :order="order" />
		<PaidDetail v-else-if="order.status === 'paid'" :order="order" />
		<ShippedDetail v-else-if="order.status === 'shipped'" :order="order" />
		<DeliveredDetail v-else-if="order.status === 'delivered'" :order="order" />
		<RefundedDetail v-else-if="order.status === 'refunded'" :order="order" />
		<CancelledDetail v-else-if="order.status === 'cancelled'" :order="order" />
	</div>
</template>

<script setup lang="ts">
	import UnpaidDetail from "./status/UnpaidDetail.vue";
	import PaidDetail from "./status/PaidDetail.vue";
	import ShippedDetail from "./status/ShippedDetail.vue";
	import DeliveredDetail from "./status/DeliveredDetail.vue";
	import RefundedDetail from "./status/RefundedDetail.vue";
	import CancelledDetail from "./status/CancelledDetail.vue";
	import { STATUS_META } from "./status/statusMeta";
	import type { Order } from "../types/order";

	defineProps<{ order: Order; }>();

	const formatDateTime = (iso: string): string =>
		new Date(iso).toLocaleString("zh-TW", { dateStyle: "medium", timeStyle: "short" });
</script>

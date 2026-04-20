<template>
	<div class="container-fluid py-3">
		<header class="mb-3">
			<h1 class="h4 mb-1">訂單管理</h1>
		</header>

		<div class="row g-3">
			<!-- 左側：訂單列表 -->
			<div class="col-lg-5 col-xl-4">
				<div class="card h-100">
					<div class="card-header d-flex justify-content-between align-items-center">
						<span class="fw-semibold">訂單列表</span>
						<button
							type="button"
							class="btn btn-sm btn-outline-secondary"
							:disabled="listLoading"
							@click="loadList"
						>
							重新整理
						</button>
					</div>
					<div class="card-body p-0">
						<LoadingBlock v-if="listLoading" label="載入訂單列表中…" />
						<div v-else-if="listError" class="p-3">
							<ErrorBlock :message="listError" retryable @retry="loadList" />
						</div>
						<div v-else-if="!listData || listData.length === 0" class="p-4 text-center text-secondary small">
							目前沒有訂單
						</div>
						<div v-else class="list-group list-group-flush">
							<OrderListItem
								v-for="summary in listData"
								:key="summary.id"
								:summary="summary"
								:selected="summary.id === selectedId"
								@select="selectOrder"
							/>
						</div>
					</div>
				</div>
			</div>

			<!-- 右側：訂單詳情 -->
			<div class="col-lg-7 col-xl-8">
				<div class="card h-100">
					<div class="card-header fw-semibold">訂單詳情</div>
					<div class="card-body">
						<div v-if="!selectedId" class="text-secondary text-center py-5">
							請從左側選擇一筆訂單以查看詳情
						</div>
						<LoadingBlock v-else-if="detailLoading" label="載入訂單詳情中…" />
						<ErrorBlock
							v-else-if="detailError"
							:message="detailError"
							retryable
							@retry="loadDetail"
						/>
						<OrderDetail v-else-if="detailData" :order="detailData" />
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
	import { ref, onMounted } from "vue";
	import { fetchOrders, fetchOrderById } from "../api/orders";
	import type { Order, OrderSummary } from "../types/order";
	import OrderListItem from "../components/OrderListItem.vue";
	import OrderDetail from "../components/OrderDetail.vue";
	import LoadingBlock from "../components/ui/LoadingBlock.vue";
	import ErrorBlock from "../components/ui/ErrorBlock.vue";

	// 列表狀態
	const listData = ref<OrderSummary[] | null>(null);
	const listLoading = ref(false);
	const listError = ref<string | null>(null);

	// 詳情狀態
	const selectedId = ref<string | null>(null);
	const detailData = ref<Order | null>(null);
	const detailLoading = ref(false);
	const detailError = ref<string | null>(null);

	// 將錯誤物件轉為可讀訊息
	const toMessage = (err: unknown): string => {
		if (err instanceof Error) return err.message;
		return String(err);
	};

	const loadList = async (): Promise<void> => {
		listLoading.value = true;
		listError.value = null;
		try {
			listData.value = await fetchOrders();
		} catch (err) {
			listError.value = toMessage(err);
		} finally {
			listLoading.value = false;
		}
	};

	const loadDetail = async (): Promise<void> => {
		if (!selectedId.value) return;
		detailLoading.value = true;
		detailError.value = null;
		try {
			detailData.value = await fetchOrderById(selectedId.value);
		} catch (err) {
			detailError.value = toMessage(err);
		} finally {
			detailLoading.value = false;
		}
	};

	const selectOrder = (id: string): void => {
		selectedId.value = id;
		detailData.value = null;
		void loadDetail();
	};

	onMounted(() => {
		void loadList();
	});
</script>

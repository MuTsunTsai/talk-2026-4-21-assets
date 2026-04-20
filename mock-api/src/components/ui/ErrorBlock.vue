<template>
	<div class="alert alert-danger d-flex flex-column gap-2" role="alert">
		<div>
			<strong>載入失敗</strong>
			<div class="small text-break">{{ message }}</div>
		</div>
		<div v-if="retryable">
			<button type="button" class="btn btn-sm btn-outline-danger" @click="$emit('retry')">
				重試
			</button>
		</div>
	</div>
</template>

<script setup lang="ts">
	defineProps<{
		message: string;
		retryable?: boolean;
	}>();

	defineEmits<{
		retry: [];
	}>();
</script>

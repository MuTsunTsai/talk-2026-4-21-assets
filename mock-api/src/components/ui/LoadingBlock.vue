<template>
	<div class="d-flex align-items-center justify-content-center py-4 text-secondary">
		<div class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></div>
		<span>{{ label }}</span>
	</div>
</template>

<script setup lang="ts">
	withDefaults(defineProps<{ label?: string; }>(), {
		label: "載入中…",
	});
</script>

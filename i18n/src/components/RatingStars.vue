<template>
	<div class="rating">
		<span class="rating__label">{{ label }}</span>
		<div class="rating__bar">
			<div class="rating__fill" :style="{ width: percent + '%' }"></div>
		</div>
		<span class="rating__value">{{ score.toFixed(2) }}</span>
	</div>
</template>

<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
	label: string;
	score: number;
	max?: number;
}>();

const percent = computed(() => {
	const max = props.max ?? 10;
	return Math.min(100, Math.max(0, (props.score / max) * 100));
});
</script>

<style scoped>
	.rating {
		display: grid;
		grid-template-columns: 120px 1fr 48px;
		align-items: center;
		gap: 12px;
		padding: 6px 0;
	}

	.rating__label {
		font-size: 13px;
		color: var(--color-text-muted);
	}

	.rating__bar {
		height: 8px;
		background: var(--color-surface-alt);
		border-radius: 4px;
		overflow: hidden;
	}

	.rating__fill {
		height: 100%;
		background: linear-gradient(90deg, var(--color-warning), var(--color-accent));
		transition: width 0.3s;
	}

	.rating__value {
		font-size: 13px;
		font-weight: 600;
		color: var(--color-text);
		text-align: right;
	}
</style>

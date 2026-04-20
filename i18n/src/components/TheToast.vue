<template>
	<Transition name="toast">
		<div v-if="visible" class="toast" :class="`toast--${kind}`">
			<span class="toast__icon">{{ iconFor(kind) }}</span>
			<span class="toast__msg">{{ message }}</span>
			<button class="toast__close" @click="dismiss">×</button>
		</div>
	</Transition>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useI18n } from "vue-i18n";

type ToastKind = "success" | "error" | "warning";

const { t } = useI18n();

const visible = ref(false);
const message = ref("");
const kind = ref<ToastKind>("success");
let hideTimer: ReturnType<typeof setTimeout> | null = null;

function iconFor(k: ToastKind): string {
	if (k === "success") return "✓";
	if (k === "error") return "✕";
	return "⚠";
}

function show(key: string, k: ToastKind = "success"): void {
	message.value = t(key);
	kind.value = k;
	visible.value = true;
	if (hideTimer) clearTimeout(hideTimer);
	hideTimer = setTimeout(() => {
		visible.value = false;
	}, 2500);
}

function dismiss(): void {
	visible.value = false;
	if (hideTimer) clearTimeout(hideTimer);
}

defineExpose({ show });
</script>

<style scoped>
	.toast {
		position: fixed;
		bottom: 24px;
		right: 24px;
		display: flex;
		align-items: center;
		gap: 10px;
		padding: 12px 16px;
		background: var(--color-surface);
		border-left: 4px solid var(--color-success);
		border-radius: var(--radius-md);
		box-shadow: var(--shadow-md);
		font-size: 14px;
		z-index: 1000;
		min-width: 220px;
	}

	.toast--error {
		border-left-color: var(--color-danger);
	}

	.toast--warning {
		border-left-color: var(--color-warning);
	}

	.toast__icon {
		font-weight: bold;
	}

	.toast--success .toast__icon {
		color: var(--color-success);
	}

	.toast--error .toast__icon {
		color: var(--color-danger);
	}

	.toast--warning .toast__icon {
		color: var(--color-warning);
	}

	.toast__msg {
		flex: 1;
	}

	.toast__close {
		background: transparent;
		border: none;
		font-size: 18px;
		color: var(--color-text-muted);
		padding: 0 4px;
	}

	.toast-enter-active, .toast-leave-active {
		transition: opacity 0.2s, transform 0.2s;
	}

	.toast-enter-from, .toast-leave-to {
		opacity: 0;
		transform: translateY(8px);
	}
</style>

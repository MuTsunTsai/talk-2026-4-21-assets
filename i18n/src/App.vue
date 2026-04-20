<template>
	<TheNavBar />
	<main class="main">
		<RouterView />
	</main>
	<TheToast ref="toastRef" />
</template>

<script setup lang="ts">
import { provide, useTemplateRef } from "vue";
import { RouterView } from "vue-router";
import TheNavBar from "./components/TheNavBar.vue";
import TheToast from "./components/TheToast.vue";
import { TOAST_KEY, type ShowToastFn } from "./composables/useToast";
import type { ToastKind } from "./types";

const toastRef = useTemplateRef<InstanceType<typeof TheToast>>("toastRef");

const showToast: ShowToastFn = (key: string, kind: ToastKind = "success") => {
	toastRef.value?.show(key, kind);
};

provide(TOAST_KEY, showToast);
</script>

<style scoped>
	.main {
		flex: 1;
		padding: 28px 36px;
		max-width: 1200px;
		width: 100%;
		margin: 0 auto;
	}
</style>

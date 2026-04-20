<template>
	<section class="settings">
		<header class="settings__header">
			<h1>{{ $t("settings.pageTitle") }}</h1>
		</header>

		<section class="card">
			<h3>{{ $t("settings.data.title") }}</h3>
			<div class="actions-row">
				<div class="action">
					<button class="btn btn--primary" @click="handleExport">
						⬇ {{ $t("settings.data.export") }}
					</button>
					<p class="hint">{{ $t("settings.data.exportHint") }}</p>
				</div>
				<div class="action">
					<button class="btn">
						⬆ {{ $t("settings.data.import") }}
					</button>
					<p class="hint">{{ $t("settings.data.importHint") }}</p>
				</div>
				<div class="action">
					<button class="btn btn--danger">
						🗑 {{ $t("settings.data.reset") }}
					</button>
					<p class="hint">{{ $t("settings.data.resetHint") }}</p>
				</div>
			</div>

			<div class="drop-zone" @dragover.prevent @drop.prevent="handleDrop">
				<div class="drop-zone__icon">📂</div>
				<div class="drop-zone__text">{{ $t("common.drop") }}</div>
				<div class="drop-zone__hint">{{ $t("common.uploadHint") }}</div>
			</div>

			<div class="balance">
				<div class="balance__row">
					<span class="balance__label">{{ $t("settings.data.balance") }}</span>
					<span class="balance__value">{{ $t("units.points", { value: accountBalance.toLocaleString("en-US") }) }}</span>
				</div>
				<p class="hint">{{ $t("settings.data.balanceHint") }}</p>
			</div>
		</section>

		<section class="card">
			<h3>{{ $t("settings.preferences.title") }}</h3>
			<div class="pref-grid">
				<label>
					<span>{{ $t("settings.preferences.language") }}</span>
					<select>
						<option>English</option>
					</select>
				</label>
				<label>
					<span>{{ $t("settings.preferences.temperatureUnit") }}</span>
					<select>
						<option>{{ $t("settings.preferences.celsius") }}</option>
						<option>{{ $t("settings.preferences.fahrenheit") }}</option>
					</select>
				</label>
				<label>
					<span>{{ $t("settings.preferences.charge") }}</span>
					<input type="text" :value="$t('units.subscriptionFee', { value: subscriptionFee.toFixed(2) })" readonly />
				</label>
			</div>
			<p class="hint">{{ $t("settings.preferences.chargeHint") }}</p>

			<label class="notes-label">
				<span>{{ $t("settings.preferences.notes") }}</span>
				<textarea
					rows="3"
					:placeholder="$t('settings.preferences.notesPlaceholder')"
				></textarea>
			</label>

			<div class="wizard-actions">
				<button class="btn">{{ $t("common.back") }}</button>
				<button class="btn btn--primary" @click="handleFinish">{{ $t("common.finish") }}</button>
			</div>
		</section>

		<section v-if="showDialog" class="dialog-overlay" @click.self="showDialog = false">
			<div class="dialog">
				<h3>{{ $t("common.dialogTitle") }}</h3>
				<div class="dialog__body">
					<p class="dialog__body-label">{{ $t("common.body") }}:</p>
					<p>{{ $t("settings.data.exportSuccess") }}</p>
				</div>
				<div class="dialog__actions">
					<button class="btn" @click="showDialog = false">{{ $t("common.close") }}</button>
				</div>
			</div>
		</section>
	</section>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useToast } from "../composables/useToast";

const toast = useToast();

const showDialog = ref(false);
const accountBalance = 1240;
const subscriptionFee = 9.0;

function handleExport(): void {
	showDialog.value = true;
}

function handleDrop(ev: DragEvent): void {
	const files = ev.dataTransfer?.files;
	if (files && files.length > 0) {
		toast("toast.saved", "success");
	}
}

function handleFinish(): void {
	toast("toast.saved", "success");
}
</script>

<style scoped>
	.settings__header {
		margin-bottom: 18px;
	}

	.settings__header h1 {
		margin: 0;
		font-size: 24px;
		color: var(--color-accent-dark);
	}

	.card {
		background: var(--color-surface);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-md);
		padding: 24px 28px;
		box-shadow: var(--shadow-sm);
		margin-bottom: 16px;
	}

	.card h3 {
		margin: 0 0 16px;
		font-size: 16px;
		color: var(--color-accent-dark);
	}

	.actions-row {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 16px;
		margin-bottom: 18px;
	}

	.action {
		display: flex;
		flex-direction: column;
		gap: 6px;
	}

	.btn {
		padding: 10px 18px;
		border: 1px solid var(--color-border);
		background: var(--color-surface);
		border-radius: var(--radius-sm);
		font-size: 14px;
		text-align: left;
	}

	.btn--primary {
		background: var(--color-accent);
		color: #fff;
		border-color: var(--color-accent);
	}

	.btn--primary:hover {
		background: var(--color-accent-dark);
	}

	.btn--danger {
		color: var(--color-danger);
		border-color: var(--color-danger);
	}

	.hint {
		margin: 0;
		font-size: 12px;
		color: var(--color-text-muted);
	}

	.drop-zone {
		border: 2px dashed var(--color-border);
		border-radius: var(--radius-md);
		padding: 28px 20px;
		text-align: center;
		background: var(--color-bg);
		margin-bottom: 18px;
		cursor: pointer;
	}

	.drop-zone:hover {
		border-color: var(--color-accent);
		background: #fff5e6;
	}

	.drop-zone__icon {
		font-size: 32px;
		margin-bottom: 6px;
	}

	.drop-zone__text {
		font-weight: 600;
		color: var(--color-text);
	}

	.drop-zone__hint {
		font-size: 12px;
		color: var(--color-text-muted);
		margin-top: 2px;
	}

	.balance {
		padding: 12px 16px;
		background: var(--color-surface-alt);
		border-radius: var(--radius-sm);
	}

	.balance__row {
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 15px;
	}

	.balance__label {
		color: var(--color-text-muted);
	}

	.balance__value {
		font-weight: 700;
		color: var(--color-accent-dark);
		font-size: 18px;
	}

	.pref-grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 14px;
	}

	.pref-grid label {
		display: flex;
		flex-direction: column;
		gap: 4px;
		font-size: 13px;
		color: var(--color-text-muted);
	}

	.pref-grid select, .pref-grid input {
		padding: 8px 10px;
		border: 1px solid var(--color-border);
		border-radius: var(--radius-sm);
		background: var(--color-surface);
		font-size: 14px;
	}

	.notes-label {
		display: flex;
		flex-direction: column;
		gap: 4px;
		margin-top: 14px;
		font-size: 13px;
		color: var(--color-text-muted);
	}

	.notes-label textarea {
		padding: 10px 12px;
		border: 1px solid var(--color-border);
		border-radius: var(--radius-sm);
		background: var(--color-surface);
		font-size: 14px;
		resize: vertical;
	}

	.wizard-actions {
		display: flex;
		justify-content: flex-end;
		gap: 10px;
		margin-top: 18px;
	}

	.dialog-overlay {
		position: fixed;
		inset: 0;
		background: rgba(40, 25, 10, 0.45);
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 900;
	}

	.dialog {
		background: var(--color-surface);
		border-radius: var(--radius-md);
		padding: 24px 28px;
		min-width: 380px;
		box-shadow: var(--shadow-md);
	}

	.dialog h3 {
		margin: 0 0 14px;
		color: var(--color-accent-dark);
	}

	.dialog__body {
		padding: 12px 14px;
		background: var(--color-surface-alt);
		border-radius: var(--radius-sm);
		margin-bottom: 14px;
	}

	.dialog__body-label {
		margin: 0 0 6px;
		font-size: 11px;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		color: var(--color-text-muted);
	}

	.dialog__body p {
		margin: 0;
		font-size: 14px;
	}

	.dialog__actions {
		display: flex;
		justify-content: flex-end;
	}
</style>

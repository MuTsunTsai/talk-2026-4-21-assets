<template>
	<section class="beans">
		<header class="beans__header">
			<h1>{{ $t("beans.pageTitle") }}</h1>
			<button class="btn btn--primary" @click="showForm = !showForm">
				+ {{ $t("common.add") }}
			</button>
		</header>

		<!-- 表格 -->
		<div class="table-wrapper">
			<table class="table">
				<thead>
					<tr>
						<th>{{ $t("beans.list.name") }}</th>
						<th>{{ $t("beans.origin.title") }}</th>
						<th>{{ $t("beans.list.variety") }}</th>
						<th>{{ $t("beans.list.process") }}</th>
						<th>{{ $t("beans.list.altitude") }}</th>
						<th>{{ $t("beans.list.harvest") }}</th>
						<th>{{ $t("beans.list.stock") }}</th>
					</tr>
				</thead>
				<tbody>
					<tr
						v-for="lot in beanLots"
						:key="lot.id"
						:class="{ 'row--selected': selectedId === lot.id }"
						@click="selectedId = selectedId === lot.id ? null : lot.id"
					>
						<td>{{ lot.name }}</td>
						<td><span class="flag">{{ lot.originFlag }}</span>{{ $t(`beans.origin.${lot.originKey}`) }}</td>
						<td>{{ lot.variety }}</td>
						<td>{{ $t(`beans.process.${lot.processKey}`) }}</td>
						<td>{{ $t("units.altitudeMasl", { value: lot.altitudeMasl }) }}</td>
						<td>{{ lot.harvestYear }}</td>
						<td>{{ $t("units.weightKg", { value: lot.stockKg }) }}</td>
					</tr>
				</tbody>
			</table>
		</div>

		<!-- 選中時展開的細節面板 -->
		<div v-if="selectedLot" class="detail">
			<h2>{{ selectedLot.name }}</h2>

			<div class="detail__grid">
				<section>
					<h3>{{ $t("beans.detail.sectionOrigin") }}</h3>
					<div class="field">
						<span class="field__label">{{ $t("beans.detail.export") }}</span>
						<span class="field__value">
							<span class="flag">{{ selectedLot.exportCountryFlag }}</span>{{ $t(`beans.origin.${selectedLot.exportCountryKey}`) }}
						</span>
					</div>
					<p class="field__hint">{{ $t("beans.detail.exportHint") }}</p>
				</section>

				<section>
					<h3>{{ $t("beans.detail.sectionLogistics") }}</h3>
					<div class="field">
						<span class="field__label">{{ $t("beans.detail.importer") }}</span>
						<span class="field__value">{{ selectedLot.importer }}</span>
					</div>
					<div class="field">
						<span class="field__label">{{ $t("beans.detail.arrivalDate") }}</span>
						<span class="field__value">{{ selectedLot.arrivalDate }}</span>
					</div>
				</section>

				<section class="detail__notes">
					<h3>{{ $t("beans.detail.notes") }}</h3>
					<div class="tags">
						<span v-for="tag in selectedLot.flavorNotes" :key="tag" class="tag">
							{{ $t(`cupping.notes.${tag}`) }}
						</span>
					</div>
				</section>
			</div>
		</div>

		<div v-if="showForm" class="form">
			<h2>{{ $t("beans.form.title") }}</h2>
			<div class="form__grid">
				<label>
					<span>{{ $t("beans.form.name") }}</span>
					<input type="text" :placeholder="$t('beans.form.namePlaceholder')" />
				</label>
				<label>
					<span>{{ $t("beans.form.origin") }}</span>
					<select>
						<option v-for="k in originKeys" :key="k" :value="k">{{ $t(`beans.origin.${k}`) }}</option>
					</select>
				</label>
				<label>
					<span>{{ $t("beans.form.variety") }}</span>
					<input type="text" :placeholder="$t('beans.form.varietyPlaceholder')" />
				</label>
				<label>
					<span>{{ $t("beans.form.process") }}</span>
					<select>
						<option value="washed">{{ $t("beans.form.washed") }}</option>
						<option value="natural">{{ $t("beans.process.natural") }}</option>
						<option value="honey">{{ $t("beans.process.honey") }}</option>
						<option value="anaerobic">{{ $t("beans.process.anaerobic") }}</option>
						<option value="wetHulled">{{ $t("beans.process.wetHulled") }}</option>
					</select>
				</label>
				<label>
					<span>{{ $t("beans.form.altitudeMasl") }}</span>
					<input type="number" placeholder="1800" />
				</label>
				<label>
					<span>{{ $t("beans.form.harvestYear") }}</span>
					<input type="number" placeholder="2026" />
				</label>
			</div>
			<div class="form__actions">
				<button class="btn" @click="showForm = false">{{ $t("common.cancel") }}</button>
				<button class="btn btn--primary" @click="handleSave">{{ $t("common.save") }}</button>
			</div>
		</div>
	</section>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { beanLots } from "../data/mockData";
import { useToast } from "../composables/useToast";

const toast = useToast();

const showForm = ref(false);
const selectedId = ref<string | null>("lot-001");

const selectedLot = computed(() => beanLots.find(l => l.id === selectedId.value) ?? null);

const originKeys = ["ethiopia", "colombia", "panama", "kenya", "guatemala", "indonesia", "costaRica"];

function handleSave(): void {
	showForm.value = false;
	toast("toast.saved", "success");
}
</script>

<style scoped>
	.beans__header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 18px;
	}

	.beans__header h1 {
		margin: 0;
		font-size: 24px;
		color: var(--color-accent-dark);
	}

	.btn {
		padding: 8px 16px;
		border: 1px solid var(--color-border);
		background: var(--color-surface);
		border-radius: var(--radius-sm);
		font-size: 14px;
	}

	.btn--primary {
		background: var(--color-accent);
		color: #fff;
		border-color: var(--color-accent);
	}

	.btn--primary:hover {
		background: var(--color-accent-dark);
	}

	.table-wrapper {
		background: var(--color-surface);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-md);
		overflow: hidden;
		box-shadow: var(--shadow-sm);
	}

	.table {
		width: 100%;
		border-collapse: collapse;
		font-size: 14px;
	}

	.table th {
		text-align: left;
		padding: 12px 16px;
		background: var(--color-surface-alt);
		font-weight: 600;
		color: var(--color-text-muted);
		font-size: 13px;
		text-transform: uppercase;
		letter-spacing: 0.03em;
	}

	.table td {
		padding: 12px 16px;
		border-top: 1px solid var(--color-border);
	}

	.table tbody tr {
		cursor: pointer;
	}

	.table tbody tr:hover {
		background: var(--color-surface-alt);
	}

	.row--selected {
		background: #fff5e6 !important;
	}

	.detail {
		margin-top: 24px;
		padding: 24px;
		background: var(--color-surface);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-md);
		box-shadow: var(--shadow-sm);
	}

	.detail h2 {
		margin: 0 0 20px;
		font-size: 20px;
		color: var(--color-accent-dark);
	}

	.detail__grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 28px;
	}

	.detail__notes {
		grid-column: 1 / -1;
	}

	.detail h3 {
		margin: 0 0 12px;
		font-size: 14px;
		text-transform: uppercase;
		letter-spacing: 0.04em;
		color: var(--color-text-muted);
	}

	.field {
		display: flex;
		justify-content: space-between;
		padding: 8px 0;
		border-bottom: 1px dashed var(--color-border);
	}

	.field__label {
		color: var(--color-text-muted);
		font-size: 14px;
	}

	.field__value {
		font-weight: 500;
	}

	.field__hint {
		margin: 6px 0 0;
		font-size: 12px;
		color: var(--color-text-muted);
		font-style: italic;
	}

	.tags {
		display: flex;
		flex-wrap: wrap;
		gap: 8px;
	}

	.tag {
		padding: 4px 12px;
		background: var(--color-surface-alt);
		border-radius: 999px;
		font-size: 13px;
		color: var(--color-accent-dark);
	}

	.form {
		margin-top: 24px;
		padding: 24px;
		background: var(--color-surface);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-md);
	}

	.form h2 {
		margin: 0 0 16px;
		font-size: 18px;
	}

	.form__grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 14px;
	}

	.form__grid label {
		display: flex;
		flex-direction: column;
		gap: 4px;
		font-size: 13px;
		color: var(--color-text-muted);
	}

	.form__grid input, .form__grid select {
		padding: 8px 10px;
		border: 1px solid var(--color-border);
		border-radius: var(--radius-sm);
		background: var(--color-surface);
		font-size: 14px;
	}

	.form__actions {
		display: flex;
		justify-content: flex-end;
		gap: 10px;
		margin-top: 18px;
	}

	.flag {
		font-size: 150%;
		line-height: 0.5;
		vertical-align: -0.1em;
		margin-right: 0.5em;
	}
</style>

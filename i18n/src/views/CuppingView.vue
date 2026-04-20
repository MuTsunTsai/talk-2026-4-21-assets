<template>
	<section class="cupping">
		<header class="cupping__header">
			<h1>{{ $t("cupping.pageTitle") }}</h1>
		</header>

		<div class="cupping__sessions">
			<button v-for="session in cuppingSessions" :key="session.id" class="session-pill"
					:class="{ 'session-pill--active': selectedId === session.id }" @click="selectedId = session.id">
				<span class="session-pill__title">{{ session.beanLotName }}</span>
				<span class="session-pill__date">{{ session.cuppedOn }} · {{ session.cupper }}</span>
			</button>
		</div>

		<div v-if="selected" class="cupping__body">
			<section class="card">
				<h3>{{ $t("cupping.form.title") }}</h3>
				<div class="score-grid">
					<RatingStars :label="$t('cupping.form.fragrance')" :score="selected.scores.fragrance" />
					<RatingStars :label="$t('cupping.form.aroma')" :score="selected.scores.aroma" />
					<RatingStars :label="$t('cupping.form.flavor')" :score="selected.scores.flavor" />
					<RatingStars :label="$t('cupping.form.aftertaste')" :score="selected.scores.aftertaste" />
					<RatingStars :label="$t('cupping.form.acidity')" :score="selected.scores.acidity" />
					<RatingStars :label="$t('cupping.form.body')" :score="selected.scores.body" />
					<RatingStars :label="$t('cupping.form.balance')" :score="selected.scores.balance" />
					<RatingStars :label="$t('cupping.form.sweetness')" :score="selected.scores.sweetness" />
					<RatingStars :label="$t('cupping.form.cleanCup')" :score="selected.scores.cleanCup" />
					<RatingStars :label="$t('cupping.form.uniformity')" :score="selected.scores.uniformity" />
					<RatingStars :label="$t('cupping.form.overall')" :score="selected.scores.overall" />
					<RatingStars :label="$t('cupping.form.finish') + ' ※'" :score="selected.scores.finish" />
				</div>
				<p class="finish-hint">※ {{ $t("cupping.form.finishHint") }}</p>
				<div class="total">
					<span>{{ $t("cupping.form.totalScore") }}</span>
					<strong>{{ totalScore.toFixed(2) }}</strong>
				</div>
			</section>

			<section class="card">
				<h3>{{ $t("cupping.notes.title") }}</h3>
				<div class="tags">
					<button v-for="tag in tagKeys" :key="tag" class="tag"
							:class="{ 'tag--active': selected.flavorTags.includes(tag) }">
						{{ $t(`cupping.notes.${tag}`) }}
					</button>
				</div>
				<textarea class="notes-area" :placeholder="$t('cupping.notes.placeholder')" :value="selected.notes"
						  readonly></textarea>
			</section>
		</div>

		<div v-else class="empty">{{ $t("cupping.summary.empty") }}</div>
	</section>
</template>

<script setup lang="ts">
	import { computed, ref } from "vue";
	import { cuppingSessions } from "../data/mockData";
	import RatingStars from "../components/RatingStars.vue";

	const selectedId = ref<string>(cuppingSessions[0]?.id ?? "");
	const selected = computed(() => cuppingSessions.find(s => s.id === selectedId.value) ?? null);

	const tagKeys = ["floral", "fruity", "nutty", "chocolate", "caramel", "spicy", "earthy", "natural"];

	const totalScore = computed(() => {
		if(!selected.value) return 0;
		const s = selected.value.scores;
		return s.fragrance + s.aroma + s.flavor + s.aftertaste + s.acidity + s.body + s.balance + s.sweetness + s.cleanCup + s.uniformity + s.overall;
	});
</script>

<style scoped>
	.cupping__header {
		margin-bottom: 18px;
	}

	.cupping__header h1 {
		margin: 0;
		font-size: 24px;
		color: var(--color-accent-dark);
	}

	.cupping__sessions {
		display: flex;
		gap: 10px;
		margin-bottom: 18px;
		flex-wrap: wrap;
	}

	.session-pill {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		padding: 10px 14px;
		border: 1px solid var(--color-border);
		background: var(--color-surface);
		border-radius: var(--radius-md);
		text-align: left;
		min-width: 200px;
	}

	.session-pill--active {
		border-color: var(--color-accent);
		box-shadow: 0 0 0 2px rgba(139, 69, 19, 0.15);
	}

	.session-pill__title {
		font-weight: 600;
		font-size: 14px;
	}

	.session-pill__date {
		font-size: 12px;
		color: var(--color-text-muted);
		margin-top: 2px;
	}

	.card {
		background: var(--color-surface);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-md);
		padding: 20px 24px;
		box-shadow: var(--shadow-sm);
		margin-bottom: 16px;
	}

	.card h3 {
		margin: 0 0 14px;
		font-size: 15px;
		color: var(--color-accent-dark);
	}

	.score-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 4px 32px;
	}

	.finish-hint {
		margin: 12px 0 0;
		font-size: 12px;
		color: var(--color-text-muted);
		font-style: italic;
	}

	.total {
		margin-top: 18px;
		padding-top: 14px;
		border-top: 2px solid var(--color-border);
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 15px;
	}

	.total strong {
		font-size: 22px;
		color: var(--color-accent-dark);
	}

	.tags {
		display: flex;
		flex-wrap: wrap;
		gap: 8px;
		margin-bottom: 14px;
	}

	.tag {
		padding: 6px 14px;
		background: var(--color-surface);
		border: 1px solid var(--color-border);
		border-radius: 999px;
		font-size: 13px;
		color: var(--color-text-muted);
	}

	.tag--active {
		background: var(--color-accent);
		color: #fff;
		border-color: var(--color-accent);
	}

	.notes-area {
		width: 100%;
		min-height: 90px;
		padding: 10px 12px;
		border: 1px solid var(--color-border);
		border-radius: var(--radius-sm);
		font-size: 14px;
		line-height: 1.5;
		resize: vertical;
		background: var(--color-surface);
	}

	.empty {
		padding: 60px 0;
		text-align: center;
		color: var(--color-text-muted);
		font-style: italic;
	}
</style>

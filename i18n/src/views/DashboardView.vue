<template>
	<section class="dashboard">
		<header class="dashboard__header">
			<h1>{{ $t("dashboard.greeting") }}, Donald ☕</h1>
			<p class="dashboard__subtitle">{{ $t("dashboard.subtitle") }}</p>
		</header>

		<div class="dashboard__stats">
			<div class="stat">
				<div class="stat__value">{{ beanCount }}</div>
				<div class="stat__label">{{ $t("dashboard.stats.totalBeans") }}</div>
			</div>
			<div class="stat">
				<div class="stat__value">{{ activeRoasts }}</div>
				<div class="stat__label">{{ $t("dashboard.stats.activeRoasts") }}</div>
			</div>
			<div class="stat">
				<div class="stat__value">{{ cuppingCount }}</div>
				<div class="stat__label">{{ $t("dashboard.stats.cuppingsThisMonth") }}</div>
			</div>
			<div class="stat">
				<div class="stat__value">{{ avgScore.toFixed(2) }}</div>
				<div class="stat__label">{{ $t("dashboard.stats.avgScore") }}</div>
			</div>
		</div>

		<div class="banner banner--variety">
			<div class="banner__icon">🌍</div>
			<div class="banner__text">
				<h2>{{ $t("dashboard.variety") }}</h2>
				<p>{{ $t("dashboard.varietyHint") }}</p>
			</div>
		</div>

		<div class="dashboard__grid">
			<section class="card">
				<h3>{{ $t("dashboard.recentActivity") }}</h3>
				<ul v-if="recentActivity.length" class="activity">
					<li v-for="item in recentActivity" :key="item.id" class="activity__item">
						<span class="activity__time">{{ item.timestamp }}</span>
						<span class="activity__text">{{ item.text }}</span>
					</li>
				</ul>
				<p v-else class="empty">{{ $t("dashboard.empty") }}</p>
			</section>

			<section class="card card--development">
				<h3>🚧 {{ $t("dashboard.development") }}</h3>
				<p class="card__subtitle">{{ $t("dashboard.developmentHint") }}</p>
				<ul class="upcoming">
					<li v-for="(feature, i) in upcomingFeatures" :key="i">{{ feature }}</li>
				</ul>
			</section>
		</div>
	</section>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { beanLots, cuppingSessions, recentActivity, upcomingFeatures } from "../data/mockData";

const beanCount = computed(() => beanLots.length);
const activeRoasts = computed(() => 3);
const cuppingCount = computed(() => cuppingSessions.length);

const avgScore = computed(() => {
	if (!cuppingSessions.length) return 0;
	const sum = cuppingSessions.reduce((acc, c) => {
		const s = c.scores;
		return acc + s.fragrance + s.aroma + s.flavor + s.aftertaste + s.acidity + s.body + s.balance + s.sweetness + s.cleanCup + s.uniformity + s.overall;
	}, 0);
	return sum / cuppingSessions.length;
});
</script>

<style scoped>
	.dashboard__header {
		margin-bottom: 28px;
	}

	.dashboard__header h1 {
		margin: 0 0 4px;
		font-size: 26px;
		color: var(--color-accent-dark);
	}

	.dashboard__subtitle {
		color: var(--color-text-muted);
		margin: 0;
	}

	.dashboard__stats {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: 16px;
		margin-bottom: 24px;
	}

	.stat {
		background: var(--color-surface);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-md);
		padding: 18px 20px;
		box-shadow: var(--shadow-sm);
	}

	.stat__value {
		font-size: 28px;
		font-weight: 700;
		color: var(--color-accent-dark);
	}

	.stat__label {
		margin-top: 4px;
		font-size: 13px;
		color: var(--color-text-muted);
	}

	.banner {
		display: flex;
		align-items: center;
		gap: 18px;
		padding: 20px 24px;
		margin-bottom: 24px;
		background: linear-gradient(135deg, #fff5e6, #ffe4c4);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-lg);
	}

	.banner__icon {
		font-size: 42px;
	}

	.banner__text h2 {
		margin: 0 0 4px;
		font-size: 20px;
		color: var(--color-accent-dark);
	}

	.banner__text p {
		margin: 0;
		color: var(--color-text-muted);
		font-size: 14px;
	}

	.dashboard__grid {
		display: grid;
		grid-template-columns: 2fr 1fr;
		gap: 16px;
	}

	.card {
		background: var(--color-surface);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-md);
		padding: 20px 24px;
		box-shadow: var(--shadow-sm);
	}

	.card h3 {
		margin: 0 0 12px;
		font-size: 16px;
		color: var(--color-accent-dark);
	}

	.card__subtitle {
		margin: -8px 0 12px;
		color: var(--color-text-muted);
		font-size: 13px;
	}

	.card--development {
		background: #fffbf2;
		border-color: #e9d8a3;
	}

	.activity {
		list-style: none;
		padding: 0;
		margin: 0;
	}

	.activity__item {
		display: flex;
		gap: 12px;
		padding: 10px 0;
		border-bottom: 1px dashed var(--color-border);
		font-size: 14px;
	}

	.activity__item:last-child {
		border-bottom: none;
	}

	.activity__time {
		color: var(--color-text-muted);
		font-variant-numeric: tabular-nums;
		white-space: nowrap;
	}

	.upcoming {
		margin: 0;
		padding-left: 20px;
		color: var(--color-text);
		font-size: 14px;
	}

	.upcoming li {
		margin-bottom: 6px;
	}

	.empty {
		color: var(--color-text-muted);
		font-style: italic;
	}
</style>

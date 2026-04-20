<template>
	<section class="roast">
		<header class="roast__header">
			<h1>{{ $t("roast.pageTitle") }}</h1>
			<button class="btn btn--primary">+ {{ $t("roast.newSession") }}</button>
		</header>

		<div class="roast__sessions">
			<button
				v-for="session in roastSessions"
				:key="session.id"
				class="session-pill"
				:class="{ 'session-pill--active': selectedId === session.id }"
				@click="selectedId = session.id"
			>
				<span class="session-pill__title">{{ session.beanLotName }}</span>
				<span class="session-pill__date">{{ session.roastedOn }}</span>
			</button>
		</div>

		<div v-if="selected" class="roast__body">
			<section class="card">
				<h3>{{ $t("roast.timeline.title") }}</h3>
				<div class="timeline">
					<div
						v-for="stage in selected.timelineStages"
						:key="stage.key"
						class="timeline__stage"
						:class="`timeline__stage--${stage.key}`"
						:style="{ flex: Math.max(1, stage.toSec - stage.fromSec) }"
					>
						<span class="timeline__label">{{ $t(`roast.timeline.${stage.key}`) }}</span>
						<span class="timeline__duration">
							{{ formatTime(stage.fromSec) }} – {{ formatTime(stage.toSec) }}
						</span>
					</div>
				</div>
			</section>

			<div class="roast__grid">
				<section class="card">
					<h3>{{ $t("roast.events.title") }}</h3>
					<ul class="events">
						<li class="events__item">
							<span class="events__time">t = 0:00</span>
							<span class="events__label">{{ $t("roast.events.origin") }}</span>
							<span class="events__hint">{{ $t("roast.events.originHint") }}</span>
						</li>
						<li v-for="e in selected.events" :key="e.timeSec" class="events__item">
							<span class="events__time">{{ formatTime(e.timeSec) }}</span>
							<span class="events__label">
								{{ $t(`roast.events.${e.labelKey}`) }}
								<template v-if="e.labelKey === 'firstCrack' || e.labelKey === 'secondCrack'">
									<em class="events__kind">({{ $t("roast.events.crack") }})</em>
								</template>
							</span>
							<span class="events__temp">{{ $t("units.temperature", { value: e.tempC }) }}</span>
						</li>
						<li class="events__item events__item--note">
							<span class="events__hint">{{ $t("roast.events.dropHint") }}</span>
						</li>
					</ul>
				</section>

				<section class="card">
					<h3>{{ $t("roast.metrics.title") }}</h3>
					<div class="metric">
						<span class="metric__label">{{ $t("roast.metrics.chargeTemp") }}</span>
						<span class="metric__value">{{ $t("units.temperature", { value: selected.chargeTempC }) }}</span>
					</div>
					<div class="metric">
						<span class="metric__label">{{ $t("roast.metrics.dropTemp") }}</span>
						<span class="metric__value">{{ $t("units.temperature", { value: selected.dropTempC }) }}</span>
					</div>
					<div class="metric">
						<span class="metric__label">{{ $t("roast.metrics.totalTime") }}</span>
						<span class="metric__value">{{ formatTime(selected.totalTimeSec) }}</span>
					</div>
					<div class="metric metric--highlight">
						<span class="metric__label">{{ $t("roast.metrics.development") }}</span>
						<span class="metric__value">
							{{ formatTime(selected.developmentTimeSec) }}
							<small>({{ (selected.developmentRatio * 100).toFixed(1) }}%)</small>
						</span>
					</div>
					<p class="metric__hint">{{ $t("roast.metrics.developmentHint") }}</p>
					<div class="metric">
						<span class="metric__label">{{ $t("roast.metrics.ror") }}</span>
						<span class="metric__value">{{ $t("units.rateOfRise", { value: selected.rorCPerMin.toFixed(1) }) }}</span>
					</div>
				</section>
			</div>
		</div>
	</section>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { roastSessions } from "../data/mockData";

const selectedId = ref<string>(roastSessions[0].id);
const selected = computed(() => roastSessions.find(s => s.id === selectedId.value) ?? null);

function formatTime(sec: number): string {
	const m = Math.floor(sec / 60);
	const s = sec % 60;
	return `${m}:${s.toString().padStart(2, "0")}`;
}
</script>

<style scoped>
	.roast__header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 18px;
	}

	.roast__header h1 {
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

	.roast__sessions {
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

	.timeline {
		display: flex;
		gap: 2px;
		border-radius: var(--radius-sm);
		overflow: hidden;
		border: 1px solid var(--color-border);
	}

	.timeline__stage {
		padding: 12px 10px;
		display: flex;
		flex-direction: column;
		gap: 2px;
		font-size: 12px;
		color: #fff;
		min-width: 90px;
	}

	.timeline__stage--charge { background: #6b4a2b; }
	.timeline__stage--drying { background: #c98a2b; }
	.timeline__stage--maillard { background: #a8591a; }
	.timeline__stage--development { background: #8b4513; }
	.timeline__stage--finish { background: #5a2e0b; }

	.timeline__label {
		font-weight: 700;
	}

	.timeline__duration {
		font-variant-numeric: tabular-nums;
		opacity: 0.9;
	}

	.roast__grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 16px;
	}

	.events {
		list-style: none;
		padding: 0;
		margin: 0;
	}

	.events__item {
		display: grid;
		grid-template-columns: 80px 1fr auto;
		gap: 10px;
		padding: 10px 0;
		border-bottom: 1px dashed var(--color-border);
		font-size: 14px;
		align-items: center;
	}

	.events__item:last-child {
		border-bottom: none;
	}

	.events__item--note {
		grid-template-columns: 1fr;
	}

	.events__time {
		font-variant-numeric: tabular-nums;
		color: var(--color-text-muted);
		font-family: monospace;
	}

	.events__label {
		font-weight: 500;
	}

	.events__kind {
		color: var(--color-text-muted);
		font-style: italic;
		font-weight: normal;
		margin-left: 4px;
	}

	.events__temp {
		font-variant-numeric: tabular-nums;
		color: var(--color-warning);
		font-weight: 600;
	}

	.events__hint {
		color: var(--color-text-muted);
		font-size: 12px;
		font-style: italic;
	}

	.metric {
		display: flex;
		justify-content: space-between;
		padding: 8px 0;
		border-bottom: 1px dashed var(--color-border);
		font-size: 14px;
	}

	.metric:last-child {
		border-bottom: none;
	}

	.metric__label {
		color: var(--color-text-muted);
	}

	.metric__value {
		font-weight: 600;
	}

	.metric--highlight {
		background: #fff5e6;
		padding: 10px 12px;
		margin: 6px -12px;
		border-radius: var(--radius-sm);
		border-bottom: none;
	}

	.metric__hint {
		margin: 2px -12px 6px;
		padding: 0 12px;
		font-size: 12px;
		color: var(--color-text-muted);
		font-style: italic;
	}
</style>

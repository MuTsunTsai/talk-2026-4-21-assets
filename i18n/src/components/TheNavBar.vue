<template>
	<header class="nav">
		<div class="nav__brand">
			<span class="nav__logo">☕</span>
			<div class="nav__brand-text">
				<span class="nav__name">{{ $t("app.name") }}</span>
				<span class="nav__tagline">{{ $t("app.tagline") }}</span>
			</div>
		</div>
		<nav class="nav__links">
			<RouterLink
				v-for="item in items"
				:key="item.name"
				:to="{ name: item.name }"
				class="nav__link"
				active-class="nav__link--active"
			>
				{{ $t(item.labelKey) }}
			</RouterLink>
		</nav>
		<div class="nav__lang">
			<span class="nav__lang-label">{{ $t("settings.preferences.language") }}:</span>
			<select class="nav__lang-select" disabled>
				<option>English</option>
			</select>
		</div>
	</header>
</template>

<script setup lang="ts">
import { RouterLink } from "vue-router";

const items: { name: string; labelKey: string }[] = [
	{ name: "dashboard", labelKey: "nav.dashboard" },
	{ name: "beans", labelKey: "nav.beans" },
	{ name: "roast", labelKey: "nav.roastLog" },
	{ name: "cupping", labelKey: "nav.cupping" },
	{ name: "settings", labelKey: "nav.settings" },
];
</script>

<style scoped>
	.nav {
		display: flex;
		align-items: center;
		gap: 24px;
		padding: 14px 32px;
		background: linear-gradient(180deg, var(--color-espresso), var(--color-espresso-2));
		color: var(--color-text-inverse);
		border-bottom: 3px solid var(--color-caramel);
		box-shadow: var(--shadow-md);
	}

	.nav__brand {
		display: flex;
		align-items: center;
		gap: 12px;
	}

	.nav__logo {
		font-size: 30px;
		filter: drop-shadow(0 2px 3px rgba(0, 0, 0, 0.4));
	}

	.nav__brand-text {
		display: flex;
		flex-direction: column;
		line-height: 1.15;
	}

	.nav__name {
		font-family: var(--font-display);
		font-weight: 700;
		font-size: 22px;
		color: var(--color-cream);
		letter-spacing: 0.01em;
	}

	.nav__tagline {
		font-family: var(--font-display);
		font-style: italic;
		font-size: 12px;
		color: var(--color-crema);
		opacity: 0.9;
	}

	.nav__links {
		display: flex;
		gap: 2px;
		flex: 1;
		margin-left: 24px;
	}

	.nav__link {
		padding: 8px 16px;
		background: transparent;
		border: none;
		border-radius: var(--radius-sm);
		color: var(--color-crema);
		font-size: 14px;
		font-weight: 500;
		text-decoration: none;
		transition: background 0.15s, color 0.15s;
	}

	.nav__link:hover {
		background: rgba(251, 244, 230, 0.1);
		color: var(--color-cream);
	}

	.nav__link--active {
		background: var(--color-caramel);
		color: var(--color-espresso-2);
		font-weight: 600;
	}

	.nav__link--active:hover {
		background: var(--color-caramel);
		color: var(--color-espresso-2);
	}

	.nav__lang {
		display: flex;
		align-items: center;
		gap: 8px;
		font-size: 13px;
		color: var(--color-crema);
	}

	.nav__lang-select {
		padding: 4px 8px;
		border: 1px solid var(--color-border-strong);
		border-radius: var(--radius-sm);
		background: var(--color-surface);
		color: var(--color-text);
	}
</style>

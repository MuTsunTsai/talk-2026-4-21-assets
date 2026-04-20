import { createRouter, createWebHashHistory, type RouteRecordRaw } from "vue-router";

// 使用 hash history，避免需要額外設定 Rsbuild 的 devServer fallback／server-side rewrite。
// 頁面會長成 http://localhost:5173/#/beans 這類形式，對本 demo 已足夠。
const routes: RouteRecordRaw[] = [
	{
		path: "/",
		redirect: "/dashboard",
	},
	{
		path: "/dashboard",
		name: "dashboard",
		component: () => import("./views/DashboardView.vue"),
		meta: { navLabelKey: "nav.dashboard" },
	},
	{
		path: "/beans",
		name: "beans",
		component: () => import("./views/BeansView.vue"),
		meta: { navLabelKey: "nav.beans" },
	},
	{
		path: "/roast",
		name: "roast",
		component: () => import("./views/RoastLogView.vue"),
		meta: { navLabelKey: "nav.roastLog" },
	},
	{
		path: "/cupping",
		name: "cupping",
		component: () => import("./views/CuppingView.vue"),
		meta: { navLabelKey: "nav.cupping" },
	},
	{
		path: "/settings",
		name: "settings",
		component: () => import("./views/SettingsView.vue"),
		meta: { navLabelKey: "nav.settings" },
	},
];

export const router = createRouter({
	history: createWebHashHistory(),
	routes,
});

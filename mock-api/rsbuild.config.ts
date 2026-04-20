import { defineConfig } from "@rsbuild/core";
import { pluginVue } from "@rsbuild/plugin-vue";

export default defineConfig({
	plugins: [pluginVue()],
	html: {
		title: "訂單管理示範",
	},
	server: {
		port: 3000,
		// 把 /api 代理到一個不存在的 port，讓尚未實作的 API 請求
		// 直接產生連線錯誤（而不是被 SPA fallback 吃掉回 index.html）
		proxy: {
			"/api": {
				target: "http://127.0.0.1:1",
			},
		},
	},
});

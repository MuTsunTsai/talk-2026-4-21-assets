import { defineConfig } from "@rsbuild/core";
import { pluginVue } from "@rsbuild/plugin-vue";

export default defineConfig({
	plugins: [pluginVue()],
	html: {
		title: "Roastery Ledger",
	},
	source: {
		entry: {
			index: "./src/main.ts",
		},
	},
	server: {
		port: 5173,
	},
});

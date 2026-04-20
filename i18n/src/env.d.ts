declare module "*.vue" {
	import type { DefineComponent } from "vue";
	const component: DefineComponent<object, object, unknown>;
	export default component;
}

// CSS 匯入（例如 bootstrap 的樣式）在 TS 中的 shim
declare module "*.css";

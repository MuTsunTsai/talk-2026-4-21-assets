import { createI18n } from "vue-i18n";
import en from "./locales/en.json";

// 英文語系為基準；目前刻意不提供 zh-TW 翻譯，
// 讓課堂上能直接展示「請 AI 補齊其他語系」的流程。
export type MessageSchema = typeof en;

export const SUPPORTED_LOCALES = ["en"] as const;
export type SupportedLocale = (typeof SUPPORTED_LOCALES)[number];

export const i18n = createI18n<[MessageSchema], SupportedLocale>({
	legacy: false,
	globalInjection: true,
	locale: "en",
	fallbackLocale: "en",
	messages: {
		en,
	},
});

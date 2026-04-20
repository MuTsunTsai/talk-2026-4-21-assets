import { inject, type InjectionKey } from "vue";
import type { ToastKind } from "../types";

export type ShowToastFn = (key: string, kind?: ToastKind) => void;

export const TOAST_KEY: InjectionKey<ShowToastFn> = Symbol("toast");

export function useToast(): ShowToastFn {
	const show = inject(TOAST_KEY);
	if (!show) {
		throw new Error("useToast() must be used inside a component that provides TOAST_KEY");
	}
	return show;
}

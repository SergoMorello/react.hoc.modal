import { createContext, MutableRefObject, ReactNode } from "react";
import type { TContainerContext, TModalConfigAction } from "./types";

export const ProviderContext = createContext<TContainerContext>({
	push: () => {},
	count: () => 0,
	modals: null
});

export const ContainerContext = createContext({
	hide: () => {},
	setFooter: (element: ReactNode) => {},
	initPosition: {current: undefined} as MutableRefObject<DOMRect | undefined>,
	footer: {} as ReactNode
});

export const WhithModalContext = createContext<TModalConfigAction<any>>({
	setConfig: () => {},
	state: {},
	footerRef: null,
	showPopup: () => {},
	show: () => {},
	hide: () => {}
});
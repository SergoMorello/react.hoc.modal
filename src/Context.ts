import { createContext, MutableRefObject, ReactNode, RefObject } from "react";
import type { TContainerContext, TModalConfigAction } from "./types";

export type FooterMountStatus = undefined | 'render' | 'mount';

export const ProviderContext = createContext<TContainerContext>({
	push: () => {},
	count: () => 0,
	modals: null
});

export const ContainerContext = createContext({
	hide: () => {},
	setFooter: (status: FooterMountStatus) => {},
	listeners: {current: {
		onHide: () => {}
	}},
	initPosition: {current: undefined} as MutableRefObject<DOMRect | undefined>,
	footer: undefined as FooterMountStatus,
	footerRef: {current: undefined} as RefObject<HTMLDivElement | undefined>
});

export const WithModalContext = createContext<TModalConfigAction<any>>({
	withModal: false,
	setConfig: () => {},
	state: {},
	footerRef: null,
	showPopup: () => {},
	show: () => {},
	hide: () => {}
});
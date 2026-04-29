import {
	useImperativeHandle,
	useRef,
	createRef
} from "react";
import type {
	TModals,
	TProvider,
	TStaticControl,
	TPushControll
} from "./types";
import { ProviderContext } from "./Context";

const staticAction = createRef<TStaticControl>();

const Provider = ({children, SPA = false}: TProvider): React.ReactNode => {
	const modals = useRef<TModals>(new Map<string, TPushControll>());

	const modalsRef = useRef<HTMLDivElement>(null);

	const push = (name: string, control: TPushControll) => {
		modals.current.set(name, control);
	};

	const show = (name: string) => {
		const modal = modals.current.get(name);
		if (modal) {
			modal.show();
		}
	};
	
	const hide = (name?: string) => {
		if (name && modals.current.has(name)) {
			modals.current.get(name)?.hide();
		}else{
			modals.current.forEach((modal) => modal.hide());
		}
	};

	const count = (): number => {
		return modals.current.size;
		// return Object.values(modals.current).filter((modal) => modal.showStatus.current === true).length;
	};

	const createDynamicContainer = (): HTMLDivElement => {
		if (typeof window === 'undefined') {
			const fakeDiv = document.createElement('div');
			return fakeDiv;
		}
		const nameId = '__modals-container';
		const containerModals = document.getElementById(nameId);
		if (containerModals) {
			return containerModals as HTMLDivElement;
		}else{
			const newContainerModals = document.createElement('div');
			newContainerModals.id = nameId;
			document.body.appendChild(newContainerModals);
			return newContainerModals as HTMLDivElement;
		}
	};

	if (!SPA) {
		useImperativeHandle(modalsRef, createDynamicContainer);
	}


	useImperativeHandle(staticAction, () => ({
		show,
		hide
	}));
	
	return(<ProviderContext.Provider value={{
		push,
		modals: modalsRef,
		count
	}}>
		{children}
		{SPA && <div ref={modalsRef}/>}
	</ProviderContext.Provider>)
};

export {
	Provider,
	ProviderContext,
	staticAction
};
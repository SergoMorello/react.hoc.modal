import {
	createContext,
	useImperativeHandle,
	useRef,
	createRef
} from "react";
import {
	TModals,
	TProvider,
	TContainerContext,
	TStaticControl
} from "./types";

const staticAction = createRef<TStaticControl>();

const ProviderContext = createContext<TContainerContext>({
	push: () => {},
	modals: null
});

const Provider = ({children}: TProvider) => {
	const modals = useRef<TModals>({});
	const modalsRef = useRef<HTMLDivElement>(null);

	const push = (name: string, show: () => void, hide: () => void) => {
		modals.current[name] = {
			show,
			hide
		};
	};

	const show = (name: string) => {
		if (name in modals.current) {
			modals.current[name].show();
		}
	};

	const hide = (name?: string) => {
		if (name && name in modals.current) {
			modals.current[name].hide();
		}else{
			Object.keys(modals.current).forEach(hide);
		}
	};

	useImperativeHandle(staticAction, () => ({
		show,
		hide
	}));
	
	return(<ProviderContext.Provider value={{
		push,
		modals: modalsRef
	}}>
		{children}
		<div ref={modalsRef}/>
	</ProviderContext.Provider>)
};

export {
	Provider,
	ProviderContext,
	staticAction
};
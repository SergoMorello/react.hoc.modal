import {
	createContext,
	useImperativeHandle,
	useRef,
	createRef,
	useLayoutEffect
} from "react";
import ReactDOM from "react-dom";
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

const Provider = ({children, SPA = false}: TProvider) => {
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

	const createDynamicContainer = (): HTMLDivElement => {
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
		modals: modalsRef
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
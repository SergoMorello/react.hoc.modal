import {
	useContext
} from "react";
import type {
	TUseModalControl,
	TConfig,
	TModalConfigAction
} from "./types";
import { ContainerContext, WithModalContext } from "./Context";
import { useLayoutEffect } from "./helpers";

const useModal = <ModalState>(config?: TConfig, deps: unknown[] = []): TUseModalControl<ModalState> => {
	const {setConfig, show, state, ...withModalContext} = useContext<TModalConfigAction<ModalState>>(WithModalContext);
	const containerContext = useContext(ContainerContext);

	const hide = () => {
		withModalContext.withModal ? withModalContext.hide() : containerContext.hide();
	}

	useLayoutEffect(() => {
		if (config) setConfig(config);
	}, deps);
	
	return {
		show,
		hide,
		setConfig,
		state
	};
};

export {useModal};
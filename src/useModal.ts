import {
	useContext,
	useLayoutEffect
} from "react";
import type {
	TUseModalControl,
	TConfig,
	TModalConfigAction
} from "./types";
import { WhithModalContext } from "./Context";

const useModal = <ModalState>(config?: TConfig, deps: unknown[] = []): TUseModalControl<ModalState> => {
	const {setConfig, show, hide, state} = useContext<TModalConfigAction<ModalState>>(WhithModalContext);

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
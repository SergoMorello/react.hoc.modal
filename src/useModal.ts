import {
	useContext,
	useLayoutEffect
} from "react";
import { WhithModalContext } from "./withModal";
import type {
	TUseModalControl,
	TConfig,
	TModalConfigAction
} from "./types";

const useModal = <TState>(config?: TConfig, deps: unknown[] = []): TUseModalControl<TState> => {
	const {setConfig, show, hide, state} = useContext<TModalConfigAction<TState>>(WhithModalContext);

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
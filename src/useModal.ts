import {
	useContext,
	useLayoutEffect
} from "react";
import { WhithModalContext } from "./withModal";
import {
	TUseModalControl,
	TConfig,
	TModalConfigAction
} from "./types";

const useModal = <TState>(config?: TConfig, deps: any[] = []): TUseModalControl<TState> => {
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
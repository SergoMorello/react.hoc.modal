import {
	useContext,
	useLayoutEffect
} from "react";
import { WhithModalContext } from "./withModal";
import {
	TUseModalControl,
	TConfig
} from "./types";

const useModal = (config?: TConfig): TUseModalControl => {
	const {setConfig, show, hide} = useContext(WhithModalContext);

	useLayoutEffect(() => {
		if (config) setConfig(config);
	},[]);
	
	return {
		show,
		hide,
		setConfig
	};
};

export {useModal};
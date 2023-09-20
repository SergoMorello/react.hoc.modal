import {
	useContext,
	useLayoutEffect
} from "react";
import { WhithModalContext } from "./withModal";
import {
	TControl,
	TConfig
} from "./types";

const useModal = (config?: TConfig): TControl => {
	const {setConfig, show, hide} = useContext(WhithModalContext);

	useLayoutEffect(() => {
		if (config) setConfig(config);
	},[]);
	
	return {
		show,
		hide
	};
};

export {useModal};
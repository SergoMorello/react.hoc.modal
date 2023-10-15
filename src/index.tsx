import {
	ForwardRefExoticComponent,
	RefAttributes,
	forwardRef,
	FC
} from "react";
import { Container } from "./Container";
import { Config } from "./Config";
import {
	Provider,
	staticAction
} from "./Provider";
import { withModal, TwithModal } from "./withModal";
import { useModal } from "./useModal";
import {
	TProps,
	TProvider,
	TModal,
	TConfigComponent,
	TConfig,
	TUseModalControl
} from "./types";

interface StaticComponents extends ForwardRefExoticComponent<TProps & RefAttributes<TModal>> {
	/**
	 * Provider
	 */
	Provider: FC<TProvider>;

	/**
	 * Configuration component
	 * @returns {ReactElement}
	 */
	Config: (config: TConfigComponent) => null;
	
	/**
	 * Show modal by name
	 * @param name Modal name
	 * @returns {void}
	 */
	show: (name: string) => void;

	/**
	 * Hide modal by name or close all modals
	 * @param name Modal name
	 * @returns {void}
	 */
	hide: (name?: string) => void;

	withModal: <TProps = {}, TState = {}>(WrappedComponent: ForwardRefExoticComponent<TProps> | FC<TProps>, config?: TConfig) => TwithModal<TProps, TState>;

	useModal: <TState>(config?: TConfig) => TUseModalControl<TState>;
}

const Modal: StaticComponents = {
	...forwardRef<TModal, TProps>(({...args}, ref): JSX.Element => <Container {...args} ref={ref}/>),
	Provider,
	Config,
	show: (name: string) => staticAction.current!.show(name),
	hide: (name?: string) => staticAction.current!.hide(name),
	withModal,
	useModal

} as StaticComponents;

export {
	withModal,
	useModal,
	Provider as ModalProvider,
	Config as ModalConfig
}

export default Modal;
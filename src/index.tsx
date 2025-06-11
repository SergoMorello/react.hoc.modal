import {
	type ForwardRefExoticComponent,
	type RefAttributes,
	forwardRef,
	type FC,
	MemoExoticComponent
} from "react";
import { Container } from "./Container";
import { Config } from "./Config";
import {
	Provider,
	staticAction
} from "./Provider";
import { withModal,
	type WithModalComponent
} from "./withModal";
import { useModal } from "./useModal";
import {
	ModalProps,
	TProvider,
	TModal,
	TConfigComponent,
	TConfig,
	TUseModalControl
} from "./types";
import {
	Footer,
	type FooterProps
} from "./Footer";
import ContentScroll, {
	type ContentScrollProps
} from "./Components/ContentScroll";
import PopupItem, {
	type PopupItemProps
} from "./Components/PopupItem";

interface StaticComponents extends ForwardRefExoticComponent<ModalProps & RefAttributes<TModal>> {
	/**
	 * Provider
	 */
	Provider: FC<TProvider>;

	Footer: FC<FooterProps>;

	ContentScroll: MemoExoticComponent<ForwardRefExoticComponent<ContentScrollProps>>;

	PopupItem: FC<PopupItemProps>;

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

	withModal: <ModalProps = {}, ModalState = {}>(WrappedComponent: ForwardRefExoticComponent<ModalProps> | FC<ModalProps>, config?: TConfig) => WithModalComponent<ModalProps, ModalState>;

	useModal: <ModalState>(config?: TConfig) => TUseModalControl<ModalState>;
}

const Modal: StaticComponents = {
	...forwardRef<TModal, ModalProps>(({...args}, ref): JSX.Element => <Container {...args} ref={ref}/>),
	Provider,
	Footer,
	ContentScroll,
	PopupItem,
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
	Config as ModalConfig,
	Footer as ModalFooter,
	ContentScroll as ModalContentScroll,
	PopupItem as ModalPopupItem
}

export default Modal;
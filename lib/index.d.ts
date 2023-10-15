import { ForwardRefExoticComponent, RefAttributes, FC } from "react";
import { Config } from "./Config";
import { Provider } from "./Provider";
import { withModal, TwithModal } from "./withModal";
import { useModal } from "./useModal";
import { TProps, TProvider, TModal, TConfigComponent, TConfig, TUseModalControl } from "./types";
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
declare const Modal: StaticComponents;
export { withModal, useModal, Provider as ModalProvider, Config as ModalConfig };
export default Modal;

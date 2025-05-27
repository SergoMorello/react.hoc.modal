import { ForwardRefExoticComponent, FC, RefAttributes } from "react";
import type { TModal, TConfig, TModalConfigAction } from "./types";
export interface WithModalComponent<ModalProps, ModalState> extends ForwardRefExoticComponent<ModalProps & RefAttributes<any>>, TModal<ModalProps, ModalState> {
    setState: (data: ModalState | ((data: ModalState) => ModalState)) => void;
}
export declare const WhithModalContext: import("react").Context<TModalConfigAction<any>>;
declare const withModal: <ModalProps extends {} = {}, ModalState extends {} = {}>(WrappedComponent: ForwardRefExoticComponent<ModalProps> | FC<ModalProps>, config?: TConfig) => WithModalComponent<ModalProps, ModalState>;
export { withModal };

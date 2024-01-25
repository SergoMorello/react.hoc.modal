import { ForwardRefExoticComponent, FC } from "react";
import type { TModal, TConfig, TModalConfigAction } from "./types";
export interface TwithModal<TProps, TState> extends ForwardRefExoticComponent<TProps>, TModal<TProps, TState> {
    setState: (data: TState | ((data: TState) => TState)) => TState;
}
export declare const WhithModalContext: import("react").Context<TModalConfigAction<any>>;
declare const withModal: <TProps extends {} = {}, TState extends {} = {}>(WrappedComponent: ForwardRefExoticComponent<TProps> | FC<TProps>, config?: TConfig) => TwithModal<TProps, TState>;
export { withModal };

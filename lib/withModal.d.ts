import { ForwardRefExoticComponent, FC } from "react";
import { TModal, TConfig, TModalConfigAction } from "./types";
export interface TwithModal<T> extends ForwardRefExoticComponent<T>, TModal<T> {
    setState: (data: T) => void;
}
export declare const WhithModalContext: import("react").Context<TModalConfigAction>;
declare const withModal: <T extends {}>(WrappedComponent: ForwardRefExoticComponent<T> | FC<T>, config?: TConfig) => TwithModal<T>;
export { withModal };

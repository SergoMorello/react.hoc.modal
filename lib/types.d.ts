import { RefObject } from "react";
export type TConfig = {
    /**
     * Uniq modal name
     */
    name?: string;
    /**
     * Modal title
     */
    title?: string;
    /**
     * Switch disabled or enabled close, default false
     */
    disableClose?: boolean;
    /**
     * If true, click on background close modal (default true)
     */
    backgroundClose?: boolean;
    /**
     * If true, hide close button (defaule false)
     */
    hideCloseButton?: boolean;
    /**
     * CSS classes
     */
    className?: string;
    /**
     * CSS styles
     */
    style?: React.CSSProperties;
    /**
     * Show and hide effect
     */
    effect?: 'none' | 'scale';
    /**
     * Modal container theme
     */
    theme?: 'light' | 'dark';
    /**
     * Custom render
     * @param props Modal props
     * @returns {React.ReactElement}
     */
    render?: (props: TPropsRender) => React.ReactElement;
    /**
     * Footer render content
     * @param props Modal props
     * @returns {React.ReactElement}
     */
    footerRender?: ((props: TPropsRender) => React.ReactElement) | React.ReactElement;
};
export type TProps = TConfig & {
    name: string;
    title: string;
    /**
     * Children react element
     */
    children: React.ReactElement;
    /**
     * Listener modal hide
     * @returns {void}
     */
    onHide?: () => void;
};
export type TProvider = {
    children: React.ReactElement;
    SPA?: boolean;
};
export type TControl = {
    /**
     * Show current modal
     * @returns {void}
     */
    show: () => void;
    /**
     * Hide current modal
     * @returns {void}
     */
    hide: () => void;
};
export type TUseModalControl = TControl & {
    setConfig: (config: TConfig) => void;
};
export type TStaticControl = {
    /**
     * Show modal by name
     * @param name Modal name
     * @returns
     */
    show: (name: string) => void;
    /**
     * Hide modal by name or hide all
     * @param name Modal name on undefined
     * @returns
     */
    hide: (name?: string) => void;
};
export type TModal<T = any> = TControl & {
    footerRef?: RefObject<HTMLDivElement> | null;
    setState?: (data: T) => void;
};
export type TModals = {
    [name: string]: TModal;
};
export type TContainerContext = {
    push(name: string, show: () => void, hide: () => void): void;
    modals: RefObject<HTMLDivElement> | null;
};
export type TModalConfigAction = TModal & {
    setConfig: (config: TConfig) => void;
};
export type TPropsRender = TProps & TModal & {};
export type TConfigComponent = TConfig & {
    /**
     * Footer component
     */
    children?: ((props: TModalConfigAction) => React.ReactElement | React.ReactNode) | React.ReactElement | React.ReactNode;
};

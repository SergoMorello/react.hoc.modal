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
     * CSS styles dialog container
     */
    dialogStyle?: React.CSSProperties;
    /**
     * CSS styles
     */
    style?: React.CSSProperties;
    /**
     * Prefix name static styles
     */
    stylePrefix?: string;
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
export type TUseModalControl<TState> = TControl & {
    setConfig: (config: TConfig) => void;
    state?: TState;
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
export type TShowStatus = {
    current: boolean;
};
export type TModal<TProps = {}, TState = {}> = TControl & {
    footerRef?: RefObject<HTMLDivElement> | null;
    setState?: (data: TState) => void;
};
export type TPushControll = TControl & {
    showStatus: TShowStatus;
};
export type TModals = {
    [name: string]: TPushControll;
};
export type TContainerContext = {
    push(name: string, control: TPushControll): void;
    modals: RefObject<HTMLDivElement> | null;
    count: () => number;
};
export type TModalConfigAction<TState = {}> = TModal & {
    setConfig: (config: TConfig) => void;
    state?: TState;
};
export type TPropsRender = TProps & TModal & {};
export type TConfigComponent = TConfig & {
    /**
     * Footer component
     */
    children?: ((props: TModalConfigAction) => React.ReactElement | React.ReactNode) | React.ReactElement | React.ReactNode;
};

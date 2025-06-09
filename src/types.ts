import type {
	ReactElement,
	RefObject
} from "react";

export type TConfig = {
	/**
	 * Unique name of the modal (used as an identifier).
	 */
	name?: string;

	/**
	 * Title text displayed in the modal header.
	 */
	title?: string;

	/**
	 * Disables all closing methods (close button, ESC key, background click).
	 * Default: false
	 */
	disableClose?: boolean;

	/**
	 * Allows closing the modal by clicking on the background overlay.
	 * Default: true
	 */
	backgroundClose?: boolean;

	/**
	 * Hides the close button in the top-right corner.
	 * Default: false
	 */
	hideCloseButton?: boolean;

	/**
	 * Custom React element to use as the close button.
	 */
	closeLabel?: ReactElement;

	/**
	 * Additional CSS class names for the modal container.
	 */
	className?: string;

	/**
	 * Inline styles for the outer dialog container.
	 */
	dialogStyle?: React.CSSProperties;

	/**
	 * Inline styles for the modal content area.
	 */
	style?: React.CSSProperties;

	/**
	 * Inline styles specifically for the content scroll container.
	 */
	contentStyle?: React.CSSProperties;

	/**
	 * Enables mobile-style bottom sheet layout.
	 */
	bottomSheet?: boolean;

	/**
	 * Maximum width (in pixels) for the bottom sheet layout.
	 */
	bottomSheetMaxWidth?: number;

	/**
	 * Snap points for the bottom sheet (e.g., ['25%', '50%', '100%']).
	 */
	bottomSheetSnapPoints?: string[];

	/**
	 * Prefix used for static CSS class generation.
	 */
	stylePrefix?: string;

	/**
	 * Enables drag-and-drop repositioning of the modal.
	 */
	draggable?: boolean;

	/**
	 * Animation effect used when showing or hiding the modal.
	 * - 'none': no animation
	 * - 'scale': zoom-in/out effect
	 */
	effect?: 'none' | 'scale';

	/**
	 * Visual theme of the modal container.
	 * - 'light': light background
	 * - 'dark': dark background
	 */
	theme?: 'light' | 'dark';

	/**
	 * Custom render function for advanced modal layout or behavior.
	 * Receives modal props as parameter.
	 */
	render?: (props: TPropsRender) => React.ReactElement;
};

export type ModalProps = TConfig & {

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
}

export type TProvider = {
	children: React.ReactNode;
	SPA?: boolean;
}

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
}

export type TUseModalControl<ModalState> = TControl & {
	setConfig: (config: TConfig) => void;
	state?: ModalState;
}

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
}

export type TShowStatus = {
	current: boolean;
}

export type TModal<ModalProps = {}, ModalState = {}> = TControl & {
	footerRef?: RefObject<HTMLDivElement> | null;
	setState?: (data: ModalState) => void;
}

export type TPushControll = TControl & {
	showStatus: TShowStatus;
}

export type TModals = {
	[name: string]: TPushControll;
}

export type TContainerContext = {
	push(name: string, control: TPushControll): void;
	modals: RefObject<HTMLDivElement> | null;
	count: () => number;
}

export type TModalConfigAction<ModalState = {}> = TModal & {
	setConfig: (config: TConfig) => void;
	state?: ModalState;
}

export type TPropsRender = ModalProps & TModal & {}

export type TConfigComponent = TConfig & {
	/**
	 * Footer component
	 */
	children?: ((props: TModalConfigAction) => React.ReactElement | React.ReactNode) | React.ReactElement | React.ReactNode;
}
import {
	useRef,
	useId,
	ForwardRefExoticComponent,
	forwardRef,
	createRef,
	useImperativeHandle,
	createContext,
	useState,
	FC,
	useLayoutEffect,
	useEffect
} from "react";
import Modal from ".";
import {
	TModal,
	TConfig,
	TPropsRender,
	TModalConfigAction
} from "./types";

export interface TwithModal<T> extends ForwardRefExoticComponent<T>,TModal<T> {
	setState: (data: T) => void;
}

export const WhithModalContext = createContext<TModalConfigAction>({
	setConfig: () => {},
	footerRef: null,
	show: () => {},
	hide: () => {}
});

const withModal = <T extends {}>(WrappedComponent: ForwardRefExoticComponent<T> | FC<T>, config?: TConfig): TwithModal<T> => {
	const currentRef = createRef<TModal<T> | null>();
	

	const show = () => {
		currentRef.current?.show();
	};

	const hide = () => {
		currentRef.current?.hide();
	};

	const setState = (data: T) => {
		if (typeof currentRef.current!.setState !== 'function') return;
		currentRef.current!.setState(data);
	};

	const container = () => forwardRef<TModal<T>, T>(({...props}, ref): JSX.Element => {
		const modalRef = useRef<TModal<T>>(null);
		const id = useId();
		const [currentConfig, _setConfig] = useState<TConfig | undefined>(config);

		const setConfig = (config: TConfig) => {
			_setConfig((currentConfig) => ({
				...currentConfig,
				...config
			}));
		};
		
		const setState = (data: T) => {
			props = Object.assign(props, data);
		};
		
		useImperativeHandle(currentRef, () => ({
			...modalRef.current,
			setState
		} as TModal<T>));

		return(<WhithModalContext.Provider value={{
			setConfig,
			footerRef: modalRef.current?.footerRef,
			show,
			hide
		}}>
			<Modal name={currentConfig?.name ?? id} title={currentConfig?.title ?? ''} {...currentConfig} ref={modalRef}>
				<WrappedComponent {...props} ref={ref}/>
			</Modal>
		</WhithModalContext.Provider>);
	});

	return {
		...container(),
		show,
		hide,
		setState
	} as TwithModal<T>;
};

export {withModal};
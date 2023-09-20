import {
	useRef,
	useId,
	ForwardRefExoticComponent,
	forwardRef,
	createRef,
	useImperativeHandle,
	createContext,
	useState,
	FC
} from "react";
import Modal from ".";
import {
	TModal,
	TConfig,
	TPropsRender,
	TModalConfigAction
} from "./types";

export interface TwithModal<T> extends ForwardRefExoticComponent<T>,TModal {}

export const WhithModalContext = createContext<TModalConfigAction>({
	setConfig: () => {},
	footerRef: null,
	show: () => {},
	hide: () => {}
});

const withModal = <T extends {}>(WrappedComponent: ForwardRefExoticComponent<T> | FC<T>, config?: TConfig): TwithModal<T> => {
	const currentRef = createRef<TModal | null>();
	

	const show = () => {
		currentRef.current?.show();
	};

	const hide = () => {
		currentRef.current?.hide();
	};

	const container = () => forwardRef<TModal, T>(({...props}, ref): JSX.Element => {
		const modalRef = useRef<TModal>(null);
		const id = useId();
		const [currentConfig, _setConfig] = useState<TConfig | undefined>(config);

		const setConfig = (config: TConfig) => {
			_setConfig((currentConfig) => ({
				...currentConfig,
				...config
			}));
		};
		
		useImperativeHandle(currentRef, () => modalRef.current);

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
		hide
	} as TwithModal<T>;
};

export {withModal};
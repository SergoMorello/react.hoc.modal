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
import { Container } from "./Container";
import type {
	TModal,
	TConfig,
	TModalConfigAction
} from "./types";

export interface TwithModal<TProps, TState> extends ForwardRefExoticComponent<TProps>,TModal<TProps, TState> {
	setState: (data: TState | ((data: TState) => TState)) => TState;
}

export const WhithModalContext = createContext<TModalConfigAction<any>>({
	setConfig: () => {},
	state: {},
	footerRef: null,
	show: () => {},
	hide: () => {}
});

const withModal = <TProps extends {} = {}, TState extends {} = {}>(WrappedComponent: ForwardRefExoticComponent<TProps> | FC<TProps>, config?: TConfig): TwithModal<TProps, TState> => {
	const currentRef = createRef<TModal<TProps> | null>();
	

	const show = () => {
		currentRef.current?.show();
	};

	const hide = () => {
		currentRef.current?.hide();
	};

	const setState = (data: TState | ((data: TState) => TState)) => {
		if (typeof currentRef.current!.setState !== 'function') return;
		currentRef.current!.setState(data);
	};

	const container = () => forwardRef<TModal<TProps>, TProps>(({...props}, ref): JSX.Element => {
		const modalRef = useRef<TModal<TProps>>(null);
		const [stateData, setStateData] = useState<TState>();
		const id = useId();
		const [currentConfig, _setConfig] = useState<TConfig | undefined>(config);

		const setConfig = (config: TConfig) => {
			_setConfig((currentConfig) => ({
				...currentConfig,
				...config
			}));
		};
		
		useImperativeHandle(currentRef, () => ({
			...modalRef.current,
			setState: setStateData
		} as TModal<TProps>));
		
		return(<WhithModalContext.Provider value={{
			setConfig,
			state: stateData,
			footerRef: modalRef.current?.footerRef,
			show,
			hide
		}}>
			<Container name={currentConfig?.name ?? id} title={currentConfig?.title ?? ''} {...currentConfig} ref={modalRef}>
				<WrappedComponent {...props} ref={ref}/>
			</Container>
		</WhithModalContext.Provider>);
	});

	return {
		...container(),
		show,
		hide,
		setState
	} as TwithModal<TProps, TState>;
};

export {withModal};
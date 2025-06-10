import {
	useRef,
	useId,
	ForwardRefExoticComponent,
	forwardRef,
	createRef,
	useImperativeHandle,
	useState,
	FC,
	useEffect,
	RefAttributes
} from "react";
import { Container } from "./Container";
import type {
	TModal,
	TConfig,
	TShowEvent
} from "./types";
import { WhithModalContext } from "./Context";

export interface WithModalComponent<ModalProps, ModalState> extends ForwardRefExoticComponent<ModalProps & RefAttributes<ModalProps>>, TModal<ModalProps, ModalState> {
	setState: (data: ModalState | ((data: ModalState) => ModalState)) => void;
};

const withModal = <ModalProps extends {} = {}, ModalState extends {} = {}>(WrappedComponent: ForwardRefExoticComponent<ModalProps> | FC<ModalProps>, config?: TConfig): WithModalComponent<ModalProps, ModalState> => {
	const currentRef = createRef<TModal<ModalProps> | null>();
	
	const show = () => {
		currentRef.current?.show();
	};

	const showPopup = (event?: TShowEvent) => {
		currentRef.current?.showPopup(event);
	};

	const hide = () => {
		currentRef.current?.hide();
	};

	const setState = (data: ModalState | ((data: ModalState) => ModalState)) => {
		if (typeof currentRef.current!.setState !== 'function') return;
		currentRef.current!.setState(data);
	};

	return {
		...forwardRef<TModal<ModalProps>, ModalProps>((props, ref): JSX.Element => {
			const modalRef = useRef<TModal<ModalProps>>(null);
			const [stateData, setStateData] = useState<ModalState>();
			const id = useId();
			const [currentConfig, _setConfig] = useState<TConfig | undefined>(config);

			const setConfig = (config: TConfig) => {
				_setConfig((currentConfig) => ({
					...currentConfig,
					...config
				}));
			};

			useEffect(() => {
				_setConfig(config);
			}, [config]);
			
			useImperativeHandle(currentRef, () => ({
				...modalRef.current,
				setState: setStateData
			} as TModal<ModalProps>));
			
			return(<WhithModalContext.Provider value={{
				setConfig,
				state: stateData,
				footerRef: modalRef.current?.footerRef,
				showPopup,
				show,
				hide
			}}>
				<Container name={currentConfig?.name ?? id} title={currentConfig?.title ?? ''} {...currentConfig} ref={modalRef}>
					<WrappedComponent {...props} ref={ref}/>
				</Container>
			</WhithModalContext.Provider>);
		}),
		showPopup,
		show,
		hide,
		setState
	} as WithModalComponent<ModalProps, ModalState>;
};

export {withModal};
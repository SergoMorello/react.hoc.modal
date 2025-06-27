import {
	useContext,
	useEffect,
	useLayoutEffect,
	useRef,
	useState,
	forwardRef,
	useImperativeHandle,
	useMemo,
	createContext,
	ReactNode
} from "react";
import { createPortal } from "react-dom";
import {
	ProviderContext
} from "./Provider";
import type {
	ModalProps,
	TModal,
	TPropsRender,
	TShowEvent
} from "./types";
import styles from "./style.module.scss";
import HTMLViewport from "html-viewport";
import { Style } from "./helpers";
import Modal from "./Components/Modal";
import BottomSheet from "./Components/BottomSheet";
import Popup from "./Components/Popup";
import { ContainerContext } from "./Context";

const Container = forwardRef<TModal, ModalProps>((props, ref) => {
	const {
		bottomSheet,
		name,
		disableClose = false,
		backgroundClose = true,
		bottomSheetMaxWidth = 550,
		popup,
		theme = 'light',
		effect = 'scale',
		onHide
	} = props;
	
	const containerRef = useRef<HTMLDivElement>(null);
	const footerRef = useRef<HTMLDivElement>(null);
	const showStatus = useRef(false);
	const initPosition = useRef<DOMRect>();
	const [isShow, setShow] = useState(false);
	const [isMobile, setMobile] = useState(false);
	const [footer, setFooter] = useState<ReactNode>();
	const providerContext = useContext(ProviderContext);
	const listeners = useRef({
		onHide: () => {}
	});

	const show = () => {
		setShow(true);
	};

	const showPopup = (event?: TShowEvent) => {
		if (event && 'target' in event) {
			initPosition.current = (event.target as HTMLButtonElement).getBoundingClientRect();
		}
		show();
	};

	const _hide = () => {
		const element = containerRef.current;
		if (!element) return;
		listeners.current.onHide();
		element!.ontransitionend = () => {
			setShow(false);
		};
		element?.classList.remove(styles['active'], 'active');
	};

	const hide = () => {
		_hide();
	};

	const modalHide = () => {
		if (disableClose) return;
		_hide();
	};
	
	const backgroundHide = () => {
		if (!backgroundClose) return;
		modalHide();
	};

	const blockScroll = (status: boolean) => {
		if (!document!.body) return;
		const classBody = document.body.classList;
		status ? classBody.add(styles['block-scroll']) : classBody.remove(styles['block-scroll']);
	};

	const handleEscape = (e: KeyboardEvent) => {
		if (e.code === 'Escape') {
			hide();
		}
	};

	const resetFocus = (e: React.FocusEvent<HTMLDivElement>) => {
		if (!(e.relatedTarget && e.relatedTarget!.closest('.' + styles['modal-container']))) {
			e.currentTarget.focus();
		}
	};

	const handleSize = (e?: Event) => {
		const width = e ? (e.target as Window).innerWidth : window.innerWidth;
		const isCurrentMobile = width <= bottomSheetMaxWidth;
		if (isCurrentMobile !== isMobile) 
			setMobile(isCurrentMobile);
	};

	useEffect(() => {
		showStatus.current = isShow;

		const viewport = new HTMLViewport;

		if (isShow) {
			viewport.add('interactive-widget', 'resizes-content');
			requestAnimationFrame(() => containerRef.current?.classList.add(styles['active'], 'active'));
	 	}else{
			viewport.remove('interactive-widget');
			onHide?.();
		}
		
		requestAnimationFrame(() => {
			if (!isShow && providerContext.count() > 0) return;
			blockScroll(isShow);
		})
		
	},[isShow]);

	useEffect(() => {
		return () => {
			showStatus.current = false;
			blockScroll(false);
		}
	}, []);

	useLayoutEffect(() => {
		handleSize();
		window.addEventListener('resize', handleSize);
		return () => {
			window.removeEventListener('resize', handleSize);
		}
	},[isMobile, bottomSheetMaxWidth]);

	/**
	 * Unset background cursor pointer
	 */
	useLayoutEffect(() => {
		if (!containerRef.current) return;
		const container = containerRef.current;

		if (backgroundClose)
			container?.classList.remove(styles['cursor-unset']);
		else
			container?.classList.add(styles['cursor-unset']);
	},[backgroundClose]);

	useLayoutEffect(() => {
		providerContext.push(name, {
			show,
			hide: _hide,
			showStatus
		});
		document.addEventListener('keydown', handleEscape);
		return () => {
			document.removeEventListener('keydown', handleEscape);
		}
	},[]);
	
	useImperativeHandle(ref, () => ({
		show,
		showPopup,
		hide,
		footerRef
	}));

	const classesRoot = useMemo(() => {
		const classesRoot = [
			Style('container')
		];
		if (theme) classesRoot.push(theme);
		if (effect) classesRoot.push(styles['effect-' + effect]);
		if (bottomSheet) classesRoot.push(styles['bottomsheet']);
		return classesRoot.join(' ');
	}, [theme, effect, bottomSheet]);
	
	if (!providerContext.modals || !providerContext.modals!.current) {
		return(null);
	}
	
	const renderProps: TPropsRender = {
		...props,
		showPopup,
		show,
		hide,
		footerRef
	};
	
	return createPortal(
			<ContainerContext.Provider value={{
				initPosition,
				footer,
				listeners,
				setFooter,
				hide
			}}>
			{isShow &&
				<div className={classesRoot} ref={containerRef}>
					
					{
						(bottomSheet && isMobile) ? 
						<BottomSheet
							{...props}
							onBackground={backgroundHide}
							onClose={modalHide}
							renderProps={renderProps}
						/> : (popup ? <Popup
								{...props}
								onBackground={backgroundHide}
								onClose={modalHide}
								renderProps={renderProps}
							/> : <Modal
								{...props}
								onBackground={backgroundHide}
								onClose={modalHide}
								renderProps={renderProps}
						/>)
						
					}
				</div>
			}
		</ContainerContext.Provider>,
		providerContext.modals!.current
	);
});

export {
	Container
};
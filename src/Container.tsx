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
	TPropsRender
} from "./types";
import styles from "./style.module.scss";
import HTMLViewport from "html-viewport";
import { Style } from "./helpers";
import Modal from "./Modals/Modal";
import BottomSheet from "./Modals/BottomSheet";
import { ContainerContext } from "./Context";

const Container = forwardRef<TModal, ModalProps>((props, ref) => {
	const {
		bottomSheet,
		name,
		disableClose = false,
		backgroundClose = true,
		bottomSheetMaxWidth = 550,
		theme = 'light',
		effect = 'scale',
		onHide
	} = props;
	
	const containerRef = useRef<HTMLDivElement>(null);
	const footerRef = useRef<HTMLDivElement>(null);
	const showStatus = useRef(false);
	const [isShow, setShow] = useState(false);
	const [isMobile, setMobile] = useState(false);
	const [footer, setFooter] = useState<ReactNode>();
	const providerContext = useContext(ProviderContext);

	const show = () => {
		setShow(true);
	};

	const _hide = () => {
		const element = containerRef.current;
		if (!element) return;
		
		element!.ontransitionend = () => {
			setShow(false);
		};
		element?.classList.remove(styles['active']);
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
			requestAnimationFrame(() => containerRef.current?.classList.add(styles['active']));
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
		show,
		hide,
		footerRef
	};
	
	return createPortal(
			<ContainerContext.Provider value={{
				footer,
				setFooter
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
						/> :
						<Modal
							{...props}
							onBackground={backgroundHide}
							onClose={modalHide}
							renderProps={renderProps}
						/>
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
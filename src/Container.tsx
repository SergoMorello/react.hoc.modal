import {
	useContext,
	useEffect,
	useLayoutEffect,
	useRef,
	useState,
	forwardRef,
	useImperativeHandle
} from "react";
import { createPortal } from "react-dom";
import {
	ProviderContext
} from "./Provider";
import type {
	TProps,
	TModal,
	TPropsRender
} from "./types";
import styles from "../assets/css/style.module.css";
import HTMLViewport from "html-viewport";

const Container = forwardRef<TModal, TProps>((props, ref) => {
	const {
		children,
		style,
		className,
		name,
		title,
		disableClose = false,
		backgroundClose = true,
		hideCloseButton = false,
		stylePrefix = '_modal-',
		theme = 'light',
		effect = 'scale',
		render,
		footerRender,
		onHide
	} = props;
	
	const containerRef = useRef<HTMLDivElement>(null);
	const footerRef = useRef<HTMLDivElement>(null);
	const showStatus = useRef(false);
	const [isShow, setShow] = useState(false);
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
	
	const backgroundHide = () => {
		if (!backgroundClose) return;
		hide();
	};

	const modalHide = () => {
		if (disableClose) return;
		_hide();
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
	
	if (!providerContext.modals || !providerContext.modals!.current) {
		return(null);
	}

	const renderProps: TPropsRender = {
		...props,
		show,
		hide,
		footerRef
	};

	const Style = (styleOrArray: string | string[]): string => {
		if (Array.isArray(styleOrArray)) {
			return styleOrArray.map(Style).join(' ');
		}else{
			return stylePrefix + styleOrArray + ' ' + styles[styleOrArray];
		}
	};

	const classesRoot = [
		Style('container')
	];
	if (theme) classesRoot.push(theme, styles[theme]);
	if (effect) classesRoot.push(styles['effect-' + effect]);
	
	return createPortal(
			<>
			{isShow &&
				<div className={classesRoot.join(' ')} ref={containerRef}>
					<div className={Style('background')} onClick={backgroundHide}/>
					<dialog className={Style('modal-container')} tabIndex={1} role="dialog" open>
						{
							(typeof render === 'function' && !hideCloseButton) &&
							<div className={Style('close-block')} onClick={backgroundHide}>
								<div className={Style(['close', 'large'])} onClick={modalHide}/>
							</div>
						}
						
						{
							typeof render === 'function' ? render(renderProps) :
							<div className={Style('modal') + (className ? ' ' + className : '')} style={style}>
								<div className={Style('header')}>
									<div className={Style('text')}>
										{title}
									</div>
									{(!hideCloseButton) && <div className={Style('close')} onClick={modalHide}/>}
								</div>
								<div className={Style('content')}>
									{children}
								</div>
								{footerRender && <div className={Style('footer')} ref={footerRef}>{typeof footerRender === 'function' ? footerRender(renderProps) : footerRender}</div>}
							</div>
						}
					</dialog>
				</div>
			}
		</>,
		providerContext.modals!.current
	);
});

export {
	Container
};
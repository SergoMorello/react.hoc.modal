import {
	useContext,
	useEffect,
	useLayoutEffect,
	useRef,
	useState,
	forwardRef,
	useImperativeHandle
} from "react";
import ReactDOM from "react-dom";
import {
	ProviderContext
} from "./Provider";
import {
	TProps,
	TModal,
	TPropsRender
} from "./types";
import styles from "../assets/css/style.module.css";


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
		theme = 'light',
		effect = 'scale',
		render,
		footerRender,
		onHide
	} = props;
	
	const containerRef = useRef<HTMLDivElement>(null);
	const footerRef = useRef<HTMLDivElement>(null);
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
		if (disableClose) return;
		_hide();
	};

	

	const backgroundHide = () => {
		if (!backgroundClose) return;
		hide();
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
		if (isShow) {
			requestAnimationFrame(() => containerRef.current?.classList.add(styles['active']));
	 	}else{
			onHide?.();
		}
		requestAnimationFrame(() => blockScroll(isShow));
	},[isShow]);

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
		providerContext.push(name, show, _hide);
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
	
	return ReactDOM.createPortal(
			<>
			{isShow &&
				<div className={styles['container'] + ' ' + styles[theme] + ' ' + styles['effect-' + effect]} ref={containerRef}>
					<div className={styles['background']} onClick={backgroundHide}/>
					<div className={styles['modal-container']} tabIndex={1} role="dialog" onBlur={resetFocus}>
						{
							(typeof render === 'function' && !hideCloseButton) &&
							<div className={styles['close-block']} onClick={backgroundHide}>
								<div className={styles['close'] + ' ' + styles['large']} onClick={hide}/>
							</div>
						}
						
						{
							typeof render === 'function' ? render(renderProps) :
							<div className={styles['modal'] + (className ? ' ' + className : '')} style={style}>
								<div className={styles['header']}>
									<div className={styles['text']}>
										{title}
									</div>
									{(!hideCloseButton) && <div className={styles['close']} onClick={hide}/>}
								</div>
								<div className={styles['content']}>
									{children}
								</div>
								{footerRender && <div className={styles['footer']} ref={footerRef}>{typeof footerRender === 'function' ? footerRender(renderProps) : footerRender}</div>}
							</div>
						}
					</div>
				</div>
			}
		</>,
		providerContext.modals!.current
	);
});

export {
	Container
};
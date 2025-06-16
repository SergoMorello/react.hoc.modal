import {
	type MouseEvent,
	type TouchEvent,
	useContext,
	useRef,
	useState
} from "react";
import { Style } from "../../helpers";
import { ModalProps, TPropsRender } from "../../types";
import { ContainerContext } from "../../Context";
import ContentScroll from "../ContentScroll";
import styles from "../../style.module.scss";
import { useStyle } from "../../hooks";

interface DefaultModalProps extends ModalProps {
	onBackground: () => void;
	onClose: () => void;
	renderProps: TPropsRender;
};

export const Modal = ({onBackground, onClose, renderProps, ...props}: DefaultModalProps) => {
	const {
		render,
		dialogStyle,
		hideCloseButton,
		className,
		style,
		title,
		children,
		contentStyle,
		closeLabel,
		bottomSheetMaxWidth,
		draggable
	} = props;
	const Styles = useStyle(styles, '_modal-');

	const containerContext = useContext(ContainerContext);

	const modalRef = useRef<HTMLDialogElement>(null);

	const [position, setPosition] = useState({
		x: 0,
		y: 0
	});
	const startPosition = useRef({
		x: 0,
		y: 0
	});
	const endPosition = useRef({
		x: 0,
		y: 0
	});
	const modalSize = useRef({
		x: 0,
		y: 0,
		width: 0,
		height: 0
	});
	const panActive = useRef(false);

	const handleMoveStart = ({target, ...e}: MouseEvent<HTMLDivElement> | TouchEvent<HTMLDivElement>) => {
		if (!(target as HTMLDivElement).closest('header') || !draggable || !modalRef.current) return;
		const {x, y, width, height} = modalRef.current.getBoundingClientRect();
		
		const {clientX, clientY} = 'touches' in e ? e.touches[0] : e;
		panActive.current = true;
		startPosition.current = {
			x: clientX,
			y: clientY
		};
		modalSize.current = {
			x,
			y,
			width,
			height
		};
		modalRef.current?.classList.add(styles['drag']);
	};

	const handleMoveEnd = () => {
		if (!panActive.current) return;
		panActive.current = false;
		
		endPosition.current = {...position};
		modalRef.current?.classList.remove(styles['drag']);
	};

	const handleMove = (e: MouseEvent<HTMLDivElement> | TouchEvent<HTMLDivElement>) => {
		if (!panActive.current) return;
		const {clientX, clientY} = 'touches' in e ? e.touches[0] : e;

		const dx = clientX - startPosition.current.x;
		const dy = clientY - startPosition.current.y;

		const newX = endPosition.current.x + dx;
		const newY = endPosition.current.y + dy;

		const halfW = window.innerWidth / 2;
		const halfH = window.innerHeight / 2;

		const maxX = halfW - modalSize.current.width / 2;
		const maxY = halfH - modalSize.current.height / 2;

		const clampedX = Math.max(Math.min(newX, maxX), -maxX);
		const clampedY = Math.max(Math.min(newY, maxY), -maxY);

		setPosition({ x: clampedX, y: clampedY });
	};

	return(<div
		className={Styles('modal-wrapper')}
		onMouseDown={handleMoveStart}
		onMouseUp={handleMoveEnd}
		onMouseLeave={handleMoveEnd}
		onMouseMove={handleMove}
		onTouchStart={handleMoveStart}
		onTouchEnd={handleMoveEnd}
		onTouchCancel={handleMoveEnd}
		onTouchMove={handleMove}
	>
		<div className={Styles('background')} onClick={onBackground}/>
		<dialog
			className={Styles('modal-container')}
			tabIndex={1}
			role="dialog"
			style={{
				...dialogStyle,
				maxWidth: bottomSheetMaxWidth,
				transform: `translate(calc(-50% + ${position.x}px), calc(-50% + ${position.y}px))`
			}}
			
			ref={modalRef}
			open
		>
			{
				(typeof render === 'function' && !hideCloseButton) &&
				<div className={Styles('close-block')} onClick={onBackground}>
					<div className={Styles(['close', 'large'])} onClick={onClose}/>
				</div>
			}
			
			{
				typeof render === 'function' ? render(renderProps) :
				<div className={Styles('modal') + (className ? ' ' + className : '')} style={style}>
					<header
						className={Styles('header')}
					>
						<div className={Styles('text')}>
							{title}
						</div>
						{(!hideCloseButton) && (closeLabel ? <span children={closeLabel} onClick={onClose}/> : <span className={Styles('close')} onClick={onClose}/>)}
					</header>
					<ContentScroll className={Styles('content')} style={contentStyle} active>
						{children}
					</ContentScroll>
					{
					containerContext.footer ? <footer
						className={Styles('footer')}
						ref={renderProps.footerRef}
						children={containerContext.footer}
					/> : null		
					}
				</div>
			}
		</dialog>
	</div>);
};
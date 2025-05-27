import { useRef, useState } from "react";
import { Style } from "../helpers";
import { ModalProps, TPropsRender } from "../types";

interface DefaultModalProps extends ModalProps {
	onBackground: () => void;
	onClose: () => void;
	renderProps: TPropsRender;
};

const BottomSheet = ({onBackground, onClose, renderProps, ...props}: DefaultModalProps) => {
	const {
		render,
		dialogStyle,
		hideCloseButton,
		className,
		style,
		title,
		children,
		footerRender,
		contentStyle
	} = props;

	const snapPoints = [100, 300, 600]; // пиксели от нижнего края

	const sheetRef = useRef<HTMLDialogElement>(null);
	const [position, setPosition] = useState(snapPoints[snapPoints.length - 1]);
	const startY = useRef<number | null>(null);

	const handleTouchStart = (e: React.TouchEvent | React.MouseEvent) => {
		startY.current = 'touches' in e ? e.touches[0].clientY : (e as React.MouseEvent).clientY;
		document.addEventListener('touchmove', handleTouchMove as any, { passive: false });
		document.addEventListener('touchend', handleTouchEnd as any);
		document.addEventListener('mousemove', handleTouchMove as any);
		document.addEventListener('mouseup', handleTouchEnd as any);
	};

	const handleTouchMove = (e: TouchEvent | MouseEvent) => {
		if (startY.current === null) return;

		const currentY = 'touches' in e ? e.touches[0].clientY : (e as MouseEvent).clientY;
		const delta = currentY - startY.current;
		const newPosition = Math.min(
			Math.max(position + delta, snapPoints[0]),
			snapPoints[snapPoints.length - 1]
		);

		setPosition(newPosition);
		startY.current = currentY;
		e.preventDefault(); // блокируем скролл страницы
	};

	const handleTouchEnd = () => {
		document.removeEventListener('touchmove', handleTouchMove as any);
		document.removeEventListener('touchend', handleTouchEnd as any);
		document.removeEventListener('mousemove', handleTouchMove as any);
		document.removeEventListener('mouseup', handleTouchEnd as any);

		// snap to closest
		const closest = snapPoints.reduce((prev, curr) =>
			Math.abs(curr - position) < Math.abs(prev - position) ? curr : prev
		);
		setPosition(closest);
	};
	console.log(position)
	return(<dialog
		className={Style('bottomsheet-container')}
		tabIndex={1}
		role="dialog"
		style={{
			...dialogStyle,
			transform: `translateY(-${window.innerHeight - position}px)`,
			transition: 'transform 0.2s ease',
			touchAction: 'none',
		}}
		ref={sheetRef}
		onMouseDown={handleTouchStart}
      	onTouchStart={handleTouchStart}
		open
	>
		{
			(typeof render === 'function' && !hideCloseButton) &&
			<div className={Style('close-block')} onClick={onBackground}>
				<div className={Style(['close', 'large'])} onClick={onClose}/>
			</div>
		}
		
		{
			typeof render === 'function' ? render(renderProps) :
			<div className={Style('modal') + (className ? ' ' + className : '')} style={style}>
				<div className={Style('header')}>
					<div className={Style('text')}>
						{title}
					</div>
					{(!hideCloseButton) && <div className={Style('close')} onClick={onClose}/>}
				</div>
				<div className={Style('content')} style={contentStyle}>
					{children}
				</div>
				{footerRender && <div className={Style('footer')}>{typeof footerRender === 'function' ? footerRender(renderProps) : footerRender}</div>}
			</div>
		}
	</dialog>);
};

export default BottomSheet;
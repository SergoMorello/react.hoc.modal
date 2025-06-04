import { useEffect, useRef, useState } from "react";
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

	const snapPoints = ['50%', '70%'];

	const sheetRef = useRef<HTMLDialogElement>(null);
	const [position, setPosition] = useState(0);
	const startY = useRef<number | null>(null);

	const getSnapIndex = (position: number, snapPoints: string[]): number => {
		const pos = (typeof position === 'string' ? parseFloat(position) : position);

		for (let i = 0; i < snapPoints.length; i++) {
			const snap = parseFloat(snapPoints[i]);
			const half = snap / 2;

			if (pos < half) {
				return i === 0 ? -1 : i - 1;
			}
		}

		return snapPoints.length - 1;
	};

	const handleTouchStart = (e: React.TouchEvent) => {
		startY.current = e.touches[0].clientY;
	
	};

	const handleTouchMove = (e: React.TouchEvent) => {
		if (startY.current === null) return;

		const currentY = e.touches[0].clientY;
	
		setPosition(Math.abs(((currentY / window.innerHeight) * 100) - 100))
		// const newPosition = Math.min(
		// 	Math.max(position + delta, snapPoints[0]),
		// 	snapPoints[snapPoints.length - 1]
		// );

		// setPosition(newPosition);
		startY.current = currentY;
	};

	const handleTouchEnd = () => {
		const snapIndex = getSnapIndex(position, snapPoints);
		if (snapIndex >= 0) {
			const snapPoint = parseFloat(snapPoints[snapIndex]);
			setPosition(snapPoint);
		}else{
			renderProps.hide();
		}
		// document.removeEventListener('touchmove', handleTouchMove as any);
		// document.removeEventListener('touchend', handleTouchEnd as any);
		// document.removeEventListener('mousemove', handleTouchMove as any);
		// document.removeEventListener('mouseup', handleTouchEnd as any);

		// // snap to closest
		// const closest = snapPoints.reduce((prev, curr) =>
		// 	Math.abs(curr - position) < Math.abs(prev - position) ? curr : prev
		// );
		// setPosition(closest);
	};
	
	useEffect(() => {
		setPosition(parseFloat(snapPoints[0] ?? 10));
	}, []);
	
	return(<dialog
		className={Style('bottomsheet-container')}
		tabIndex={1}
		role="dialog"
		style={{
			...dialogStyle,
			transform: `translateY(${Math.abs(position - 100)}%)`,
		}}
		ref={sheetRef}
      	onTouchStart={handleTouchStart}
		onTouchMove={handleTouchMove}
		onTouchEnd={handleTouchEnd}
		onTouchCancel={handleTouchEnd}
		open
	>
		<div className={Style('bottomsheet-handle-container')}>
			<span className={Style('bottomsheet-handle-indicator')}/>
		</div>
		
		{
			typeof render === 'function' ? render(renderProps) :
			<div className={Style('bottomsheet') + (className ? ' ' + className : '')} style={style}>
				<div className={Style('header')}>
					<div className={Style('text')}>
						{title}
					</div>
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
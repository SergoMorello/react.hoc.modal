import { TouchEvent, useEffect, useRef, useState } from "react";
import { Style } from "../helpers";
import { ModalProps, TPropsRender } from "../types";
import styles from "../../assets/css/style.module.css";

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
	const endY = useRef<number | null>(null);

	const hide = () => {
		setPosition(0);
		renderProps.hide();
	};

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

	const handleTouchStart = (e: TouchEvent<HTMLDialogElement>) => {
		sheetRef.current?.classList.add(styles['touch']);
		startY.current = e.touches[0].clientY;
		endY.current = position;
	};

	const handleTouchMove = (e: TouchEvent<HTMLDialogElement>) => {
		if (startY.current === null || endY.current === null) return;

		const currentY = e.touches[0].clientY;

		setPosition(Math.abs((((currentY - startY.current) / window.innerHeight) * 100) - endY.current))
	};

	const handleTouchEnd = () => {
		sheetRef.current?.classList.remove(styles['touch']);
		const snapIndex = getSnapIndex(position, snapPoints);
		if (snapIndex >= 0) {
			const snapPoint = parseFloat(snapPoints[snapIndex]);
			setPosition(snapPoint);
		}else{
			hide();
		}
	};
	
	useEffect(() => {
		setPosition(parseFloat(snapPoints[0] ?? 10));
	}, []);
	
	return(<>
		<div className={Style('background')} onClick={hide}/>
		<dialog
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
		</dialog>
	</>);
};

export default BottomSheet;
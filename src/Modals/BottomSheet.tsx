import { TouchEvent, useContext, useEffect, useMemo, useRef, useState } from "react";
import { Style } from "../helpers";
import { ModalProps, TPropsRender } from "../types";
import styles from "./style.module.scss";
import { ContainerContext } from "../Context";
import { useStyle } from "../hooks";

interface DefaultModalProps extends ModalProps {
	onBackground: () => void;
	onClose: () => void;
	renderProps: TPropsRender;
};

const BottomSheet = ({onBackground, onClose, renderProps, ...props}: DefaultModalProps) => {
	const {
		render,
		dialogStyle,
		bottomSheetSnapPoints,
		className,
		style,
		children,
		contentStyle
	} = props;

	const containerContext = useContext(ContainerContext);
	const Styles = useStyle(styles, 'bottomsheet-');

	const snapPoints = useMemo(() => bottomSheetSnapPoints ?? ['50%'], [bottomSheetSnapPoints]);

	const sheetRef = useRef<HTMLDialogElement>(null);
	const [position, setPosition] = useState(0);
	const positionFooter = useMemo(() => (Math.abs(position - 100) / 100) * window.innerHeight, [position]);
	const startY = useRef<number | null>(null);
	const endY = useRef<number | null>(null);
	
	const hide = () => {
		setPosition(0);
		renderProps.hide();
	};

	const getSnapIndex = (position: number, snapPoints: string[]): number => {
		const pos = typeof position === 'string' ? parseFloat(position) : position;
		const snaps = snapPoints.map(p => parseFloat(p));

		if (snaps.length === 0) return -1;

		const firstHalf = snaps[0] / 1.5;
		if (pos < firstHalf) return -1;
		if (snaps.length === 1) return 0;

		for (let i = 1; i < snaps.length; i++) {
			const midpoint = (snaps[i - 1] + snaps[i]) / 2;
			if (pos < midpoint) {
				return i - 1;
			}
		}

		return snaps.length - 1;
	};

	const handleTouchStart = (e: TouchEvent<HTMLDialogElement>) => {
		sheetRef.current?.classList.add(styles['touch']);
		startY.current = e.touches[0].clientY;
		endY.current = position;
	};

	const handleTouchMove = (e: TouchEvent<HTMLDialogElement>) => {
		if (startY.current === null || endY.current === null) return;

		const currentY = e.touches[0].clientY;
		const pos = Math.abs((((currentY - startY.current) / window.innerHeight) * 100) - endY.current);
		if (pos >= 100 || pos <= 0 || currentY > window.innerHeight) return;
		setPosition(pos);
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
			className={Styles('bottomsheet-container')}
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
			<div className={Styles('bottomsheet-handle-container')}>
				<span className={Styles('bottomsheet-handle-indicator')}/>
			</div>
			
			{
				typeof render === 'function' ? render(renderProps) :
				<div className={Styles('bottomsheet') + (className ? ' ' + className : '')} style={style}>
					<div className={Style('content')} style={contentStyle}>
						{children}
					</div>
					{containerContext.footer ? <div
						className={Styles('footer')}
						style={{
							transform: `translateY(-${positionFooter}px)`
						}}
					>{containerContext.footer}</div> : null}
				</div>
			}
		</dialog>
	</>);
};

export default BottomSheet;
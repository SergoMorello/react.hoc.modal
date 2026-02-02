import { forwardRef, TouchEvent, UIEvent, useCallback, useContext, useEffect, useImperativeHandle, useMemo, useRef, useState } from "react";
import { Style } from "../../helpers";
import { ModalProps, TPropsRender } from "../../types";
import styles from "./style.module.scss";
import { ContainerContext } from "../../Context";
import { useStyle } from "../../hooks";
import ContentScroll from "../ContentScroll";

interface hideBottomSheet extends ModalProps {
	onBackground: () => void;
	onClose: () => void;
	renderProps: TPropsRender;
};

export const BottomSheet = ({onBackground, onClose, renderProps, ...props}: hideBottomSheet) => {
	if (typeof window === 'undefined') {
		return null;
	}
	const {
		render,
		dialogStyle,
		bottomSheetSnapPoints,
		disableClose,
		bottomSheetOverDrag,
		className,
		style,
		children,
		title
	} = props;

	const containerContext = useContext(ContainerContext);
	const Styles = useStyle(styles, '_bottomsheet-');

	const [snapPoints, setSnapPoints] = useState<string[]>([]);
	const overDrag = useMemo(() => bottomSheetOverDrag ?? 0.01, [bottomSheetOverDrag]);
	
	const sheetRef = useRef<HTMLDialogElement>(null);
	const contentRef = useRef<HTMLDivElement>(null);
	const [position, setPosition] = useState(0);
	const startY = useRef<number | null>(null);
	const endY = useRef<number | null>(null);
	const lastPointIndex = useRef(-1);
	const currentPointIndex = useMemo(() => {
		const index = snapPoints.findIndex(v => parseFloat(v) >= position);
		if (index >= 0 && lastPointIndex.current !== index) {
			lastPointIndex.current = index;
		}
		return lastPointIndex.current;
	}, [snapPoints, position]);
	
	const currentPoint = useMemo(() => snapPoints.at(currentPointIndex), [snapPoints, currentPointIndex]);
	const lastPoint = useMemo(() => snapPoints.at(-1) ?? '50%', [snapPoints]);
	const firstPoint = useMemo(() => snapPoints.at(0) ?? '0%', [snapPoints]);
	const firstPointPosition = useMemo(() => parseFloat(firstPoint), [firstPoint]);
	const lastPointPosition = useMemo(() => parseFloat(lastPoint), [lastPoint]);
	const lastPointInt = useMemo(() => lastPointPosition / 100, [lastPointPosition]);
	const isFirstPoint = useMemo(() => (snapPoints.at(0) ?? '0%') === currentPoint, [snapPoints, currentPoint]);
	const isLastPoint = useMemo(() => currentPoint === lastPoint, [currentPoint, lastPoint]);
	const isActiveContent = useMemo(() => Math.round(position) === lastPointPosition, [position, lastPointPosition]);

	const positionFooter = useMemo(() => (Math.abs(position - lastPointPosition) / 100) * window.innerHeight, [position, lastPointPosition]);

	const hideBottomSheet = () => {
		setPosition(0);
	};

	const hide = () => {
		if (disableClose) return;
		renderProps.hide();
	};

	const getSnapIndex = useCallback((position: number, snapPoints: string[]): number => {
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
	}, []);

	const handleTouchStart = useCallback((e: TouchEvent<HTMLDialogElement>) => {
		sheetRef.current?.classList.add(styles['touch']);
		startY.current = e.touches[0].clientY;
		endY.current = position;
	}, [position]);

	const stopPan = useRef(0);

	const handleTouchMove = useCallback((e: TouchEvent<HTMLDialogElement>) => {
		if (startY.current === null || endY.current === null) return;
		e.stopPropagation();
		const currentY = e.touches[0].clientY;
		let pos = Math.abs((((currentY - startY.current) / window.innerHeight) * 100) - endY.current);
		if (pos >= 100 || pos <= 0 || currentY > window.innerHeight) return;
		if (pos >= lastPointPosition || (disableClose && pos <= firstPointPosition)) {
			if (overDrag === 0) return;
			if (stopPan.current === 0) {
				if (pos >= lastPointPosition) stopPan.current = lastPointPosition;
				else if (pos <= firstPointPosition) stopPan.current = firstPointPosition;
			}else{
				if (pos >= lastPointPosition) stopPan.current += overDrag;
				else if (pos <= firstPointPosition) stopPan.current -= overDrag;
			}
			pos = stopPan.current;
		}else{
			stopPan.current = 0;
		}
		setPosition(pos);
	}, [startY.current, endY.current, lastPointPosition, position, isFirstPoint, overDrag, disableClose]);

	const handleTouchEnd = useCallback(() => {
		sheetRef.current?.classList.remove(styles['touch']);
		const snapIndex = getSnapIndex(position, snapPoints);
		if (snapIndex >= 0) {
			const snapPoint = parseFloat(snapPoints[snapIndex]);
			setPosition(snapPoint);
		}else{
			if (disableClose) {
				setPosition(firstPointPosition);
			}else{
				hide();
			}
		}
		stopPan.current = 0;
	}, [position, snapPoints, firstPointPosition]);

	useEffect(() => {
		if (contentRef.current && (!bottomSheetSnapPoints || (bottomSheetSnapPoints && bottomSheetSnapPoints[0] === 'auto'))) {
			let autoSnap = (contentRef.current?.offsetHeight / window.innerHeight) * 100;
			autoSnap = autoSnap >= 100 ? 100 : autoSnap;
			setSnapPoints([`${autoSnap}%`]);
		}else{
			setSnapPoints(bottomSheetSnapPoints ?? ['50%']);
		}
	}, [bottomSheetSnapPoints]);
	
	useEffect(() => {
		if (snapPoints.length > 0) setPosition(parseFloat(snapPoints[0] ?? 10));
	}, [snapPoints]);

	useEffect(() => {
		containerContext.listeners.current.onHide = hideBottomSheet;
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
				<div className={Styles('bottomsheet') + (className ? ' ' + className : '')} style={{...style, flexGrow: lastPointInt}}>
					<header className={Styles('header')}>
						<div className={Styles('text')}>
							{title}
						</div>
					</header>
					<ContentScroll className={Styles('content')} active={isActiveContent} style={style} ref={contentRef}>
						{children}
					</ContentScroll>
					{containerContext.footer ? <footer
						className={Styles('footer')}
						style={{
							transform: `translateY(-${positionFooter}px)`
						}}
					>{containerContext.footer}</footer> : null}
				</div>
			}
		</dialog>
	</>);
};
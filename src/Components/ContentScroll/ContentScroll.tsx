import {
	type UIEvent,
	type ReactNode,
	type CSSProperties,
	useRef,
	useCallback,
	forwardRef
} from "react";

export interface ContentScrollProps {
	children: ReactNode;
	active?: boolean;
	style?: CSSProperties;
	className?: string;
	onScroll?: (event: UIEvent<HTMLDivElement>) => void;
};

const ContentScroll = forwardRef<HTMLDivElement, ContentScrollProps>(({style, active, onScroll, ...props}, ref) => {
	const scrollTop = useRef(true);

	const handleScroll = useCallback((e: UIEvent<HTMLDivElement>) => {
		const target = e.currentTarget;
  
		scrollTop.current = target.scrollTop === 0;

		if (typeof onScroll === 'function') {
			onScroll(e);
		}
	}, []);

	const handleMove = useCallback((e: UIEvent<HTMLDivElement>) => {
		if (active && !scrollTop.current) {
			e.stopPropagation();
		}
	}, [scrollTop.current, active]);
	
	return(<div
		{...props}
		onTouchMove={handleMove}
		onScroll={handleScroll}
		style={{...style, touchAction: active ? 'pan-y' : 'none'}}
		ref={ref}
	/>);
});

export {ContentScroll};
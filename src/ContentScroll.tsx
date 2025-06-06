import { CSSProperties, ReactNode, UIEvent, useEffect, useState } from "react";

export interface ContentScrollProps {
	children: ReactNode;
	active: boolean;
	style?: CSSProperties;
	className?: string;
	onScroll?: (event: UIEvent<HTMLDivElement>) => void;
};

const ContentScroll = ({children, style, active, className, onScroll}: ContentScrollProps) => {
	const [currentActive, setActive] = useState(active);

	const handleScroll = (e: UIEvent<HTMLDivElement>) => {
		const target = e.currentTarget;
  
		if (target.scrollTop === 0) {
			setActive(false);
		}
		if (typeof onScroll === 'function') {
			onScroll(e);
		}
	};

	useEffect(() => {
		setActive(active);
	}, [active]);

	return(<div
		className={className}
		onTouchMove={(e) => currentActive ? e.stopPropagation() : null}
		onScroll={handleScroll}
		style={{...style, touchAction: active ? 'pan-y' : 'none'}}
	>
		{children}
	</div>);
};

export {ContentScroll};
import {
	useContext,
	useState
} from "react";
import { createPortal } from "react-dom";
import { TConfigComponent } from "./types";
import { WhithModalContext } from "./Context";
import { useLayoutEffect } from "./helpers";

const Config = ({children, ...props}: TConfigComponent) => {
	const withModalContext = useContext(WhithModalContext);
	const [active, setActive] = useState(false);
	
	useLayoutEffect(() => {
		withModalContext.setConfig({
			...props,
			
		});
	},[props.title, props.disableClose]);

	useLayoutEffect(() => {
		requestAnimationFrame(() => setActive(true));
	},[]);
	
	if ((!withModalContext.footerRef || !withModalContext.footerRef!.current) && !active) {
		return(null);
	}
	return(createPortal(typeof children === 'function' ? children(withModalContext) : children, withModalContext.footerRef!.current as Element));
};

export {Config};
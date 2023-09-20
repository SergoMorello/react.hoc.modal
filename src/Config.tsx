import {
	useContext,
	useLayoutEffect,
	useState
} from "react";
import ReactDOM from "react-dom";
import { WhithModalContext } from "./withModal";
import { TConfigComponent } from "./types";

const Config = ({children, ...props}: TConfigComponent) => {
	const withModalContext = useContext(WhithModalContext);
	const [active, setActive] = useState(false);
	
	useLayoutEffect(() => {
		withModalContext.setConfig({
			...props,
			footerRender: () => <></>,
			
		});
	},[props.title, props.disableClose]);

	useLayoutEffect(() => {
		requestAnimationFrame(() => setActive(true));
	},[]);
	
	if ((!withModalContext.footerRef || !withModalContext.footerRef!.current) && !active) {
		return(null);
	}
	return(ReactDOM.createPortal(typeof children === 'function' ? children(withModalContext) : children, withModalContext.footerRef!.current as Element));
};

export {Config};
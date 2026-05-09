import {
	useContext,
	useEffect,
	type ReactNode
} from "react";
import { ContainerContext } from "./Context";
import { createPortal } from "react-dom";
import { useLayoutEffect } from "./helpers";

export interface FooterProps {
	children: ReactNode;
};

const Footer = ({children}: FooterProps) => {
	const containerContext = useContext(ContainerContext);
	
	useLayoutEffect(() => {
		if (!children) return;
		containerContext.setFooter('render');
	}, []);

	if (!containerContext.footerRef.current) return null;

	return createPortal(children, containerContext.footerRef.current!);
};

export {Footer};
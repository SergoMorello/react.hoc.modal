import {
	useContext,
	useEffect,
	type ReactNode
} from "react";
import { ContainerContext } from "./Context";

export interface FooterProps {
	children: ReactNode;
};

const Footer = ({children}: FooterProps) => {
	const containerContext = useContext(ContainerContext);
	useEffect(() => {
		if (!children) return;
		containerContext.setFooter(children);
	}, [children]);
	return null;
};

export {Footer};
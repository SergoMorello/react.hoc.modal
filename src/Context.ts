import { createContext, ReactNode } from "react";

export const ContainerContext = createContext({
	setFooter: (element: ReactNode) => {},
	footer: {} as ReactNode
});
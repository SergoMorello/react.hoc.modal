import { HTMLAttributes, MouseEvent, ReactNode, useCallback, useContext } from "react";
import { useStyle } from "../../hooks";
import styles from "./style.module.scss";
import { ContainerContext } from "../../Context";

export interface PopupItemProps extends HTMLAttributes<HTMLButtonElement> {

};

export const PopupItem = ({className, onClick, ...props}: PopupItemProps): ReactNode | Promise<ReactNode> => {
	const Styles = useStyle(styles, 'popup-');
	const {hide} = useContext(ContainerContext);

	const handleClick = useCallback((e: MouseEvent<HTMLButtonElement>) => {
		if (typeof onClick === 'function') {
			onClick(e);
		}
		hide();
	}, [onClick]);

	return(<button
		{...props}
		className={Styles('popup-item') + (className ? ` ${className}` : '')}
		onClick={handleClick}
	/>);
};
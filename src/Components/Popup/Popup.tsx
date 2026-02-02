import {
	type MouseEvent,
	type TouchEvent,
	useContext,
	useEffect,
	useRef,
	useState
} from "react";
import { Style } from "../../helpers";
import { ModalProps, TPropsRender } from "../../types";
import { ContainerContext } from "../../Context";
import styles from "./style.module.scss";
import { useStyle } from "../../hooks";

export interface DefaultModalProps extends ModalProps {
	onBackground: () => void;
	onClose: () => void;
	renderProps: TPropsRender;
};

export const Popup = ({onBackground, onClose, renderProps, ...props}: DefaultModalProps) => {
	const {
		render,
		dialogStyle,
		className,
		style,
		children,
		bottomSheetMaxWidth,
		popupPreferTop
	} = props;

	const Styles = useStyle(styles, '_popup-');

	const containerContext = useContext(ContainerContext);

	const popupRef = useRef<HTMLDialogElement>(null);

	const [position, setPosition] = useState({
		x: 0,
		y: 0
	});

	const popupMove = (rect: { x: number; y: number; width: number; height: number }, preferTop: boolean = false) => {
		if (typeof window === 'undefined') return;
		if (!popupRef.current) return;

		const popup = popupRef.current;
		const popupWidth = popup.offsetWidth;
		const popupHeight = popup.offsetHeight;
		const margin = 8;

		const viewportWidth = window.innerWidth;
		const viewportHeight = window.innerHeight;

		// Центрирование по горизонтали относительно кнопки
		let x = rect.x + rect.width / 2 - popupWidth / 2;
		x = Math.max(0, Math.min(x, viewportWidth - popupWidth));

		const canShowBelow = rect.y + rect.height + margin + popupHeight <= viewportHeight;
		const canShowAbove = rect.y - popupHeight - margin >= 0;

		let y: number;

		if (preferTop) {
			y = canShowAbove
			? rect.y - popupHeight - margin
			: rect.y + rect.height + margin;
		} else {
			y = canShowBelow
			? rect.y + rect.height + margin
			: rect.y - popupHeight - margin;
		}

		y = Math.max(0, Math.min(y, viewportHeight - popupHeight));

		setPosition({ x, y });
	};

	useEffect(() => {
		if (!containerContext.initPosition.current) return;
		popupMove(containerContext.initPosition.current, popupPreferTop);
	}, [containerContext.initPosition, popupPreferTop]);

	return(<div className={Styles('popup-wrapper')}>
		<div className={Styles('background')} onClick={onBackground}/>
		<dialog
			className={Styles('popup-container')}
			tabIndex={1}
			role="dialog"
			style={{
				...dialogStyle,
				maxWidth: bottomSheetMaxWidth,
				transform: `translate(${position.x}px, ${position.y}px)`
			}}
			
			ref={popupRef}
			open
		>
			
			{
				typeof render === 'function' ? render(renderProps) :
				<div className={Styles('popup') + (className ? ' ' + className : '')} style={style}>
					{children}
				</div>
			}
		</dialog>
	</div>);
};
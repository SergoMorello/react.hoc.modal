import { useContext } from "react";
import { Style } from "../helpers";
import { ModalProps, TPropsRender } from "../types";
import { ContainerContext } from "../Context";

interface DefaultModalProps extends ModalProps {
	onBackground: () => void;
	onClose: () => void;
	renderProps: TPropsRender;
};

const Modal = ({onBackground, onClose, renderProps, ...props}: DefaultModalProps) => {
	const {
		render,
		dialogStyle,
		hideCloseButton,
		className,
		style,
		title,
		children,
		contentStyle
	} = props;

	const containerContext = useContext(ContainerContext);

	return(<>
		<div className={Style('background')} onClick={onBackground}/>
		<dialog className={Style('modal-container')} tabIndex={1} role="dialog" style={dialogStyle} open>
			{
				(typeof render === 'function' && !hideCloseButton) &&
				<div className={Style('close-block')} onClick={onBackground}>
					<div className={Style(['close', 'large'])} onClick={onClose}/>
				</div>
			}
			
			{
				typeof render === 'function' ? render(renderProps) :
				<div className={Style('modal') + (className ? ' ' + className : '')} style={style}>
					<div className={Style('header')}>
						<div className={Style('text')}>
							{title}
						</div>
						{(!hideCloseButton) && <div className={Style('close')} onClick={onClose}/>}
					</div>
					<div className={Style('content')} style={contentStyle}>
						{children}
					</div>
					{
					containerContext.footer ? <div
						className={Style('footer')}
						ref={renderProps.footerRef}
						children={containerContext.footer}
					/> : null		
					}
				</div>
			}
		</dialog>
	</>);
};

export default Modal;
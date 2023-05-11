import React from 'react';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';
import colors from '../../utils/colors';


const moveUp = keyframes`
  	0% { opacity:0; transform: translateY(20px); }
	80% { opacity:1; transform: translateY(-8px); }
	100% { transform: translateY(0); }
`;

const DialogStyled = styled.div<DialogStyledProps>`
	position: fixed;
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	height: 100%;
	padding: 20px 30px;
	top: 0;
	left: 0;
	background-color: ${props => (props.dark ? 'rgba(0, 0, 0, 0.78)' : 'rgba(0, 0, 0, 0.2)')};
	z-index: 33;

	& > .content {
		display: block;
		position: relative;
		padding: 20px 15px;
		max-width: calc(100% - 60px);
		max-height: calc(100% - 40px);
		overflow: auto;
		background-color: ${props => (props.dark ? colors.dark : colors.light)};
		border-radius: 6px;
		box-shadow: 0 4px 8px rgba(0, 0, 0, 0.12), 0 2px 10px rgba(0, 0, 0, 0.08);
		animation: ${moveUp} 0.23s ease-out;

		.modal-title {
			margin: 0;
			margin-bottom: 15px;
			padding: 15px 10px;
			border-bottom: 2px solid #c7c7c7;
			text-align: center;
			color: ${props => (props.dark ? colors.textDark : colors.textLight)};
		}
	}
`;

type DialogStyledProps = {
	dark: boolean
}


const Modal = ({ children }: ModalProps) => {
	const [isOpen, setIsOpen] = React.useState(false);
	return children({ isOpen, setIsOpen });
};

type ModalProps = {
	children: (arg: { isOpen: boolean, setIsOpen: React.Dispatch<React.SetStateAction<boolean>> }) => JSX.Element
}


const Dialog = ({ children, dismiss, mount, isDark }: DialogProps) => {
	const contentRef = React.useRef<HTMLDivElement>(null);

	React.useEffect(() => {
		mount();
	}, [mount]);

	const handleClick: React.MouseEventHandler<HTMLDivElement> = e => {
		if (contentRef.current !== null && !contentRef.current.contains(e.target as HTMLDivElement))
			dismiss();
	};

	return (
		<DialogStyled dark={isDark} onClick={handleClick}>
			<div ref={contentRef} className="content">
				{children}
			</div>
		</DialogStyled>
	);
};

type DialogProps = {
	children: JSX.Element | JSX.Element[],
	dismiss: Function,
	mount: Function,
	isDark: boolean,
};

Dialog.defaultProps = {
	mount: () => null,
};

export { Modal, Dialog };

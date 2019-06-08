import React from 'react';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/core';
import PropTypes from 'prop-types';
import colors from '../../utils/colors';

const moveUp = keyframes`
  	0% { opacity:0; transform: translateY(20px); }
	80% { opacity:1; transform: translateY(-8px); }
	100% { transform: translateY(0); }
`;

const DialogStyled = styled.div`
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

const Modal = ({ children }) => {
	const [isOpen, setIsOpen] = React.useState(false);
	return children({ isOpen, setIsOpen });
};

const Dialog = ({ children, dismiss, mount, isDark }) => {
	const contentRef = React.useRef();

	React.useEffect(() => {
		mount();
	}, [mount]);

	const handleClick = e => {
		if (!contentRef.current.contains(e.target)) dismiss();
	};

	return (
		<DialogStyled dark={isDark} onClick={handleClick}>
			<div ref={contentRef} className="content">
				{children}
			</div>
		</DialogStyled>
	);
};

Dialog.propTypes = {
	children: PropTypes.node.isRequired,
	dismiss: PropTypes.func.isRequired,
	mount: PropTypes.func,
	isDark: PropTypes.bool.isRequired,
};

Dialog.defaultProps = {
	mount: () => null,
};

export { Modal, Dialog };

import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';
import colors from '../../utils/colors';

const spin = keyframes`
  	from { transform: rotate(0deg); }
	to { transform: rotate(359deg); }
`;

const Btn = styled.button<BtnProps>`
	position: relative;
	width: ${props => props.width};
	margin: 4px 0 25px;
	padding: 11px 18px;
	font-size: 1.05rem;
	font-weight: 700;
	text-align: center;
	outline: none;
	border: none;
	background-color: ${props => props.bg};
	color: #fafafa;
	text-transform: capitalize;
	cursor: pointer;
	border-radius: 4px;
	box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12), 0 3px 1px -2px rgba(0, 0, 0, 0.2);

	&:disabled {
		pointer-events: none;
		cursor: default;
		opacity: 0.75;
		padding-right: calc(24px + 1.5rem);
	}
	&:disabled:after {
		content: '';
		position: absolute;
		right: 14px;
		top: calc(50% - 0.734rem);
		width: 1rem;
		height: 1rem;
		background-color: transparent;
		border-radius: 50%;
		border: 4px dotted #fafafa;
		animation: ${spin} 1s linear infinite;
	}

	&:before {
		content: '';
		position: absolute;
		left: -3px;
		top: -3px;
		width: calc(100% + 2px);
		height: calc(100% + 2px);
		border: 2px solid ${props => props.bg};
		border-radius: 4px;
		opacity: 0;
		transition: opacity 0.1s linear;
	}
	&:focus:before {
		opacity: 0.55;
	}
`;
type BtnProps = {
	width: string,
	bg: string
}

const Button = ({ className, type, value, width, bg, loading }: ButtonProps) => (
	<Btn type={type || 'button'} width={width || '100%'} bg={bg || colors.main} disabled={loading || false} className={className}>
		{value}
	</Btn>
);

type ButtonProps = {
	className?: string,
	value: string,
	type?: "button" | "submit" | "reset",
	width?: string,
	bg?: string,
	loading?: boolean,
};

export default Button;

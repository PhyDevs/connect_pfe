import styled from '@emotion/styled';
import colors from '../../utils/colors';

export const Field = styled.div<FieldProps>`
	position: relative;
	width: ${props => (props.width ? `${props.width}%` : '100%')};
	display: ${props => (props.width === 100 ? `block` : 'inline-block')};
	padding-right: ${props => (props.pr ? props.pr : 0)};
	margin: 15px 0 25px;
	vertical-align: top;

	input {
		position: relative;
		width: 100%;
		font-size: 1.12rem;
		padding: 8px 10px;
		background-color: transparent;
		color: ${props => (props.dark ? colors.textDark : colors.textLight)};
		border: 1px solid;
		border-color: ${props => (props.notValid ? colors.error : '#cbcbcb')};
		outline: 0;
		border-radius: 3px;
		transition: all 0.1s linear;
		z-index: 2;
		&:focus {
			background-color: transparent;
			border-color: ${props => (props.notValid ? colors.error : colors.main)};
			box-shadow: 0 0 2px 1px ${props => (props.notValid ? colors.error : colors.main)};
		}

		& + span {
			position: absolute;
			padding: 2px 8px;
			background-color: ${props => (props.dark ? colors.dark : colors.light)};
			top: ${props => (props.filled ? '-12px' : '8px')};
			left: ${props => (props.filled ? '0' : '4px')};
			color: ${props => (props.filled ? colors.main : props.dark ? colors.textDark : colors.textLight)};
			transform: ${props => (props.filled ? 'scale(0.8)' : 'scale(1)')};
			z-index: ${props => (props.filled ? 3 : 0)};
			transition: all 0.1s linear;
		}
	}

	& > span {
		display: inline-block;
		margin: 5px 4px 0;
		color: ${colors.error};
		font-weight: 700;
		font-size: 0.9rem;
		letter-spacing: 0.2px;
	}
`;
type FieldProps = {
	dark: boolean,
	width: number,
	pr: string,
	notValid: boolean,
	filled: boolean
}

export const Box = styled.div<BoxProps>`
	width: 100%;
	max-width: ${props => (props.width ? props.width : '100%')};
	padding: ${props => (props.padding ? props.padding : '20px')};
	margin: 10px 15px;
	background-color: ${props => (props.dark ? colors.dark : colors.light)};
	border-radius: 6px;
	box-shadow: 0 4px 8px rgba(0, 0, 0, 0.12), 0 2px 10px rgba(0, 0, 0, 0.08);

	h1 {
		margin: 0 4px 40px;
		padding: 0;
		color: ${props => (props.dark ? colors.textDark : colors.textLight)};
		text-align: center;
		font-size: 2rem;
		font-weight: 700;
	}
`;
type BoxProps = {
	dark: boolean,
	width: string,
	padding: string
}

export const BottomText = styled.div<BottomTextProps>`
	color: ${props => (props.dark ? colors.textDark : colors.textLight)};
	a {
		color: inherit;
		font-weight: 700;
		text-decoration: none;
	}
`;
type BottomTextProps = {
	dark: boolean,
}

export const FormError = styled.p<FormErrorProps>`
	position: relative;
	margin: 4px 0 2px;
	padding: 6px 4px;
	font-size: 1rem;
	font-weight: 700;
	text-align: center;
	overflow: hidden;
	color: ${props => (props.success ? colors.success : colors.error)};
	border: 2px solid ${props => (props.success ? colors.success : colors.error)};
	border-radius: 4px;

	&:after {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: ${props => (props.success ? colors.success : colors.error)};
		opacity: 0.33;
	}

	span {
		position: relative;
		z-index: 2;
	}
`;
type FormErrorProps = {
	success: boolean,
}

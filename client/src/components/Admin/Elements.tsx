import styled from '@emotion/styled';
import Button from '../Common/Button';
import colors from '../../utils/colors';

export const ClosBtn = styled.button`
	position: absolute;
	top: 6px;
	right: 6px;
	padding: 6px;
	font-size: 1rem;
	font-weight: 700;
	background-color: ${colors.main};
	color: #fafafa;
	border: 0;
	border-radius: 4px;
	cursor: pointer;
`;

export const TableStyled = styled.div<TableStyledProps>`
	display: table;
	min-width: 680px;
	margin: 30px 10px 15px;
	border-collapse: collapse;
	border-radius: 5px;
	overflow: hidden;
	box-shadow: ${props =>
		props.dark
			? '0px 1px 2px rgba(210, 216, 218, 0.24), 0px 0px 1px rgba(210,216,218,0.12)'
			: '0px 1px 2px rgba(10, 16, 20, 0.24), 0px 0px 1px rgba(10, 16, 20, 0.12)'};

	& > div.head,
	& > form {
		display: table-row;

		& > span {
			display: table-cell;
			vertical-align: middle;
			min-width: 120px;
			padding: 13px 18px;
			font-size: 1.05rem;
			border-bottom: 1px solid #c7c7c7;
		}
	}

	& > div.head {
		color: #fafafa;
		background-color: ${colors.main};
	}
`;
type TableStyledProps = {
	dark: boolean
}


export const SelectStyled = styled.select<SelectStyledProps>`
	padding: 10px 6px;
	font-size: 1rem;
	color: ${props => (props.dark ? colors.textDark : colors.textLight)};
	background-color: ${props => (props.dark ? colors.dark : colors.light)};
	border-radius: 3px;
`;
type SelectStyledProps = {
	dark: boolean
}


export const SubmitBtn = styled(Button)`
	margin: 0;
`;

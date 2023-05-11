import styled from '@emotion/styled';
import { useThemeContext } from '../../providers/ThemeContext';
import colors from '../../utils/colors';

const Container = styled.div<ContainerProps>`
	margin: 0;
	padding: 0;
	width: 100%;
	height: 100vh;
	min-height: 550px;
	background-color: ${props => (props.dark ? colors.secondDark : colors.secondLight)};
	display: flex;
	align-items: center;
	justify-content: center;
`;
type ContainerProps = {
	dark: boolean
}

const FlexContainer = ({ children }: FlexContainerProps) => {
	const [isDark] = useThemeContext();
	return <Container dark={isDark}>{children}</Container>;
};

type FlexContainerProps = {
	children: JSX.Element,
};

export default FlexContainer;

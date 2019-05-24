import React from 'react';
import styled from '@emotion/styled';
import { useDataContext } from '../../providers/DataContext';
import { useThemeContext } from '../../providers/ThemeContext';
import colors from '../../utils/colors';

const Wrapper = styled.section`
	display: flex;
	flex-grow: 1;
	justify-content: center;
	align-items: center;
	background-color: ${props => (props.isDark ? colors.dark : colors.light)};
`;

const Title = styled.div`
	margin-top: -50px;
	text-align: center;
	h1 {
		margin-bottom: 10px;
		font-size: 4.5rem;
		text-transform: capitalize;
		color: ${props => (props.isDark ? colors.textDark : colors.textLight)};
	}
	h3 {
		position: relative;
		margin: 0;
		font-size: 2.3rem;
		color: #fafafa;
		background-color: #7300ac;
		overflow: hidden;

		&:after,
		&:before {
			content: '';
			background-color: ${props => (props.isDark ? colors.dark : colors.light)};
			position: absolute;
			width: 15%;
			height: 220%;
			z-index: 2;
			transform: rotateZ(-30deg);
		}
		&:before {
			top: -70%;
			left: -15px;
		}
		&:after {
			top: -50%;
			right: -15px;
		}
	}
`;

const Welcome = React.memo(() => {
	const [isDark] = useThemeContext();
	const {
		state: { user },
	} = useDataContext();

	return (
		<Wrapper isDark={isDark}>
			<Title isDark={isDark}>
				<h1>welcome back</h1>
				<h3>{user}</h3>
			</Title>
		</Wrapper>
	);
});

export default Welcome;

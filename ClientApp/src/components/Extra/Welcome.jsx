import React from 'react';
import styled from '@emotion/styled';
import { useDataContext } from '../../providers/DataContext';
import { useThemeContext } from '../../providers/ThemeContext';
import colors from '../../utils/colors';

const Wrapper = styled.section`
	display: flex;
	margin: 0;
	margin-bottom: 10px;
	flex-grow: 1;
	justify-content: center;
	align-items: center;
	background-color: ${props => (props.dark ? colors.secondDark : colors.light)};
	border-radius: 10px;
	overflow: hidden;
	box-shadow: ${props =>
		props.dark
			? '0px 1px 2px rgba(210,216,218,0.24), 0px 0px 1px rgba(210,216,218,0.12), 0px -1px 2px rgba(210,216,218,0.15)'
			: '0px 1px 2px rgba(10,16,20,0.24), 0px 0px 1px rgba(10,16,20,0.12), 0px -1px 2px rgba(10,16,20,0.15)'};
`;

const Title = styled.div`
	margin-top: -50px;
	text-align: center;
	h1 {
		margin-bottom: 10px;
		font-size: 4.5rem;
		text-transform: capitalize;
		color: ${props => (props.dark ? colors.textDark : colors.textLight)};
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
			background-color: ${props => (props.dark ? colors.secondDark : colors.light)};
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
		<Wrapper dark={isDark}>
			<Title dark={isDark}>
				<h1>welcome back</h1>
				<h3>{user}</h3>
			</Title>
		</Wrapper>
	);
});

export default Welcome;

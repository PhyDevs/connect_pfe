import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import { useThemeContext } from '../../providers/ThemeContext';
import colors from '../../utils/colors';

const Container = styled.div`
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

const FlexContainer = ({ children }) => {
	const [isDark] = useThemeContext();
	return <Container dark={isDark}>{children}</Container>;
};

FlexContainer.propTypes = {
	children: PropTypes.node.isRequired,
};

export default FlexContainer;

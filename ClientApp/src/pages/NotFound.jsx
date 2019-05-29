import React from 'react';
import styled from '@emotion/styled';
import colors from '../utils/colors';

const Wrapper = styled.div`
	display: flex;
	height: 100vh;
	justify-content: center;
	align-items: center;
	text-align: center;

	h1 {
		margin: 0;
		font-size: 3rem;
	}
	h2 {
		margin: 0;
		font-size: 7rem;
		color: ${colors.main};
		text-shadow: 0 0 4px rgba(0, 0, 0, 0.36);
	}
`;

const NotFound = () => {
	document.title = '404 Not Found';
	return (
		<Wrapper>
			<div>
				<h1>Oops!! Page Not Found</h1>
				<h2>404</h2>
			</div>
		</Wrapper>
	);
};

export default NotFound;

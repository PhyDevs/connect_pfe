import React from 'react';
import Welcome from './Welcome';
import Header from './Header';
import SideBar from './SideBar';

const MainArea = () => (
	<main style={{ flexGrow: 1 }}>
		<Header />
		<div style={{ display: 'flex', height: 'calc(100% - 54px)' }}>
			<Welcome />
			<SideBar />
		</div>
	</main>
);

export default MainArea;

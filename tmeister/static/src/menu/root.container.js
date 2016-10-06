import React from 'react';
import MainMenu from './main-menu.component.js';

export default function RootContainer(props) {
	if (!props.children) {
		window.location.hash = '#/toggles';
	}

	return (
		<div>
			<MainMenu />
			<div style={{marginLeft: "80px"}}>
				{props.children}
			</div>
		</div>
	);
}

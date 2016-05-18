import React from 'react';
import { Provider } from 'react-redux';
import { Router, Route, Link, Redirect, hashHistory } from 'react-router';
import TogglesContainer from './toggles/toggles.container.js';

export default class RootComponent extends React.Component {
	constructor() {
		super();
		this.state = {
			toggles: []
		};
	}

	render() {
		const { store } = this.props;

		return (
			<Provider store={store}>
				<Router history={hashHistory}>
					<Route path="/" component={TogglesContainer}>
					</Route>
				</Router>
			</Provider>
		);
	}
}

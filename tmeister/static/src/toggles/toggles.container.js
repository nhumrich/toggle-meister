import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import ToggleControls from './toggle-controls.component.js';
import ToggleTable from './table/toggle-table.component.js';
import styles from './toggles.container.css!';

import * as toggleActions from './toggles.actions.js';
import * as searchActions from './search/search.actions.js';
import * as createActions from './create/create.actions.js';

@connect(state => ({
	toggles: state.toggles,
	searchValue: state.toggleSearch.searchValue,
	selectedEnvs: state.toggleSearch.selectedEnvs,
	createState: state.create,
}))
export default class TogglesContainer extends React.Component {
	constructor() {
		super();
	}

	componentWillMount() {
		const { dispatch } = this.props;

		this.boundActions = {
			...bindActionCreators(toggleActions, dispatch),
			...bindActionCreators(searchActions, dispatch),
			...bindActionCreators(createActions, dispatch),
		}

		this.boundActions.getToggles();
	}

	render() {
		const { toggles, searchValue, createState } = this.props;

		return (
			<div className={`cps-card ${styles.root} cps-padding-16`}>
				<ToggleControls
					toggles={toggles}
					actions={this.boundActions}
					createState={createState}
				/>
				<ToggleTable
					toggles={toggles}
					actions={this.boundActions}
					searchValue={searchValue}
				/>
			</div>
		);
	}
}

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
	createState: state.create,
}))
export default class TogglesContainer extends React.Component {
	constructor() {
		super();
	}

	render() {
		const { toggles, dispatch, searchValue, createState } = this.props;

		const actions = {
			...bindActionCreators(toggleActions, dispatch),
			...bindActionCreators(searchActions, dispatch),
			...bindActionCreators(createActions, dispatch),
		};

		return (
			<div className={`cps-card ${styles.root} cps-padding-16`}>
				<ToggleControls
					toggles={toggles}
					actions={actions}
					createState={createState}
				/>
				<ToggleTable
					toggles={toggles}
					actions={actions}
					searchValue={searchValue}
				/>
			</div>
		);
	}
}

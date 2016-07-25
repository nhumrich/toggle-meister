import * as types from './search.types.js';
import { getSelectedEnvs } from '../envs/select-envs.helpers.js';

const defaultState = {
	searchValue: null,
	selectedEnvs: getSelectedEnvs(),
};

export default function(state = defaultState, action) {
	if (action.type === types.NEW_SEARCH_VALUE) {
		return {
			...state,
			searchValue: action.searchValue,
		};
	}

	if (action.type === types.NEW_SELECTED_ENVS) {
		return {
			...state,
			selectedEnvs: action.selectedEnvs,
		};
	}

	return state;
}

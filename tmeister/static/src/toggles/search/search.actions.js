import * as types from './search.types.js';

export function newSearchValue(searchValue) {
	return {
		type: types.NEW_SEARCH_VALUE,
		searchValue,
	};
}

export function envSelectionChanged(envs) {
	// We basically just want to trigger a re-render
	return {
		type: types.NEW_SELECTED_ENVS,
		selectedEnvs: envs,
	};
}

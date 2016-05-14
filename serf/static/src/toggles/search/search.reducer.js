import * as types from './search.types.js';

const defaultState = {
	searchValue: null,
};

export default function(state = defaultState, action) {
	if (action.type === types.NEW_SEARCH_VALUE) {
		return {
			...state,
			searchValue: action.searchValue,
		};
	}

	return state;
}

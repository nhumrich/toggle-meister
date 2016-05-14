import * as types from './search.types.js';

export function newSearchValue(searchValue) {
	return {
		type: types.NEW_SEARCH_VALUE,
		searchValue,
	};
}

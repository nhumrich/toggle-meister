import * as types from './toggles.types.js';

export function turnFeatureOn(toggle) {
	//TODO actually save to API
	return {
		type: types.TURN_FEATURE_ON,
		toggle,
	};
}

export function turnFeatureOff(toggle) {
	//TODO actually save to API
	return {
		type: types.TURN_FEATURE_OFF,
		toggle,
	};
}

export function batchCreateToggles(toggles) {
	// temporary until api fully working
	return {
		type: types.NEW_TOGGLES,
		toggles,
	};
}

export function envSelectionChanged() {
	return {
		type: types.NEW_TOGGLES,
		toggles: [],
	};
}

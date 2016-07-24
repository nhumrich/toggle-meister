import * as types from './toggles.types.js';

const defaultState = [];

export default function(state = defaultState, action) {
	if (action.type === types.TURN_FEATURE_OFF) {
		return state
		.map(toggle => {
			if (toggle === action.toggle) {
				return {
					...toggle,
					toggle: {
						...toggle.toggle,
						state: 'OFF',
					},
				};
			} else {
				return toggle;
			}
		});
	}

	if (action.type === types.TURN_FEATURE_ON) {
		return state
		.map(toggle => {
			if (toggle === action.toggle) {
				return {
					...toggle,
					toggle: {
						...toggle.toggle,
						state: 'ON',
					},
				};
			} else {
				return toggle;
			}
		});
	}

	if (action.type === types.NEW_TOGGLES) {
		return action.toggles;
	}

	return state;
}

import * as types from './toggles.types.js';

const defaultState = [
	{
		"toggle": {
			"env": "Production",
			"feature": "client_list",
			"state": "OFF"
		},
	},
	{
		"toggle": {
			"env": "Production",
			"feature": "test_feature",
			"state": "OFF"
		},
	},
	{
		"toggle": {
			"env": "Production",
			"feature": "client_survey",
			"state": "OFF"
		},
	},
	{
		"toggle": {
			"env": "Production",
			"feature": "transcripts",
			"state": "OFF"
		},
	},
	{
		"toggle": {
			"env": "Production",
			"feature": "something_else",
			"state": "OFF"
		},
	},
	{
		"toggle": {
			"env": "stage",
			"feature": "client_list",
			"state": "OFF"
		},
	},
	{
		"toggle": {
			"env": "stage",
			"feature": "test_feature",
			"state": "OFF"
		},
	},
	{
		"toggle": {
			"env": "stage",
			"feature": "client_survey",
			"state": "OFF"
		},
	},
	{
		"toggle": {
			"env": "stage",
			"feature": "transcripts",
			"state": "OFF"
		},
	},
	{
		"toggle": {
			"env": "stage",
			"feature": "something_else",
			"state": "OFF"
		},
	},
];

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
		return state.concat(action.toggles);
	}

	return state;
}

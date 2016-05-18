import * as types from './create.types.js';

const defaultState = {
	envs: {
		modalOpen: false,
	},
	toggles: {
		modalOpen: false,
	},
};

export default function(state = defaultState, action) {
	if (action.type === types.SHOW_CREATE_TOGGLE_MODAL) {
		return {
			...state,
			toggles: {
				...state.toggles,
				modalOpen: true,
			},
		};
	}

	if (action.type === types.HIDE_CREATE_TOGGLE_MODAL) {
		return {
			...state,
			toggles: {
				...state.toggles,
				modalOpen: false,
			},
		};
	}

	if (action.type === types.SHOW_CREATE_ENV_MODAL) {
		return {
			...state,
			envs: {
				...state.envs,
				modalOpen: true,
			},
		};
	}

	if (action.type === types.HIDE_CREATE_ENV_MODAL) {
		return {
			...state,
			envs: {
				...state.envs,
				modalOpen: false,
			},
		};
	}

	return state;
}

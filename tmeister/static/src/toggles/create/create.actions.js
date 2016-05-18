import * as types from './create.types.js';
import { batchCreateToggles } from '../toggles.actions.js';
import { includes, uniqBy, find } from 'lodash';
import toasts from 'toast-service!sofe';
import { getEnvList } from '../table/toggle-table.helpers.js';
import { getSelectedEnvs } from '../envs/select-envs.helpers.js';

export function showCreateToggleModal() {
	return {
		type: types.SHOW_CREATE_TOGGLE_MODAL,
	};
}

export function hideCreateToggleModal() {
	return {
		type: types.HIDE_CREATE_TOGGLE_MODAL,
	};
}

export function showCreateEnvModal() {
	return {
		type: types.SHOW_CREATE_ENV_MODAL,
	};
}

export function hideCreateEnvModal() {
	return {
		type: types.HIDE_CREATE_ENV_MODAL,
	};
}

export function createEnvironment(name, toggles) {
	return dispatch => {
		if (includes(getEnvList(toggles), name)) {
			toasts.generalToast(`Environment '${name}' already exists`, `I apologize for trying`);
		} else {
			window.localStorage.setItem('selected-envs', JSON.stringify(getSelectedEnvs().concat(name)));

			dispatch(
			   batchCreateToggles(
				   uniqBy(toggles, toggle => toggle.toggle.feature)
				   .map(toggle => ({
					   ...toggle,
					   toggle: {
						   ...toggle.toggle,
						   state: 'OFF',
						   env: name,
					   },
				   }))
			   )
			);

			dispatch(hideCreateEnvModal());
		}
	}
}

export function createFeature(name, toggles) {
	return dispatch => {
		if (find(toggles, toggle => toggle.toggle.feature === name)) {
			toasts.generalToast(`Feature '${name}' already exists`, `I apologize for trying`);
		} else {
			dispatch(
			   batchCreateToggles(
				   getEnvList(toggles)
				   .map(env => ({
					   toggle: {
						   feature: name,
						   state: 'OFF',
						   env,
					   },
				   }))
			   )
			);

			dispatch(hideCreateToggleModal());
		}
	}
}

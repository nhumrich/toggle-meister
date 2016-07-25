import * as types from './create.types.js';
import { getToggles, createToggle } from '../toggles.actions.js';
import { includes, uniqBy, find } from 'lodash';
import toasts from 'toast-service!sofe';
import { getEnvList } from '../table/toggle-table.helpers.js';
import { getSelectedEnvs } from '../envs/select-envs.helpers.js';
import { envSelectionChanged } from '../search/search.actions.js';

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
			dispatch(hideCreateEnvModal());
			fetch('/api/envs', {
				method: "POST",
				body: JSON.stringify({
					name,
				}),
			})
			.then(response => {
				if (response.ok) {
					const newEnvSelection = getSelectedEnvs().concat(name);
					window.localStorage.setItem('selected-envs', JSON.stringify(newEnvSelection));
					dispatch(envSelectionChanged(newEnvSelection))
					dispatch(getToggles());
				} else {
					throw new Error(`server responded with status ${response.status}`);
				}
			})
			.catch(ex => {
				toasts.generalToast(`Error creating env - ${ex}`);
				throw new Error(ex);
			});
		}
	}
}

export function createFeature(name, toggles) {
	return dispatch => {
		if (find(toggles, toggle => toggle.toggle.feature === name)) {
			toasts.generalToast(`Feature '${name}' already exists`, `I apologize for trying`);
		} else {
			dispatch(createToggle(name));
			dispatch(hideCreateToggleModal());
		}
	}
}

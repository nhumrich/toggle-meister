import * as types from './toggles.types.js';
import { property } from 'lodash';
import toasts from 'toast-service!sofe';

export function getToggles() {
	return dispatch => {
		fetch('/api/toggles')
		.then(response => {
			if (response.ok) {
				return response
					.json()
					.then(property("toggles"))
					.then(toggles => {
						dispatch(newToggles(toggles));
					})
			} else {
				throw new Error(`Server responded with status ${response.status}`);
			}
		})
		.catch(err => {
			toasts.generalToast(`Could not get toggles -- ${JSON.stringify(err)}`)
			throw new Error(err);
		});
	}
}

export function newToggles(toggles) {
	return {
		type: types.NEW_TOGGLES,
		toggles,
	};
}

export function turnFeatureOn(toggle) {
	return dispatch => {
		fetch(`/api/toggles`, {
			method: 'PUT',
			body: JSON.stringify({
				toggle: {
					...toggle.toggle,
					state: "ON",
				},
			}),
		})
		.then(response => {
			if (response.ok) {
				return response
					.json()
					.then(property("toggles"))
					.then(toggles => {
						dispatch(newToggles(toggles))
					})
			} else {
				throw new Error(response);
			}
		})
		.catch(err => {
			toasts.generalToast(`Could not turn feature '${toggle.feature}' on: ${JSON.stringify(err)}`)
			throw new Error(err);
		});
	}
}

export function turnFeatureOff(toggle) {
	return dispatch => {
		fetch(`/api/toggles`, {
			method: 'PUT',
			body: JSON.stringify({
				toggle: {
					...toggle.toggle,
					state: "OFF",
				},
			}),
		})
		.then(response => {
			if (response.ok) {
				return response
					.json()
					.then(property("toggles"))
					.then(toggles => {
						dispatch(newToggles(toggles))
					})
			} else {
				throw new Error(`Server responded with status ${response.status}`);
			}
		})
		.catch(err => {
			toasts.generalToast(`Could not turn feature '${toggle.feature}' off: ${JSON.stringify(err)}`)
			throw new Error(err);
		});
	}
}

export function createToggle(name) {
	return dispatch => {
		fetch(`/api/features`, {
			method: 'POST',
			body: JSON.stringify({
				name,
			}),
		})
		.then(response => {
			if (response.ok) {
				dispatch(getToggles());
			} else {
				throw new Error(`Server responded with status ${response.status}`);
			}
		})
		.catch(err => {
			toasts.generalToast(`Could not create toggle: ${JSON.stringify(err)}`)
			throw new Error(err);
		});
	}
}

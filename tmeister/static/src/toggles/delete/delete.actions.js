import {noop} from 'lodash';
import {generalToast} from 'toast-service!sofe';
import * as types from './delete.types.js';

export function deleteFeature(featureName, cbk=noop) {
	return dispatch => {
		fetch(`/api/features/${featureName}`, {
			method: 'DELETE',
			credentials: 'same-origin',
		})
		.then(response => {
			if (response.ok) {
				dispatch(featureWasDeleted(featureName), );
				cbk();
			} else {
				throw response.status;
			}
		})
		.catch(ex => {
			generalToast(`Error deleting feature - ${ex}`);
			setTimeout(() => {throw ex});
		});
	}
}

export function featureWasDeleted(featureName) {
	return {
		type: types.FEATURE_WAS_DELETED,
		featureName,
	};
}

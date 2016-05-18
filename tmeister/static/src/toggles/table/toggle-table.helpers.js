import { chain, includes, uniq, union } from 'lodash';
import { filter as fuzzyFilter } from 'fuzzy';
import { getSelectedEnvs } from '../envs/select-envs.helpers.js';

export function getEnvList(toggles) {
	return toggles
		.reduce((result, toggle) => {
			const env = toggle.toggle.env;

			return !includes(result, env)
				?
					result.concat(env)
				:
					result
		}, ["Production"]);
}

export function groupTogglesByFeature(toggles, envList) {
	return chain(toggles)
	.groupBy('toggle.feature')
	.flatMap(group => [group])
	.sortBy(groupArr => envList.indexOf(groupArr[0].toggle.env))
	.value()
}

export function fuzzySearch(toggles, search) {
	const selectedEnvs = getSelectedEnvs();
	const filteredToggles = toggles.filter(toggle => includes(selectedEnvs, toggle.toggle.env))

	if (search) {
		return fuzzyFilter(search, filteredToggles, {
			extract: toggle => toggle.toggle.feature,
		})
		.map(fuzzyFilterObj => fuzzyFilterObj.original);
	} else {
		return filteredToggles;
	}
}

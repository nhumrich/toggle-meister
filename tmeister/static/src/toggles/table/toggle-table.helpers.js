import { reduce, sortBy, chain, includes, uniq, union } from 'lodash';
import { filter as fuzzyFilter } from 'fuzzy';
import { getSelectedEnvs } from '../envs/select-envs.helpers.js';

const sortOrder = {
	integ: 1,
	stage: 2,
	Production: 3,
}

export function getEnvList(toggles) {
	return toggles
		.reduce((result, toggle) => {
			const env = toggle.toggle.env;

			return !includes(result, env)
				?
					result.concat(env)
				:
					result
		}, ["Production"])
		.sort((first, second) => {
			if (sortOrder[first] && sortOrder[second]) {
				return sortOrder[first] < sortOrder[second] ? -1 : 1;
			} else {
				return first < second ? -1 : 1;
			}
		})
}

export function groupTogglesByFeature(toggles, envList) {
	return chain(toggles)
	.groupBy('toggle.feature')
	.map(group => {
		return reduce(group, (newGroup, el) => {
			newGroup[envList.indexOf(el.toggle.env)] = el;
			return newGroup;
		}, []);
	})
	.flatMap(group => {
		return [group]
	})
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

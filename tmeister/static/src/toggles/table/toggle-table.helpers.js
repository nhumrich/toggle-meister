import { reduce, sortBy, chain, includes, uniq, union } from 'lodash';
import { getSelectedEnvs } from '../envs/select-envs.helpers.js';

const sortOrder = {
  integ: 1,
  stage: 2,
  production: 3,
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
    }, ["production"])
    .sort((first, second) => {
      if (sortOrder[first] && sortOrder[second]) {
        return sortOrder[first] > sortOrder[second] ? -1 : 1;
      } else {
        return first > second ? -1 : 1;
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

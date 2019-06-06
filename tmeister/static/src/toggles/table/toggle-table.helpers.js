import { reduce, sortBy, chain, includes, uniq, union } from 'lodash';

export function groupTogglesByFeature(toggles, envList) {
  return chain(toggles)
    .sortBy((t) => t.toggle.feature)
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

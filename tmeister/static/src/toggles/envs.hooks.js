import {useState, useEffect} from 'react';
import { property } from 'lodash'
import toasts from 'common/simple-toast/simple-toast.js';

export function useFetchEnvs () {
  const [ envs, setEnvs ] = useState([])
  const [ count, setCount ] = useState(1)
  useEffect(() => {
    const controller = new AbortController()
    const signal = controller.signal
    fetch('/api/envs', {credentials: 'same-origin', signal})
      .then((response => {
        if (response.ok) {
          return response
            .json()
            .then(property("envs"))
            .then(envs => {
              const sortedEnvs = sortEnvs(envs)
              setEnvs(sortedEnvs);
            })
        }
      }))
      .catch(err => {
        toasts.generalToast(`Could not get envs -- ${JSON.stringify(err)}`)
        throw new Error(err);
      })

    return () => {
      controller.abort()
    }
  }, [count])

  return [
    envs,
    () => setCount(count + 1)
  ]
}

export function sortEnvs (envs = []) {
  return envs.sort((item1, item2) => {
    const a = item1.name || item1
    const b = item2.name || item2
    if (a === 'production') {
      return 1
    } else if (b === 'production') {
      return -1
    } else if (a < b) {
      return -1
    } else if (a > b) {
      return 1
    } else {
      return 0
    }
  })
}

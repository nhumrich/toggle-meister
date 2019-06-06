import {useState, useEffect} from 'react';
import { property } from 'lodash'
import { toasts } from 'common/simple-toast/simple-toast.js'

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
              setEnvs(envs);
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

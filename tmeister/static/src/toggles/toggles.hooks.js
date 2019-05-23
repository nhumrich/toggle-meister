import { property } from 'lodash'
import { useState, useEffect } from 'react'
import toasts from '../common/simple-toast/simple-toast.js';

export function useFetchToggles (search) {
  const [toggles, setToggles] = useState([])
  const [ count, setCount ] = useState(1)
  useEffect(() => {
    const controller = new AbortController()
    const signal = controller.signal
    fetch('/api/toggles', {credentials: 'same-origin', signal})
      .then((response => {
        if (response.ok) {
          return response
            .json()
            .then(property("toggles"))
            .then(toggles => {
              setToggles(toggles);
            })
        }
      }))
      .catch(err => {
        toasts.generalToast(`Could not get toggles -- ${JSON.stringify(err)}`)
        throw new Error(err);
      })

    return () => {
      controller.abort()
    }
  }, [count])

  return [ toggles.filter(t => {
    if (search != undefined) {
      return t.toggle.feature.includes(search)
    } else {
      return t
    }
  }),
    () => setCount(count + 1)
  ]
}

import { filter as fuzzyFilter } from 'fuzzy';
import { property, includes } from 'lodash'
import { useState, useEffect, useMemo } from 'react'
import toasts from 'common/simple-toast/simple-toast.js';

export function useFetchToggles () {
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

  return [
    toggles,
    () => setCount(count + 1)
  ]
}

export function useDeleteFeature(callback) {
  const [ featureToDelete, setFeatureToDelete ] = useState()
  const [ deleting, setDeleting ] = useState(false)
  useEffect(() => {
    if (featureToDelete) {
      setDeleting(true)
      const controller = new AbortController()
      const signal = controller.signal
      fetch(`/api/features/${featureToDelete}`, {
        method: 'DELETE',
        credentials: 'same-origin',
        signal,
      }).then(response => {
        if (response.ok) {
          setFeatureToDelete()
          setDeleting(false)
          callback()
        } else {
          throw response.status;
        }
      }).catch(ex => {
        setDeleting(false)
        setFeatureToDelete()
        toasts.generalToast(`Error deleting feature - ${ex}`);
        setTimeout(() => {throw ex});
      });
      return () => {
        controller.abort()
      }
    }
  }, [featureToDelete, callback])
  return [setFeatureToDelete, deleting]
}

export function useChangeFeatureStatus (callback) {
  const [ newStatus, setNewStatus ] = useState()
  const [ featureToChange , setFeatureToChange ] = useState()
  const [ pending, setPending ] = useState(false)

  useEffect(() => {
    if (featureToChange && newStatus) {
      setPending(true)
      const controller = new AbortController()
      const signal = controller.signal
      const body = JSON.stringify({
        toggle: {
          feature: featureToChange.feature,
          env: featureToChange.env,
          state: newStatus,
        }
      })
      fetch(`/api/toggles`, {
        method: 'PATCH',
        body,
        credentials: 'same-origin',
        signal,
      }).then(response => {
        if (response.ok) {
          setFeatureToChange()
          setPending(false)
          callback()
        } else {
          throw response.status
        }
      }).catch(ex => {
        setFeatureToChange()
        setNewStatus()
        setPending(false)
        toasts.generalToast(`Error changing feature status - ${ex}`);
      })

      return () => {
        controller.abort()
      }
    }
  }, [featureToChange, newStatus, callback])

  return [setFeatureToChange, setNewStatus, pending]

}

export function useFilterToggles(selectedEnvs, toggles, search) {
  const filteredToggles = useMemo(
    () => toggles.filter(toggle => includes(selectedEnvs, toggle.toggle.env)),
    [selectedEnvs, toggles]
  )

  const finalFilter = useMemo(
    () => {
      if (search) {
        return fuzzyFilter(search, filteredToggles, {
          extract: toggle => toggle.toggle.feature,
        })
          .map(fuzzyFilterObj => fuzzyFilterObj.original);
      } else {
        return filteredToggles;
      }
    },
    [search, filteredToggles]
  )

  return finalFilter
}

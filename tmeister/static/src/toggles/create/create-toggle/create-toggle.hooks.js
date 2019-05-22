import toasts from '../../../common/simple-toast/simple-toast.js';
import {useState, useEffect} from 'react'

export function useCreateToggle(name) {

  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    if (name) {
      setSaving(true)
      const controller = new AbortController()
      const signal = controller.signal
      fetch(`/api/features`, {
        method: 'POST',
        body: JSON.stringify({
          name,
        }),
        credentials: 'same-origin',
        signal
      }).then(response => {
        if (response.ok) {
          setSaving(false)
          setSaved(true)
        } else {
          throw new Error(`Server responded with status ${response.status}`);
        }
      }).catch(err => {
        toasts.generalToast(`Could not create toggle: ${JSON.stringify(err)}`)
        throw new Error(err);
      })
      return () => {
        controller.abort()
      }
    }
  }, [name])

  return [ saving, saved ]

}

import {useState, useEffect} from 'react'
import toasts from 'common/simple-toast/simple-toast.js';

export function useCreateEnv(name) {
  const [ saving, saved ] = useCreate(
    {
      name,
      api: 'api/envs',
      visibleError: `Could not create environment`,
    }
  )

  return [saving, saved]
}

export function useCreateToggle (name) {
  const [ saving, saved ] = useCreate(
    {
      name,
      api: 'api/features',
      visibleError: `Could not create toggle`,
    }
  )

  return [saving, saved]
}

function useCreate({name, api, visibleError}) {
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    if (name) {
      setSaving(true)
      const controller = new AbortController()
      const signal = controller.signal
      fetch(api, {
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
        toasts.generalToast(`${visibleError}: ${JSON.stringify(err)}`)
        setSaving(false)
        setSaved(false)
        throw new Error(err);
      })
      return () => {
        controller.abort()
      }
    }
  }, [name, api, visibleError])

  return [ saving, saved ]
}


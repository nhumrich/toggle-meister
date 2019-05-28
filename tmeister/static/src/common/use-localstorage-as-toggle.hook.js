import { useState, useEffect } from 'react'

export default function useLocalStorageAsToggle(toggle) {
  const [ toggleActive, setToggleActive ] = useState(false)
  useEffect(() => {
    if(toggle) {
      try {
        const value = localStorage.getItem(`tm-toggle:${toggle}`)
        if (value != undefined) {
          if (value === 'true' || value === 'on') {
            setToggleActive(true)
          } else {
            setToggleActive(false)
          }
        }
      } catch (err) {
        setToggleActive(false)
      }
    }
  }, [toggle])

  return toggleActive
}

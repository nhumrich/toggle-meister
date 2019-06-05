import { useState, useEffect } from 'react'
import { uniqueId, property } from 'lodash'

export function useFetchReleaseNotes () {
  const [ notes, setNotes ] = useState([])
  const [ loadingNotes, setLoadingNotes ] = useState(false)
  const [ count, setCount ] = useState(1)

  useEffect(() => {
    setLoadingNotes(true)
    const controller = new AbortController()
    const signal = controller.signal
    fetch('/api/release_notes', {credentials: 'same-origin', signal})
      .then((response) => {
        if (response.ok) {
          return response.json()
            .then(property('release_notes'))
            .then(notes => {
            setLoadingNotes(false)
            setNotes(notes)
          })
        }
      }).catch(err => {
        setNotes([])
        setLoadingNotes(false)
      })
  }, [count])

  return [
    loadingNotes,
    notes,
    () => setCount(count + 1)
  ]
}

export function useCreateEditReleaseNote(isEdit) {
  const [ note, setNote ] = useState()
  const [ requestInProgress, setRequestInProgress] = useState(false)
  const [ response, setResponse] = useState()
  useEffect(() => {
    if (note) {
      console.log('note', note)
      const controller = new AbortController()
      const signal = controller.signal
      setRequestInProgress(true)
      const body = JSON.stringify(note)
      const method = isEdit ? 'PATCH' : 'POST'
      const baseURL = '/api/release_notes'
      const url = isEdit ? `${baseURL}/${note.id}` : baseURL
      const req = fetch(url, {
        method,
        body,
        credentials: 'same-origin',
        signal
      })
      req.then(response => {
        if(response.ok) {
          return response.json()
        } else {
          throw response.status
        }
      }).then((result) => {
        setNote()
        setResponse(result)
        setRequestInProgress(false)
      }).catch((err) => {
        setRequestInProgress(false)
        if (err !== 'cancelled') {
          console.error('err', err)
        }
      })
      return () => {
        controller.abort()
      }
    }
  }, [note, isEdit])

  return [setNote, requestInProgress, response]
}

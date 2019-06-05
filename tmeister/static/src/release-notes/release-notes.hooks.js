import { useState, useEffect } from 'react'
import { uniqueId, property } from 'lodash'

const baseURL = '/api/release_notes'

export function useFetchReleaseNotes () {
  const [ notes, setNotes ] = useState([])
  const [ loadingNotes, setLoadingNotes ] = useState(false)
  const [ count, setCount ] = useState(1)

  useEffect(() => {
    setLoadingNotes(true)
    const controller = new AbortController()
    const signal = controller.signal
    fetch(baseURL, {credentials: 'same-origin', signal})
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
      const controller = new AbortController()
      const signal = controller.signal
      setRequestInProgress(true)
      const body = JSON.stringify(note)
      const method = isEdit ? 'PATCH' : 'POST'
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

export function useDeleteReleaseNote() {
  const [ note, setNote ] = useState()
  const [ deleteInProgress, setDeleteInProgress ] = useState(false)
  const [ deleted, setDeleted ] = useState(false)
  useEffect(() => {
    if(note) {
      const controller = new AbortController()
      const signal = controller.signal
      setDeleteInProgress(true)
      const req = fetch(`${baseURL}/${note.id}`, {
        credentials: 'same-origin',
        signal,
        method: 'DELETE'
      })

      req.then((response) => {
        if (response.ok) {
          setNote()
          setDeleted(true)
          setDeleteInProgress(false)
        } else {
          throw response.status
        }
      }).catch(err => {
        console.error(err)
        setRequestInProgress(false)
      })

      return () => {
        setNote()
        setDeleted(false)
        setDeleteInProgress(false)
        controller.abort()
      }
    }
  }, [note])

  return [ setNote, deleteInProgress, deleted ]

}

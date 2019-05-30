import { useEffect, useState, useMemo } from 'react'
import { groupBy, property } from 'lodash'
import toasts from '../../common/simple-toast/simple-toast.js';

export function useMetricsForToggle (toggle) {
  const [metrics, setMetrics] = useState([])
  const [loading, setLoading ] = useState(false)
  const [count, setCount ] = useState(0)

  useEffect(() => {
    if (toggle) {
      // make api call
      setLoading(true)
      const controller = new AbortController()
      const signal = controller.signal
      const req = fetch(`api/metrics/${toggle}`, {
        credentials: 'same-origin',
        signal,
      }).then(response => {
        if (response.ok) {
          return response.json()
            .then(property('metrics'))
            .then(v => {
              setMetrics(v)
              setLoading(false)
            })
        } else {
          throw response.status;
        }
      }).catch(err => {
        setLoading(false)
        toasts.warningToast(`Could not get metrics -- ${JSON.stringify(err)}`)
      })
      return () => {
        controller.abort()
      }
    }
  }, [count, toggle])

  const refetch = () => setCount(count + 1)

  return [metrics, loading, refetch]
}

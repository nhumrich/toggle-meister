import { useEffect, useState, useMemo } from 'react'
import { groupBy, property } from 'lodash'

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
      })
      return () => {
        controller.abort()
      }
    }
  }, [count, toggle])

  const refetch = () => setCount(count + 1)

  return [metrics, loading, refetch]
}

const mockResponse = {
  metrics: [
    {date: '2019-05-14', hit_count: 2, environment: 'production'},
    {date: '2019-05-15', hit_count: 2, environment: 'production'},
    {date: '2019-05-16', hit_count: 2, environment: 'production'},
    {date: '2019-05-17', hit_count: 2, environment: 'production'},
    {date: '2019-05-18', hit_count: 2, environment: 'production'},
    {date: '2019-05-19', hit_count: 2, environment: 'production'},
    {date: '2019-05-20', hit_count: 2, environment: 'production'},
    {date: '2019-05-21', hit_count: 2, environment: 'production'},
    {date: '2019-05-22', hit_count: 2, environment: 'production'},
    {date: '2019-05-23', hit_count: 2, environment: 'production'},
    {date: '2019-05-24', hit_count: 2, environment: 'production'},
    {date: '2019-05-15', hit_count: 1, environment: 'integ'},
    {date: '2019-05-16', hit_count: 1, environment: 'integ'},
    {date: '2019-05-17', hit_count: 1, environment: 'integ'},
    {date: '2019-05-18', hit_count: 1, environment: 'integ'},
    {date: '2019-05-19', hit_count: 1, environment: 'integ'},
    {date: '2019-05-20', hit_count: 1, environment: 'integ'},
    {date: '2019-05-21', hit_count: 1, environment: 'integ'},
    {date: '2019-05-22', hit_count: 1, environment: 'integ'},
    {date: '2019-05-23', hit_count: 1, environment: 'integ'},
    {date: '2019-05-24', hit_count: 1, environment: 'integ'},
  ]
}

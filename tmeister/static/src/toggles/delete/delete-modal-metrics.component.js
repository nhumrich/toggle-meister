import React from 'react'
import { sumBy } from 'lodash'

export default function DeleteFeatureModal (props) {
  const { metrics, loading } = props
  if (loading) {
    return 'Loading metrics...'
  } else if (metrics != undefined) {
    return (
      <div>
        {
          Object.keys(metrics).map((key) => {
            const countTimes = sumBy(metrics[key], i => i.hit_count)
            const dayCount = metrics[key].length
            return (
              <div key={key}>
                This toggle was requested {countTimes} times in {key} in the last {dayCount} days
              </div>
            )
          })
        }
      </div>
    )
  } else {
    return (
      'No metrics found/error loading metrics'
    )
  }
}

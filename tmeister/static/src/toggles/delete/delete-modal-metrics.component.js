import React from 'react'
import { sumBy, get } from 'lodash'
import dayjs from 'dayjs'

const calendarSettingsOverrides = {
  sameDay: '[Today]',
  nextDay: '[Tomorrow]',
  lastDay: '[Yesterday]',
  lastWeek: '[Last] dddd',
  sameElse: 'MM/DD/YYYY'
}

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
            const dayArray = metrics[key].map(obj => dayjs(obj.date))
              .sort((a, b) => {
                if (a.isBefore(b)) {
                  return -1
                } else {
                  return 1
                }
              })
            const dayCount = get(metrics, `[${key}].length`, 0)
            const dateRange = dayArray.length > 1 ?
              `${dayArray[0].calendar(null, calendarSettingsOverrides)} - ${dayArray[dayArray.length -1].calendar(null, calendarSettingsOverrides)}` :
              dayArray[0].calendar(null, calendarSettingsOverrides)

            return (
              <div key={key}>
                <span>
                  <strong>{key}</strong>: {countTimes} requests ({dateRange})
                </span>
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

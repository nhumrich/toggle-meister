import React from 'react'

export default function Percentage(props) {
  const { toggle, changeToggle } = props
  const { state, env, current_percent } = toggle
  if (state === 'PAUSE') {
    return (
      <div>
        <button onClick={() => changeToggle(toggle, 'ROLL')}>
          { current_percent }
        </button>
      </div>
    )
  } else if (state === 'ROLL') {
    return (
      <div>
        <button onClick={() => changeToggle(toggle, 'PAUSE')}>
          { current_percent }
        </button>
      </div>
    )
  }
}

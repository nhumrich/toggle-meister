import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { CircularProgress, Typography } from '@material-ui/core'

const useStyles = makeStyles({
  emptyButton: {
    background: 'none',
    color: 'inherit',
    border: 'none',
    padding: 0,
    font: 'inherit',
    cursor: 'pointer',
    outline: 'inherit',
    position: 'relative',
  },
  progressText: {
    position: 'absolute',
    top: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    width: '100%',
    fontSize: '0.7rem'
  },
})

export default function Percentage(props) {
  const classes = useStyles()
  const { toggle, changeToggle } = props
  const { state, env, current_percent } = toggle
  if (state === 'PAUSE') {
    return (
        <button
          className={classes.emptyButton}
          onClick={() => changeToggle(toggle, 'ROLL')}
        >
          { current_percent }
        </button>
    )
  } else if (state === 'ROLL') {
    return (
        <button
          className={classes.emptyButton}
          onClick={() => changeToggle(toggle, 'PAUSE')}
        >
          <CircularProgress size={40} variant='static' value={100} />
          <Typography className={classes.progressText}>
            {current_percent}%
          </Typography>
        </button>
    )
  }
}

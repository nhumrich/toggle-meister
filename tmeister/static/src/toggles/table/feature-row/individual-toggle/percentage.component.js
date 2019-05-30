import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { CircularProgress, Typography, Icon, Tooltip, IconButton } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  emptyButton: {
    background: 'none',
    color: 'inherit',
    border: 'none',
    padding: 0,
    font: 'inherit',
    cursor: 'pointer',
    outline: 'inherit',
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
  relative: {
    position: 'relative'
  },
  icon: {
    position: 'absolute',
    top: 0,
    left: 0,
    fontSize: 40,
    color: theme.palette.text.disabled,
  },
  pauseBlock: {
    display: 'flex'
  }
}))

export default function Percentage(props) {
  const classes = useStyles()
  const { toggle, changeToggle } = props
  const { state, env, current_percent } = toggle
  if (state === 'PAUSE') {
    return (
      <Tooltip title={`paused for 48 hours at ${current_percent}%`}>
        <div className={classes.relative}>
          <IconButton
            className={`${classes.emptyButton} ${classes.relative}`}
          >
            <CircularProgress size={40} variant='static' value={current_percent} />
            <Icon className={`${classes.icon}`}>
              pause
            </Icon>
          </IconButton>
        </div>
      </Tooltip>
    )
  } else if (state === 'ROLL') {
    return (
      <Tooltip title={`pause rollout for 48 hours`}>
        <div className={classes.relative}>
          <IconButton
            className={`${classes.emptyButton} ${classes.relative}`}
            onClick={() => changeToggle(toggle, 'PAUSE')}
          >
            <CircularProgress size={40} variant='static' value={current_percent} />
          <Typography className={classes.progressText}>
            {current_percent}%
          </Typography>
          </IconButton>
        </div>
      </Tooltip>
    )
  }
}

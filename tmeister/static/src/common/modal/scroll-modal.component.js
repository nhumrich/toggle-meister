import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Typography, Paper, Modal, IconButton, Icon } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  positioning: {
    width: '100vw',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  paper: {
    width: 700,
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(4),
    outline: 'none',
    maxHeight: `calc(100% - 88px)`,
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  modalContents: {
    overflowY: 'auto',
  },
  bottomRow: {
    marginTop: '16px',
    height: '48px',
  }
}));

export default function ScrollModal (props) {
  const { headerText, closeAction, children, bottomRowContents } = props
  const classes = useStyles();
  return (
    <Modal open={true}>
      <div className={classes.positioning}>
        <Paper className={classes.paper}>
          <div className={classes.header}>
            <Typography variant='h6'>{headerText}</Typography>
            <IconButton onClick={closeAction}>
              <Icon>
                close
              </Icon>
            </IconButton>
          </div>
          {children}
        </Paper>
      </div>
    </Modal>
  )
}

ScrollModal.Body = (props) => {
  const classes = useStyles()
  const { children } = props
  return children ? (
    <div className={classes.modalContents}>
      {children}
    </div>
  ) : null
}

ScrollModal.BottomRow = (props) => {
  const classes = useStyles();
  const { children } = props
  if (children) {
    return (
      <div className={classes.bottomRow}>
        {children}
      </div>
    )
  } else {
    return null
  }
}

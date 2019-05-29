import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Typography, Paper, Modal, IconButton, Icon } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  paper: {
    position: 'absolute',
    width: 700,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(4),
    outline: 'none',
    left: '33%',
    top: '46%',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between'
  }
}));

export default function ModalWrapper (props) {
  const { headerText, closeAction, children } = props
  const classes = useStyles();
  return (
    <Modal open={true}>
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
    </Modal>
  )
}

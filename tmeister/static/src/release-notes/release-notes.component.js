import React from 'react'
import { Container, Paper, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import ErrorBoundary from '../common/error-boundary.component.js'
import ReleaseNoteTable from './release-notes-table/release-notes-table.component.js'
import { useFetchReleaseNotes } from './release-notes.hooks.js'

const useStyles = makeStyles(theme => ({
  header: {
    marginBottom: '8px'
  },
  controls: {
    marginBottom: '16px'
  },
  container: {
    padding: 16,
  }
}))

export default function Releases(props) {
  const classes = useStyles()
  const [ loading, releaseNotes, refetchReleaseNotes ] = useFetchReleaseNotes()
  return (
    <ErrorBoundary>
      <Container>
        <Paper className={classes.container}>
          <Typography className={classes.header} variant='h2'>
            Release notes - beta
          </Typography>
          <div className={classes.controls}>

          </div>
          <ReleaseNoteTable
            releaseNotes={releaseNotes}
            refetch={refetchReleaseNotes}
          />
        </Paper>
      </Container>
    </ErrorBoundary>
  )
}


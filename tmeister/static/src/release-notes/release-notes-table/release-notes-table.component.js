import React from 'react';
import { Table, TableHead, TableRow, TableCell, TableBody, Paper, CircularProgress } from '@material-ui/core'
import ReleaseNoteRow from './release-note-row.component.js'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  center: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  loading: {
    width: '100%',
    height: '60px',
  }
}))

export default function ReleaseNoteTable (props) {
  const c = useStyles()
  const { loading, releaseNotes, refetch } = props

  return (
    <Paper>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              Title
            </TableCell>
            <TableCell>
              Body preview
            </TableCell>
            <TableCell>
              Related Feature
            </TableCell>
            <TableCell>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            contents()
          }
        </TableBody>
      </Table>
      {
        loading && (
          <div className={`${c.center} ${c.loading}`}>
            <CircularProgress color="secondary" />
          </div>
        )
      }
      {
        !loading && releaseNotes.length === 0 && (
          <div className={`${c.center} ${c.loading}`}>
            No notes found
          </div>
        )
      }
    </Paper>
  )

  function contents () {
    if (loading || releaseNotes.length === 0) {
      return null
    } else {
      return releaseNotes.map((note) => (
        <ReleaseNoteRow
          key={note.id}
          note={note}
          refetch={refetch}
        />
      ))
    }
  }
}


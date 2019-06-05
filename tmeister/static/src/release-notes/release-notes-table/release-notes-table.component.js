import React from 'react';
import { Table, TableHead, TableRow, TableCell, TableBody, Paper } from '@material-ui/core'
import ReleaseNoteRow from './release-note-row.component.js'


export default function ReleaseNoteTable (props) {
  const { releaseNotes, refetch } = props

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
            releaseNotes.map((note) => (
              <ReleaseNoteRow
                key={note.id}
                note={note}
                refetch={refetch}
              />
            ))
          }
        </TableBody>
      </Table>
    </Paper>
  )
}


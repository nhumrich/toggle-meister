import React, {useState} from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Button, TextField } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  inputRow: {
    marginBottom: '8px',
  },
}))

export default function CreateEditReleaseNoteForm (props) {
  const { close, isEdit, releaseNote, title, setTitle, body, setBody } = props
  const classes = useStyles()
  return (
    <form
      noValidate
      autoComplete='off'
      id='create-edit-release-note'
      onSubmit={handleSubmit}
      name='create-edit-release-note'
    >
      <div className={classes.inputRow}>
        <TextField
          variant='outlined'
          fullWidth
          id='release-note-title'
          label='Note Title'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className={classes.inputRow}>
        <TextField
          variant='outlined'
          multiline
          fullWidth
          fullHeight
          id='release-note-Body'
          label='Release Note Body'
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
      </div>
    </form>
  )

  function handleSubmit(e) {
    e.preventDefault()
    console.log('submit')
  }
}

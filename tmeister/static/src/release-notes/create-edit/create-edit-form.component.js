import React, {useState} from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Button, TextField, FormControl, InputLabel, Select, MenuItem, OutlinedInput} from '@material-ui/core'
import { useFetchToggles } from '../../toggles/toggles.hooks.js'
import { useCreateEditReleaseNote } from '../release-notes.hooks.js'

const useStyles = makeStyles(theme => ({
  inputRow: {
    marginBottom: '8px',
  },
}))

export default function CreateEditReleaseNoteForm (props) {
  const { close, isEdit, releaseNote, title, setTitle, body, setBody, requestInProgress, createEditNote } = props
  const classes = useStyles()
  const [ feature, setFeature ] = useState('')
  const [toggles, refetch] = useFetchToggles()
  const toggleOptions = toggles
    .filter(r => r.toggle.env === 'production')
    .map(r => r.toggle.feature)

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
          disabled={requestInProgress}
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
          disabled={requestInProgress}
          variant='outlined'
          multiline
          fullWidth
          id='release-note-Body'
          label='Release Note Body'
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
      </div>
      <div className={classes.inputRow}>
        <FormControl
          variant='outlined'
          fullWidth
        >
          <InputLabel htmlFor='feature-toggle-select'>
            Feature
          </InputLabel>
          <Select
            disabled={requestInProgress}
            value={feature}
            onChange={(e) => setFeature(e.target.value)}
            input={<OutlinedInput name='feature' id='feature-toggle-select' />}
          >
            <MenuItem value={''}>
              None
            </MenuItem>
            {
              toggleOptions.map(feature => (
                <MenuItem key={feature} value={feature}>{feature}</MenuItem>
              ))
            }
          </Select>
        </FormControl>
      </div>
    </form>
  )

  function handleSubmit(e) {
    e.preventDefault()
    createEditNote({id: releaseNote.id, title, body, feature})
  }
}

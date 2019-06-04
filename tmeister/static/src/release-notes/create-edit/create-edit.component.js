import React, {useState} from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Tabs, Tab, Button } from '@material-ui/core'
// project
import Modal from '../../common/modal/modal.component.js'
import CreateEditReleaseNoteForm from './create-edit-form.component.js'
import ReleaseNotePreview from '../release-note-preview/release-note-preview.component.js'

const useStyles = makeStyles(theme => {
  return {
    tabs: {
      position: 'fixed',
      backgroundColor: theme.palette.background.paper,
      zIndex: 1,
      width: '686px',
    },
    buttonRow: {
      display: 'flex',
      justifyContent: 'space-between',
      margin: '0px 24px',
    },
    tabContents: {
      paddingTop: '72px',
    },
    contents: {
      display: 'flex',
      flexDirection: 'column',
    }
  }
})

export default function CreateEditReleaseNote (props) {
  const classes = useStyles()
  const { releaseNote = {}, close} = props
  const isEdit = !!props.releaseNote
  const [ title, setTitle ] = useState(() => releaseNote.title || '')
  const [ body, setBody] = useState(() => releaseNote.body || '')
  const [ preview, setPreview ] = useState(false)
  const [ tabValue, setTabValue ] = useState(0)
  return (
    <Modal
      headerText={isEdit ? `Edit Note` : 'Create Note'}
      closeAction={close}
      bottomRowContents={(
        <div className={classes.buttonRow}>
          <Button
            variant='contained'
            color='primary'
            type={'submit'}
            form={'create-edit-release-note'}
          >
            { isEdit ? 'Save' : 'Update'} note
          </Button>
          <Button
            variant='contained'
            type={'button'}
            onClick={close}
          >
            Cancel
          </Button>
        </div>
      )}
    >
      <div className={classes.contents}>
        <Tabs
          className={classes.tabs}
          value={tabValue}
          onChange={(e,v) => setTabValue(v)}
          fullWidth
        >
          <Tab label={isEdit ? `Edit` : `Create`}/>
          <Tab label={`Preview`}/>
        </Tabs>
        <div className={classes.tabContents}>
          {
            tabValue === 0 && (
              <CreateEditReleaseNoteForm
                title={title}
                setTitle={setTitle}
                body={body}
                setBody={setBody}
                releaseNote={releaseNote}
                isEdit={isEdit}
                close={close}
              />
            )
          }
          {
            tabValue === 1 && (
              <ReleaseNotePreview
                body={body}
                title={title}
              />
            )
          }
        </div>
      </div>
    </Modal>
  )

}

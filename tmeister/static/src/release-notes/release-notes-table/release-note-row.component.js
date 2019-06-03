import React, { useState } from 'react'
import { md } from '../release-notes.helper.js'
import { TableRow, TableCell, TableBody, Paper, IconButton, Icon } from '@material-ui/core'
import CreateEditReleaseNote from '../create-edit/create-edit.component.js'

export default function ReleaseNoteRow (props) {
  const { note = {} } = props
  const { title, body, relatedToggles } = note
  const [inlinePreview, setInlinePreview] = useState(true)
  const [edit, setEdit] = useState(false)
  return (
    <TableRow key={note.id}>
      <TableCell>
        {title}
      </TableCell>
      <TableCell>
        <div>
          {previewBody(body)}
        </div>
      </TableCell>
      <TableCell>
        {relatedToggles}
      </TableCell>
      <TableCell onClick={() => setInlinePreview(!inlinePreview)}>
        <IconButton onClick={() => setInlinePreview(!inlinePreview)}>
          <Icon>
            { inlinePreview ? 'arrow_drop_down' : 'arrow_drop_up'}
          </Icon>
        </IconButton>
      </TableCell>
      <TableCell>
        <IconButton onClick={() => setEdit(!edit)}>
          <Icon>
            edit
          </Icon>
        </IconButton>
      </TableCell>
      {
        edit && (
          <CreateEditReleaseNote
            releaseNote={note}
            close={() => setEdit(false)}
          />
        )
      }
    </TableRow>
  )

  function previewBody (markdown = '') {
    const split = markdown.split('\n')
    let preview = markdown
    if (inlinePreview && split.length > 5) {
      const slice = split.slice(0, 5)
      slice.push('...')
      preview = slice.join('\n')
    }
    const html = md.render(preview) || '<div>No preview</div>'
    // const html = '<div>no preview</div>'
    return (
      <div
        dangerouslySetInnerHTML={{__html: html}}
      />
    )
  }
}


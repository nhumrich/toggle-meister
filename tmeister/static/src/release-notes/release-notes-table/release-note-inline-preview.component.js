import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { md } from '../release-notes.helper.js'
import { IconButton, Icon } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  flex: {
    display: 'flex'
  }
}))

export default function ReleaseNoteInlinePreview ({markdown = ''}) {
  const [inlinePreview, setInlinePreview] = useState(true)
  const classes = useStyles()
  let preview = markdown
  let showArrow = false
  if (markdown && markdown.length > 5) {
    const split = markdown.split('\n')
    showArrow = split.length > 5
    if (inlinePreview && showArrow) {
      const slice = split.slice(0, 5)
      slice.push('...')
      preview = slice.join('\n')
    }
  }
  const html = md.render(preview)

  return (
    <div className={classes.flex}>
      <div>
        <div dangerouslySetInnerHTML={{__html: html}}/>
      </div>
      {
        showArrow && (
          <div>
            <IconButton onClick={() => setInlinePreview(!inlinePreview)}>
              <Icon>
                { inlinePreview ? 'arrow_drop_down' : 'arrow_drop_up'}
              </Icon>
            </IconButton>
          </div>
        )
      }
    </div>
  )

}

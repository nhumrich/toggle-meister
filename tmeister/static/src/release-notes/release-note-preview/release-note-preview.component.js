import React, { useMemo } from 'react'
import { md } from '../release-notes.helper.js'

export default function ReleaseNotePreview (props) {
  const { title, body } = props
  const html = useMemo(() => md.render(body), [body])
  return (
    <div>
      <h1>{title}</h1>
      <div dangerouslySetInnerHTML={{__html: html}} />
    </div>
  )
}

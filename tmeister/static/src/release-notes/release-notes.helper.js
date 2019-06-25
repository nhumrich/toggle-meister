import markdownIt from 'markdown-it'
import markdownImageSize from 'markdown-it-imsize'
export const md = new markdownIt().use(markdownImageSize)

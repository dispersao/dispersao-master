import { normalize } from 'normalizr'
import { sessioncontentSchema } from './sessioncontent'
import { scriptSchema } from '../../scripts/schema/script'
import { postSchema } from '../../posts/schema'
import commentSchema from '../../comments/schema'

sessioncontentSchema.define({
  script: scriptSchema,
  post: postSchema,
  comment: commentSchema
})

export const sessioncontentListSchema = [sessioncontentSchema]

export const normalizeSessioncontent = (data) => {
  return normalize(data, sessioncontentSchema )
}

export const normalizeSessioncontentList = (data) => {
  return normalize(data, sessioncontentListSchema)
}

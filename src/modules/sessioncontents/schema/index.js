import { normalize } from 'normalizr'
import { sessioncontentSchema } from './sessioncontent'
import { scriptSchema } from '../../scripts/schema/script'

sessioncontentSchema.define({
  script: scriptSchema
})

export const sessioncontentListSchema = [sessioncontentSchema]

export const normalizeSessioncontent = (data) => {
  return normalize(data, sessioncontentSchema )
}

export const normalizeSessioncontentList = (data) => {
  return normalize(data, sessioncontentListSchema)
}

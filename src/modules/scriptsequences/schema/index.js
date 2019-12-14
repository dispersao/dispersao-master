import { normalize } from 'normalizr'
import { scriptsequenceSchema } from './scriptsequence'
import { scriptSchema } from '../../scripts/schema/script'
import { sequenceSchema } from '../../sequences/schema/sequence'

scriptsequenceSchema.define({
  sequence: sequenceSchema,
  script: scriptSchema
})


export const scriptsequenceListSchema = [scriptsequenceSchema]

export const normalizeScriptsequence = (data) => {
  return normalize(data, scriptsequenceSchema)
}

export const normalizeScriptsequenceList = (data) => {
  return normalize(data, scriptsequenceListSchema)
}

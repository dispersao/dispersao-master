import { schema, normalize } from 'normalizr'
import { sequenceSchema } from '../sequences/schema'

export const scriptsequenceSchema = new schema.Entity('scriptsequences', {
  sequence: sequenceSchema
})

export const normalizeScriptsequence = (data) => {
  return normalize(data, scriptsequenceSchema)
}

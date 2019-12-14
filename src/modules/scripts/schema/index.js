import { normalize } from 'normalizr'
import { scriptsequenceSchema } from '../../scriptsequences/schema/scriptsequence'

import { scriptSchema } from './script'

scriptSchema.define({
  scriptsequences: [scriptsequenceSchema]
})
export const scriptsListSchema = [scriptSchema]

export const normalizeScriptList = (data) => {
  return normalize(data, scriptsListSchema)
}

export const normalizeScript = (data) => {
  return normalize(data, scriptSchema)
}

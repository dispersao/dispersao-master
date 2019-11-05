import { schema, normalize } from 'normalizr'
import { scriptsequenceSchema } from '../scriptsequences/schema'

const scriptSchema = new schema.Entity('scripts', {
  scriptsequences: [scriptsequenceSchema]
})

export const scriptsListSchema = [scriptSchema]

export const normalizeScriptList = (data) => {
  return normalize(data, scriptsListSchema)
}

export const normalizeScript = (data) => {
  return normalize(data, scriptSchema)
}

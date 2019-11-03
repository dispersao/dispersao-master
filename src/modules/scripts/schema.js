import { schema, normalize } from 'normalizr'

const scriptSchema = new schema.Entity('scripts', {
})

export const scriptsListSchema = [scriptSchema]

export const normalizeScriptList = (data) => {
  return normalize(data, scriptsListSchema)
}

export const normalizeScript = (data) => {
  return normalize(data, scriptSchema)
}

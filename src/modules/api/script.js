import axios from 'axios'
import { normalizeScriptList, normalizeScript } from '../../modules/scripts/schema'

export const fetchScripts = async () => {
  const scripts = await axios.get('/scripts')
  return normalizeScriptList(scripts.data)
}

export const createScript = async (options) => {
  const script = await axios.post('/scripts', options)
  return normalizeScript(script.data)
}

export const updateScript = async (options) => {
  const { id } = options
  const params = { ... options }
  delete params['id']

  const script = await axios.put(`/scripts/${id}`, params)
  return normalizeScript(script.data) 
}

export const updateStateScript = async (options) => {
  const { id } = options
  const params = { ... options }
  delete params['id']

  const script = await axios.put(`/scripts/${id}/state`, params)
  return normalizeScript(script.data)
}

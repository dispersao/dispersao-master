import axios from 'axios'
import { normalizeScriptList, normalizeScript } from '../../modules/scripts/schema'

export const createScript = async (options) => {
  const script = await axios.post('/scripts', options)
  return normalizeScript(script.data)
}
export const fetchScripts = async () => {
  const scripts = await axios.get('/scripts')
  return normalizeScriptList(scripts.data)
}

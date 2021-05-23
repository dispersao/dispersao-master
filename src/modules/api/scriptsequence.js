import axios from 'axios'
import { normalizeScriptsequence } from '../scriptsequences/schema'

export const createScriptsequence = async (options) => {
  const scriptsequence = await axios.post('/scriptsequences', options)
  return normalizeScriptsequence(scriptsequence.data)
}

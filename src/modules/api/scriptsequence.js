import axios from 'axios'
import { normalizeScriptsequence } from '../scriptsequences/schema'

export const createScriptsequence = async (options) => {
  if (!options.state) {
    options.state = 'idle'
  }
  const scriptsequence = await axios.post('/scriptsequences', options)
  return normalizeScriptsequence(scriptsequence.data)
}

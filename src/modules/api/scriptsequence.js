import axios from 'axios'
import { normalizeScriptsequence, normalizeScriptsequenceList } from '../scriptsequences/schema'

export const createScriptsequence = async (options) => {
  const scriptsequence = await axios.post('/scriptsequences', options)
  return normalizeScriptsequence(scriptsequence.data)
}

export const updateScriptsequence = async (options) => {
  const { id, ...params} = options
  const scriptsequence = await axios.put(`/scriptsequences/${id}`, params)
  return normalizeScriptsequence(scriptsequence.data)
}

export const bulkUpdateScriptsequence = async (scriptsequences) => {
  const scriptsequence = await axios.put(`/scriptsequences/`, scriptsequences)
  return normalizeScriptsequenceList(scriptsequence.data)
}

export const deleteScriptsequence = async (id) => {
  console.log(`/scriptsequences/${id}`)
  const scriptsequence = await axios.delete(`/scriptsequences/${id}`)
  return normalizeScriptsequence(scriptsequence.data)
}

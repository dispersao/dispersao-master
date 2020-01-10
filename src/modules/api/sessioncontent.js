import axios from 'axios'
import { normalizeSessioncontentList } from '../sessioncontents/schema'

export const createSessioncontent = async (content) => {
  const mappedContent = content.map(cont => ({
    ...cont,
    state: cont.state || 'pending'
  }))
  console.log(mappedContent)
  const scriptsequence = await axios.post('/sessioncontents', mappedContent)
  return normalizeSessioncontentList(scriptsequence.data)
}

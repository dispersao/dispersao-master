import axios from 'axios'
import { normalizeSessioncontentList } from '../sessioncontents/schema'

export const createSessioncontent = async (content) => {

  const mappedContent = content.map(cont => ({
    ...cont,
    state: cont.state || 'pending'
  }))
  const sessioncontents = await axios.post('/sessioncontents', mappedContent)
  return normalizeSessioncontentList(sessioncontents.data)
}

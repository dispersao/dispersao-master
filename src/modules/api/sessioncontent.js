import axios from 'axios'
import {
  normalizeSessioncontentList,
  normalizeSessioncontent
} from '../sessioncontents/schema'

export const createSessioncontent = async (content) => {
  const mappedContent = content.map((cont) => ({
    ...cont,
    state: cont.state || 'pending'
  }))
  const sessioncontents = await axios.post('/sessioncontents', mappedContent)
  return normalizeSessioncontentList(sessioncontents.data)
}

export const updateSessioncontent = async (content) => {
  const sessioncontents = await axios.put(
    `/sessioncontents/${content.id}`,
    content
  )
  return normalizeSessioncontent(sessioncontents.data)
}

export const updateSessionContentState = async (content) => {
  const sessioncontents = await axios.put(
    `/sessioncontents/${content.id}/state`,
    content
  )
  return normalizeSessioncontent(sessioncontents.data)
}

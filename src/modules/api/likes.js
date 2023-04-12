import axios from 'axios'
import { normalizeLikeList } from '../likes/schema'

export const fetchSessioncontentLikes = async ({ sessioncontent }) => {
  const likes = await axios.get(`likes/?sessioncontent=${sessioncontent}`)
  return normalizeLikeList(likes.data)
}

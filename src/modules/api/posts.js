import axios from 'axios'
import { normalizePostsList } from '../posts/schema'

export const fetchPosts = async () => {
  const posts = await axios.get('/posts')
  return normalizePostsList(posts.data)
}

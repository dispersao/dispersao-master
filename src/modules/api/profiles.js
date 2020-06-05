import axios from 'axios'
import { normalizeProfileList } from '../profiles/schema'

export const fetchProfiles = async () => {
  const profiles = await axios.get('/profiles')
  return normalizeProfileList(profiles.data)
}

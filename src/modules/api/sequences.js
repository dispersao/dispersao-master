import axios from 'axios'
import { normalizeSequenceList } from '../sequences/schema/'

export const fetchSequences = async () => {
  const seqs = await axios.get('/sequences?_limit=120')

  return normalizeSequenceList(seqs.data)
}

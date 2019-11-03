import axios from 'axios'
import { normalizeSequenceList } from '../../modules/sequences/schema'

export const fetchSequences = async () => {
  const seqs = await axios.get('/sequences')
  return normalizeSequenceList(seqs.data)
}

import ConnectMultifilter from './HOC/ConnectedMultifilter.jsx'
import { getCharactersListAsArray } from '../../characters/selectors'

export default ConnectMultifilter({
  name: 'characters',
  field: 'name',
  options: ['and', 'or', 'exclude'],
  data: 'characters',
  type: null,
  listFunc: getCharactersListAsArray
})

import ConnectMultifilter from './HOC/ConnectedMultifilter.jsx'
import { getTypesListAsArray } from '../../types/selectors'

export default ConnectMultifilter({
  name: 'types',
  field: 'name',
  options: ['or', 'exclude'],
  data: 'type',
  type: null,
  listFunc: getTypesListAsArray
})

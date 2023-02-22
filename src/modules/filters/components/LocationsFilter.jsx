import ConnectMultifilter from './HOC/ConnectedMultifilter.jsx'
import { getLocationListAsArray } from '../../locations/selectors'

export default ConnectMultifilter({
  name: 'locations',
  field: 'name',
  options: ['or', 'exclude'],
  data: 'location',
  type: null,
  listFunc: getLocationListAsArray
})

import { getCategoriesByCategoryType } from '../../categories/selectors'
import ConnectMultifilter from './HOC/ConnectedMultifilter.jsx'

export default ConnectMultifilter({
  name: 'arcs',
  field: 'text',
  options: ['and', 'or', 'exclude'],
  data: 'categories',
  type: 'arc',
  listFunc: getCategoriesByCategoryType
})

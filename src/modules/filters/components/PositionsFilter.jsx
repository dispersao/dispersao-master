
import ConnectMultifilter from './HOC/ConnectedMultifilter.jsx'
import { getCategoriesByCategoryType } from '../../categories/selectors'

export default ConnectMultifilter({
  name: 'positions',
  field: 'text',
  options: ['and', 'or', 'exclude'],
  data: 'categories',
  type: 'pos',
  listFunc: getCategoriesByCategoryType
})

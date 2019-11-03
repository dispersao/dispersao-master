import createCachedSelector from 're-reselect'
import { createSelector } from 'reselect'

const getState = (state) => state.categories
const getCategorieId = (state, props) => props.id

export const getCategoriesList = createSelector(
  [getState], (state) => {
    if (!state) {
      return 
    }
    return state.get('data')
  }
)

export const getCategorieById = createCachedSelector(
  [getCategoriesList, getCategorieId], 
  (list, id) => {
    if (!list || !list.size || !id) {
      return
    }
    return list.get(id.toString())
 
  }
)(getCategorieId)

import createCachedSelector from 're-reselect'
import { createSelector } from 'reselect'

const getState = (state) => state.categories
const getCategoryId = (state, props) => props.id

const getCategoriesIds = (state, props) => props.categories.sort()

export const getCategoriesList = createSelector(
  [getState], (state) => {
    if (!state) {
      return 
    }
    return state.get('data')
  }
)

export const getCategoryById = createCachedSelector(
  [getCategoriesList, getCategoryId], 
  (list, id) => {
    if (!list || !list.size || !id) {
      return
    }
    return list.get(id.toString())
 
  }
)(getCategoryId)

export const getCategoriesByCategoriesIds = createCachedSelector(
  [getCategoriesList, getCategoriesIds],
  (list, ids) => {
    if (!list || !list.size || !ids || !ids.length) {
      return
    }
    return list.filter(cat => ids.includes(cat.get('id')))
  }
)(JSON.stringify(getCategoriesIds))

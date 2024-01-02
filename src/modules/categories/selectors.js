import createCachedSelector from 're-reselect'
import { createSelector } from 'reselect'

const getState = (state) => state.categories
const getCategoryId = (state, props) => props.id
const getCategoryType = (state, props) => props.type

const getCategoriesIds = (state, props) => props.categories.sort()

export const getCategoriesList = createSelector([getState], (state) => {
  if (!state) {
    return
  }
  return state.get('data')
})

export const getCategoriesByCategoryType = createCachedSelector(
  [getCategoriesList, getCategoryType],
  (list, type) => {
    if (!list || !list.size || !type) {
      return
    }
    return list.filter((cat) => cat.get('type') === type).valueSeq().sortBy(cat => {
     const number = parseInt(cat.get('text'))
     if(isNaN(number)) {
       return cat.get('text')
     } else {
       return number
     }
    })
  }
)(getCategoryType)

export const getCategoryById = createCachedSelector(
  [getCategoriesList, getCategoryId],
  (list, id) => {
    if (!list || !list.size || !id) {
      return
    }
    return list.get(id.toString())
  }
)(getCategoryId)



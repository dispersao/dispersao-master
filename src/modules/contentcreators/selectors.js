import createCachedSelector from 're-reselect'
import { createSelector } from 'reselect'

const getState = (state) => state.contentcreators
const getId = (state, props) => props.id
const getContentcreatorId = (state, props) => props.contentcreator

export const getContentcreatorsList = createSelector(
  [getState], (state) => {
    if (!state) {
      return 
    }
    return state.get('data')
  }
)

const fetchContentcreatorById = (list, id) => {
  if (!list || !list.size || !id) {
    return
  }
  return list.get(id.toString())
}

export const getContentcreatorById = createCachedSelector(
  [getContentcreatorsList, getId], fetchContentcreatorById
)(getId)

export const getContentcreatorByContentcreatorId = createCachedSelector(
  [getContentcreatorsList, getContentcreatorId], fetchContentcreatorById
)(getContentcreatorId)

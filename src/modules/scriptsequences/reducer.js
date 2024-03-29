import { fromJS } from 'immutable'

import {
  FETCH_SCRIPTSEQUENCES_SUCCESS,
  CREATE_SCRIPTSEQUENCE_SUCCESS,
  UPDATE_PROGRESS_SCRIPTSEQUENCE,
  UPDATE_SCRIPTSEQUENCE_LOCAL_STATE,
  BULKUPDATE_SCRIPTSEQUENCE_SUCCESS,
  DELETE_SCRIPTSEQUENCE_SUCCESS,
  CREATE_UPDATE_DELETE_SCRIPTSEQUENCES,
  CREATE_UPDATE_DELETE_SCRIPTSEQUENCES_SUCCESS,
  CREATE_UPDATE_DELETE_SCRIPTSEQUENCES_ERROR,
  SEND_SCRIPTSEQUENCE,
  CREATE_RANDOM_SCRIPTSEQUENCE,
  CREATE_SCRIPTSEQUENCE,
  ADD_PLACEHOLDER_SCRIPTSEQUENCE
} from './actions'

import { UPDATE_SCRIPT_SUCCESS } from '../scripts/actions'

let id, progress, filteredList, script

const reducer = (
  state = fromJS({
    data: {},
    error: null,
    loading: false,
    placeholderScriptsequence: null
  }),
  action
) => {
  switch (action.type) {
    case FETCH_SCRIPTSEQUENCES_SUCCESS:
      return state.mergeDeep(
        fromJS({
          error: null,
          data: action.payload.scriptsequences
        })
      )

    case SEND_SCRIPTSEQUENCE:
      return state.mergeDeep(
        fromJS({
          data: {
            [action.payload.scriptsequence.id.toString()]: {
              sentToPlayer: true
            }
          }
        })
      )

    case CREATE_UPDATE_DELETE_SCRIPTSEQUENCES:
    case CREATE_SCRIPTSEQUENCE:
    case CREATE_RANDOM_SCRIPTSEQUENCE:
      return state.merge({
        loading: true
      })

    case CREATE_UPDATE_DELETE_SCRIPTSEQUENCES_SUCCESS:
    case CREATE_UPDATE_DELETE_SCRIPTSEQUENCES_ERROR:
      return state.merge({
        loading: false
      })

    case UPDATE_SCRIPTSEQUENCE_LOCAL_STATE:
      return state.mergeDeep(
        fromJS({
          data: {
            [action.payload.scriptsequence.id.toString()]: {
              ...action.payload.scriptsequence
            }
          }
        })
      )

    case CREATE_SCRIPTSEQUENCE_SUCCESS:
      return state.mergeDeep(
        fromJS({
          loading: false,
          error: null,
          data: action.payload.scriptsequences
        })
      )

    case BULKUPDATE_SCRIPTSEQUENCE_SUCCESS:
      Object.values(action.payload.scriptsequences).forEach(
        (scriptsequence) => {
          state = state.mergeDeep(
            fromJS({
              error: null,
              data: {
                [scriptsequence.id.toString()]: {
                  ...scriptsequence
                }
              }
            })
          )
        }
      )
      return state

    case DELETE_SCRIPTSEQUENCE_SUCCESS:
      console.log()
      return state.deleteIn([
        'data',
        Object.keys(action.payload.scriptsequence)[0].toString()
      ])

    case UPDATE_SCRIPT_SUCCESS:
      script = Object.values(action.payload.script)[0]
      filteredList = state
        .get('data')
        .filter(
          (el) =>
            el.get('script') === script.id &&
            !script.scriptsequences.includes(el.get('id'))
        )
      filteredList.forEach((deleted) => {
        state = state.deleteIn(['data', deleted.get('id').toString()])
      })
      return state

    case UPDATE_PROGRESS_SCRIPTSEQUENCE:
      id = action.payload.scriptsequence.id
      progress = action.payload.scriptsequence.progress
      //return state
      return state.setIn(['data', id.toString(), 'progress'], progress)

    case ADD_PLACEHOLDER_SCRIPTSEQUENCE:
      const placeholderScriptsequence = action.payload.scriptsequence
       
      return state.mergeDeep(
        fromJS({
          placeholderScriptsequence
        })
      )

    default:
      return state
  }
}

export default reducer

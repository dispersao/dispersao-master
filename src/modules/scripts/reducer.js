import { fromJS, List } from 'immutable'

import {
  FETCH_SCRIPTS,
  FETCH_SCRIPTS_SUCCESS,
  FETCH_SCRIPTS_ERROR,
  CREATE_SCRIPT,
  CREATE_SCRIPT_SUCCESS,
  CREATE_SCRIPT_ERROR,
  UPDATE_SCRIPT,
  RESET_SESSION,
  UPDATE_SCRIPT_SUCCESS,
  UPDATE_SCRIPT_ERROR,
  CONNECT_SCRIPT,
  CONNECT_SCRIPT_SUCCESS,
  CONNECT_SCRIPT_ERROR,
  UPDATE_SCRIPT_LOCAL_STATE,
  SET_SCRIPT_MANUAL,
  SET_CURRENTSCRIPT
} from './actions'

import {
  CREATE_SCRIPTSEQUENCE_SUCCESS,
  DELETE_SCRIPTSEQUENCE_SUCCESS
} from '../scriptsequences/actions'

import { CREATE_SESSIONCONTENT_SUCCESS } from '../sessioncontents/actions'

let script

const reducer = (
  state = fromJS({
    data: {},
    current: null,
    synching: false,
    error: null
  }),
  action
) => {
  switch (action.type) {
    case FETCH_SCRIPTS:
    case CREATE_SCRIPT:
      return state.mergeDeep(
        fromJS({
          synching: true
        })
      )

    case FETCH_SCRIPTS_SUCCESS:
      return state.mergeDeep(
        fromJS({
          error: null,
          data: action.payload.scripts,
          synching: false
        })
      )

    case FETCH_SCRIPTS_ERROR:
      return state.mergeDeep(
        fromJS({
          error: action.payload.error,
          synching: false
        })
      )

    case SET_CURRENTSCRIPT:
      return state.setIn(['current'], action.payload.script)

    case UPDATE_SCRIPT:
    case RESET_SESSION:
      return state.mergeDeep(
        fromJS({
          data: {
            [`${action.payload.script.id}`]: {
              synching: true
            }
          }
        })
      )

    case CREATE_SCRIPT_SUCCESS:
      script = action.payload.script
      Object.keys(script).forEach((sc) => {
        script[sc].synching = false
      })

      return state.mergeDeep(
        fromJS({
          error: null,
          data: script,
          synching: false
        })
      )

    case UPDATE_SCRIPT_SUCCESS:
      script = action.payload.script
      Object.keys(script).forEach((sc) => {
        script[sc].synching = false
      })
      return state.mergeWith(
        merger,
        fromJS({
          data: script,
          error: null,
          synching: false
        })
      )

    case SET_SCRIPT_MANUAL:
    case UPDATE_SCRIPT_LOCAL_STATE:
      return state.mergeDeep(
        fromJS({
          data: {
            [action.payload.script.id.toString()]: {
              ...action.payload.script
            }
          }
        })
      )

    case CREATE_SCRIPT_ERROR:
    case UPDATE_SCRIPT_ERROR:
      return state.mergeDeep(
        fromJS({
          error: action.payload.error,
          synching: false
        })
      )

    case CONNECT_SCRIPT:
      return state.mergeDeep(
        fromJS({
          data: {
            [`${action.payload.script.id}`]: {
              connected: 'connecting'
            }
          }
        })
      )

    case CONNECT_SCRIPT_SUCCESS:
      return state.mergeDeep(
        fromJS({
          data: {
            [`${action.payload.script.id}`]: {
              connected: 'connected'
            }
          }
        })
      )

    case CONNECT_SCRIPT_ERROR:
      return state.mergeDeep(
        fromJS({
          data: {
            [`${action.payload.script.id}`]: {
              connected: 'failed'
            }
          }
        })
      )

    case CREATE_SCRIPTSEQUENCE_SUCCESS:
      Object.values(action.payload.scriptsequence).forEach((scriptsequence) => {
        let scriptId = scriptsequence.script
        let newList = state
          .getIn(['data', scriptId.toString(), 'scriptsequences'])
          .push(scriptsequence.id)
        state = state.setIn(
          ['data', scriptId.toString(), 'scriptsequences'],
          newList
        )
      })
      return state

    case DELETE_SCRIPTSEQUENCE_SUCCESS:
      Object.values(action.payload.scriptsequence).forEach((scriptsequence) => {
        let scriptId = scriptsequence.script
        let newList = state
          .getIn(['data', scriptId.toString(), 'scriptsequences'])
          .filter((el) => el !== action.payload.scriptsequence.id)
        state = state.setIn(
          ['data', scriptId.toString(), 'scriptsequences'],
          newList
        )
      })
      return state

    case CREATE_SESSIONCONTENT_SUCCESS:
      Object.values(action.payload.sessioncontents).forEach(
        (sessioncontent) => {
          let scriptId = sessioncontent.script
          let newList = state
            .getIn(['data', scriptId.toString(), 'sessioncontents'])
            .push(sessioncontent.id)
          state = state.setIn(
            ['data', scriptId.toString(), 'sessioncontents'],
            newList
          )
        }
      )
      return state

    default:
      return state
  }
}

export default reducer

const isList = List.isList
const merger = (a, b) => {
  if (a && a.mergeWith && !isList(a) && !isList(b)) {
    return a.mergeWith(merger, b)
  }
  return b
}

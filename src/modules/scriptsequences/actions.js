export const FETCH_SCRIPTSEQUENCES_SUCCESS = 'FETCH_SCRIPTSEQUENCES_SUCCESS'
export const FETCH_SCRIPTSEQUENCES_ERROR = 'FETCH_SCRIPTSEQUENCES_ERROR'

export const CREATE_SCRIPTSEQUENCE = 'CREATE_SCRIPTSEQUENCE'
export const CREATE_SCRIPTSEQUENCE_SUCCESS = 'CREATE_SCRIPTSEQUENCE_SUCCESS'
export const CREATE_SCRIPTSEQUENCE_ERROR = 'CREATE_SCRIPTSEQUENCE_ERROR'

export const CREATE_RANDOM_SCRIPTSEQUENCE = 'CREATE_RANDOM_SCRIPTSEQUENCE'
export const CREATE_RANDOM_SCRIPTSEQUENCE_SUCCESS = 'CREATE_RANDOM_SCRIPTSEQUENCE_SUCCESS'
export const CREATE_RANDOM_SCRIPTSEQUENCE_ERROR = 'CREATE_RANDOM_SCRIPTSEQUENCE_ERROR'

export const SEND_SCRIPTSEQUENCE = 'SEND_SCRIPTSEQUENCE'
export const UPDATE_PROGRESS_SCRIPTSEQUENCE = 'UPDATE_PROGRESS_SCRIPTSEQUENCE'

export const UPDATE_SCRIPTSEQUENCE_LOCAL_STATE = 'UPDATE_SCRIPTSEQUENCE_LOCAL_STATE'


export const fetchScriptsequencesSuccess = (scriptsequences) => ({
  type: FETCH_SCRIPTSEQUENCES_SUCCESS,
  payload: {
    scriptsequences
  }
})

export const fetchScriptsequencesError = (error) => ({
  type: FETCH_SCRIPTSEQUENCES_ERROR,
  payload: {
    error
  }
})

export const createScriptsequence = (scriptsequence) => ({
  type: CREATE_SCRIPTSEQUENCE,
  payload: {
    scriptsequence
  }
})

export const createScriptsequenceSuccess = (scriptsequence) => {
  return {
    type: CREATE_SCRIPTSEQUENCE_SUCCESS,
    payload: {
      scriptsequence
    }
  }
}


export const createScriptsequenceError = (error) => ({
  type: CREATE_SCRIPTSEQUENCE_ERROR,
  payload: {
    error
  }
})

export const createRandomScriptsequence = (script) => ({
  type: CREATE_RANDOM_SCRIPTSEQUENCE,
  payload: {
    script
  }
})

export const sendScriptsequence = (scriptsequence) => ({
  type: SEND_SCRIPTSEQUENCE,
  payload: {
    scriptsequence
  }
})

export const updateProgressScriptsequence = (scriptsequence) => ({
  type: UPDATE_PROGRESS_SCRIPTSEQUENCE,
  payload: {
    scriptsequence
  }
})

export const updateScriptsequenceLocalState = (scriptsequence) => ({
  type: UPDATE_SCRIPTSEQUENCE_LOCAL_STATE,
  payload: {
    scriptsequence
  }
})

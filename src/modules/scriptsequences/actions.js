export const CREATE_SCRIPTSEQUENCE = 'CREATE_SCRIPTSEQUENCE'
export const CREATE_SCRIPTSEQUENCE_SUCCESS = 'CREATE_SCRIPTSEQUENCE_SUCCESS'
export const CREATE_SCRIPTSEQUENCE_ERROR = 'CREATE_SCRIPTSEQUENCE_ERROR'

export const createScriptsequence = (scriptsequence) => ({
  type: CREATE_SCRIPTSEQUENCE,
  payload: {
    scriptsequence
  }
})

export const createScriptsequenceSuccess = (scriptsequence) => ({
  type: CREATE_SCRIPTSEQUENCE_SUCCESS,
  payload: {
    scriptsequence
  }
})


export const createScriptsequenceError = (error) => ({
  type: CREATE_SCRIPTSEQUENCE_SUCCESS,
  payload: {
    error
  }
})

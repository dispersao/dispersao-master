export const FETCH_SCRIPTSEQUENCES_SUCCESS = 'FETCH_SCRIPTSEQUENCES_SUCCESS'
export const FETCH_SCRIPTSEQUENCES_ERROR = 'FETCH_SCRIPTSEQUENCES_ERROR'

export const CREATE_SCRIPTSEQUENCE = 'CREATE_SCRIPTSEQUENCE'
export const CREATE_SCRIPTSEQUENCE_SUCCESS = 'CREATE_SCRIPTSEQUENCE_SUCCESS'
export const CREATE_SCRIPTSEQUENCE_ERROR = 'CREATE_SCRIPTSEQUENCE_ERROR'

export const UPDATE_SCRIPTSEQUENCE = 'UPDATE_SCRIPTSEQUENCE'
export const UPDATE_SCRIPTSEQUENCE_SUCCESS = 'UPDATE_SCRIPTSEQUENCE_SUCCESS'
export const UPDATE_SCRIPTSEQUENCE_ERROR = 'UPDATE_SCRIPTSEQUENCE_ERROR'

export const BULKUPDATE_SCRIPTSEQUENCE = 'BULKUPDATE_SCRIPTSEQUENCE'
export const BULKUPDATE_SCRIPTSEQUENCE_SUCCESS = 'BULKUPDATE_SCRIPTSEQUENCE_SUCCESS'
export const BULKUPDATE_SCRIPTSEQUENCE_ERROR = 'BULKUPDATE_SCRIPTSEQUENCE_ERROR'

export const DELETE_SCRIPTSEQUENCE = 'DELETE_SCRIPTSEQUENCE'
export const DELETE_SCRIPTSEQUENCE_SUCCESS = 'DELETE_SCRIPTSEQUENCE_SUCCESS'
export const DELETE_SCRIPTSEQUENCE_ERROR = 'DELETE_SCRIPTSEQUENCE_ERROR'

export const CREATE_UPDATE_DELETE_SCRIPTSEQUENCES ='CREATE_UPDATE_DELETE_SCRIPTSEQUENCES'
export const CREATE_UPDATE_DELETE_SCRIPTSEQUENCES_SUCCESS ='CREATE_UPDATE_DELETE_SCRIPTSEQUENCES_SUCCESS'
export const CREATE_UPDATE_DELETE_SCRIPTSEQUENCES_ERROR ='CREATE_UPDATE_DELETE_SCRIPTSEQUENCES_ERROR'


export const CREATE_RANDOM_SCRIPTSEQUENCE = 'CREATE_RANDOM_SCRIPTSEQUENCE'
export const CREATE_RANDOM_SCRIPTSEQUENCE_SUCCESS = 'CREATE_RANDOM_SCRIPTSEQUENCE_SUCCESS'
export const CREATE_RANDOM_SCRIPTSEQUENCE_ERROR = 'CREATE_RANDOM_SCRIPTSEQUENCE_ERROR'

export const SEND_SCRIPTSEQUENCE = 'SEND_SCRIPTSEQUENCE'
export const UPDATE_PROGRESS_SCRIPTSEQUENCE = 'UPDATE_PROGRESS_SCRIPTSEQUENCE'

export const UPDATE_SCRIPTSEQUENCE_LOCAL_STATE = 'UPDATE_SCRIPTSEQUENCE_LOCAL_STATE'

export const ADD_PLACEHOLDER_SCRIPTSEQUENCE = 'ADD_PLACEHOLDER_SCRIPTSEQUENCE'

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

export const createScriptsequenceSuccess = (scriptsequences) => {
  return {
    type: CREATE_SCRIPTSEQUENCE_SUCCESS,
    payload: {
      scriptsequences
    }
  }
}


export const createScriptsequenceError = (error) => ({
  type: CREATE_SCRIPTSEQUENCE_ERROR,
  payload: {
    error
  }
})

export const updateScriptsequence = (scriptsequence) => ({
  type: UPDATE_SCRIPTSEQUENCE,
  payload: {
    scriptsequence
  }
})

export const updateScriptsequenceSuccess = (scriptsequence) => ({
  type: UPDATE_SCRIPTSEQUENCE_SUCCESS,
  payload: {
    scriptsequence
  }
})

export const updateScriptsequenceError = (error) => ({
  type: UPDATE_SCRIPTSEQUENCE_ERROR,
  payload: {
    error
  }
})

export const deleteScriptsequence = (scriptsequence) => ({
  type: DELETE_SCRIPTSEQUENCE,
  payload: {
    scriptsequence
  }
})

export const deleteScriptsequenceSuccess = (scriptsequence) => ({
  type: DELETE_SCRIPTSEQUENCE_SUCCESS,
  payload: {
    scriptsequence
  }
})

export const deleteScriptsequenceError = (error) => ({
  type: DELETE_SCRIPTSEQUENCE_ERROR,
  payload: {
    error
  }
})

export const createUpdateDeleteScriptsequences = (ssequencesToCreate, ssequencesToUpdate, ssequencesToDelete) => ({
  type: CREATE_UPDATE_DELETE_SCRIPTSEQUENCES,
  payload: {
    create: ssequencesToCreate,
    update: ssequencesToUpdate,
    delete: ssequencesToDelete
  }
})

export const createUpdateDeleteScriptsequencesSuccess = () => ({
  type: CREATE_UPDATE_DELETE_SCRIPTSEQUENCES_SUCCESS,
  payload: {
    
  }
})

export const createUpdateDeleteScriptsequencesError = (error) => ({
  type: CREATE_UPDATE_DELETE_SCRIPTSEQUENCES_ERROR,
  payload: {
    error
  }
})


export const bulkupdateScriptsequence = (scriptsequences) => ({
  type: BULKUPDATE_SCRIPTSEQUENCE,
  payload: {
    scriptsequences
  }
})

export const bulkupdateScriptsequenceSuccess = (scriptsequences) => ({
  type: BULKUPDATE_SCRIPTSEQUENCE_SUCCESS,
  payload: {
    scriptsequences
  }
})

export const bulkupdateScriptsequenceError = (error) => ({
  type: BULKUPDATE_SCRIPTSEQUENCE_ERROR,
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

export const addPlaceholderScriptsequence = (scriptsequence) => ({
  type: ADD_PLACEHOLDER_SCRIPTSEQUENCE,
  payload: {
    scriptsequence
  }
})

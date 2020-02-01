export const FETCH_SESSIONCONTENTS_SUCCESS = 'FETCH_SESSIONCONTENTS_SUCCESS'
export const FETCH_SESSIONCONTENTS_ERROR = 'FETCH_SESSIONCONTENTS_ERROR'

export const CREATE_RANDOM_SESSIONCONTENT = 'CREATE_RANDOM_SESSIONCONTENT'

export const CREATE_SESSIONCONTENT = 'CREATE_SESSIONCONTENT'
export const CREATE_SESSIONCONTENT_SUCCESS = 'CREATE_SESSIONCONTENT_SUCCESS'
export const CREATE_SESSIONCONTENT_ERROR = 'CREATE_SESSIONCONTENT_ERROR'

export const UPDATE_SESSIONCONTENT = 'UPDATE_SESSIONCONTENT'
export const UPDATE_SESSIONCONTENT_SUCCESS = 'UPDATE_SESSIONCONTENT_SUCCESS'
export const UPDATE_SESSIONCONTENT_ERROR = 'UPDATE_SESSIONCONTENT_ERROR'

export const fetchSessioncontentsSuccess = (sessioncontents) => ({
  type: FETCH_SESSIONCONTENTS_SUCCESS,
  payload: {
    sessioncontents
  }
})

export const fetchSessioncontentsError = (error) => ({
  type: FETCH_SESSIONCONTENTS_ERROR,
  payload: {
    error
  }
})

export const createRandomSessioncontent = (script) => ({
  type: CREATE_RANDOM_SESSIONCONTENT,
  payload: {
    script
  }
})

export const createSessioncontent = (sessioncontents) => ({
  type: CREATE_SESSIONCONTENT,
  payload: {
    sessioncontents
  }
})

export const createSessioncontentSuccess = (sessioncontents) => ({
  type: CREATE_SESSIONCONTENT_SUCCESS,
  payload: {
    sessioncontents
  }
})

export const createSessioncontentError = (error) => ({
  type: CREATE_SESSIONCONTENT_ERROR,
  payload: {
    error
  }
})

export const updateSessioncontent = (sessioncontents) => ({
  type: UPDATE_SESSIONCONTENT,
  payload: {
    sessioncontents
  }
})

export const updateSessioncontentSuccess = (sessioncontents) => ({
  type: UPDATE_SESSIONCONTENT_SUCCESS,
  payload: {
    sessioncontents
  }
})

export const updateSessioncontentError = (error) => ({
  type: UPDATE_SESSIONCONTENT_ERROR,
  payload: {
    error
  }
})

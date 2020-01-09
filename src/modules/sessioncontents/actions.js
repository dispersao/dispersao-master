export const FETCH_SESSIONCONTENTS_SUCCESS = 'FETCH_SESSIONCONTENTS_SUCCESS'
export const FETCH_SESSIONCONTENTS_ERROR = 'FETCH_SESSIONCONTENTS_ERROR'

export const CREATE_RANDOM_SESSIONCONTENT = 'CREATE_RANDOM_SESSIONCONTENT'


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

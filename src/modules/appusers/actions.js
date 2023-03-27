export const FETCH_APPUSERS= 'FETCH_APPUSERS'
export const FETCH_APPUSERS_SUCCESS = 'FETCH_APPUSERS_SUCCESS'
export const FETCH_APPUSERS_ERROR = 'FETCH_APPUSERS_ERROR'
export const STOP_FETCH_APPUSERS = 'STOP_FETCH_APPUSERS'


export const fetchAppusers = (script) => ({
  type: FETCH_APPUSERS,
  payload:{
    script
  }
})

export const fetchAppUsersSuccess = (appusers) => ({
  type: FETCH_APPUSERS_SUCCESS,
  payload:appusers
})

export const fetchAppusersError = (error) => ({
  type: FETCH_APPUSERS_ERROR,
  payload:{
    error
  }
})

export const stopFetchAppusers = () => ({
  type: STOP_FETCH_APPUSERS,
  payload: {}
})




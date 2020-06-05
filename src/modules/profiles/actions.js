export const FETCH_PROFILES = "FETCH_PROFILES"
export const FETCH_PROFILES_SUCCESS = "FETCH_PROFILES_SUCCESS"
export const FETCH_PROFILES_ERROR = "FETCH_PROFILES_ERROR"

export const fetchProfiles = () => ({
  type: FETCH_PROFILES,
})

export const fetchProfilesSuccess = (profiles) => ({
  type: FETCH_PROFILES_SUCCESS,
  payload: {
    profiles
  }
})

export const fetchProfilesError = (error) => ({
  type: FETCH_PROFILES_ERROR,
  payload: {
    error
  }
})


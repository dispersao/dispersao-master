export const FETCH_CONFIG = "FETCH_CONFIG"
export const FETCH_CONFIG_SUCCESS = "FETCH_CONFIG_SUCCESS"
export const FETCH_CONFIG_ERROR = "FETCH_CONFIG_ERROR"

export const fetchConfig = () => ({
  type: FETCH_CONFIG
})

export const fetchConfigSuccess = (payload) => ({
  type: FETCH_CONFIG_SUCCESS,
  payload
})

export const fetchConfigError = (payload) => ({
  type: FETCH_CONFIG_ERROR,
  payload
})

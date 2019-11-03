import { createSelector } from 'reselect'

const getState = (state) => state.config

const getData = createSelector(
  [getState], (config) => {
    if (!config) {
      return
    }
    return config.get('data')
  }
)

export const getError = createSelector(
  [getState], (config) => {
    if (!config) {
      return
    }
    return config.get('error')
  }
)
const getApiConfig = createSelector(
  [getData], (data) => {
    if (!data || !data.size) {
      return
    }
    return data.get('api')
  }
)

export const getToken = createSelector(
  [getApiConfig], (apiData) => {
    if (!apiData || !apiData.size) {
      return
    }
    return apiData.get('token')
  }
)

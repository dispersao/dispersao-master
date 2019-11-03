export const FETCH_TYPE_SUCCESS = "FETCH_TYPE_SUCCESS"

export const fetchTypesSuccess = (types) => ({
  type: FETCH_TYPE_SUCCESS,
  payload: {
    types
  }
})

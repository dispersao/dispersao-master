export const FETCH_CONTENTCREATORS_SUCCESS = "FETCH_CONTENTCREATORS_SUCCESS"

export const fetchContentcreatorsSuccess = (contentcreators) => ({
  type: FETCH_CONTENTCREATORS_SUCCESS,
  payload: {
    contentcreators
  }
})

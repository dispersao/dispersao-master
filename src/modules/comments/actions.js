export const FETCH_COMMENTS_SUCCESS = "FETCH_COMMENTS_SUCCESS"

export const fetchCommentsSuccess = (comments) => ({
  type: FETCH_COMMENTS_SUCCESS,
  payload: {
    comments
  }
})

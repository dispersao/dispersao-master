export const FETCH_LIKES = 'FETCH_LIKES'
export const FETCH_LIKES_SUCCESS = 'FETCH_LIKES_SUCCESS'
export const FETCH_LIKES_ERROR = 'FETCH_LIKES_ERROR'
export const STOP_FETCH_LIKES = 'STOP_FETCH_LIKES'

export const fetchLikes = () => ({
  type: FETCH_LIKES,
  payload: {
  }
})

export const fetchLikesSuccess = (likes) => ({
  type: FETCH_LIKES_SUCCESS,
  payload: likes
})

export const fetchLikesError = (error) => ({
  type: FETCH_LIKES_ERROR,
  payload: {
    error
  }
})

export const stopFetchLikes = () => ({
  type: STOP_FETCH_LIKES,
  payload: {}
})


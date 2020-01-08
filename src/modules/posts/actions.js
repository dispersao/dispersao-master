export const FETCH_POSTS = 'FETCH_POSTS'
export const FETCH_POSTS_SUCCESS = 'FETCH_POSTS_SUCCESS'
export const FETCH_POSTS_ERROR = 'FETCH_POSTS_ERROR'

export const fetchPosts = () => ({
  type: FETCH_POSTS,
})

export const fetchPostsSuccess = (posts) => ({
  type: FETCH_POSTS_SUCCESS,
  payload: {
    posts
  }
})

export const fetchPostsError = (error) => ({
  type: FETCH_POSTS_ERROR,
  payload: {
    error
  }
})

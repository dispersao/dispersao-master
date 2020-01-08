import { createSelector } from 'reselect'

import { getContentcreatorsList } from '../contentcreators/selectors'
import { getCommentsList } from '../comments/selectors'

import { getApiUrl } from '../config/selectors'

const getState = (state) => state.posts

const getPosts = createSelector(
  [getState], (state) => {
    if (!state) {
      return 
    }
    return state.get('data')
  }
)

export const getPostList = createSelector(
  [getPosts], (posts) => {
    if (!posts) {
      return 
    }
    return posts.valueSeq()
  }
)

export const getPostsListNotInSession = createSelector(
  [getPosts, getCommentsList, getContentcreatorsList, getApiUrl],
  (posts, comments, contentcreators, url) => {
    if (!posts || !posts.size || !comments || !comments.size || !contentcreators || !contentcreators.size || !url) {
      return
    }
    return posts
      .valueSeq()
      .sort(sortPosts)
      .map(post => formatPost(post, comments, contentcreators, url))
  }
)

const sortPosts = (a, b) => {
  return a.get('id') < b.get('id') ? -1 : (a.get('id') > b.get('id') ? 1 : 0)
}

const formatPost = (post, commentsList, contentcreatorsList, url) => {
  const contentcreator = contentcreatorsList.get(
    post.get('contentcreator').toString()
  )

  let media = post.get('media')
  if (media) {
    media = media.setIn(['url'], `${url}/${media.get('url')}`)
  }

  const comments = post.get('comments').map(com => {
    const comment = commentsList.get(com.toString())
    return comment.mergeDeep({
      contentcreator: contentcreatorsList.get(comment.get('contentcreator').toString())
    })
  })
  // console.log(comments.toJS(), post.get('comments').toJS(), commentsList.toJS())
  return post.setIn(['comments'], comments)
    .mergeDeep({
      contentcreator,
      media
    })
}

import { createSelector } from 'reselect'
import createCachedSelector from 're-reselect'

import { fromJS, List } from 'immutable'

import { sortEntity } from '../../utils/listUtils'

import { getContentcreatorsList } from '../contentcreators/selectors'
import { getCommentsList } from '../comments/selectors'
import { getCategoriesList } from '../categories/selectors'

import { getApiUrl } from '../config/selectors'

const getState = (state) => state.posts
const getId = (state, props) => props.id
const getPostId = (state, props) => props.post

export const getPosts = createSelector(
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

export const getPostsListFormatted = createSelector(
  [getPosts, getCategoriesList, getContentcreatorsList],
  (posts, categories, contentcreators) => {
  
    const lists = [posts, categories, contentcreators]
    const anyEmpty = lists.some(list => !list || !list.size)

    if (anyEmpty) {
      return
    }

    return posts
      .valueSeq()
      .sort(sortEntity)
      .map(post => formatPostForAlgorithm(
        post, 
        contentcreators, 
        categories
      ))
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
      .sort(sortEntity)
      .map(post => formatPost(post, comments, contentcreators, url))
  }
)

const fetchPostById = (list, id) => {
  if (!list || !list.size || !id) {
    return
  }
  return list.get(id.toString())
}

export const getPostById = createCachedSelector(
  [getPostList, getId], fetchPostById
)(getId)

export const getPostByPostId = createCachedSelector(
  [getPostList, getPostId], fetchPostById
)(getPostId)

export const getPostByPostIdFormatted = createCachedSelector(
  [getPostId, getPosts, getCommentsList, getContentcreatorsList, getApiUrl], 
  (id, posts, comments, contentcreators, url) => {
    if (!id || !posts || !posts.size || !comments || !comments.size || !contentcreators || !contentcreators.size || !url) {
      return
    }
    return formatPost()
  }
)(getPostId)


export const formatPost = (post, commentsList, contentcreatorsList, url) => {
  const contentcreator = contentcreatorsList.get(
    post.get('contentcreator').toString()
  )

  let media = post.get('media')
  if (media && url) {
    media = media.setIn(['url'], `${url}/${media.get('url')}`)
  }

  const comments = post.get('comments')
    .map(com => commentsList.get(com.toString()))
    .filter(Boolean)
    .map(comment => {
      return comment.mergeDeep({
        contentcreator: contentcreatorsList.get(comment.get('contentcreator').toString())
      })
    })
  return post.setIn(['comments'], comments)
    .mergeDeep(fromJS({
      contentcreator,
      media
    }))
}

const formatPostForAlgorithm = (post, contentcreatorsList, categoriesList) => {
  const contentcreator = contentcreatorsList.get(
    post.get('contentcreator').toString()
  )

  const categories = post.get('categories').map(catId => {
    return categoriesList.get(catId.toString())
  })

  return post
    .setIn(['categories'], List(categories))
    .setIn(['contentcrator'], fromJS(contentcreator))
}

import { createSelector } from 'reselect'
import createCachedSelector from 're-reselect'

import { fromJS, List } from 'immutable'

import { sortEntity } from '../../utils/listUtils'

import { getContentcreatorsList } from '../contentcreators/selectors'
import { getCommentsList } from '../comments/selectors'
import { getCategoriesList } from '../categories/selectors'

import { getApiUrl } from '../config/selectors'
import { createArraySelector } from '../../utils/selectorUtils'

const getState = (state) => state.posts
const getId = (state, props) => props.id
const getPostId = (state, props) => props.post
const getCurrentScriptId = (state) => state.scripts.get('current')
const getSessioncontents = (state) => state.sessioncontents.get('data')

export const getPosts = createSelector([getState], (state) => {
  if (!state) {
    return
  }
  return state.get('data')
})

export const getPostsIds = createArraySelector([getPosts], (posts) => {
  if (!posts) {
    return
  }
  return posts.map((post) => post.get('id')).valueSeq()
})

export const getPostContentcreatorByPostId = createCachedSelector(
  [getId, getPosts, getContentcreatorsList],
  (id, posts, contentcreators) => {
    if (!id || !posts || !contentcreators) {
      return
    }
    return contentcreators.get(
      posts.get(id.toString()).get('contentcreator').toString()
    )
  }
)(getId)

export const getPostCommentsIdsById = createCachedSelector(
  [getId, getCommentsList],
  (id, comments) => {
    if (!id || !comments) {
      return
    }
    return comments
      .filter((comment) => comment.get('post').toString() === id.toString())
      .map((el) => el.get('id'))
  }
)(getId)

export const isPostPublished = createCachedSelector(
  [getId, getCurrentScriptId, getSessioncontents, getPosts, getCommentsList],
  (id, script, sessioncontents) => {
    if (!id || !script || !sessioncontents) {
      return
    }
    return Boolean(
      sessioncontents.find(
        (sescon) =>
          sescon.get('script').toString() === script.toString() &&
          sescon.get('post') &&
          sescon.get('post').toString() === id.toString()
      )
    )
  }
)(getId)

export const getPostPublishedComment = createCachedSelector(
  [ getCurrentScriptId, getSessioncontents, getPostCommentsIdsById],
  (script, sessioncontents, comments) => {
    if ( !script || !sessioncontents || !comments) {
      return
    }
   
    return comments.filter((comment) => {
      return sessioncontents.find(
        (sescon) =>
          sescon.get('script').toString() === script.toString() &&
          sescon.get('comment') &&
          sescon.get('comment').toString() === comment.toString()
      )
    })
  }
)(getId)

export const isPostFullyPublished = createCachedSelector(
  [getId, getCurrentScriptId, getSessioncontents, getPosts, getCommentsList],
  (id, script, sessioncontents, posts, comments) => {
    if (!id || !script || !sessioncontents || !posts || !comments) {
      return
    }

    const postSessioncontent = sessioncontents.find(
      (sescon) =>
        sescon.get('script').toString() === script.toString() &&
        sescon.get('post') &&
        sescon.get('post').toString() === id.toString()
    )

    if (postSessioncontent) {
      const postComments = comments
        .filter((comment) => comment.get('post').toString() === id.toString())
        .map((comment) => comment.get('id'))
      return postComments.every((comment) =>
        sessioncontents.find(
          (sescon) =>
            sescon.get('script').toString() === script.toString() &&
            sescon.get('comment') &&
            sescon.get('comment').toString() === comment.toString()
        )
      )
    } else {
      return false
    }
  }
)(getId)

//--------------------------------

export const getPostList = createSelector([getPosts], (posts) => {
  if (!posts) {
    return
  }
  return posts.valueSeq()
})

export const getPostsListFormatted = createSelector(
  [getPosts, getCategoriesList, getContentcreatorsList],
  (posts, categories, contentcreators) => {
    const lists = [posts, categories, contentcreators]
    const anyEmpty = lists.some((list) => !list || !list.size)

    if (anyEmpty) {
      return
    }

    return posts
      .valueSeq()
      .sort(sortEntity)
      .map((post) => formatPostForAlgorithm(post, contentcreators, categories))
  }
)

const fetchPostById = (list, id) => {
  if (!list || !id) {
    return
  }
  return list.get(id.toString())
}

export const getPostById = createCachedSelector(
  [getPosts, getId],
  fetchPostById
)(getId)

export const getPostByPostId = createCachedSelector(
  [getPostList, getPostId],
  fetchPostById
)(getPostId)

export const getPostByPostIdFormatted = createCachedSelector(
  [getPostId, getPosts, getCommentsList, getContentcreatorsList, getApiUrl],
  (id, posts, comments, contentcreators, url) => {
    if (
      !id ||
      !posts ||
      !posts.size ||
      !comments ||
      !contentcreators ||
      !contentcreators.size ||
      !url
    ) {
      return
    }
    return formatPost(posts.get(id.toString()), comments, contentcreators, url)
  }
)(getPostId)

export const formatPost = (post, commentsList, contentcreatorsList, url) => {
  const contentcreator = contentcreatorsList.get(
    post.get('contentcreator').toString()
  )

  let media = post.get('media')
  if (media && url) {
    media = media.setIn(['url'], `${url}${media.get('url')}`)
  }

  const comments = post
    .get('comments')
    .map((com) => commentsList.get(com.toString()))
    .filter(Boolean)
    .map((comment) => {
      return comment.mergeDeep({
        contentcreator: contentcreatorsList.get(
          comment.get('contentcreator').toString()
        )
      })
    })
  return post.setIn(['comments'], comments).mergeDeep(
    fromJS({
      contentcreator,
      media
    })
  )
}

const formatPostForAlgorithm = (post, contentcreatorsList, categoriesList) => {
  const contentcreator = contentcreatorsList.get(
    post.get('contentcreator').toString()
  )

  const categories = post.get('categories').map((catId) => {
    return categoriesList.get(catId.toString())
  })

  return post
    .setIn(['categories'], List(categories))
    .setIn(['contentcrator'], fromJS(contentcreator))
}

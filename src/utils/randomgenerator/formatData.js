import map from 'lodash/map'
import last from 'lodash/last'

export const getPlayedUnplayedSequencesFormated = (scriptMap, sequencesList) => {
  const script = scriptMap.toJS()
  const sequences = sequencesList.toJS()

  const scriptSequencesIds = script.scriptsequences.map(scr => scr.sequence.id)

  const scriptSequences = sequences.filter(seq => scriptSequencesIds.includes(seq.id))
  const availableSequences = sequences.filter(seq => !scriptSequencesIds.includes(seq.id))

  return {
    scriptSequences,
    availableSequences
  }
}

export const getPublishedUnpublishedContentFormated = (scriptMap, postsList, comentsList) => {
  const script = scriptMap.toJS()
  const posts = postsList.toJS()
  const comments = comentsList.toJS()

  const currentSequence = script.scriptsequences.length && last(script.scriptsequences).sequence

  const publishedPostsIds = script.sessioncontents
    .map(sescon => sescon.post)
    .filter(Boolean)

  const publishedCommentsIds = script.sessioncontents
    .map(sescon => sescon.comment)
    .filter(Boolean)

  const scriptPosts = posts.filter(post => publishedPostsIds.includes(post.id))
  const unpublishedPosts = posts.filter(post => !publishedPostsIds.includes(post.id))

  const scriptComments = comments.filter(comm => publishedCommentsIds.includes(comm.id))
  const unpublishedComments = comments.filter(comm => !publishedCommentsIds.includes(comm.id))

  return {
    script: {
      id: script.id,
      totalTime: script.totalTime,
      averageSeconds: script.averageSeconds,
      lastPosition: script.scriptsequences[script.scriptsequences.length - 1].position,
      currentSequence
    },
    scriptContent: {
      posts: scriptPosts,
      comments: scriptComments,
    },
    availableContent: {
      posts: unpublishedPosts,
      comments: unpublishedComments
    }
  }
}

export const getCategoriesByType = (categoriesList, type) => {
  return categoriesList.filter(cat => cat.type === type)
}

export const getEntityCategoriesByType = (entity, type) => {
  if (!entity || !entity.categories) {
    return
  }
  return getCategoriesByType(entity.categories, type)
}

export const mapCategoryToText = (categoriesList) => {
  return map(categoriesList, 'text')
}

export const getSequenceInPosition = (sequences, position) => {
  if (position < 0) {
    return sequences[sequences.length + position]
  } else {
    sequences[position]
  }
}

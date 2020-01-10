export const filterSessioncontent = (sessionContent, availableContent) => {
  const filteredComments = availableContent.comments.filter(comment => {
    return sessionContent.posts.map(post => post.id).includes(comment.post)
  })
  return {
    ...availableContent,
    comments: filteredComments
  }
}

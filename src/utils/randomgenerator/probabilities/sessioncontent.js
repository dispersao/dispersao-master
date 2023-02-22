
import { shuffle } from 'lodash'


 

export const getRandomSessiontontents = (script, scriptContent, availableContent) => {
  const contentList = shuffle(availableContent.posts.concat(availableContent.comments))

  if (!contentList.length) {
    return []
  }
  console.log('getRandomSessiontontents', contentList)

  const totalTime = script.totalTime
  const currentSequence = script.currentSequence

  const seed = Math.floor(Math.random() * contentList.length)
  
  const content = contentList[seed]
  const post = availableContent.posts.includes(content) ? content.id : null
  const comment = availableContent.comments.includes(content) ? content.id : null

  return [
    {
      programmed_at: Math.floor(totalTime - (currentSequence.duration / 2)),
      script: script.id,
      post,
      comment,
      state: 'pending'
    }
  ]
}

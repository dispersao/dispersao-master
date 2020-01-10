
import { shuffle } from 'lodash'

// const CONTENT_INTERVAL = 120
// const CONTENT_MARGIN_START = 300
// const CONTENT_MARGIN_END = 300
 

export const getRandomSessiontontents = (script, scriptContent, availableContent) => {
  const contentList = shuffle(availableContent.posts.concat(availableContent.comments))

  if (!contentList.length) {
    return []
  }
  const totalTime = script.totalTime
  // const position = script.lastPosition
  // const fullLength = script.averageSeconds
  const currentSequence = script.currentSequence

  const seed = Math.floor(Math.random() * contentList.length)
  const content = contentList[seed]
  const post = availableContent.posts.includes(content) ? content.id : null
  const comment = availableContent.comments.includes(content) ? content.id : null

  console.log(script)
  return [
    {
      programmed_at: Math.floor(totalTime - (currentSequence.duration / 2)),
      script: script.id,
      post,
      comment
    }
  ]

  // const afterMarginStart = totalTime > CONTENT_MARGIN_START
  // const beforeMarginEnd = totalTime - currentSequence.duration < fullLength

  // if (afterMarginStart && beforeMarginEnd) {
    
  // }
}

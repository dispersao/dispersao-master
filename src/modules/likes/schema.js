import { schema } from 'normalizr'
import { normalize } from 'normalizr'


const likeSchema = new schema.Entity('likes')

export const likesListSchema = [likeSchema]

export const normalizeLike = (data) => {
  return normalize(data, likeSchema)
}

export const normalizeLikeList = (data) => {
  return normalize(data, likesListSchema)
}

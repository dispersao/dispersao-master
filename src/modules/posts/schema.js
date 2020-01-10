import { schema, normalize } from 'normalizr'
import categorySchema from '../categories/schema'
import contentcreatorSchema from '../contentcreators/schema'
import commentSchema from '../comments/schema'

export const postSchema = new schema.Entity('posts', {
  categories: [categorySchema],
  contentcreator: contentcreatorSchema,
  comments: [commentSchema]
})

export const postsListSchema = [postSchema]

export const normalizePostsList = data => normalize(data, postsListSchema)


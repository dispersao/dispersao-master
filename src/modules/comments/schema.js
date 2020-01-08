import { schema } from 'normalizr'
import contentcreatorSchema from '../contentcreators/schema'

const commentSchema = new schema.Entity('comments', {
  contentcreator: contentcreatorSchema
})

export default commentSchema

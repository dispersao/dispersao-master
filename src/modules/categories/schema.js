import { schema } from 'normalizr'
import characterSchema from '../characters/schema'

const categorySchema = new schema.Entity('categories', {
  characters: [characterSchema]
})

export default categorySchema

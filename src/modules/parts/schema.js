import { schema } from 'normalizr'
import characterSchema from '../characters/schema'

const partSchema = new schema.Entity('parts', {
  characters: [characterSchema]
})

export default partSchema

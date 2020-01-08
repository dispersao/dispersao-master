import { schema } from 'normalizr'

import characterSchema from '../characters/schema'

const contentcreatorSchema = new schema.Entity('contentcreators', {
  character: characterSchema,
})

export default contentcreatorSchema

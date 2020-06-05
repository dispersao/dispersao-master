import { schema, normalize } from 'normalizr'
import contentcreatorSchema from '../contentcreators/schema'


export const profileSchema = new schema.Entity('profiles', {
  contentcreator: contentcreatorSchema,
})

export const profileListSchema = [profileSchema]

export const normalizeProfileList = data => normalize(data, profileListSchema)

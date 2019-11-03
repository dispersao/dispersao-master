import { schema, normalize } from 'normalizr'
import characterSchema from '../characters/schema'
import categorySchema from '../categories/schema'

const locationSchema = new schema.Entity('locations')

const typeSchema = new schema.Entity('types')

const partSchema = new schema.Entity('parts', {
  characters: [characterSchema]
})

export const sequenceSchema = new schema.Entity('sequences', {
  location: locationSchema,
  type: typeSchema,
  parts: [partSchema],
  categories: [categorySchema]
})

export const sequencesListSchema = [sequenceSchema]

export const normalizeSequenceList = data => normalize(data, sequencesListSchema)


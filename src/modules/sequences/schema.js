import { schema, normalize } from 'normalizr'
import partSchema from '../parts/schema'
import categorySchema from '../categories/schema'
import locationSchema from '../locations/schema'
import typeSchema from '../types/schema'

export const sequenceSchema = new schema.Entity('sequences', {
  location: locationSchema,
  type: typeSchema,
  parts: [partSchema],
  categories: [categorySchema]
})

export const sequencesListSchema = [sequenceSchema]

export const normalizeSequenceList = data => normalize(data, sequencesListSchema)


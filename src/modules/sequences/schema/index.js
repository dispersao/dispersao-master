import { normalize } from 'normalizr'
import partSchema from '../../parts/schema'
import categorySchema from '../../categories/schema'
import locationSchema from '../../locations/schema'
import typeSchema from '../../types/schema'

import { sequenceSchema } from './sequence'

sequenceSchema.define({
  location: locationSchema,
  type: typeSchema,
  parts: [partSchema],
  categories: [categorySchema]
})

export const sequencesListSchema = [sequenceSchema]

export const normalizeSequenceList = data => normalize(data, sequencesListSchema)


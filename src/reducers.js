import { combineReducers } from 'redux'

import { router } from './routes/reducer'
import config from './modules/config/reducer'
import scripts from './modules/scripts/reducer'
import sequences from './modules/sequences/reducer'
import characters from './modules/characters/reducer'
import categories from './modules/categories/reducer'
import locations from './modules/locations/reducer'
import parts from './modules/parts/reducer'
import types from './modules/types/reducer'
import scriptsequences from './modules/scriptsequences/reducer'
import posts from './modules/posts/reducer'
import comments from './modules/comments/reducer'
import contentcreators from './modules/contentcreators/reducer'

const reducer = combineReducers({
  router,
  config,
  scriptsequences,
  scripts,
  sequences,
  characters,
  categories,
  locations,
  parts,
  types,
  posts,
  comments,
  contentcreators
})

export default reducer

import { all } from 'redux-saga/effects'
import { watchConfigFetch } from './modules/config/sagas'
import { 
  watchFetchScripts, 
  watchCreateScript, 
  watchUpdateScript,
  whatchScriptStart
} from './modules/scripts/sagas'
import { watchFetchSequences } from './modules/sequences/sagas'

import { 
  watchCreateRandomScriptSequence,
  watchCreateScriptSequence,
  whatchScriptStart as whatchScriptStartFromScriptsequence,
  watchSendScriptsequence,
  watchUpdateScriptsequence,
  watchDeleteScriptsequence
} from './modules/scriptsequences/sagas'

import {
  watchFetchPosts
} from './modules/posts/sagas'

import {
  watchFetchProfiles
} from './modules/profiles/sagas'

import {
  watchCreateRandomSessioncontent,
  watchCreateSessioncontent,
  watchUpdateSessioncontent
} from './modules/sessioncontents/sagas'
import { watchPollFetchAppUsers } from './modules/appusers/sagas'
import { watchPollFetchLikes } from './modules/likes/sagas'

export default function* rootSaga() {
  yield all([
    watchConfigFetch(),
    watchCreateScript(),
    watchFetchScripts(),
    watchFetchSequences(),
    watchUpdateScript(),
    whatchScriptStartFromScriptsequence(),
    watchSendScriptsequence(),
    whatchScriptStart(),
    watchUpdateScriptsequence(),
    watchDeleteScriptsequence(),
    watchCreateRandomScriptSequence(),
    watchCreateScriptSequence(),
    watchFetchPosts(),
    watchCreateRandomSessioncontent(),
    watchCreateSessioncontent(),
    watchUpdateSessioncontent(),
    watchFetchProfiles(),
    watchPollFetchAppUsers(),
    watchPollFetchLikes()
  ])
}

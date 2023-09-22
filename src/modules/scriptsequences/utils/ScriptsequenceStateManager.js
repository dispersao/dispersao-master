import store from '../../../store'
import { updateScriptsequenceLocalState } from '../actions'

let timerHash = {}
const STATES = {
  PLAY: 'play',
  PAUSE: 'pause',
  FINISHED: 'finished',
  IDLE: 'idle'
}

const SECOND = 1000

export const onUpdateScriptSequenceState = (
  scriptsequence,
  speed,
  newState
) => {
  const {
    id,
    sequence: { duration, sceneNumber },
    elapsedTime = 0,
    state: curState
  } = scriptsequence

  const defaultHash = {
    initAt: null,
    pusedAt: null,
    lastTickAt: null,
    pausedCount: null,
    finishedAt: null,
    ticker: null,
    state: curState || STATES.IDLE,
    elapsedTime: elapsedTime || 0
  }
  timerHash[id] = timerHash[id] || defaultHash

  const now = performance.now()
  const { pausedAt, pausedCount, state, initAt } = timerHash[id]

  switch (newState) {
    case STATES.PLAY:
      if (state === STATES.IDLE || state === STATES.FINISHED) {
        timerHash[id].initAt = now
        updateTick(id, duration, speed)
      } else if (state === STATES.PAUSE) {
        timerHash[id].pausedCount = pausedCount + (now - pausedAt)
        updateTick(id, duration, speed)
        timerHash[id].pausedAt = 0
      }
      break

    case STATES.PAUSE:
      timerHash[id].pausedAt = now
      endTimeout(id)
      break

    case STATES.FINISHED:
      timerHash[id].finishedAt = now
      endTimeout(id)
      updateProgress(id, duration)
      console.log(
        `finished ${sceneNumber} after ${Math.round(
          (now - initAt - pausedCount) / (SECOND / Number(speed))
        )}`
      )
      break
  }

  timerHash[id].state = newState
  updateState(id, newState)
}

const updateTick = (id, duration, speed) => {
  const SEC_INTERVAL = SECOND / Number(speed)
  const { pausedAt, lastTickAt, ticker, elapsedTime } = timerHash[id]
  const now = performance.now()
  const lasttickref = lastTickAt || now
  const passedInterval = Math.round((now - lasttickref) / SEC_INTERVAL)

  let elapsed = 0
  if (pausedAt && lastTickAt) {
    elapsed = pausedAt - lastTickAt
  }

  let interval = SEC_INTERVAL - elapsed
  timerHash[id].lastTickAt = now

  clearTimeout(ticker)
  let tick = setTimeout(() => {
    updateTick(id, duration, speed)
  }, interval)
  timerHash[id].ticker = tick

  if (passedInterval) {
    const updatedElapsed = Math.min(
      duration,
      Number(elapsedTime) + passedInterval
    )
    updateProgress(id, updatedElapsed)
    timerHash[id].elapsedTime = updatedElapsed
  }
}

const endTimeout = (id, clearLastTick = false) => {
  const { ticker } = timerHash[id]
  clearTimeout(ticker)
  
  if (clearLastTick) {
    timerHash[id].lastTickAt = 0
  }
}

const updateProgress = (id, elapsedTime) => {
  store.dispatch(
    updateScriptsequenceLocalState({
      id,
      elapsedTime
    })
  )
}

const updateState = (id, state) => {
  store.dispatch(
    updateScriptsequenceLocalState({
      id,
      state
    })
  )
}

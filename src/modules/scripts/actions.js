export const FETCH_SCRIPTS = "FETCH_SCRIPTS"
export const FETCH_SCRIPTS_SUCCESS = "FETCH_SCRIPTS_SUCCESS"
export const FETCH_SCRIPTS_ERROR = "FETCH_SCRIPTS_ERROR"

export const CREATE_SCRIPT = "CREATE_SCRIPT"
export const CREATE_SCRIPT_SUCCESS = "CREATE_SCRIPT_SUCCESS"
export const CREATE_SCRIPT_ERROR = "CREATE_SCRIPT_ERROR"

export const SET_CURRENTSCRIPT = "SET_CURRENTSCRIPT"

export const UPDATE_SCRIPT = 'UPDATE_SCRIPT'
export const UPDATE_SCRIPT_SUCCESS = 'UPDATE_SCRIPT_SUCCESS'
export const UPDATE_SCRIPT_ERROR = 'UPDATE_SCRIPT_ERROR'

export const UPDATE_SCRIPT_LOCAL_STATE = 'UPDATE_SCRIPT_LOCAL_STATE'

export const START_SESSION = 'START_SESSION'
export const RESET_SESSION = 'RESET_SESSION'
export const END_SESSION = 'END_SESSION'
export const PLAY_SCRIPT = 'PLAY_SCRIPT'
export const PAUSE_SCRIPT = 'PAUSE_SCRIPT'
export const FINISH_SCRIPT = 'FINISH_SCRIPT'

export const CONNECT_SCRIPT = 'CONNECT_SCRIPT'
export const CONNECT_SCRIPT_SUCCESS = 'CONNECT_SCRIPT_SUCCESS'
export const CONNECT_SCRIPT_ERROR = 'CONNECT_SCRIPT_ERROR'

export const SET_SCRIPT_MANUAL = 'SET_SCRIPT_MANUAL'

import states from './utils/stateConstants'

export const fetchScripts = () => ({
  type: FETCH_SCRIPTS
})

export const fetchScriptsSuccess = (scripts) => ({
  type: FETCH_SCRIPTS_SUCCESS,
  payload: {
    scripts
  }
})

export const fetchScriptsError = (error) => ({
  type: FETCH_SCRIPTS_ERROR,
  payload: {
    error
  }
})

export const createScript = (script) => ({
  type: CREATE_SCRIPT,
  payload: {
    script
  }
})

export const createScriptSuccess = (script) => ({
  type: CREATE_SCRIPT_SUCCESS,
  payload: {
    script
  }
})

export const createScriptError = (error) => ({
  type: CREATE_SCRIPT_ERROR,
  payload: {
    error
  }
})

export const setCurrentScript = (script) => ({
  type: SET_CURRENTSCRIPT,
  payload: {
    script
  }
})

export const updateScript = (script) => ({
  type: UPDATE_SCRIPT,
  payload: {
    script
  }
})

export const updateScriptSuccess = (script) => ({
  type: UPDATE_SCRIPT_SUCCESS,
  payload: {
    script
  }
})

export const updateScriptError = (error) => ({
  type: UPDATE_SCRIPT_ERROR,
  payload: {
    error
  }
})

export const updateScriptLocalState = (script) => ({
  type: UPDATE_SCRIPT_LOCAL_STATE,
  payload: {
    script
  }
})


export const startSession = (script) => ({
  type: START_SESSION,
  payload: {
    script: {
      ...script,
      state: states.STARTED
    }
  }
})

export const resetSession = (script) => ({
  type: RESET_SESSION,
  payload: {
    script: {
      ...script,
      state: states.IDLE
    }
  }
})

export const playScript = (script) => ({
  type: PLAY_SCRIPT,
  payload: {
    script: {
      ...script,
      state: states.PLAYING
    }
  }
})

export const pauseScript = (script) => ({
  type: PAUSE_SCRIPT,
  payload: {
    script: {
      ...script,
      state: states.PAUSED
    }
  }
})

export const finishScript = (script) => ({
  type: FINISH_SCRIPT,
  payload: {
    script: {
      ...script,
      state: states.FINISHED
    }
  }
})

export const endSession = (script) => ({
  type: END_SESSION,
  payload: {
    script: {
      ...script,
      state: "ended"
    }
  }
})

export const connectScript = (script) => ({
  type: CONNECT_SCRIPT,
  payload: {
    script
  }
})

export const connectScriptSuccess = (script) => ({
  type: CONNECT_SCRIPT_SUCCESS,
  payload: {
    script
  }
})


export const connectScriptError = (script) => ({
  type: CONNECT_SCRIPT_ERROR,
  payload: {
    script
  }
})

export const setScriptManual = (script) => ({
  type: SET_SCRIPT_MANUAL,
  payload: {
    script
  }
})


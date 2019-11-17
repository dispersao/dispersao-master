export const FETCH_SCRIPTS = "FETCH_SCRIPTS"
export const FETCH_SCRIPTS_SUCCESS = "FETCH_SCRIPTS_SUCCESS"
export const FETCH_SCRIPTS_ERROR = "FETCH_SCRIPTS_ERROR"

export const CREATE_SCRIPT = "CREATE_SCRIPT"
export const CREATE_SCRIPT_SUCCESS = "CREATE_SCRIPT_SUCCESS"
export const CREATE_SCRIPT_ERROR = "CREATE_SCRIPT_ERROR"

export const UPDATE_SCRIPT = 'UPDATE_SCRIPT'
export const UPDATE_SCRIPT_SUCCESS = 'UPDATE_SCRIPT_SUCCESS'
export const UPDATE_SCRIPT_ERROR = 'UPDATE_SCRIPT_ERROR'

export const START_SCRIPT = 'START_SCRIPT'
export const PAUSE_SCRIPT = 'PAUSE_SCRIPT'

export const CONNECT_SCRIPT = 'CONNECT_SCRIPT'
export const CONNECT_SCRIPT_SUCCESS = 'CONNECT_SCRIPT_SUCCESS'
export const CONNECT_SCRIPT_ERROR = 'CONNECT_SCRIPT_ERROR'

// export const CREATE_RANDOM_SCRIPTSEQUENCE = 'CREATE_RANDOM_SCRIPTSEQUENCE'
// export const CREATE_RANDOM_SCRIPTSEQUENCE_SUCCESS = 'CREATE_RANDOM_SCRIPTSEQUENCE_SUCCESS'
// export const CREATE_RANDOM_SCRIPTSEQUENCE_ERROR = 'CREATE_RANDOM_SCRIPTSEQUENCE_ERROR'

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


export const startScript = (script) => ({
  type: START_SCRIPT,
  payload: {
    script
  }
})


export const pauseScript = (script) => ({
  type: PAUSE_SCRIPT,
  payload: {
    script
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


export const FETCH_SCRIPTS = "FETCH_SCRIPTS"
export const FETCH_SCRIPTS_SUCCESS = "FETCH_SCRIPTS_SUCCESS"
export const FETCH_SCRIPTS_ERROR = "FETCH_SCRIPTS_ERROR"

export const CREATE_SCRIPT = "CREATE_SCRIPT"
export const CREATE_SCRIPT_SUCCESS = "CREATE_SCRIPT_SUCCESS"
export const CREATE_SCRIPT_ERROR = "CREATE_SCRIPT_ERROR"

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

export const createScript = () => ({
  type: CREATE_SCRIPT
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

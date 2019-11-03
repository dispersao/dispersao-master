import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { toJS } from '../../../utils/immutableToJs.jsx'

import { connect } from 'react-redux'
import { fetchConfig } from '../actions'
import { getToken } from '../selectors'
import { fetchScripts } from '../../scripts/actions.js'
import { fetchSequences } from '../../sequences/actions.js'

const DataLoader = ({ children, token, scripts, sequences, fetchConfigData, fetchSequencesData, fetchScriptsData }) => {
  useEffect(() => {
    if (!token) {
      fetchConfigData()
    } else {
      if (!scripts || !scripts.length) {
        fetchScriptsData()
      }
      if (!sequences || !sequences.length) {
        fetchSequencesData()
      }
    }
  }, [token, scripts, sequences])

  return (
    <>
      { token && children }
    </>
  )
}

DataLoader.propTypes = {
  children: PropTypes.object,
  token: PropTypes.string,
  scripts: PropTypes.array,
  sequences: PropTypes.array,
  fetchConfigData: PropTypes.func.isRequired,
  fetchSequencesData: PropTypes.func.isRequired,
  fetchScriptsData: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
  return {
    token: getToken(state)
  }
}

const mapDispatchToProps = (dispatch) => ({
  fetchConfigData: () => dispatch(fetchConfig()),
  fetchSequencesData: () => dispatch(fetchSequences()),
  fetchScriptsData: () => dispatch(fetchScripts())
}) 

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(toJS(DataLoader))

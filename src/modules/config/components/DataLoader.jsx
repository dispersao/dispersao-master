import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { toJS } from '../../../utils/immutableToJs.jsx'

import { connect } from 'react-redux'
import { fetchConfig } from '../actions'
import { getToken } from '../selectors'
import { fetchScripts } from '../../scripts/actions'
import { fetchSequences } from '../../sequences/actions'
import { fetchPosts } from '../../posts/actions'

import { getSequenceList } from '../../sequences/selectors'
import { getScriptList } from '../../scripts/selectors'
import { getPostList } from '../../posts/selectors'

const DataLoader = ({ 
  children, 
  token, 
  scripts, 
  sequences,
  posts,
  fetchConfigData, 
  fetchSequencesData, 
  fetchScriptsData,
  fetchPostsData
}) => {
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
      if (!posts || !posts.length) {
        fetchPostsData()
      }
    }
  }, [token, scripts, sequences, posts])

  return (
    <>
      { 
        token && 
        sequences && 
        (sequences.length || '') && 
        scripts && 
        posts && 
        (posts.length || '') && 
        children 
      }
    </>
  )
}

DataLoader.propTypes = {
  children: PropTypes.object,
  token: PropTypes.string,
  scripts: PropTypes.array,
  sequences: PropTypes.array,
  posts: PropTypes.array,
  fetchConfigData: PropTypes.func.isRequired,
  fetchSequencesData: PropTypes.func.isRequired,
  fetchScriptsData: PropTypes.func.isRequired,
  fetchPostsData: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
  return {
    token: getToken(state),
    sequences: getSequenceList(state),
    scripts: getScriptList(state),
    posts: getPostList(state)
  }
}

const mapDispatchToProps = (dispatch) => ({
  fetchConfigData: () => dispatch(fetchConfig()),
  fetchSequencesData: () => dispatch(fetchSequences()),
  fetchScriptsData: () => dispatch(fetchScripts()),
  fetchPostsData: () => dispatch(fetchPosts())
}) 

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(toJS(DataLoader))

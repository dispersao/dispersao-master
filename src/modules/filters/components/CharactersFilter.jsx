import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { updateFilter } from '../actions'

import MultiFilter from './MultiFilter.jsx'
import { toJS } from '../../../utils/immutableToJs.jsx'

import {  getCharactersListAsArray } from '../../characters/selectors'
import { getFilterByProps } from '../selectors'

const CharactersFilter = ({ charactersList, selectedCharacters = { value : [] }, onSelectChange }) => {
  return (
    <MultiFilter
      name="characters"
      list={charactersList.sort((el1, el2) =>  el1.id - el2.id)}
      selected={selectedCharacters.value}
      selectedRadio={selectedCharacters.opton || 'and'}
      onChange={onSelectChange}
      field="name"
    />
  )
}

const mapStateToProps = (state, ownProps) => ({
  selectedCharacters: getFilterByProps(state, {
    ...ownProps,
    data: 'characters'
  }),
  charactersList: getCharactersListAsArray(state)
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  onSelectChange: (value, option) => dispatch(updateFilter({
    script: ownProps.script,
    data: 'characters',
    value,
    option
  }))
})

CharactersFilter.propTypes = {
  charactersList: PropTypes.array.isRequired,
  selectedCharacters: PropTypes.shape({
    value: PropTypes.array
  }),
  onSelectChange: PropTypes.func.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(toJS(CharactersFilter))

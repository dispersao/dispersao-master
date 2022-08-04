import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { updateFilter } from '../actions'

import MultiFilter from './MultiFilter.jsx'
import { toJS } from '../../../utils/immutableToJs.jsx'

import { getTypesListAsArray } from '../../types/selectors'
import { getFilterByProps } from '../selectors'

const TypesFilter = ({ typesList, selectedTypes = { value : [] }, onSelectChange }) => {
  return (
    <MultiFilter
      name="types"
      field="name"
      list={typesList}
      selected={selectedTypes.value}
      onChange={onSelectChange}
      selectedRadio={selectedTypes.opton || 'or'}
      radioList={['or', 'exclude']}
    />
  )
}

const mapStateToProps = (state, ownProps) => ({
  selectedTypes: getFilterByProps(state, {
    ...ownProps,
    data: 'type'
  }),
  typesList: getTypesListAsArray(state)
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  onSelectChange: (value, option) => dispatch(updateFilter({
    script: ownProps.script,
    data: 'type'
    value,
    option
  }))
})

TypesFilter.propTypes = {
  typesList: PropTypes.array.isRequired,
  selectedTypes: PropTypes.shape({
    value: PropTypes.array
  }),
  onSelectChange: PropTypes.func.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(toJS(TypesFilter))

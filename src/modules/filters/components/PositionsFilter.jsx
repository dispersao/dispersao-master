import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { updateFilter } from '../actions'

import MultiFilter from './MultiFilter.jsx'
import { toJS } from '../../../utils/immutableToJs.jsx'

import { getCategoriesByCategoryType } from '../../categories/selectors'
import { getFilterByProps } from '../selectors'

const PositionsFilter = ({ positionsList, selectedPositions = { value : [] }, onSelectChange }) => {
  return (
    <MultiFilter
      name="positions"
      field="text"
      list={positionsList.sort((el1, el2) => parseInt(el1.text) - parseInt(el2.text))}
      selected={selectedPositions.value}
      selectedRadio={selectedPositions.opton || 'and'}
      onChange={onSelectChange}
    />
  )
}

const mapStateToProps = (state, ownProps) => ({
  selectedPositions: getFilterByProps(state, {
    ...ownProps,
    data: 'categories',
    type: 'pos',
  }),
  positionsList: getCategoriesByCategoryType(state, { type: 'pos' })
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  onSelectChange: (value, option) => dispatch(updateFilter({
    script: ownProps.script,
    data: 'categories',
    type: 'pos',
    value,
    option
  }))
})

PositionsFilter.propTypes = {
  positionsList: PropTypes.array.isRequired,
  selectedPositions: PropTypes.shape({
    value: PropTypes.array
  }),
  onSelectChange: PropTypes.func.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(toJS(PositionsFilter))

import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { updateFilter } from '../actions'

import MultiFilter from './MultiFilter.jsx'
import { toJS } from '../../../utils/immutableToJs.jsx'

import { getCategoriesByCategoryType } from '../../categories/selectors'
import { getFilterByProps } from '../selectors'

const ArcsFilter = ({ arcList, selectedArcs = { value : [] }, onSelectChange }) => {
  return (
    <MultiFilter
      name="arcs"
      field="text"
      list={arcList}
      selected={selectedArcs.value}
      selectedRadio={selectedArcs.option || 'and'}
      onChange={onSelectChange}
    />
  )
}

const mapStateToProps = (state, ownProps) => ({
  selectedArcs: getFilterByProps(state, {
    ...ownProps,
    data: 'categories',
    type: 'arc'
  }),
  arcList: getCategoriesByCategoryType(state, { type: 'arc' })
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  onSelectChange: (value, option) => dispatch(updateFilter({
    script: ownProps.script,
    data: 'categories',
    type: 'arc',
    value,
    option
  }))
})

ArcsFilter.propTypes = {
  arcList: PropTypes.array.isRequired,
  selectedArcs: PropTypes.shape({
    value: PropTypes.array
  }),
  onSelectChange: PropTypes.func.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(toJS(ArcsFilter))

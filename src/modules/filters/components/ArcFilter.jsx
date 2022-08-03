import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { updateFilter } from '../actions'

import MultiFilter from './MultiFilter.jsx'
import { toJS } from '../../../utils/immutableToJs.jsx'

import { getCategoriesByCategoryType } from '../../categories/selectors'
import { getFilterByProps } from '../selectors'

const ArcFilter = ({ arcList, selectedArcs = { value : [] }, onArcFilterChange }) => {
  return (
    <MultiFilter
      name="arcs"
      list={arcList}
      selected={selectedArcs.value}
      onChange={onArcFilterChange}
    />
  )
}

const mapStateToProps = (state, ownProps) => ({
  selectedArcs: getFilterByProps(state, {
    ...ownProps,
    data: 'category',
    type: 'arc'
  }),
  arcList: getCategoriesByCategoryType(state, { type: 'arc' })
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  onArcFilterChange: (evt) => dispatch(updateFilter({
    script: ownProps.script,
    data: 'category',
    type: 'arc',
    value: evt.target.value
  }))
})

ArcFilter.propTypes = {
  arcList: PropTypes.array.isRequired,
  selectedArcs: PropTypes.shape({
    value: PropTypes.array
  }),
  onArcFilterChange: PropTypes.func.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(toJS(ArcFilter))

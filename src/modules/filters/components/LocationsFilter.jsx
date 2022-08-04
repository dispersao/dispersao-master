import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { updateFilter } from '../actions'

import MultiFilter from './MultiFilter.jsx'
import { toJS } from '../../../utils/immutableToJs.jsx'

import { getLocationListAsArray } from '../../locations/selectors'
import { getFilterByProps } from '../selectors'

const LocationFilter = ({ locationsList, selectedLocations = { value : [] }, onSelectChange }) => {
  return (
    <MultiFilter
      name="locations"
      field="name"
      list={locationsList}
      selected={selectedLocations.value}
      onChange={onSelectChange}
      selectedRadio={selectedLocations.opton || 'or'}
      radioList={['or', 'exclude']}
    />
  )
}

const mapStateToProps = (state, ownProps) => ({
  selectedLocations: getFilterByProps(state, {
    ...ownProps,
    data: 'location'
  }),
  locationsList: getLocationListAsArray(state)
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  onSelectChange: (value, option) => dispatch(updateFilter({
    script: ownProps.script,
    data: 'location',
    value,
    option
  }))
})

LocationFilter.propTypes = {
  locationsList: PropTypes.array.isRequired,
  selectedLocations: PropTypes.shape({
    value: PropTypes.array
  }),
  onSelectChange: PropTypes.func.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(toJS(LocationFilter))

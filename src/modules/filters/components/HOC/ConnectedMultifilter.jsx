import React from 'react'
import PropTypes from 'prop-types'

import { connect } from 'react-redux'
import { updateFilter } from '../../actions'
import { getFilterByProps } from '../../selectors'
import { toJS } from '../../../../utils/immutableToJs.jsx'
import MultiFilter from './MultiFilter.jsx'
import { getCurrentScriptId } from '../../../scripts/selectors'

const ConnectMultifilter = (
  { name, field, options, data, type, listFunc, script }
) => {
  const ConnectedFilter = ({
    list,
    filter = { value: [] },
    onUpdateFilter
  }) => {

    const selectChangeHandler = (value) => {
      onUpdateFilter(value, filter.option || options[0], script)
    }

    const radioChangeHandler = (value) => {
      onUpdateFilter(filter.value || [], value, script)
    }

    return (
      <MultiFilter
        name={name}
        field={field}
        list={list}
        selected={filter.value}
        selectedRadio={filter.option || options[0]}
        radioList={options}
        onSelectChange={selectChangeHandler}
        onRadioChange={radioChangeHandler}
      />
    )
  }

  const mapStateToProps = (state, ownProps) => {
    return {
    filter: getFilterByProps(state, {
      ...ownProps,
      data,
      type,
    }),
    list: listFunc(state, {type}),
    script: getCurrentScriptId(state)
  }
  }

  const mapDispatchToProps = (dispatch, ownProps) => ({
    onUpdateFilter: (value, option, script) => dispatch(updateFilter({
      script,
      data,
      type,
      value,
      option
    }))
  })

  ConnectedFilter.propTypes = {
    list: PropTypes.array.isRequired,
    filter: PropTypes.shape({
      value: PropTypes.array,
      option: PropTypes.string
    }),
    onUpdateFilter: PropTypes.func,
    script: PropTypes.string
  }

  return connect(mapStateToProps, mapDispatchToProps)(toJS(ConnectedFilter))
}

export default ConnectMultifilter


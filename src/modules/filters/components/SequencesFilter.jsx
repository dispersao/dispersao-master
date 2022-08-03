import React from 'react'
import PropTypes from 'prop-types'
import ArcFilter from '../../filters/components/ArcFilter.jsx'

const SequencesFilter = ({ script }) => {

  return (
    <>
      <ArcFilter script={script} />
    </>
  )
}

SequencesFilter.propTypes = {
  script: PropTypes.number.isRequired
}

export default SequencesFilter

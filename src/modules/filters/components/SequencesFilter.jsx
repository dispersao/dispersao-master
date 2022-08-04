import React from 'react'
import PropTypes from 'prop-types'
import ArcsFilter from '../../filters/components/ArcsFilter.jsx'
import CharactersFilter from '../../filters/components/CharactersFilter.jsx'
import LocationsFilter from '../../filters/components/LocationsFilter.jsx'
import TypesFilter from '../../filters/components/TypesFilter.jsx'
import PositionsFilter from '../../filters/components/PositionsFilter.jsx'
import Grid from '@material-ui/core/Grid'


const SequencesFilter = ({ script }) => {
  return (
    <Grid item xs>
      <Grid container spacing={2}>
        <Grid item xs>
          <ArcsFilter script={script} />
        </Grid>
        <Grid item xs>
          <CharactersFilter script={script} />
        </Grid>
        <Grid item xs>
          <TypesFilter script={script} />
        </Grid>
        <Grid item xs>
          <LocationsFilter script={script} />
        </Grid>
        <Grid item xs>
          <PositionsFilter script={script} />
        </Grid>
      </Grid>
    </Grid>
  )
}

SequencesFilter.propTypes = {
  script: PropTypes.number.isRequired
}

export default SequencesFilter

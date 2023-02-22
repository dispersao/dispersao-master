import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import ArcsFilter from '../../filters/components/ArcsFilter.jsx'
import CharactersFilter from '../../filters/components/CharactersFilter.jsx'
import LocationsFilter from '../../filters/components/LocationsFilter.jsx'
import TypesFilter from '../../filters/components/TypesFilter.jsx'
import PositionsFilter from '../../filters/components/PositionsFilter.jsx'
import Grid from '@material-ui/core/Grid'
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  IconButton,
  Typography
} from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

import { clearFilters } from '../actions'

const SequencesFilter = ({ onClearFilters }) => {
  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography>Filters</Typography>
        <IconButton size="small" onClick={onClearFilters}>
          <DeleteIcon />
          clear filters
        </IconButton>
      </AccordionSummary>
      <AccordionDetails>
        <Grid item xs>
          <Grid container spacing={2}>
            <Grid item xs>
              <ArcsFilter />
            </Grid>
            <Grid item xs>
              <CharactersFilter />
            </Grid>
            <Grid item xs>
              <TypesFilter />
            </Grid>
            <Grid item xs>
              <LocationsFilter />
            </Grid>
            <Grid item xs>
              <PositionsFilter />
            </Grid>
          </Grid>
        </Grid>
      </AccordionDetails>
    </Accordion>
  )
}

SequencesFilter.propTypes = {
  onClearFilters: PropTypes.func.isRequired
}


const mapDispatchToProps = (dispatch) => ({
  onClearFilters: () => dispatch(clearFilters())
})

export default connect(null, mapDispatchToProps)(SequencesFilter)

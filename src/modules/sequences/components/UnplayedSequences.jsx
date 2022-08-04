import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { toJS } from '../../../utils/immutableToJs.jsx'
import {
  getSequenceListNotInScript,
  getSequenceListNotInScriptFiltered
} from '../selectors'

import SequenceGridItem from './SequenceGridItem.jsx'
import SequencesFilter from '../../filters/components/SequencesFilter.jsx'

import useStyles from './styles/'

import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

import {
  Grid,
  GridList,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography
} from '@material-ui/core'

const UnplayedSequences = ({ sequences, script, filteredSequences }) => {
  const classes = useStyles()
  filteredSequences = filteredSequences || sequences

  return (
    <div className={classes.root}>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>Unused Sequences</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid>
            <SequencesFilter script={script} />
            <GridList cellHeight={180}>
              {sequences.map((seq, key) => (
                <SequenceGridItem
                  key={key}
                  {...seq}
                  enabled={filteredSequences.includes(seq.id)}
                />
              ))}
            </GridList>
          </Grid>
        </AccordionDetails>
      </Accordion>
    </div>
  )
}

UnplayedSequences.propTypes = {
  sequences: PropTypes.array,
  filteredSequences: PropTypes.array,
  script: PropTypes.number.isRequired
}

const mapStateToProps = (state, ownProps) => {
  let sequences = getSequenceListNotInScript(state, ownProps)
  let filteredSequences = getSequenceListNotInScriptFiltered(state, ownProps)
  return {
    sequences,
    filteredSequences
  }
}

export default connect(mapStateToProps, null)(toJS(UnplayedSequences))

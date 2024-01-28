import React, { useContext } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { toJS } from '../../../utils/immutableToJs.jsx'
import { getSequencesIds } from '../selectors'
import SequencesFilter from '../../filters/components/SequencesFilter.jsx'

import useStyles from './styles'

import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

import {
  Grid,
  GridList,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography
} from '@material-ui/core'

import SequenceBucketItem from './SequenceBucketItem.jsx'
import DraggableContainer from '../../../utils/dnd/DraggableContainer.jsx'

const Sequences = React.memo(({ sequences }) => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Accordion className={classes.accordion}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>Sequences Bucket</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid className={classes.sequencesContent}>
            <SequencesFilter />
            <DraggableContainer target="timeline" type="sequence">
              {sequences.map((seq, idx) => (
                <SequenceBucketItem key={seq} id={seq} index={idx} />
              ))}
            </DraggableContainer>
          </Grid>
        </AccordionDetails>
      </Accordion>
    </div>
  )
})

Sequences.propTypes = {
  sequences: PropTypes.array
}

const mapStateToProps = (state, ownProps) => {
  let sequences = getSequencesIds(state, ownProps)

  return {
    sequences
  }
}

export default connect(mapStateToProps, null)(toJS(Sequences))

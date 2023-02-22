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

import Sortable from '../../../utils/dnd/Sortable.jsx'

import SequenceBucketItem from './SequenceBucketItem.jsx'
import WithContextProps from '../../../utils/dnd/HOC/WithContextProps.jsx'

const Sequences = React.memo(({ sequences }) => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>Sequences Bucket</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid>
            <SequencesFilter />
            <SequencesSortable
              id="sequences"
              tag={GridList}
              list={sequences}
              ghostClass={classes.ghostDrag}
              setList={(list) => {}}
              groupName="shared"
              sort={false}
              clone={true}
            >
              {sequences.map((seq, idx) => (
                <SequenceBucketItem key={seq} id={seq} index={idx} />
              ))}
            </SequencesSortable>
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

const SequencesSortable = WithContextProps(Sortable, {
  onEnd: 'onDropSequence'
})

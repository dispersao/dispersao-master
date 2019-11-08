import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { toJS } from '../../../utils/immutableToJs.jsx'
import { getSequenceListNotInScript } from '../selectors'

import SequenceGridItem from './SequenceGridItem.jsx'
import useStyles from './styles/'

import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import {
  GridList,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  Typography
} from '@material-ui/core'



const UnplayedSequences = ({ sequences }) => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <ExpansionPanel>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header">
          <Typography className={classes.heading}>Unused Sequences</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          
          <GridList cellHeight={180}>
            {sequences.map((seq, key) => <SequenceGridItem key={key} {...seq} />) }
          </GridList>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
  )
}

UnplayedSequences.propTypes = {
  sequences: PropTypes.array
}

const mapStateToProps = (state, ownProps) => ({
  sequences: getSequenceListNotInScript(state, ownProps)
})

export default connect(
  mapStateToProps,
  null
)(toJS(UnplayedSequences))

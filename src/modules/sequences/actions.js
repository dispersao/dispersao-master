export const FETCH_SEQUENCES = "FETCH_SEQUENCES"
export const FETCH_SEQUENCES_SUCCESS = "FETCH_SEQUENCES_SUCCESS"
export const FETCH_SEQUENCES_ERROR = "FETCH_SEQUENCES_ERROR"

export const fetchSequences = () => ({
  type: FETCH_SEQUENCES
})

export const fetchSequencesSuccess = (sequences) => {
  console.log(sequences)
  return {
    type: FETCH_SEQUENCES_SUCCESS,
    payload: {
      sequences
    }
  }
  
}

export const fetchSequencesError = (error) => ({
  type: FETCH_SEQUENCES_ERROR,
  payload: {
    error
  }
})

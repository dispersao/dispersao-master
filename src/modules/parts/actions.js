export const FETCH_PARTS_SUCCESS = "FETCH_PARTS_SUCCESS"

export const fetchPartsSuccess = (parts) => ({
  type: FETCH_PARTS_SUCCESS,
  payload: {
    parts
  }
})

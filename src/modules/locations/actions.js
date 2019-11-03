export const FETCH_LOCATIONS_SUCCESS = "FETCH_LOCATIONS_SUCCESS"

export const fetchLocationsSuccess = (locations) => ({
  type: FETCH_LOCATIONS_SUCCESS,
  payload: {
    locations
  }
})

export const UPDATE_FILTER = 'UPDATE_FILTER'
export const CLEAR_FILTERS = 'CLEAR_FILTERS'

export const updateFilter = (filter) => ({
  type: UPDATE_FILTER,
  payload: filter
})

export const clearFilters = () => ({
  type: CLEAR_FILTERS
})

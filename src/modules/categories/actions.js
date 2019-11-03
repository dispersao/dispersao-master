export const FETCH_CATEGORIES_SUCCESS = "FETCH_CATEGORIES_SUCCESS"

export const fetchCategoriesSuccess = (categories) => ({
  type: FETCH_CATEGORIES_SUCCESS,
  payload: {
    categories
  }
})

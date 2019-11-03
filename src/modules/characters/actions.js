export const FETCH_CHARACTERS_SUCCESS = "FETCH_CHARACTERS_SUCCESS"

export const fetchCharactersSuccess = (characters) => ({
  type: FETCH_CHARACTERS_SUCCESS,
  payload: {
    characters
  }
})

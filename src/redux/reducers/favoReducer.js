const initState = {
  favourites: null,
  favoIds: null
}

export default (state = initState, action) => {
  if (action.type === 'SET_FAVO')
  return {
    ...state,
    favourites: action.favourites,
    favoIds: action.favoIds
  }
  return state
}
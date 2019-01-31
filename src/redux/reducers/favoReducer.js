const initState = {
  favourites: {
    labels: {},
    masters: {},
    releases: {},
    artists: {}
  },
  favoIds: {
    labelId: [],
    artistID: [],
    masterId: [],
    releaseId: []
  }
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
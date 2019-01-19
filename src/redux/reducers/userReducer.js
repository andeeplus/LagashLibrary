const initState = {
  user: null
}

export default (state = initState, action) => {
  if (action.type === 'SET_USER_INFO')
  return {
    ...state,
    user: action.user
  }
  return state
}
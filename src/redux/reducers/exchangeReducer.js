const initState = {
  exchangeItems: null
}

export default (state = initState, action) => {
  if (action.type === 'SET_EXCHANGE')
  return {
    ...state,
    exchangeItems: action.exchangeItems
  }
  return state
}
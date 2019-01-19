const initState = {
  searchQuery: ''
}

const searchQueryReducer = (state = initState, action) => {
  if (action.type ==='SEARCH_QUERY'){
      // return {
      //   ...state, 
      //   searchQuery: action.payload
      // }
      console.log(action.payload)
    }
  return state
}

export default searchQueryReducer
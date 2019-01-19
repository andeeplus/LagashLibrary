export const searchQuery = (query) => {
  return (dispatch) => {
    
    dispatch({type: "SEARCH_QUERY", payload:query})
  }
}
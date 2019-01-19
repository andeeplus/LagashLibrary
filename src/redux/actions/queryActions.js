import axios from 'axios'


function fetchQuery(url){
  return function(dispatch){
    dispatch({type: 'FETCH_QUERY_PENDING'})
    axios.get(url)
      .then((results) => {
        dispatch({type: 'FETCH_QUERY_FULFILLED', payload: results.data})
      })
      .catch((err) => {
        dispatch({type: 'FETCH_QUERY_REJECTED', payload: err})
      })
  }
}

function fetchQueryVersions(url){
  return function(dispatch){
    dispatch({type: 'FETCH_QUERY_VERSIONS_PENDING'})
    axios.get(url)
      .then((results) => {
        dispatch({type: 'FETCH_QUERY_VERSIONS_FULFILLED', payload: results.data})
      })
      .catch((err) => {
        dispatch({type: 'FETCH_QUERY_VERSIONS_REJECTED', payload: err})
      })
  }
}

export {
  fetchQuery,
  fetchQueryVersions
}
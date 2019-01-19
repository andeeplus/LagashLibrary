
const initState = {
  results: [],
  fetching: false,
  fetched: false,
  error: null
}

function queryReducer (state = initState, action){

  switch (action.type) {

    case "FETCH_QUERY_PENDING": {
      return {
        ...state, 
        fetching:true,
        fetched: false
      }
    }
    case "FETCH_QUERY_REJECTED": {
      return {
        ...state, 
        fetching:false, 
        error: action.payload
      }
    }
    case "FETCH_QUERY_FULFILLED": {
      
      return {
        ...state, 
        fetching: false, 
        fetched:true, 
        results: action.payload
      }
    }
    default: 
  }
  return state
}

function queryVersionReducer (state = initState, action){

  switch (action.type) {
    case "FETCH_QUERY_VERSIONS_PENDING": {
      return {
        ...state, 
        fetching:true,
        fetched: false
      }
    }
    case "FETCH_QUERY_VERSIONS_REJECTED": {
      return {
        ...state, 
        fetching:false, 
        error: action.payload
      }
    }
    case "FETCH_QUERY_VERSIONS_FULFILLED": {
      return {
        ...state, 
        fetching: false, 
        fetched:true, 
        results: action.payload
      }
    }
    default: 
  }
  return state
}


export {
  queryReducer,
  queryVersionReducer
}
export default function authReducer (state = [], action){

  if (action.type === "AUTH") {
      return {
        ...state, 
        searchQuery:action.payload
      }
    }
  return state
}
  
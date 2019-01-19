export const saveFave = (record) => {
  return (dispatch, getState, {getFirebase, getFireStore}) =>{
    
    dispatch({type: 'SAVE_FAV_FB', payload: record})
  }
}
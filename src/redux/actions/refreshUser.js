import DatabaseApi from '../../../src/services/dbApi'

export function refreshUserFromDb(userId){
    return async function(dispatch){
      const userData = await DatabaseApi.getDocumentById('user', userId);
      if(!userData){ 
        dispatch({type: 'SET_USER_INFO_REJECTED', user:'' })
      } else {
        dispatch({type: 'SET_USER_INFO', user: userData})
      }
  }
  }
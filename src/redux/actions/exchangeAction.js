import DatabaseApi from '../../../src/services/dbApi'

  export function setExchange(){
      return async function(dispatch){
        const getExchange = await DatabaseApi.getCollection('exchange')

        if(!getExchange){ 
          dispatch({type: 'SET_EXCHANGE_REJECTED', exchangeItems:'' })
        } else {
          dispatch({type: 'SET_EXCHANGE', exchangeItems: getExchange})
        }
    }
    }


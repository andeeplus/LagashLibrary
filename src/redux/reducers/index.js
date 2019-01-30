import {combineReducers} from 'redux'
import authReducer from './authReducer'
import userReducer from './userReducer'
import exchangeReducer from './exchangeReducer'
import favoReducer from './favoReducer'

export default combineReducers ({
  userReducer,
  authReducer,
  exchangeReducer,
  favoReducer
})



import {combineReducers} from 'redux'
import {queryReducer} from './queryReducer'
import {queryVersionReducer} from './queryReducer'
import searchQueryReducer from './searchQueryReducer'
import authReducer from './authReducer'
import userReducer from './userReducer'
import exchangeReducer from './exchangeReducer'

export default combineReducers ({
  searchQueryReducer,
  queryVersionReducer,
  queryReducer,
  userReducer,
  authReducer,
  exchangeReducer
})



import { applyMiddleware, createStore} from 'redux'
import {logger} from 'redux-logger'
import thunk from 'redux-thunk'
import promise from 'redux-promise-middleware'
import reducer from './reducers'

const middleware = applyMiddleware(promise(), thunk, logger)

const store = createStore(reducer,middleware)
export default store


// import { reduxFirestore, getFirestore } from 'redux-firestore'
// import { reactReduxFirebase, getFirebase} from 'react-redux-firebase'
// import dbApi from '../services/dbApi'


// const middleware = applyMiddleware(promise(), thunk.withExtraArgument({getFirestore, getFirebase}), logger)

// const store = createStore(reducer,
//   compose(middleware, 
//     reduxFirestore(dbApi), 
//     reactReduxFirebase(dbApi)
//   )
// )

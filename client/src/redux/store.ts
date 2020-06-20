import { createStore, combineReducers, applyMiddleware } from 'redux'
import authReducer from './reducers/auth'
import reduxThunk from 'redux-thunk'

const rootReducer = combineReducers({
  auth: authReducer,
})

const store = (initialState = {}) => {
  const middlewares = [reduxThunk]

  return createStore(rootReducer, initialState, applyMiddleware(...middlewares))
}

export default store

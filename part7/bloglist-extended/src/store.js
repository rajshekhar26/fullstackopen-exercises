import { applyMiddleware, combineReducers, createStore } from 'redux'
import thunk from 'redux-thunk'

import notifcationReducer from './reducers/notificationReducer'
import blogsReducer from './reducers/blogsReducer'
import userReducer from './reducers/userReducer'

const reducers = combineReducers({
  notifcation: notifcationReducer,
  blogs: blogsReducer,
  user: userReducer,
})

const store = createStore(reducers, applyMiddleware(thunk))

export default store

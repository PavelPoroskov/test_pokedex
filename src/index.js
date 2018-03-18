import React from 'react'
import ReactDOM from 'react-dom'

import { Provider } from 'react-redux'
import { createStore } from 'redux'

import createSagaMiddleware from 'redux-saga'

import reducer from './reducers'
import { actFetchPokemons, actFetchTypes } from './actions'
import watcherPage from './sagas'

import App from './App'
import './index.css'


const sagaMiddleware = createSagaMiddleware()

const store = createStore(
  reducer,
  applyMiddleware(watcherPage)
)

sagaMiddleware.run(mySaga)


store.dispatch(actFetchPokemons())
store.dispatch(actFetchTypes())


ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>, 
  document.getElementById('root'))

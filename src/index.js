import React from 'react'
import ReactDOM from 'react-dom'

import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'

// import { initPageSize } from './constants'
// import { actSetPageSize, actFetchPokemons } from './actions'

import { actSetFilter } from './actions'
import rootSaga from './sagas'
import reducer from './reducers'

import App from './components/App'

import './index.css'

const sagaMiddleware = createSagaMiddleware()

const store = createStore(
  reducer,
  applyMiddleware(sagaMiddleware)
)

sagaMiddleware.run(rootSaga)

// // store.dispatch(actSetPageSize(initPageSize))
// store.dispatch(actFetchPage({
//   resource: 'pokemon',
//   offcet: 0,
//   limit: initPageSize
// }))
store.dispatch(actSetFilter())

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'))

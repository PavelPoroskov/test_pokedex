import React from 'react'
import ReactDOM from 'react-dom/client'

import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'

// import { initPageSize } from './constants'
// import { actSetPageSize, actFetchPokemons } from './actions'

import { actChangeFilter } from './actions'
import rootSaga from './sagas'
import reducer from './reducers'

import App from './components/App'

// import './styles/css/index.css'

const sagaMiddleware = createSagaMiddleware()
const middleware = [sagaMiddleware]
const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(middleware)
})

sagaMiddleware.run(rootSaga)

store.dispatch(actChangeFilter())

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
)

import { call, put, takeLatest } from 'redux-saga/effects'

import {
  NET_TYPES_REQUEST,
  NET_TYPES_SUCCESS,
  NET_TYPES_FAILURE
} from './actions/ActionTypes'

import { fetchTypesList, fetchTypes } from './api/cachedfetch'

function * workerTypes (action) {
  try {
    // let url = 'https://pokeapi.co/api/v2/type?limit=100'
    // const data = yield call(apiFetchJson, url)
    const data = yield call(fetchTypesList)
    const list = data.results.map(item => item.name)

    yield put({
      type: NET_TYPES_SUCCESS,
      list: list
    })
  } catch (e) {
    yield put({ type: NET_TYPES_FAILURE, error: e.message })
  }
}

export sagaFetchTypesList
export sagaFetchTypes
export sagaFetchPokemonsListByType

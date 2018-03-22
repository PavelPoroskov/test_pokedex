
import { call, put, takeLatest, select } from 'redux-saga/effects'
import merge from 'loadash.merge'

import {
  NET_ITEMS_REQUEST,
  NET_ITEMS_SUCCESS_PAGE_FIRST,
  NET_ITEMS_SUCCESS_PAGE,
  //  NET_ITEMS_SUCCESS,
  NET_ITEMS_FAILURE
} from './actions/ActionTypes'

import { fetchPokemonsList, fetchPokemons } from './api/cachedfetch'

function * workerPage (action) {
  try {
    // let pageSize = action.pageSize || 20
    const pageSize = yield select(state => state.pageSize)

    // let url = `https://pokeapi.co/api/v2/pokemon/?limit=${pageSize}`
    let offset = 0
    let limit = pageSize

    let toSendFirstPage = true
    while (true) {
      const data = yield call(fetchPokemonsList, {limit, offset})
      // console.dir(data)
      let oResult = {}

      let arBatch = []
      let nReceived = 0
      for (let i = 0; i < data.results.length; i++) {
        arBatch.push(data.results[i].name)

        if (arBatch.length >= 5) {
          let arBatchRes = yield call(fetchPokemons, arBatch)
          nReceived = nReceived + arBatchRes.length
          arBatch = []
          oResult = merge(oResult, arBatchRes)
        }
      }

      if (arBatch.length > 0) {
        let arBatchRes = yield call(fetchPokemons, arBatch)
        nReceived = nReceived + arBatchRes.length
        arBatch = []
        oResult = merge(oResult, arBatchRes)
      }

      if (oResult) {
        let newAction = {
          type: NET_ITEMS_SUCCESS_PAGE,
          ...oResult, // entities: {...}
          first: offset + 1,
          last: offset + nReceived
        }
        if (toSendFirstPage) {
          newAction = {
            ...newAction,
            type: NET_ITEMS_SUCCESS_PAGE_FIRST,
            remoteFullSize: data.count
          }
          toSendFirstPage = false
        }
        yield put(newAction)
      }

      if (!data.next) {
        break
      }
      offset = offset + limit
      // debug
      if (offset >= 30) {
        break
      }
    }
  } catch (e) {
    yield put({ type: NET_ITEMS_FAILURE, error: e.message })
  }
}

function * watcherPage () {
  yield takeLatest(NET_ITEMS_REQUEST, workerPage)
}

export default watcherPage

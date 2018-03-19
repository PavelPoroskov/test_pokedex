
// import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import { call, put, takeLatest, all, select } from 'redux-saga/effects'
// import apiFetchJson from './api/fetch'
import { getTypesList, getPokemonsList, getArrPokemons } from './api/cachedfetch'

import {
  NET_ITEMS_REQUEST,
  NET_ITEMS_SUCCESS_PAGE_FIRST,
  NET_ITEMS_SUCCESS_PAGE,
  //  NET_ITEMS_SUCCESS,
  NET_ITEMS_FAILURE,

  NET_TYPES_REQUEST,
  NET_TYPES_SUCCESS,
  NET_TYPES_FAILURE
} from './actions/ActionTypes'

function * workerTypes (action) {
  try {
    // let url = 'https://pokeapi.co/api/v2/type?limit=100'
    // const data = yield call(apiFetchJson, url)
    const data = yield call(getTypesList)
    const list = data.results.map(item => item.name)

    yield put({
      type: NET_TYPES_SUCCESS,
      list: list
    })
  } catch (e) {
    yield put({ type: NET_TYPES_FAILURE, error: e.message })
  }
}

function * watcherTypes () {
  yield takeLatest(NET_TYPES_REQUEST, workerTypes)
}

function simplifyObj (o) {
  return {
    id: o.id,
    name: o.name,

    front_default: o.sprites.front_default,
    front_shiny: o.sprites.front_shiny,

    types: o.types.map(i => i.type.name),

    ...(o.stats.reduce((objSum, i) => {
      objSum[i.stat.name] = i.base_stat
      return objSum
    }, {})),

    total: o.stats.reduce((iSum, i) => (iSum + i.base_stat), 0)
  }
}

function * workerPage (action) {
  try {
    // let pageSize = action.pageSize || 20
    const pageSize = yield select(state => state.pageSize)

    // let url = `https://pokeapi.co/api/v2/pokemon/?limit=${pageSize}`
    let offset = 0
    let limit = pageSize

    let toSendFirstPage = true
    while (true) {
      // const data = yield call(apiFetchJson, url)
      const data = yield call(getPokemonsList, {limit, offset})
      // console.dir(data)
      let objPage = {}
      let arPage = []

      let arBatch = []
      for (let i = 0; i < data.results.length; i++) {
        // arBatch.push(call(apiFetchJson, data.results[i].url))
        arBatch.push(data.results[i].name)

        if (arBatch.length >= 5) {
          // let arBatchRes = yield all(arBatch)
          let arBatchRes = yield call(getArrPokemons, arBatch)
          arBatch = []

          arBatchRes.forEach(obj => {
            objPage[obj.id] = simplifyObj(obj)
            arPage.push(obj.id)
          })
        }
      }

      if (arBatch.length > 0) {
        // let arBatchRes = yield all(arBatch)
        let arBatchRes = yield call(getArrPokemons, arBatch)
        arBatch = []

        arBatchRes.forEach(obj => {
          objPage[obj.id] = simplifyObj(obj)
          arPage.push(obj.id)
        })
      }

      let newAction = {
        type: NET_ITEMS_SUCCESS_PAGE,
        pageItemsById: objPage,
        pageItems: arPage
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

      if (!data.next) {
        break
      }
      // url = data.next
      offset = offset + limit
      // debug
      if (offset >= 60) {
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

export default function * rootSaga () {
  yield all([
    watcherPage(),
    watcherTypes()
  ])
}


// import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import { call, put, takeLatest, all } from 'redux-saga/effects'
import fetch from 'whatwg-fetch'

import {
  NET_POKEMONS_REQUEST,
  NET_POKEMONS_SUCCESS_PAGE,
  //  NET_POKEMONS_SUCCESS,
  NET_POKEMONS_FAILURE,

  NET_TYPES_REQUEST,
  NET_TYPES_SUCCESS,
  NET_TYPES_FAILURE
} from './actions/ActionTypes'

function apifetch (url) {
  return fetch(url)
    .then(response => response.json())
}

function * workerTypes (action) {
  try {
    let url = 'https://pokeapi.co/api/v2/type?limit=100'

    const data = yield call(apifetch, url)
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
    let pageSize = action.pageSize || 20
    let url = `https://pokeapi.co/api/v2/pokemon/?limit=${pageSize}`

    while (true) {
      const data = yield call(apifetch, url)

      let objPage = {}
      let arPage = []

      let arBatch = []
      for (let i = 0; i < data.results.length; i++) {
        arBatch.push(call(apifetch, data.results[i].url))

        if (arBatch.length >= 5) {
          let arBatchRes = yield all(arBatch)
          arBatch = []

          arBatchRes.forEach(obj => {
            objPage[obj.id] = simplifyObj(obj)
            arPage.push(obj.id)
          })
        }
      }

      if (arBatch.length > 0) {
        let arBatchRes = yield all(arBatch)
        arBatch = []

        arBatchRes.forEach(obj => {
          objPage[obj.id] = simplifyObj(obj)
          arPage.push(obj.id)
        })
      }

      yield put({
        type: NET_POKEMONS_SUCCESS_PAGE,
        objectsById: objPage,
        list: arPage
      })

      // debug
      let vdebug = true
      if (vdebug) {
        break
      }

      if (!data.next) {
        break
      }
      url = data.next
    }
  } catch (e) {
    yield put({ type: NET_POKEMONS_FAILURE, error: e.message })
  }
}

function * watcherPage () {
  yield takeLatest(NET_POKEMONS_REQUEST, workerPage)
}

export default function * rootSaga () {
  yield all([
    watcherPage(),
    watcherTypes()
  ])
}

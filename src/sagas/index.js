import { call, put, takeLatest } from 'redux-saga/effects'
// import merge from 'loadash.merge'

import { NET_ITEMS_REQUEST } from '../actions/ActionTypes'

import { fetchPokemonsList, requestPokemon } from '../api/cachedfetch'

import {
  actFetchPageBatchSucces,
  actFetchPageFailure,
  actSetEntities } from '../actions'

// import {sagaFetchPokemonsListByType} from './type'

function * worker (action) {
  try {
    // console.log('worker in')
    const {resource, id} = action

    // step 1: take list
    let list
    if (resource === 'pokemon') {
      // console.log('worker in, resource pokemon')
      const result = yield call(fetchPokemonsList, action)
      list = result.result.results
    } else if (resource === 'type' && id) {
      // list = yield call(sagaFetchPokemonsListByType, id)
    } else {
      const msg = 'saga / worker(), unsupported resource: '
      throw new Error(msg + action.resource)
    }

    // console.log('list')
    // console.log(list)

    const arPromises = list.map(name => requestPokemon(name))

    for (let i = 0; i < arPromises.length; i++) {
      // const fn = x => () => x
      // const result = yield call(fn(arPromises[i]))
      const result = yield arPromises[i]

      yield put(actSetEntities({
        entities: result.entities
      }))
      yield put(actFetchPageBatchSucces({
        result: [result.result]
      }))
    }
  } catch (e) {
    console.log('catch err: ' + e.message)
    yield put(actFetchPageFailure({ error: e.message }))
  }
}

function * watcher () {
  yield takeLatest(NET_ITEMS_REQUEST, worker)
}

export default watcher

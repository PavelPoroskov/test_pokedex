import { call, put, takeLatest } from 'redux-saga/effects'

import { NET_ITEMS_REQUEST } from '../actions/ActionTypes'

import {
  requestPokemonsList,
  requestPokemon,
  requestType } from '../api/cachedfetch'

import {
  actFetchPageBatchSucces,
  actFetchPageFailure,
  actSetEntities } from '../actions'

// import {sagaFetchPokemonsListByType} from './type'

function * worker (action) {
  try {
    console.log('worker in')
    const {resource, id} = action

    // step 1: take list
    let list
    if (resource === 'pokemon') {
      // console.log('worker in, resource pokemon')
      const result = yield call(requestPokemonsList, action)
      list = result.result.results
    } else if (resource === 'type' && id) {
      const result = yield call(requestType, id)
      const typeId = result.result
      const typeObj = result.entities.types[typeId]
      list = typeObj.pokemon
    } else {
      const msg = 'saga / worker(), unsupported resource: '
      throw new Error(msg + action.resource)
    }

    console.log('list')
    console.log(list)

    // step 2: take objects
    const arPromises = list.map(name => requestPokemon(name))

    for (let i = 0; i < arPromises.length; i++) {
      // const fnWrap = x => () => x
      // const result = yield call(fnWrap(arPromises[i]))
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

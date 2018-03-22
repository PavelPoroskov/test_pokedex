import { call, put, takeLatest } from 'redux-saga/effects'
// import merge from 'loadash.merge'

import { NET_ITEMS_REQUEST } from '../actions/ActionTypes'

import { actFetchPageBatchSucces, actFetchPageFailure } from '../actions'
import {sagaFetchPokemonsList, sagaFetchPokemons} from './pokemon'
// import {sagaFetchPokemonsListByType} from './type'

function * worker (action) {
  try {
    // console.log('worker in')
    const {resource, id} = action

    // step 1: take list
    let list
    if (resource === 'pokemon') {
      // console.log('worker in, resource pokemon')
      list = yield call(sagaFetchPokemonsList, action)
    } else if (resource === 'type' && id) {
      // list = yield call(sagaFetchTypes, id)
    } else {
      const msg = 'saga / worker(), unsupported resource: '
      throw new Error(msg + action.resource)
    }

    // console.log('list')
    // console.log(list)
    // step 2: take objects
    let arBatch = []
    for (let i = 0; i < list.length; i++) {
      arBatch.push(list[i])

      // if (arBatch.length >= 5) {
      if (arBatch.length >= 4) {
        let Res = yield call(sagaFetchPokemons, arBatch)
        arBatch = []

        yield put(actFetchPageBatchSucces({
          result: Res // entities: {...}
        }))
      }
    }

    if (arBatch.length > 0) {
      let Res = yield call(sagaFetchPokemons, arBatch)
      // console.log('Res')
      // console.log(Res)
      arBatch = []

      yield put(actFetchPageBatchSucces({
        result: Res // entities: {...}
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

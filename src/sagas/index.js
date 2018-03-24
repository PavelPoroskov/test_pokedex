import { call, put, takeLatest, select } from 'redux-saga/effects'

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

// function * loadObjects (list) {
//   const arPromises = list.map(name => requestPokemon(name))

//   for (let i = 0; i < arPromises.length; i++) {
//     // const fnWrap = x => () => x
//     // const result = yield call(fnWrap(arPromises[i]))
//     const result = yield arPromises[i]

//     yield put(actSetEntities({
//       entities: result.entities
//     }))
//     yield put(actFetchPageBatchSucces({
//       result: [result.result]
//     }))
//   }
// }

// function * loadObjectsByBatch (list, batchSize) {
//   let arBatch = []
//   for (let i = 0; i < list.length; i++) {
//     arBatch.push(list[i])
//     if (arBatch.length >= batchSize) {
//       yield call(loadObjects, arBatch)
//       arBatch = []
//     }
//   }

//   if (arBatch.length > 0) {
//     yield call(loadObjects, arBatch)
//     arBatch = []
//   }
// }

function * worker (action) {
  try {
    // console.log('worker in')
    const {resource, id, offcet} = action

    const pageSize = yield select(state => state.pageSize)

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

      let beg = offcet ? offcet + 1 : 0
      list = list.slice(beg, beg + pageSize)
      // set current select
    } else {
      const msg = 'saga / worker(), unsupported resource: '
      throw new Error(msg + action.resource)
    }

    // console.log('pageSize')
    // console.log(pageSize)

    // console.log('list')
    // console.log(list)

    // step 2: take objects
    // const arPromises = list.map(name => requestPokemon(name))

    const storedObjs = yield select(state => state.entities.pokemons)

    let arStored = []
    let arComands = []
    list.forEach(name => {
      if (storedObjs && (name in storedObjs)) {
        arStored.push(name)
      } else {
        if (arStored) {
          arComands.push({ names: arStored.slice() })
          arStored = []
        }
        arComands.push({ names: [name], promise: requestPokemon(name) })
      }
    })
    if (arStored) {
      arComands.push({ names: arStored.slice() })
      arStored = []
    }

    for (let i = 0; i < arComands.length; i++) {
      // const fnWrap = x => () => x
      // const result = yield call(fnWrap(arPromises[i]))
      const curCommand = arComands[i]
      if (curCommand.promise) {
        const result = yield curCommand.promise
        yield put(actSetEntities({
          entities: result.entities
        }))
      }

      const isLastBatch = (i === arComands.length - 1)
      yield put(actFetchPageBatchSucces({
        result: curCommand.names,
        isLastBatch
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

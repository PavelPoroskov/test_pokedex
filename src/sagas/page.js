import { put, takeLatest, select } from 'redux-saga/effects'

import { SET_PAGE } from '../actions/ActionTypes'

import { requestPokemon } from '../api/cachedfetch'

import {
  actSetPageBatchSucces,
  actSetEntities,
  actSetError } from '../actions'

function * worker (action) {
  try {
    const pageSize = yield select(state => state.pageSize)
    const pageNum = action.pageNum || 1
    const beg = (pageNum - 1) * pageSize

    const items = yield select(state => state.currentSelectedItems)
    const list = items.slice(beg, beg + pageSize)

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
      yield put(actSetPageBatchSucces({
        result: curCommand.names,
        isLastBatch
      }))
    }
  } catch (e) {
    const msg = 'saga/page catch err: ' + e.message
    yield put(actSetError(msg))
  }
}

function * watcher () {
  yield takeLatest(SET_PAGE, worker)
}

export default watcher

import { put, takeLatest, select } from 'redux-saga/effects'

import { SET_PAGE } from '../actions/ActionTypes'

import { requestRes } from '../api/cachedfetch'

import {
  actSetPageBatchSucces,
  actSetEntities,
  actSetError } from '../actions'

// const dFrom = 1522149358224
// const msSince = () =>
//   Date.now() - dFrom

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
        // console.log('start ' + name + ' ' + msSince())
        arComands.push({
          names: [name],
          promise: requestRes({resource: 'pokemon', id: name})
        })
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
        // console.log('output ' + curCommand.names[0] + ' ' + msSince())
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

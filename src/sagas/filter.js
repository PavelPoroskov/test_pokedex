import { call, put, take, takeLatest, select, actionChannel } from 'redux-saga/effects'
import { buffers } from 'redux-saga'
import { CHANGE_FILTER, SELECTION_CONTINUE } from '../actions/ActionTypes'

import { requestRes, requestListPrepare } from '../api/cachedfetch'

import {
  actSetEntities,
  actSelectionSuccesBatch,
  actSetPage,
  actSetError } from '../actions'

function * loadEnough ({fnRequestNextPage, substr, haveLength, toLength}) {
  let isFull = false
  // let list = []
  // let toSetPage1 = (offset === 0)

  let newHaveLength = haveLength

  // if (toSetPage1) {
  //   toSetPage1 = false
  //   yield put(actSetPage(1))
  // }

  while (true) {
    const resultNorm = yield call(fnRequestNextPage)
    const result = resultNorm.result
    const list = result.results
    let listBatch = list
    if (substr) {
      listBatch = listBatch.filter(name => name.includes(substr))
    }

    isFull = !result.next

    if (listBatch.length > 0 || isFull) {
      newHaveLength = newHaveLength + listBatch.length
      yield put(actSetEntities({
        entities: resultNorm.entities
      }))
      let batch = listBatch.slice()
      // console.log('SelectionSuccesBatch =>')
      // console.log(batch)
      yield put(actSelectionSuccesBatch({
        fullLength: newHaveLength,
        items: batch,
        isFull
      }))
    }

    if (toLength <= newHaveLength || isFull) {
      break
    }
  }

  return {
    isFull,
    haveLength: newHaveLength
  }
}

// step 1: load enough items
// step 2: add items on event 'SELECTION_CONTINUE'
function * loadPokemonList (substr) {
  //
  // step 1: load enough items

  const pageUISize = yield select(state => state.pageSize)
  // let toLength = pageUISize
  // preload
  let toLength = pageUISize + 1

  let haveLength = 0
  let isFull = false

  const controlChan = yield actionChannel(SELECTION_CONTINUE, buffers.expanding(10))
  yield put(actSetPage(1))

  const fnRequestNextPage = requestListPrepare('pokemon')

  const {
    isFull: newIsFull,
    haveLength: newHaveLength
  } = yield call(loadEnough, {fnRequestNextPage, substr, haveLength, toLength})
  haveLength = newHaveLength
  isFull = newIsFull

  //
  // step 2: add items on event 'SELECTION_CONTINUE'
  while (!isFull) {
    const { needEnd0 } = yield take(controlChan)
    // toLength = needEnd0 + 1
    // preload
    const toEnd0 = needEnd0 + 1
    toLength = toEnd0 + 1
    if (toLength <= haveLength) {
      continue
    }

    const {
      isFull: newIsFull,
      haveLength: newHaveLength
    } = yield call(loadEnough, {fnRequestNextPage, substr, haveLength, toLength})
    haveLength = newHaveLength
    isFull = newIsFull
  }
  //
}

function * worker (action) {
  try {
    const {type, substr} = yield select(state => state.filter)

    if (type) {
      yield put(actSetPage(1))

      const result = yield call(requestRes, { resource: 'type', id: type })
      const typeId = result.result
      const typeObj = result.entities.types[typeId]
      let list = typeObj.pokemon

      if (substr) {
        list = list.filter(name => name.includes(substr))
      }
      // console.log('type empty')
      // console.log(list)
      // console.log(list.length)
      yield put(actSetEntities({
        entities: result.entities
      }))
      yield put(actSelectionSuccesBatch({
        items: list,
        isFull: true,
        fullLength: list.length
      }))
      // yield put(actSetPage(1))
      //
    } else {
      //
      yield call(loadPokemonList, substr)
    }
  } catch (e) {
    const msg = 'saga/filter catch err: ' + e.message
    yield put(actSetError(msg))
  }
}

function * watcher () {
  yield takeLatest(CHANGE_FILTER, worker)
}

export default watcher

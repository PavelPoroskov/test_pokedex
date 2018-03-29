import { call, put, take, takeLatest, select } from 'redux-saga/effects'

import { CHANGE_FILTER, SELECTION_CONTINUE } from '../actions/ActionTypes'

import { requestRes, cachePageSize } from '../api/cachedfetch'

import {
  // actClearSelectedItems,
  actSelectionSuccesBatch,
  actSetPage,
  actSetError } from '../actions'

function * loadEnough ({offset, substr, haveLength, toLength}) {
  let isFull = false
  // let list = []
  let toSetPage1 = (offset === 0)

  let newHaveLength = haveLength

  // if (toSetPage1) {
  //   toSetPage1 = false
  //   yield put(actSetPage(1))
  // }

  while (true) {
    const resultNorm = yield call(requestRes, {
      resource: 'pokemon',
      offset
    })
    const result = resultNorm.result
    const list = result.results
    let listBatch = list
    if (substr) {
      listBatch = listBatch.filter(name => name.includes(substr))
    }

    isFull = !result.next

    if (listBatch) {
      newHaveLength = newHaveLength + listBatch.length
      yield put(actSelectionSuccesBatch({
        fullLength: newHaveLength,
        items: listBatch,
        isFull
      }))
      if (toSetPage1) {
        toSetPage1 = false
        yield put(actSetPage(1))
      }
    }

    offset = offset + cachePageSize
    // offset = offset + list.length

    if (toLength <= newHaveLength || isFull) {
      break
    }
  }

  return {
    offset,
    isFull,
    haveLength: newHaveLength
  }
}

// step 1: load enough items
// step 2: add items on event 'SELECTION_CONTINUE'
function * loadPokemonList (substr) {
  //
  // step 1: load enough items
  let offset = 0

  const pageUISize = yield select(state => state.pageSize)
  let haveLength = 0
  let toLength = pageUISize + 1

  const {
    offset: newOffset,
    isFull,
    haveLength: newHaveLength
  } = yield call(loadEnough, {offset, substr, haveLength, toLength})
  offset = newOffset
  haveLength = newHaveLength
  if (isFull) {
    return
  }

  //
  // step 2: add items on event 'SELECTION_CONTINUE'
  while (true) {
    const { needEnd0 } = yield take(SELECTION_CONTINUE)
    // console.log('continue ')
    // if (fromLength <= haveLength) {
    //   // [fromLength-1, min(newToLength,haveLength)-1]
    //   // yield put(actPageUpdate(pageNum))
    // }
    const toEnd0 = needEnd0 + 1
    toLength = toEnd0 + 1
    if (toLength <= haveLength) {
      continue
    }

    const {
      offset: newOffset,
      isFull,
      haveLength: newHaveLength
    } = yield call(loadEnough, {offset, substr, haveLength, toLength})
    offset = newOffset
    haveLength = newHaveLength

    if (isFull) {
      break
    }
  }
  //
}

function * worker (action) {
  try {
    const {type, substr} = yield select(state => state.filter)

    if (type) {
      const result = yield call(requestRes, { resource: 'type', id: type })
      const typeId = result.result
      const typeObj = result.entities.types[typeId]
      let list = typeObj.pokemon

      if (substr) {
        list = list.filter(name => name.includes(substr))
      }
      console.log('type empty')
      console.log(list)
      console.log(list.length)
      yield put(actSelectionSuccesBatch({
        items: list,
        isFull: true,
        fullLength: list.length
      }))
      yield put(actSetPage(1))
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

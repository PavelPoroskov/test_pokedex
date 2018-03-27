import { call, put, takeLatest, select } from 'redux-saga/effects'

import { SET_FILTER } from '../actions/ActionTypes'

import { requestRes, cachePageSize } from '../api/cachedfetch'

import {
  // actClearSelectedItems,
  actSetFilterEnd,
  actSetPage,
  actSetError } from '../actions'

// import { requestBatchSize } from '../constants'

function * worker (action) {
  try {
    // console.log('worker in')
    // const {type, substr} = action
    const {type, substr} = yield select(state => state.filter)

    // yield put(actClearSelectedItems())

    let lowstr
    if (substr) {
      lowstr = substr.trim().toLowerCase()
    }

    let list
    if (type) {
      const result = yield call(requestRes, { resource: 'type', id: type })
      const typeId = result.result
      const typeObj = result.entities.types[typeId]
      list = typeObj.pokemon

      if (lowstr) {
        list = list.filter(name => name.includes(lowstr))
      }
    } else {
      const arr = yield call(requestRes, {
        resource: 'pokemon',
        offset: 0,
        limit: cachePageSize
      })
      // console.log(arr)
      list = []
      for (let i = 0; i < arr.length; i++) {
        let data = yield arr[i]
        if (data.result.results) {
          let listBatch = data.result.results
          console.log('listBatch')
          console.log(listBatch)
          if (lowstr) {
            listBatch = listBatch.filter(name => name.includes(lowstr))
          }

          if (listBatch) {
            list = list.concat(listBatch)
            // actSetFilterBatch(list))
          }
        }
      }

      // console.log('22')
      // console.log(list)
    }

    yield put(actSetFilterEnd(list))
    yield put(actSetPage(1))
    //
  } catch (e) {
    const msg = 'saga/page catch err: ' + e.message
    yield put(actSetError(msg))
  }
}

function * watcher () {
  yield takeLatest(SET_FILTER, worker)
}

export default watcher

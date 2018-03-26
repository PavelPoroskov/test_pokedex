import { call, put } from 'redux-saga/effects'
// import { put } from 'redux-saga/effects'
import { requestRes } from '../api/cachedfetch'

import { actSetTypeList, actSetError } from '../actions'

function * getTypeList () {
  try {
    // const arr = yield all(requestRes, {resource: 'type', offset: 0, limit: 30})
    const arr = yield call(requestRes, {resource: 'type', offset: 0, limit: 30})
    // const arr = requestRes({resource: 'type', offset: 0, limit: 30})
    // console.log(arr)
    let list = []
    for (let i = 0; i < arr.length; i++) {
      let result = yield arr[i]
      if (result.result.results) {
        list = list.concat(result.result.results)
      }
    }

    // console.log(list)

    yield put(actSetTypeList(list))
  } catch (e) {
    const msg = 'saga/getTypeList catch err: ' + e.message
    yield put(actSetError(msg))
  }
}

export default getTypeList

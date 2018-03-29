import { call, put } from 'redux-saga/effects'
// import { put } from 'redux-saga/effects'
import { cachePageSize, requestRes } from '../api/cachedfetch'

import { actSetTypeList, actSetError } from '../actions'

function * getTypeList () {
  try {
    // const arr = yield all(requestRes, {resource: 'type', offset: 0, limit: 30})
    let list = []

    let offset = 0
    while (true) {
      const resultNorm = yield call(requestRes, {
        resource: 'type',
        offset,
        limit: cachePageSize
      })

      const result = resultNorm.result

      list = list.concat(result.results)
      if (!result.next) {
        break
      }
      offset = offset + cachePageSize
    }
    // console.log(list)
    yield put(actSetTypeList(list))
    //
  } catch (e) {
    const msg = 'saga/getTypeList catch err: ' + e.message
    yield put(actSetError(msg))
  }
}

export default getTypeList

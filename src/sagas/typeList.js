import { call, put } from 'redux-saga/effects'
import { requestListPrepare } from '../api/cachedfetch'

import { actSetTypeList, actSetError } from '../actions'

function * getTypeList () {
  try {
    // const arr = yield all(requestRes, {resource: 'type', offset: 0, limit: 30})
    let list = []

    const fnRequestNextPage = requestListPrepare('type')

    while (true) {
      const resultNorm = yield call(fnRequestNextPage)

      const result = resultNorm.result

      list = list.concat(result.results)
      if (!result.next) {
        break
      }
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

import { call, put } from 'redux-saga/effects'
import { requestTypesList } from '../api/cachedfetch'

import { actSetTypeList, actSetError } from '../actions'

function * getTypeList () {
  try {
    const result = yield call(requestTypesList, {offset: 0, limit: 30})
    const list = result.result.results

    yield put(actSetTypeList(list))
  } catch (e) {
    const msg = 'saga/getTypeList catch err: ' + e.message
    yield put(actSetError(msg))
  }
}

export default getTypeList

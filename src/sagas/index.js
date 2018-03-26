import { all } from 'redux-saga/effects'

import watchSetFilter from './filter'
import watchSetPage from './page'
import getTypeList from './typeList'

export default function * rootSaga () {
  yield all([
    watchSetFilter(),
    watchSetPage(),
    getTypeList()
  ])
}

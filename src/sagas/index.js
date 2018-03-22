import { all } from 'redux-saga/effects'

import pokemon from './pokemon'
import type from './type'

export default function * rootSaga () {
  yield all([
    pokemon(),
    type()
  ])
}

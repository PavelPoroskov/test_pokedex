import { call, put, takeLatest, select } from 'redux-saga/effects'

import { SET_FILTER } from '../actions/ActionTypes'

import {
  requestPokemonsList,
  requestType } from '../api/cachedfetch'

import {
  // actClearSelectedItems,
  actSetFilterEnd,
  actSetPage,
  actSetError } from '../actions'

function * worker (action) {
  try {
    // console.log('worker in')
    // const {type, substr} = action
    const {type, substr} = yield select(state => state.filter)

    // yield put(actClearSelectedItems())

    let list
    if (type) {
      const result = yield call(requestType, type)
      const typeId = result.result
      const typeObj = result.entities.types[typeId]
      list = typeObj.pokemon
    } else {
      const result = yield call(requestPokemonsList, action)
      list = result.result.results
    }

    if (substr) {
      const lowstr = substr.trim().toLowerCase()
      list = list.filter(name => name.includes(lowstr))
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

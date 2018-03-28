import { combineReducers } from 'redux'

// import items from './items'
// import itemsById from './itemsById'
// import loadedIntervals from './loadedIntervals'
import typeList from './typeList'

import filter from './filter'
import selectionItems from './selectionItems'
import selectionParams from './selectionParams'

import pageNum from './pageNum'
import pageItems from './pageItems'

import pokemons from './pokemons'
import types from './types'

import pageSize from './pageSize'
import status from './status'

const entities = combineReducers({
  pokemons,
  types
})

const rootReducer = combineReducers({
  typeList,

  filter, // { type, substr }
  selectionItems,
  selectionParams,

  pageNum,
  pageItems,

  entities,
  pageSize,
  status
})

export default rootReducer

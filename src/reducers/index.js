import { combineReducers } from 'redux'

// import items from './items'
// import itemsById from './itemsById'
// import loadedIntervals from './loadedIntervals'

import pokemons from './pokemons'
import types from './types'
import currentSelectedItems from './currentSelectedItems'
import currentPageItems from './currentPageItems'

import filter from './filter'

import pageSize from './pageSize'
import pageNum from './pageNum'
import status from './status'
import typeList from './typeList'

const entities = combineReducers({
  pokemons,
  types
})

const rootReducer = combineReducers({
  typeList,
  filter, // { type, substr }
  currentSelectedItems,
  currentPageItems,
  entities,
  pageSize,
  pageNum,
  status
})

export default rootReducer

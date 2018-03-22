import { combineReducers } from 'redux'

// import items from './items'
// import itemsById from './itemsById'
// import loadedIntervals from './loadedIntervals'

import pokemons from './pokemons'
import types from './types'
import currentPageItems from './currentPageItems'

import filtersubstr from './filtersubstr'
import filtertypes from './filtertypes'

// import pageSize from './pageSize'
// import currentPageNum from './currentPageNum'
// import remoteFullSize from './remoteFullSize'

const entities = combineReducers({
  pokemons,
  types
})

const rootReducer = combineReducers({
  entities,
  currentPageItems,
  // itemsById, // { id1: {...}, id2: {...}, ...}
  // items, // [id1, id2, ...]

  // types, // [name, name2, ...]

  filtersubstr, // "qw"
  filtertypes // , // [name3, name4, ...]

  // pageSize,
  // currentPageNum
//  remoteFullSize

  // loadedIntervals
})

export default rootReducer

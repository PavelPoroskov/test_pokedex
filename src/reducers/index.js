import { combineReducers } from 'redux'

import items from './items'
import itemsById from './itemsById'

import types from './types'

import filtersubstr from './filtersubstr'
import filtertypes from './filtertypes'

import pageSize from './pageSize'
import currentPageNum from './currentPageNum'
import remoteFullSize from './remoteFullSize'

const rootReducer = combineReducers({
  itemsById, // { id1: {...}, id2: {...}, ...}
  items, // [id1, id2, ...]

  types, // [name, name2, ...]

  filtersubstr, // "qw"
  filtertypes, // [name3, name4, ...]

  pageSize,
  currentPageNum,
  remoteFullSize
})

export default rootReducer

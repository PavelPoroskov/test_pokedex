import { combineReducers } from 'redux'

import types from './types'
import pokemons from './pokemons'
import pokemonsById from './pokemonsById'

const rootReducer = combineReducers({
  types, // [name, name2, ...]
  pokemons, // [id1, id2, ...]
  pokemonsById

  // count
  // offset // loadingDone
  // ,
  // filter: combineReducers({
  //   substring: filtersubstr,
  //   types: filtertypes
})

export default rootReducer

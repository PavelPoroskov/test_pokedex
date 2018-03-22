
import { call, put, select } from 'redux-saga/effects'

import { fetchPokemonsList, fetchPokemons } from '../api/cachedfetch'
import { actSetEntities } from '../actions'

export function * sagaFetchPokemonsList (opt) {
  // const {offset, limit} = opt

  // const pageSize = yield select(state => state.pageSize)

  // const data = yield call(fetchPokemonsList, {
  //   limit: limit || pageSize,
  //   offset: offset || 0
  // })
  const data = yield call(fetchPokemonsList, opt)

  return data.result.results
}

// function * sagaFetchPokemons (arNames) {
//   const data = yield call(fetchPokemons, arNames)

//   yield put(actSetEntities({
//     ...data // entities: {...}
//   }))

//   return data.result
// }

export function * sagaFetchPokemons (arNames) {
  const pokemons = yield select(state => state.entities.pokemons)
  const arFiltered = arNames.filter(name => !(name in pokemons))

  if (arFiltered) {
    const data = yield call(fetchPokemons, arFiltered)
    // console.log('data')
    // console.log(data)

    yield put(actSetEntities({
      ...data // entities: {...}
    }))
  }

  return arNames
}

// export default {
//   sagaFetchPokemonsList,
//   sagaFetchPokemons
// }

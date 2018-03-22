// import { normalize } from 'normalizr'
import merge from 'lodash.merge'

import {Pokedex} from './pokeapi-js-wrapper'

// import schemaPokemon from './pokemon.schema.js'

const options = {
  protocol: 'https',
  versionPath: '/api/v2/',
  cache: true // ,
  // timeout: 5 * 1000 // 5s
}
const P = new Pokedex(options)

export const fetchTypesList = () => P.getTypesList()

export const fetchPokemonsList = ({offset, limit}) => {
  return P.getPokemonsList({offset, limit})
}

// export const fetchPokemons = (arr) => {
//   return P.getPokemonByName(arr)
// }

// export const fetchPokemons = (arr) => {
//   return P.getPokemonByName(arr)
//     .then(results => results.map(data => normalize(data, schemaPokemon)))
//     // .then(results => results.map(data => data.entities))
//     .then(results => merge(...results))
// }

export const fetchPokemons = (arr) => {
  return P.getPokemonByName(arr)
    // .then(arRes => arRes.map(item => {
    //   const {result, ...restobj} = item
    //   return {...restobj, result: [result]}
    // }))
    .then(arRes => merge(...arRes))
}

// this module not pass throw npm run build:
//    pokeapi-js-wrapper publish in es6, need es5

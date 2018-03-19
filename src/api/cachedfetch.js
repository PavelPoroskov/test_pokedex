// const Pokedex = require('pokeapi-js-wrapper')
// const P = new Pokedex.Pokedex(options)
import {Pokedex} from './pokeapi-js-wrapper'

const options = {
  protocol: 'https',
  versionPath: '/api/v2/',
  cache: true // ,
  // timeout: 5 * 1000 // 5s
}
const P = new Pokedex(options)

export const getTypesList = () => P.getTypesList()

export const getPokemonsList = ({offset, limit}) => {
  return P.getPokemonsList({offset, limit})
}

export const getArrPokemons = (arr) => {
  return P.getPokemonByName(arr)
}

// this module not pass throw npm run build:
//    pokeapi-js-wrapper publish in es6, need es5

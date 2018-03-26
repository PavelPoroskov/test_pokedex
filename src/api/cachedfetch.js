import {Pokedex} from './pokeapi-js-wrapper'

const options = {
  protocol: 'https',
  versionPath: '/api/v2/',
  cache: true,
  timeout: 40 * 1000 // 5s
}
const P = new Pokedex(options)

export const requestTypesList = ({offset, limit}) =>
  P.getTypesList({offset, limit})

export const requestType = (name) => P.getTypeByName(name)

export const requestPokemonsList = ({offset, limit}) => {
  return P.getPokemonsList({offset, limit})
}

export const requestPokemon = (name) => P.getPokemonByName(name)

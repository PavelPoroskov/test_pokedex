
import { SET_ENTITIES } from '../actions/ActionTypes'

const pokemonRefs = (state = {}, action) => {
  // console.log('reducer pokemons ')
  // console.log(action)
  switch (action.type) {
    case SET_ENTITIES:
      return {
        ...state,
        ...action.entities.pokemonRefs
      }
    default:
      return state
  }
}

export default pokemonRefs

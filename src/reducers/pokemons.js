
import { SET_ENTITIES } from '../actions/ActionTypes'

const pokemons = (state = {}, action) => {
  // console.log('reducer pokemons ')
  // console.log(action)
  switch (action.type) {
    case SET_ENTITIES:
      return {
        ...state,
        ...action.entities.pokemons
      }
    default:
      return state
  }
}

export default pokemons

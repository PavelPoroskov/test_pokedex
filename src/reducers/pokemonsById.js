import {
  //  NET_POKEMONS_REQUEST,
  NET_POKEMONS_SUCCESS_PAGE,
  //  NET_POKEMONS_SUCCESS,
  NET_POKEMONS_FAILURE
} from '../actions/ActionTypes'

const pokemons = (state = {}, action) => {
  switch (action.type) {
    case NET_POKEMONS_SUCCESS_PAGE:

      console.log('Pokemons was loaded')
      console.dir(action.objectsById)
      return { ...state, ...action.objectsById }
    case NET_POKEMONS_FAILURE:

      return {}
    default:
      return state
  }
}

export default pokemons

import { 
  NET_POKEMONS_REQUEST, 
  NET_POKEMONS_SUCCESS_PAGE, 
//  NET_POKEMONS_SUCCESS, 
  NET_POKEMONS_FAILURE
} from '../constants/ActionTypes'


const pokemons = (state = [], action) => {
  switch (action.type) {
    case NET_POKEMONS_SUCCESS_PAGE:

    // debug
      console.log('Pokemons was loaded')
      console.dir(action.list)
      return [ ...state, ...action.list ];
    case NET_POKEMONS_FAILURE:

      return [];
    default:
      return state
  }
}

export default pokemons
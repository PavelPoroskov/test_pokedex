
import { SET_ENTITIES } from '../actions/ActionTypes'

const types = (state = {}, action) => {
  // console.log('reducer types ')
  // console.log(action)
  switch (action.type) {
    case SET_ENTITIES:
      return {
        ...state,
        ...action.entities.types
      }
    default:
      return state
  }
}

export default types

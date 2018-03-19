import {
  NET_POKEMONS_REQUEST,
  //  NET_POKEMONS_SUCCESS_PAGE,
  //  NET_POKEMONS_SUCCESS,
  //  NET_POKEMONS_FAILURE,

  NET_TYPES_REQUEST // ,
  //  NET_TYPES_SUCCESS,
  //  NET_TYPES_FAILURE,
} from './ActionTypes'

export const actFetchPokemons = (pageSize) => ({
  type: NET_POKEMONS_REQUEST,
  pageSize
})

// export const fetchPostsSucceeded = posts => ({
//   type: POSTS_FETCH_SUCCEEDED,
//   posts,
//   receivedAt: Date.now()
// })

// export const fetchPostsFailed = message => ({
//   type: POSTS_FETCH_FAILED,
//   message
// })

export const actFetchTypes = () => ({
  type: NET_TYPES_REQUEST
})

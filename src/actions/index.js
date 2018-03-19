import {
  NET_ITEMS_REQUEST,
  //  NET_ITEMS_SUCCESS_PAGE,
  //  NET_ITEMS_SUCCESS,
  //  NET_ITEMS_FAILURE,

  NET_TYPES_REQUEST // ,
  //  NET_TYPES_SUCCESS,
  //  NET_TYPES_FAILURE,
} from './ActionTypes'

// import { initPageSize } from './constants'

export const actFetchPokemons = () => ({
  type: NET_ITEMS_REQUEST
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

import {
  NET_ITEMS_REQUEST,
  NET_ITEMS_SUCCESS_BATCH,
  //  NET_ITEMS_SUCCESS,
  NET_ITEMS_FAILURE,

  // SET_PAGE_SIZE,
  SET_ENTITIES
  //  NET_TYPES_SUCCESS,
  //  NET_TYPES_FAILURE,
} from './ActionTypes'

// import { initPageSize } from './constants'

// export const actSetPageSize = (pageSize) => ({
//   type: SET_PAGE_SIZE,
//   pageSize
// })

// opt = {resource, offset, limit, id}
export const actFetchPage = (opt) => ({
  type: NET_ITEMS_REQUEST,
  ...opt
})

export const actFetchPageBatchSucces = (opt) => ({
  type: NET_ITEMS_SUCCESS_BATCH,
  ...opt
})
export const actFetchPageFailure = (opt) => ({
  type: NET_ITEMS_FAILURE,
  ...opt
})

export const actSetEntities = (opt) => ({
  type: SET_ENTITIES,
  ...opt
})

// export const actFetchTypes = () => ({
//   type: NET_TYPES_REQUEST
// })

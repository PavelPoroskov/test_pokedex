import {
  // NET_ITEMS_REQUEST,
  //  NET_ITEMS_SUCCESS,
  // NET_ITEMS_FAILURE,

  // SET_PAGE_SIZE,
  SET_FILTER,
  SET_FILTER_END,

  SET_PAGE,
  SET_PAGE_SUCCESS_BATCH,

  SET_ENTITIES,
  SET_ERROR,
  SET_TYPELIST
  //  NET_TYPES_FAILURE,
} from './ActionTypes'

// import { initPageSize } from './constants'

// export const actSetPageSize = (pageSize) => ({
//   type: SET_PAGE_SIZE,
//   pageSize
// })

// opt = {resource, offset, limit, id}
// export const actFetchPage = (opt) => ({
//   type: NET_ITEMS_REQUEST,
//   ...opt
// })

export const actSetFilter = (opt) => ({
  type: SET_FILTER,
  filter: opt
})

export const actSetFilterEnd = (list) => ({
  type: SET_FILTER_END,
  items: list
})

export const actSetPage = (pageNum) => ({
  type: SET_PAGE,
  pageNum
})

export const actSetPageBatchSucces = (opt) => ({
  type: SET_PAGE_SUCCESS_BATCH,
  ...opt
})
// export const actFetchPageFailure = (opt) => ({
//   type: NET_ITEMS_FAILURE,
//   ...opt
// })

export const actSetEntities = (opt) => ({
  type: SET_ENTITIES,
  ...opt
})

export const actSetError = (msg) => ({
  type: SET_ERROR,
  error: msg
})

export const actSetTypeList = (list) => ({
  type: SET_TYPELIST,
  items: list
})

import {
  CHANGE_FILTER,

  SELECTION_CONTINUE,
  SELECTION_SUCCES_BATCH,

  SET_PAGE,
  SET_PAGE_SUCCESS_BATCH,

  SET_TYPELIST,

  SET_ENTITIES,
  SET_ERROR
} from './ActionTypes'

export const actChangeFilter = (opt) => ({
  type: CHANGE_FILTER,
  filter: opt
})

export const actSelectionSuccesBatch = ({items, isFull, fullLength}) => {
  return {
    type: SELECTION_SUCCES_BATCH,
    items,
    fullLength,
    isFull
  }
}

export const actSelectionContinueTo = (needEnd0) => ({
  type: SELECTION_CONTINUE,
  needEnd0
})

export const actSetPage = (pageNum) => ({
  type: SET_PAGE,
  pageNum
})

export const actSetPageSuccesBatch = (items) => {
  // console.log('actSetPageSuccesBatch ')
  // console.log(items)
  return {
    type: SET_PAGE_SUCCESS_BATCH,
    items
  }
}

export const actSetTypeList = (list) => ({
  type: SET_TYPELIST,
  items: list
})

export const actSetEntities = (opt) => ({
  type: SET_ENTITIES,
  ...opt
})

export const actSetError = (msg) => ({
  type: SET_ERROR,
  error: msg
})

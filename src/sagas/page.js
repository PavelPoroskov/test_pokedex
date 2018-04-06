import { call, put, take, takeLatest, select } from 'redux-saga/effects'

import { SET_PAGE, SELECTION_SUCCES_BATCH } from '../actions/ActionTypes'

import { requestRes } from '../api/cachedfetch'

import {
  actSetPageSuccesBatch,
  actSelectionContinueTo,
  actSetEntities,
  actSetError } from '../actions'

// const dFrom = 1522149358224
// const msSince = () =>
//   Date.now() - dFrom

function * loadObjects ({list, preload}) {
  //
  // if (list.length === 0) {
  //   return
  // }

  const storedObjs = yield select(state => state.entities.pokemons)
  const storedRefs = yield select(state => state.entities.pokemonRefs)

  let arComands = []
  let arStored = []
  let arPics = []
  list.forEach(name => {
    if (storedObjs && (name in storedObjs)) {
      arStored.push(name)
    } else {
      if (arStored.length > 0) {
        arComands.push({ names: arStored.slice() })
        arStored = []
      }
      // console.log('start ' + name + ' ' + msSince())
      arComands.push({
        names: [name],
        promise: requestRes({resource: 'pokemon', id: name})
      })
      let id = storedRefs[name].id
      let urlPic = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
      arPics.push(window.fetch(urlPic))
    }
  })
  if (arStored.length > 0) {
    arComands.push({ names: arStored.slice() })
    arStored = []
  }

  for (let i = 0; i < arComands.length; i++) {
    // const fnWrap = x => () => x
    // const result = yield call(fnWrap(arPromises[i]))
    const curCommand = arComands[i]
    if (curCommand.promise) {
      try {
        //
        const resultNorm = yield curCommand.promise
        yield put(actSetEntities({
          entities: resultNorm.entities
        }))
      } catch (e) {
        //
        console.log('FAILD FETCH ' + curCommand.names[0])
      }
      // console.log('output ' + curCommand.names[0] + ' ' + msSince())
    }

    if (!preload) {
      // const isLastBatch = (i === arComands.length - 1)
      // if (curCommand.names.length !== 0) {
      // console.log('put(actSetPageSuccesBatch ' + curCommand.names[0])
      // console.log(curCommand.names)
      yield put(actSetPageSuccesBatch(curCommand.names))
      // }
    }
  }
}

const fnSliceSelection = (beg0, end0) =>
  (state) => state.selectionItems.slice(beg0, end0 + 1)

function * loadAndAdd ({pageSize, pageNum, preload}) {
  let needBeg0 = (pageNum - 1) * pageSize
  const needEnd0 = needBeg0 + pageSize - 1

  // step 1: load item in selection
  const list = yield select(fnSliceSelection(needBeg0, needEnd0))
  yield call(loadObjects, {list, preload})
  needBeg0 = needBeg0 + list.length
  //
  // step 2: request add items
  if (needBeg0 <= needEnd0) {
    // console.log('please continue load list ' + needEnd0)
    yield put(actSelectionContinueTo(needEnd0))
  }

  while (needBeg0 <= needEnd0) {
    const {fullLength} = yield take(SELECTION_SUCCES_BATCH)

    const haveEnd0 = Math.min(needEnd0, fullLength - 1)

    if (needBeg0 <= haveEnd0) {
      // console.log('needBeg0 <= haveEnd0 ' + needBeg0 + '  ' + haveEnd0)
      const list = yield select(fnSliceSelection(needBeg0, haveEnd0))
      yield call(loadObjects, {list, preload})
      // console.log('output added ' + needBeg0 + ', ' + haveEnd0)
      needBeg0 = haveEnd0 + 1
    } else {
      break
    }
  }
}

function * worker (action) {
  try {
    const pageSize = yield select(state => state.pageSize)
    const pageNum = action.pageNum || 1

    // main load for current page
    yield call(loadAndAdd, {pageNum, pageSize})

    // preload for next page
    yield call(loadAndAdd, {pageNum: pageNum + 1, pageSize, preload: true})
    //
  } catch (e) {
    const msg = 'saga/page catch err: ' + e.message
    yield put(actSetError(msg))
  }
}

function * watcher () {
  yield takeLatest(SET_PAGE, worker)
}

export default watcher

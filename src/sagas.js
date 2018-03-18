
import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'

import { 
  NET_POKEMONS_REQUEST, 
  NET_POKEMONS_SUCCESS_PAGE, 
//  NET_POKEMONS_SUCCESS, 
  NET_POKEMONS_FAILURE,

  NET_TYPES_REQUEST,
  NET_TYPES_SUCCESS,
  NET_TYPES_FAILURE,
} from './constants/ActionTypes'


function apifetch(url) {

  return fetch(url)
          .then(response => response.json())
}

function* workerTypes(action) {

   try {

      let url = 'https://pokeapi.co/api/v2/type?limit=100';

      const data = yield call( apifetch, url );
      const list = data.results.map( item => item.name )

      yield put( { 
        type: NET_TYPES_SUCCESS 
        list: list
      } );

   } catch (e) {

      yield put( { type: NET_TYPES_FAILURE, error: e.message } );
   }
}

function* watcherTypes() {
  yield takeLatest( NET_TYPES_REQUEST, workerTypes );
}

function* workerPage(action) {
   try {

      let url = 'https://pokeapi.co/api/v2/pokemon/?limit=40';

      while (true) {
        const data = yield call( apifetch, url );

        let ar = []
        let objRes = {};
        let list=[];
        for (let i=0; i < data.results.length; i++ ){
          if (ar.length < 5) {
            ar.push( call( apifetch, data.results[i].url ) );
          }else{
            let artemp = yield all(ar);
            ar = [];

            artemp.forEach( objItem => {
              objRes[objItem.id] = objItem
              list.push(objItem.id);
            } );
          }
        }

        if ( 0 < ar.length) {
          let arres = yield all(ar);
          ar = [];

          artemp.forEach( objItem => {
            objRes[objItem.id] = objItem
            list.push(objItem.id);
          } );        
        }

        yield put( { 
          type: NET_POKEMONS_SUCCESS_PAGE, 
          objectsById: objRes,
          list: list
        } )

        //debug
        break

        if (!data.next) {
          break
        }
        url = data.next
      }

//      yield put( { type: NET_POKEMONS_SUCCESS } );

   } catch (e) {

      yield put( { type: NET_POKEMONS_FAILURE, error: e.message } );
   }
}


function* watcherPage() {
  yield takeLatest( NET_POKEMONS_REQUEST, workerSaga );
}

export default function* rootSaga() {
  yield all([
    watcherPage(),
    watcherTypes()
  ])
}

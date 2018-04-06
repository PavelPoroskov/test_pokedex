// import 'whatwg-fetch'
import axios from 'axios'

import localForage from 'localforage'

import { normalize } from 'normalizr'
import schemas from './schemas'

export const cachePageSize = 20

const CACHE_PREFIX = 'pokedex-test-'
// const urlApi = 'https://pokeapi.co/api/v2/'
const msTimeout = 20 * 1000 // 20 sek
// const secTimeout = msTimeout / 1000

// const dFrom = 1522149358224
// const msSince = () =>
//   Date.now() - dFrom

function apiFetch (url, schema) {
  // return Promise.race([
  //   //
  //   window.fetch(`${urlApi}${url}`)
  //     .then(response => response.json())
  //     .then(json => {
  //       // console.log('received ' + url + ' ' + msSince())
  //       let data = json
  //       if (schema) {
  //         data = normalize(data, schema)
  //       }

  //       localForage.setItem(`${CACHE_PREFIX}${url}`, data)

  //       return data
  //     }),
  //   //
  //   new Promise((resolve, reject) => {
  //     setTimeout(reject, msTimeout,
  //       'Timeout error, ' + secTimeout + ' sek. ' + url)
  //   })
  // ])

  return new Promise((resolve, reject) => {
    let options = {
      baseURL: 'https://pokeapi.co/',
      timeout: msTimeout
    }
    axios.get(`/api/v2/${url}`, options)
      .then(response => {
        // if there was an error
        if (response.status >= 400) {
          reject(response)
        } else {
          let data = response.data
          if (schema) {
            data = normalize(data, schema)
          }
          localForage.setItem(`${CACHE_PREFIX}${url}`, data)

          resolve(data)
        }
      })
      .catch(err => { reject(err) })
  })
}

const apiCachedBefore = () => {
  //
  let pmReady = localForage.ready()
  //
  return (url, schema) => {
    return new Promise((resolve, reject) => {
      pmReady
        .then(() => {
          localForage.getItem(`${CACHE_PREFIX}${url}`)
            .then(value => {
              if (value === null) {
                apiFetch(url, schema)
                  .then(res => { resolve(res) })
                  .catch(err => { reject(err) })
              } else {
                resolve(value)
              }
            })
            .catch(() => {
              apiFetch(url, schema)
                .then(res => { resolve(res) })
                .catch(err => { reject(err) })
            })
        })
        .catch(() => {
          apiFetch(url, schema)
            .then(res => { resolve(res) })
            .catch(err => { reject(err) })
        })
    })
  }
}

const apiCached = apiCachedBefore()

// return one promese
export function requestRes ({resource, id, offset}) {
  if (!resource) {
    return
  }

  // if (!id || (!offset && !limit)) {
  if (!id && offset === undefined) {
    return
  }

  // const urlRes = `${urlApi}${resource}/`
  const urlRes = `${resource}/`

  if (id) {
    let schema = schemas[resource]
    return apiCached(`${urlRes}${id}/`, schema)
  } else {
    if (offset % cachePageSize) {
      return
    }
    let schema = schemas[`${resource}List`]
    const url = `${urlRes}?offset=${offset}&limit=${cachePageSize}`
    return apiCached(url, schema)
  }
}

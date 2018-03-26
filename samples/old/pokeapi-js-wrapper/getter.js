import axios from 'axios'
import localForage from 'localforage'

import { values } from './default.js'

import { normalize } from 'normalizr'
import schemas from '../schemas'

const CACHE_PREFIX = 'pokeapi-js-wrapper-'

function loadResource (url, restEndpoint) {
  return new Promise((resolve, reject) => {
    localForage.ready()
      .then(() => {
        localForage.getItem(`${CACHE_PREFIX}${url}`)
          .then(value => {
            if (value === null) {
              loadUrl(url, restEndpoint).then(res => { resolve(res) })
                .catch(err => { reject(err) })
            } else {
              resolve(addCacheMark(value))
            }
          })
          .catch(() => {
            loadUrl(url, restEndpoint).then(res => { resolve(res) })
              .catch(err => { reject(err) })
          })
      })
      .catch(() => {
        loadUrl(url, restEndpoint).then(res => { resolve(res) })
          .catch(err => { reject(err) })
      })
  })
}

function loadUrl (url, restEndpoint) {
  return new Promise((resolve, reject) => {
    let options = {
      baseURL: `${values.protocol}://${values.hostName}/`,
      timeout: values.timeout
    }
    axios.get(url, options)
      .then(response => {
        // if there was an error
        if (response.status >= 400) {
          reject(response)
        } else {
          // // if everything was good
          // // cache the object in browser memory
          // // only if cache is true
          // if (values.cache) {
          //   localForage.setItem(`${CACHE_PREFIX}${url}`, response.data)
          // }
          // resolve(addCacheMark(response.data, 0))

          let data = response.data
          if (restEndpoint) {
            let strRestEndpoint = restEndpoint
            if (restEndpoint[restEndpoint.length - 1] === '/') {
              strRestEndpoint = restEndpoint.slice(0, -1) + 'List'
            }
            if (schemas[strRestEndpoint]) {
              data = normalize(data, schemas[strRestEndpoint])
              // data = data.entities
            }
          }
          if (values.cache) {
            localForage.setItem(`${CACHE_PREFIX}${url}`, data)
          }
          resolve(data)
        }
      })
      .catch(err => { reject(err) })
  })
}

function addCacheMark (object, cached = 1) {
  // object.fromCache = cached
  return object
}

export { loadResource }

// import {Pokedex} from './pokeapi-js-wrapper'
import 'whatwg-fetch'
import localForage from 'localforage'

import { normalize } from 'normalizr'
import schemas from './schemas'

const CACHE_PREFIX = 'pokedex-test-'

const urlApi = 'https://pokeapi.co/api/v2/'
const cachePageSize = 20
const msTimeout = 20 * 1000 // 20 sek
const secTimeout = msTimeout / 1000

function apiFetch (url, schema) {
  return window.fetch(`${urlApi}${url}`)
    .then(response => response.json())
    .then(json => {
      let data = json
      if (schema) {
        data = normalize(data, schema)
      }

      localForage.setItem(`${CACHE_PREFIX}${url}`, data)

      return data
    })
}

function apiTimeouted (url, schema) {
  var timeoutErr = new Promise((resolve, reject) => {
    setTimeout(reject, msTimeout,
      'Timeout error, ' + secTimeout + ' sek. ' + url)
  })

  return Promise.race([apiFetch(url, schema), timeoutErr])
}

function apiCached (url, schema) {
  return new Promise((resolve, reject) => {
    localForage.ready()
      .then(() => {
        localForage.getItem(`${CACHE_PREFIX}${url}`)
          .then(value => {
            if (value === null) {
              apiTimeouted(url, schema)
                .then(res => { resolve(res) })
                .catch(err => { reject(err) })
            } else {
              resolve(value)
            }
          })
          .catch(() => {
            apiTimeouted(url, schema)
              .then(res => { resolve(res) })
              .catch(err => { reject(err) })
          })
      })
      .catch(() => {
        apiTimeouted(url, schema)
          .then(res => { resolve(res) })
          .catch(err => { reject(err) })
      })
  })
}

// return array of promeses
export function requestRes ({resource, id, offset, limit}) {
  let arrProm = []
  if (!resource) {
    return arrProm
  }

  // if (!id || (!offset && !limit)) {
  if (!(id || limit)) {
    return arrProm
  }

  // const urlRes = `${urlApi}${resource}/`
  const urlRes = `${resource}/`

  if (id) {
    let schema = schemas[resource]
    let ids = id
    if (!(id instanceof Array)) {
      // ids = [id]
      return apiCached(`${urlRes}${id}/`, schema)
    }

    ids.forEach(id => {
      arrProm.push(apiCached(`${urlRes}${id}/`, schema))
    })
  } else {
    // const cachePageSize = 20

    const reqestBeg = (offset || 0) + 1
    const reqestEnd = reqestBeg + limit - 1

    // console.log(' reqestBeg ' + reqestBeg + ' ')
    // console.log(' reqestEnd ' + reqestEnd + ' ')

    const pageInd1Beg = (reqestBeg % cachePageSize) || cachePageSize
    const pagedBeg = reqestBeg - pageInd1Beg + 1

    const pageInd1End = (reqestEnd % cachePageSize) || cachePageSize
    const pagedEnd = reqestEnd - pageInd1End + cachePageSize

    let schema = schemas[`${resource}List`]

    let curPageBeg = pagedBeg
    let curOffset, url

    const fnSlice = (result, curPageBeg) => {
      const curPageEnd = curPageBeg + cachePageSize - 1
      let todoSlice = false
      let beg0 = 0
      if (curPageBeg <= reqestBeg && reqestBeg <= curPageEnd) {
        beg0 = reqestBeg - curPageBeg
        todoSlice = true
      }
      let end0 = cachePageSize - 1
      if (curPageBeg <= reqestEnd && reqestEnd <= curPageEnd) {
        end0 = reqestEnd - curPageBeg
        todoSlice = true
      }
      if (!todoSlice) {
        return result
      }
      return result.slice(beg0, end0 + 1)
    }

    // console.log(' curPageBeg ' + curPageBeg + ' ')
    // console.log(' pagedEnd ' + pagedEnd + ' ')
    while (curPageBeg < pagedEnd) {
      // console.log(' beg ' + curPageBeg + ' ')
      curOffset = curPageBeg - 1
      url = `${urlRes}?offset=${curOffset}&limit=${cachePageSize}`
      // eslint-disable-next-line
      let promiseRes = apiCached(url, schema).then(result => fnSlice(result, curPageBeg))

      arrProm.push(promiseRes)

      curPageBeg = curPageBeg + cachePageSize
    }
  }

  return arrProm
}

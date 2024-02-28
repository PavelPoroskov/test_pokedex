import { normalize } from 'normalizr'
import schemas from './schemas'

const cachePageSize = 20

// const CACHE_PREFIX = 'pokedex-test-'
// const urlApi = 'https://pokeapi.co/api/v2/'
// const msTimeout = 20 * 1000 // 20 sek
// const secTimeout = msTimeout / 1000

// const dFrom = 1522149358224
// const msSince = () =>
//   Date.now() - dFrom

async function apiFetch (url, schema) {
  const response = await fetch(`https://pokeapi.co/api/v2/${url}`)

  if (!response.ok) {
    throw new Error(`Error on fetch: ${response.statusText}`)
  }
  let data = await response.json()
  // console.log('result', result)
  // let data = result.data

  if (schema) {
    data = normalize(data, schema)
  }

  return data
}

// return one promese
export function requestRes ({ resource, id, offset }) {
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
    const schema = schemas[resource]

    return apiFetch(`${urlRes}${id}/`, schema)
  } else {
    if (offset % cachePageSize) {
      return
    }
    const schema = schemas[`${resource}List`]
    const url = `${urlRes}?offset=${offset}&limit=${cachePageSize}`

    return apiFetch(url, schema)
  }
}

export function requestListPrepare (resource) {
  if (!resource) {
    return
  }

  let savedOffset = 0
  const savedCachePageSize = cachePageSize

  return () => {
    const offset = savedOffset
    savedOffset = savedOffset + savedCachePageSize

    return requestRes({
      resource,
      offset
    })
  }
}

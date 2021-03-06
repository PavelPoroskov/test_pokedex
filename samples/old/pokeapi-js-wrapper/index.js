import endpoints from './endpoints.json'
import rootEndpoints from './rootEndpoints.json'
import { loadResource } from './getter.js'
import { values } from './default.js'
import { configurator } from './configurator.js'

// import merge from 'lodash.merge'
// import schemas from '../schemas'

export class Pokedex {
  constructor (config) {
    configurator.setPokedexConfiguration(config)
    configurator.setRootEndpointConfiguration(config)

    // add to Pokedex.prototype all our endpoint functions
    endpoints.forEach(endpoint => {
      this[endpoint[0]] = input => {
        if (input) {
          // if the user has submitted a Name or an ID, return the JSON promise
          if (typeof input === 'number' || typeof input === 'string') {
            return loadResource(`${values.versionPath}${endpoint[1]}/${input}/`, endpoint[1])
          } else if (typeof input === 'object') {
          // if the user has submitted an Array
          // return a new promise which will resolve when all loadResource calls are ended
            return Promise.all(mapResources(endpoint, input))

            // if (schemas[endpoint[1]]) {
            //   return Promise.all(mapResources(endpoint, input))
            //     .then(results => merge(...results))
            // } else {
            //   return Promise.all(mapResources(endpoint, input))
            // }
          }
        }
      }
    })

    rootEndpoints.forEach(rootEndpoint => {
      this[rootEndpoint[0]] = config => {
        var limit = values.limit
        var offset = values.offset
        if (config) {
          if (config.hasOwnProperty('offset')) {
            offset = config.offset
          }
          if (config.hasOwnProperty('limit')) {
            limit = config.limit
          }
        }
        return loadResource(`${values.versionPath}${rootEndpoint[1]}?limit=${limit}&offset=${offset}`,
          rootEndpoint[1])
      }
    })
  }

  resource (path) {
    if (typeof path === 'string') {
      return loadResource(path)
    } else if (typeof path === 'object') {
      return Promise.all(path.map(p => loadResource(p)))
    } else {
      return 'String or Array is required'
    }
  }
}

function mapResources (endpoint, input) {
  return input.map(res => {
    return loadResource(`${values.versionPath}${endpoint[1]}/${res}/`, endpoint[1])
  })
}


// import { normalize, schema } from 'normalizr'
import { schema } from 'normalizr'

const pokemonRef = new schema.Entity('pokemonRefs', {}, {
  idAttribute: 'name',
  // idAttribute: (entity) => {
  //   let ar = entity.url.split('/')
  //   let id = ar[ar.length - 2]
  //   id = parseInt(id, 10)
  //   return id
  // },
  processStrategy: (entity) => {
    const {
      url,
      name,
      ...restobj
    } = entity

    let ar = url.split('/')
    let id = ar[ar.length - 2]
    id = parseInt(id, 10)

    return {
      url,
      name,
      id,
      ...restobj
    }
  }
})

const result = { results: [pokemonRef] }

export default result

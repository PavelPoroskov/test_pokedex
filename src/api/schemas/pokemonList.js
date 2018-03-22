
// import { normalize, schema } from 'normalizr'
import { schema } from 'normalizr'

const pokemonRef = new schema.Entity('pokemonRefs', {}, {
  idAttribute: 'name'
})

const result = { results: [pokemonRef] }

export default result

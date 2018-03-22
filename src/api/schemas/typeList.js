
// import { normalize, schema } from 'normalizr'
import { schema } from 'normalizr'

const typeRef = new schema.Entity('typeRefs', {}, {
  idAttribute: 'name'
})

const result = { results: [typeRef] }

export default result

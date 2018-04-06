
// import { normalize, schema } from 'normalizr'
import { schema } from 'normalizr'

const pokemonRef = new schema.Entity('pokemonRefs', {}, {
  // idAttribute: (entity) => {
  //   let ar = entity.url.split('/')
  //   let id = ar[ar.length - 2]
  //   id = parseInt(id, 10)
  //   return id
  // },
  idAttribute: 'name',
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

const type = new schema.Entity('types',
  {
    pokemon: [ pokemonRef ]
  },
  {
    idAttribute: 'name',
    processStrategy: (entity) => {
      const {
        // omit
        damage_relations: omit1,
        game_indices: omit2,
        generation,
        move_damage_class: omit3,
        names,
        moves,
        // transform
        pokemon,
        ...restobj
      } = entity

      return {
        ...restobj,
        pokemon: pokemon.map(one => one.pokemon)
      }
    }
  }
)

export default type

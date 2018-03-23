
// import { normalize, schema } from 'normalizr'
import { schema } from 'normalizr'

const pokemonRef = new schema.Entity('pokemonRefs', {}, {
  idAttribute: 'name'
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

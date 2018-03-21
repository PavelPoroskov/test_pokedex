
// import { normalize, schema } from 'normalizr'
import { schema } from 'normalizr'

const type = new schema.Entity('types', {}, {
  idAttribute: 'name'
})

const capitalizeStr = (s) =>
  s && s[0].toUpperCase() + s.slice(1)

const pokemon = new schema.Entity('pokemons',
  {
    types: [ type ]
  },
  {
    idAttribute: 'id',
    processStrategy: (entity) => {
      const {
        // omit
        base_experience: omit1,
        is_default: omit2,
        abilities,
        forms,
        game_indices: omit3,
        held_items: omit4,
        location_area_encounters: omit5,
        moves,
        species,
        // transform
        sprites,
        stats,
        types,
        name,
        ...restobj
      } = entity

      // return {
      //   ...restobj,
      //   name,
      //   Name: capitalizeStr(name),
      //   types: types.map(old => old.type),
      //   stats: stats.reduce((oSum, item) => {
      //     oSum[item.stat.name] = item.base_stat
      //     return oSum
      //   }, {})
      // }
      return {
        ...restobj,
        ...sprites,
        name,
        Name: capitalizeStr(name),
        types: types.map(old => old.type),
        ...stats.reduce((oSum, item) => {
          oSum[item.stat.name] = item.base_stat
          return oSum
        }, {}),
        total: stats.reduce((sum, item) => sum + item.base_stat, 0)
      }
    }
  }
)

// const normalizedData = normalize(originalData, pokemon)

export default pokemon

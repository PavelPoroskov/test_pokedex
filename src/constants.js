export const initPageSize = 3

// column
export const arColumns = [
  { column: 'avatar',
    title: '#',
    from: 'front_default',
    type: 'image',
    className: 'avatar'
  },
  { column: 'name',
    title: 'Name',
    from: 'Name',
    className: 'name'
  },
  // { column: 'id',
  //   title: '',
  //   from: 'id',
  //   className: 'id'
  // },
  { column: 'types',
    title: 'Type',
    from: 'types',
    type: 'tags',
    className: 'col-types'
  },
  { column: 'total',
    title: 'Total',
    from: 'total',
    className: 'number number-total'
  },
  { column: 'hp',
    title: 'HP',
    from: 'hp',
    className: 'number'
  },
  { column: 'attack',
    title: 'Attack',
    from: 'attack',
    className: 'number'
  },
  { column: 'defense',
    title: 'Defense',
    from: 'defense',
    className: 'number'
  },
  { column: 'sp_attack',
    title: 'Sp. Atk',
    from: 'special-attack',
    className: 'number'
  },
  { column: 'sp_defense',
    title: 'Sp. Def',
    from: 'special-defense',
    className: 'number'
  },
  { column: 'speed',
    title: 'Speed',
    from: 'speed',
    className: 'number'
  }
]

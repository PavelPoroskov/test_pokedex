// import {cachePageSize} from './api/cachedfetch'

export const initUIPageSize = 7

export const PaginationNumBtnsQuantity = 8

export const STATUS_NOSTATUS = 'STATUS_NOTSTATUS'
export const STATUS_REQUEST = 'STATUS_REQUEST'
export const STATUS_LOADING = 'STATUS_LOADING'
export const STATUS_SUCCES = 'STATUS_SUCCES'
export const STATUS_ERROR = 'STATUS_ERROR'

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

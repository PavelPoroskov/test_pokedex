import React, { Component } from 'react'

import FilterName from '../FilterName'
import FilterType from '../FilterType'
import TablePagination from '../TablePagination'
import TableWithData from '../TableWithData'

// import '../../styles/css/App.css'
import './App.styl'

class App extends Component {
  render () {
    return (
      <div className='App'>
        <div className='AppHeader'>
          Pokedex. v0.2
        </div>
        <div className='Filter'>
          <FilterName />
          <FilterType />
        </div>
        <TableWithData />
        <TablePagination />
      </div>
    )
  }
}

export default App

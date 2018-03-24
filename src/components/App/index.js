import React, { Component } from 'react'

import FilterName from '../FilterName'
import FilterType from '../FilterType'
import TablePagination from '../TablePagination'
import TableWithData from '../TableWithData'

import './App.css'

class App extends Component {
  render () {
    return (
      <div className='App'>
        <div className='AppHeader'>
          <h1>Pokedex</h1>
        </div>
        <div className='Filter'>
          <FilterType />
          <FilterName />
        </div>
        <TablePagination />
        <TableWithData />
      </div>
    )
  }
}

export default App

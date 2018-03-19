import React, { Component } from 'react'

import TableWithData from '../../containers/TableWithData'

import './App.css'

class App extends Component {
  render () {
    return (
      <div className='App'>
        <div className='AppHeader'>
          <h1>Pokedex</h1>
        </div>
        <div className='AppFilter'>
          Filter
        </div>
        <TableWithData />
      </div>
    )
  }
}

export default App

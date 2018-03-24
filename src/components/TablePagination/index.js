import React, { Component } from 'react'
// import PropTypes from 'prop-types'
// import { connect } from 'react-redux'

// import { actFetchPage } from '../../actions'

class TablePagination extends Component {
  // constructor (props) {
  //   super(props)

  //   this.handleClick = this.handleClick.bind(this)
  // }

  // shouldComponentUpdate (nextProps, nextState) {
  //   return (nextProps.ids !== this.props.ids)
  // }

  // handleClick (e) {
  //   e.preventDefault()
  //   this.props.onClick()
  // }

  render () {
    // console.log('render TypeLabel ')

    // const tag = this.props.id
    return (
      <nav aria-label='Page navigation example'>
        <ul className='pagination justify-content-end'>
          <li className='page-item disabled'>
            <a className='page-link' href='#'>Previous</a>
          </li>
          <li className='page-item'><a className='page-link' href='#'>1</a></li>
          <li className='page-item'><a className='page-link' href='#'>2</a></li>
          <li className='page-item active'><a className='page-link' href='#'>3</a></li>
          <li className='page-item'>
            <a className='page-link' href='#'>Next</a>
          </li>
        </ul>
      </nav>
    )
  }
}

// TablePagination.propTypes = {
//   id: PropTypes.string.isRequired,
//   onClick: PropTypes.func.isRequired
// }

// const mapDispatchToProps = (dispatch, ownProps) => ({
//   onClick: () => {
//     dispatch(actFetchPage({
//       resource: 'type',
//       id: ownProps.id
//     }))
//   }
// })

// export default connect(null, mapDispatchToProps)(TablePagination)
export default TablePagination

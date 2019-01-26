import React, { Component } from 'react'
import searchimg from '../../img/searchimg.svg'
import { NavLink } from 'react-router-dom'
import {searchQuery} from '../../redux/actions/searchQueryAction'
import { connect } from 'react-redux'

class SearchForm extends Component {
  state = {
    searchRec: ''
  }

  _handleChange = (e) => {
    this.setState({ searchRec: e.target.value })

  }

  _handleSubmit = async (e) => {
    e.preventDefault()
    this.props.addQuery(this.state)

  }
  


  render() {

    const {searchRec} = this.state
    return (
      <form onSubmit={this._handleSubmit}>
        <div className="field has-addons">
          <div className="box">
            <div className="search-bar-box">
              <input 
              type="search" 
              id="search" 
              onChange={this._handleChange}
              placeholder="Search artists, albums and more..." />
              <NavLink to={`/search-page/${searchRec}`}>
                <button className="icon"><img src={searchimg} width="12px" alt="search" /></button>
              </NavLink>
              </div>
          </div>
        </div>
      </form>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addQuery: (query) => dispatch(searchQuery(query))
  }
}

export default connect(null, mapDispatchToProps)(SearchForm);
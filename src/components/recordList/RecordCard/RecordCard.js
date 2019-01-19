import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { truncateString, stripTitle } from '../../../services/helper'
import ActionBar from '../ActionBar/ActionBar'
import vinyl from '../../../img/vinyl.svg'
 
export default class RecordCard extends Component {
  static propTypes = {
    id: PropTypes.number,
    title: PropTypes.string,
    year: PropTypes.string,
    cover_image: PropTypes.string,
    label: PropTypes.array,
    style: PropTypes.array,
    genre: PropTypes.array,
    format: PropTypes.array,
    country: PropTypes.string,
    catno: PropTypes.string
  }

  constructor(props){
    super(props)
    this.state = {isFavorite: false}
  }

  componentDidMount(){
    // const {id} = this.props
    // if(this.isFavorite(id)){
    //   this.setState({isFavorite:true},()=>{})
    // }
  }

  // manageFavs = (id) => {

  //   const favorites = this.getFavorites()
    
  //   this.isFavorite(id) >= 0 ? favorites.splice(favorites.indexOf(id.toString()), 1) : favorites.push(id)
  //   localStorage.setItem('favorites',JSON.stringify(favorites))
  // }

  // getFavorites = () =>{
  //   let favorites = localStorage.getItem('favorites')
  //   return favorites ? favorites : []
  // }

  // isFavorite = (id) => {
  //   const recordId = this.getFavorites().indexOf(id.toString())
  //   return recordId >= 0
  // }

  renderLabel(param){
    switch(param) {
      case 'artist':
        return <p className="list-card-type-a">{ param.toUpperCase() }</p> 
      case 'label':
        return <p className="list-card-type-l">{ param.toUpperCase() }</p> 
      default:
        return undefined
    }
  }

  render () {
    const { id, cover_image, title, year, catno, type } = this.props
        
    return (

      <div className="list-card">
        <figure className="figure-card">
          <img
            className= "img-card"
            alt={id}
            src={ cover_image === 'https://img.discogs.com/images/spacer.gif' ? vinyl : cover_image}
            />
        </figure>
        <ActionBar id={id} type={type}/>
        <div className="list-card-body">
          <div className="list-card-line">
            { this.renderLabel(type) }
            <div className="list-card-t-line">
              <p className="list-card-artist">{ truncateString(stripTitle(title)[0]) }</p>
              <p className="list-card-year">{ year }</p>
            </div>
          </div>
          <div className="list-card-line">    
            <p className="list-card-title">{ truncateString(stripTitle(title)[1]) }</p>
            <p className="list-card-catno">{ catno }</p>
          </div>
        </div>
      </div>

    )
  }
}

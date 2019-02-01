import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { truncateString, stripTitle } from '../../../services/helper'
import ActionBar from '../ActionBar/ActionBar'
import vinyl from '../../../img/vinyl.svg'
import { connect } from 'react-redux';


class RecordCard extends Component {

  static propTypes = {
    id: PropTypes.number,
    title: PropTypes.string,
    year: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]),
    cover_image: PropTypes.string,
    label: PropTypes.array,
    style: PropTypes.array,
    genre: PropTypes.array,
    format: PropTypes.array,
    country: PropTypes.string,
    catno: PropTypes.string
  }


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

  cssId(cssClass){
    const {comingFrom} = this.props
    if(comingFrom === 'pageDetail'){
      return cssClass + '-sm'
    } else {
      return cssClass
    }
  }
  

  render () {
    const { id, cover_image, title, year, catno, type, artist, user, comingFrom, exchangeItems } = this.props
    const actionProps = { 
      id, 
      cover_image, 
      title,
      year, 
      catno, 
      type,
      user, 
      artist
    }

    return (

      

      <div className={this.cssId('list-card')}>
        <figure className={this.cssId('figure-card')}>
          <img
            className= {this.cssId('img-card')}
            alt={id}
            src={ cover_image === 'https://img.discogs.com/images/spacer.gif' ? vinyl : cover_image}
            />
        </figure>
        {exchangeItems && <ActionBar user={user} id={id} type={type} actionProps={actionProps} exchangeId={exchangeItems.map(a => a.idRelease)}/>}
        <div className={this.cssId('list-card-body')}>
          <div className={this.cssId('list-card-line')}>
            { this.renderLabel(type) }
            <div className={this.cssId('list-card-t-line')}>
              <p className={this.cssId('list-card-artist')}>
              { comingFrom === 'pageDetail'
              ? truncateString(artist,18)
              : truncateString(stripTitle(title)[0]) }
              </p>
              <p className={this.cssId('list-card-year')}>{ year }</p>
            </div>
          </div>
          <div className={this.cssId('list-card-line')}>    
            <p className={this.cssId('list-card-title')}>
            { comingFrom === 'pageDetail'
            ? truncateString(title, 18)
            : truncateString(stripTitle(title)[1])}
            </p>
            <p className={this.cssId('list-card-catno')}>{ truncateString(catno,14) }</p>
          </div>
        </div>
      </div>

    )
  }
}


const mapStateToProps = (state) => {
  return {
    user: state.userReducer.user,
    exchangeItems: state.exchangeReducer.exchangeItems
  }
}

export default connect(mapStateToProps)(RecordCard);
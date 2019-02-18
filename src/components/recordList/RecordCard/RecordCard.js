import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { truncateString, stripTitle } from '../../../services/helper'
import ActionBar from '../ActionBar/ActionBar'
import vinyl from '../../../img/vinyl.svg'

class RecordCard extends Component {

  static propTypes = {
    id: PropTypes.number,
    title: PropTypes.string,
    year: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]),
    cover_image: PropTypes.string,
    label: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.array
    ]),
    style: PropTypes.array,
    genre: PropTypes.array,
    format: PropTypes.array,
    country: PropTypes.string,
    catno: PropTypes.string,
    cardType: PropTypes.string
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
    const {card} = this.props
    if(card.cardType === 'small'){
      return cssClass + '-sm'
    } else {
      return cssClass
    }
  }

  render () {
    const { card, cardType } = this.props
    console.log(card)
    return (

      <div className={this.cssId('list-card')}>
        <figure className={this.cssId('figure-card')}>
        {<Link to={`/${card.type === 'artist' 
            ? 'detail' : card.type === 'label' 
            ? 'detail' : 'record'}/${card.type}s/${card.id}`}>
            <img
            className= {this.cssId('img-card')}
            alt={card.id}
            src={ card.cover_image === 'https://img.discogs.com/images/spacer.gif' ? vinyl : card.cover_image}
            />
          </Link>}
        </figure>
        <ActionBar user={card.user} id={card.id} type={card.type} actionProps={{...card}}/>
        <div className={this.cssId('list-card-body')}>
          <div className={this.cssId('list-card-line')}>
            { this.renderLabel(card.type) }
            <div className={this.cssId('list-card-t-line')}>
              <p className={this.cssId('list-card-artist')}>
              { cardType === 'big'
              ? truncateString(card.artist,18)
              : truncateString(stripTitle(card.title)[0]) }
              </p>
              <p className={this.cssId('list-card-year')}>{ card.year }</p>
            </div>
          </div>
          <div className={this.cssId('list-card-line')}>    
            <p className={this.cssId('list-card-title')}>
            { card.cardType === 'big' && card.type !== 'artist'
            ? truncateString(card.title, 18)
            : truncateString(stripTitle(card.title)[1])}
            </p>
            <p className={this.cssId('list-card-catno')}>{ truncateString(card.catno,14) }</p>
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
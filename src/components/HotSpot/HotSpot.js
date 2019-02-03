import React, { Component } from 'react';
import vinyl from '../../img/vinyl.svg'
import { truncateString, stripTitle } from '../../services/helper'
import { connect } from 'react-redux';
import {Link} from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class HotSpot extends Component {

  render() {

  const {hotSpot} = this.props

    return (

      hotSpot &&
      <div className="hot-spot-blocks">
        <h1 className="page-h1">
        <FontAwesomeIcon style={{padding: '0', width: '0.7em', paddingRight: '5px'}} icon="fire" /> 
        Hot Now
        </h1>
        <div className="hot-spot-cards">
        {hotSpot.map(i => 
        <div key={i.catno} className='list-card-sm'>
        <figure className='figure-card-sm'>
          <Link to={`/record/releases/${i.id}`}> <img
            className= 'img-card-sm'
            alt={i.id}
            src={ i.cover_image === 'https://img.discogs.com/images/spacer.gif' ? vinyl : i.cover_image}
            />
          </Link>
        </figure>
          <div className='list-card-body-sm'>
          <div className='list-card-line'>
            <div className='list-card-t-line'>
              <p className='list-card-artist-sm'>
              {truncateString(stripTitle(i.title)[0],14)}
              </p>
              <p className='list-card-year-sm'>{i.year}</p>
            </div>
          </div>
          <div className='list-card-line-sm'>    
            <p className='list-card-title-sm'>
            {truncateString(stripTitle(i.title)[1],15)}
            </p>
            <p className='list-card-catno-sm'>{truncateString(i.catno,12)}</p>
          </div>
        </div>
      </div>)}
      </div>
      </div>
      
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.userReducer.user,
    favourites: state.favoReducer.favourites,
    favoIds: state.favoReducer.favoIds
  }
}

export default connect(mapStateToProps)(HotSpot);

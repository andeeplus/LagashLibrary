import React, { Component } from 'react';
import vinyl from '../../../img/vinyl.svg'
import ActionBar from '../../recordList/ActionBar/ActionBar'
import { truncateString, stripTitle } from '../../../services/helper'
import { connect } from 'react-redux';

class FavouriteList extends Component {



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

  render() {

    const {favourites, favoIds} = this.props

    // const { id, cover_image, title, year, catno, type, artist, user } = this.props

    // const actionProps = { 
    //   id, 
    //   cover_image, 
    //   title,
    //   year, 
    //   catno, 
    //   type,
    //   user, 
    //   artist
    // }


    return (

      <React.Fragment>

      <div className='RecordList pages-blocks'>
        {favoIds.artistId && favourites.artists.map(artistFav => {
          return (
            <div key={artistFav.id} className='list-card-sm extra-top'>
              <figure className='figure-card-sm'>
                <img
                  className= 'img-card-sm'
                  alt={artistFav.id}
                  src={ artistFav.cover_image === 'https://img.discogs.com/images/spacer.gif' ? vinyl : artistFav.cover_image}
                  />
              </figure>
              <ActionBar id={artistFav.id} type={artistFav.type} actionProps={...artistFav}/>
              <div className='list-card-body-sm'>
                <div className='list-card-line'>
                  { this.renderLabel(artistFav.type) }
                  <div className='list-card-t-line-sm'>
                    <p className='list-card-artist-sm'>{truncateString(artistFav.artist,12)}</p>
                  </div>
                </div>
              </div>
            </div>
              )})}



</div>
</React.Fragment>

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

export default connect(mapStateToProps)(FavouriteList);



import React, { Component } from 'react';
import vinyl from '../../../img/vinyl.svg'
import ActionBar from '../../recordList/ActionBar/ActionBar'
import { truncateString, stripTitle } from '../../../services/helper'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'

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

    const {recordFav, artistFav, labelFav} = this.props

    const { favourites } = this.props

    return (

      <React.Fragment>

      <div className='RecordList pages-blocks extra-top'>
        {artistFav && artistFav.map(artistFav => {
          return (
            <div key={artistFav.id} className='list-card-sm'>
              <figure className='figure-card-sm'>
                <Link to={`/detail/artists/${artistFav.id}`}> <img
                  className= 'img-card-sm'
                  alt={artistFav.id}
                  src={ artistFav.cover_image === 'https://img.discogs.com/images/spacer.gif' ? vinyl : artistFav.cover_image}
                  />
                </Link>
              </figure>
              <ActionBar id={artistFav.id} type={artistFav.type} actionProps={{...favourites.artists[artistFav.id]}}/>
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

        {labelFav && labelFav.map(labelFav => {
          return (
            <div key={labelFav.id} className='list-card-sm'>
              <figure className='figure-card-sm'>
                <Link to={`/detail/labels/${labelFav.id}`}> <img
                  className= 'img-card-sm'
                  alt={labelFav.id}
                  src={ labelFav.cover_image === 'https://img.discogs.com/images/spacer.gif' ? vinyl : labelFav.cover_image}
                  />
                </Link>
              </figure>
              <ActionBar id={labelFav.id} type={labelFav.type} actionProps={{...favourites.labels[labelFav.id]}}/>
              <div className='list-card-body-sm'>
                <div className='list-card-line'>
                  { this.renderLabel(labelFav.type) }
                  <div className='list-card-t-line-sm'>
                    <p className='list-card-artist-sm'>{truncateString(labelFav.title,13)}</p>
                  </div>
                </div>
              </div>
            </div>
              )})}

        {recordFav && recordFav.map(recordFav => {
          return (
            <div key={recordFav.id} className='list-card-sm'>
              <figure className='figure-card-sm'>
                <Link to={
                  recordFav.type === 'master' ? `/record/masters/${recordFav.id}` : `/record/releases/${recordFav.id}`
                }> <img
                  className= 'img-card-sm'
                  alt={recordFav.id}
                  src={ recordFav.cover_image === 'https://img.discogs.com/images/spacer.gif' ? vinyl : recordFav.cover_image}
                  />
                </Link>
              </figure>
              <ActionBar id={recordFav.id} type={recordFav.type} actionProps={
                recordFav.type === 'master' ? {...favourites.masters[recordFav.id]} : {...favourites.releases[recordFav.id]} 
              }/>
                <div className='list-card-body-sm'>
                <div className='list-card-line'>
                  { this.renderLabel(recordFav.type) }
                  <div className='list-card-t-line'>
                    <p className='list-card-artist-sm'>
                    {truncateString(stripTitle(recordFav.title)[0],12)}
                    </p>
                    <p className='list-card-year-sm'>{recordFav.year}</p>
                  </div>
                </div>
                <div className='list-card-line-sm'>    
                  <p className='list-card-title-sm'>
                  {truncateString(stripTitle(recordFav.title)[1],15)}
                  </p>
                  <p className='list-card-catno-sm'>{truncateString(recordFav.catno,12)}</p>
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




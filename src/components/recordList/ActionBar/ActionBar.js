import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'
import  DatabaseApi from '../../../services/dbApi'
import { connect } from 'react-redux';
import { refreshUserFromDb } from '../../../redux/actions/refreshUser'


class ActionBar extends Component {

  state = {
    article: '',
    artist: '',
    catno: '',
    id: '',
    cover_image: '',
    title: '',
    year: '',
    type:'',
    user: '',
    labelFav: [],
    artistFav: [],
    releaseFav: [],
    masterFav: [],
    heart: false,
    isDisabled: true
  }  


  linkTo(param,id) {
    switch(param) {
      case 'artist':
        return `/detail/artists/${id}`;
      case 'label':
        return `/detail/labels/${id}`;
      case 'master':
        return `/record/masters/${id}`;
      case 'release':
        return `/record/releases/${id}`;
      default:
        return `/record/releases/${id}`
    }
  }


  componentDidMount(){
    const {user, favoIds} = this.props

    if (user && favoIds){
      const {labelId, artistId, masterId, releaseId} = favoIds
      this.setState({
      labelFav: !labelId ? {} : labelId,
      artistFav: !artistId ? {} : artistId,
      releaseFav: !masterId ? {} : masterId,
      masterFav: !releaseId ? {} : releaseId,
      isDisabled: false
    }, () => this.shouldPrintHeart(this.props.id.toString())) 
    } else {
      this.setState({isDisabled: true})
    }
  }

  addToGlobalFavs = async () => {

    const user = this.props.user
    const { id= '', cover_image = '', title = '', year = '', catno = '', type = '', artist = '' } = this.props.actionProps

    const {labels, artists, releases, masters} = this.props.favourites
    
    this.setState({id:id.toString(), cover_image, title, year, catno, type, artist },
    async function() {

      switch(type){

        case 'artist':

          const artistFav = {artist: title, cover_image, id, type} 

          if (artists !== null && artists[id]){
            
            DatabaseApi.removeItemFromDoc('artistFav', user.id, id)
            delete artists[id]
            this.setState({heart: false}) 

          } else {

            DatabaseApi.updateDocument('artistFav', {[id]:artistFav}, user.id)
            artists[id] = artistFav
            this.setState({heart: true})
          }
          break;

        case 'label':

          const labelFav = {cover_image, id, title, type}

          if (labels !== null && labels[id]){
            
            DatabaseApi.removeItemFromDoc('labelFav', user.id, id)
            this.setState({heart: false}) 

          } else {

            DatabaseApi.updateDocument('labelFav', {[id]:labelFav}, user.id)
            this.setState({heart: true})
          }
          break;

        case 'release':

          const releaseFav = {cover_image, id, title, type, year, catno}

          if (releases !== null && releases[id]){
            
            DatabaseApi.removeItemFromDoc('releaseFav', user.id, id)
            this.setState({heart: false}) 

          } else {

            DatabaseApi.updateDocument('releaseFav', {[id]:releaseFav}, user.id)
            this.setState({heart: true})
          }
          break;

        case 'master':

          const masterFav = {cover_image, id, title, type, year, catno}

          if (masters !== null && masters[id]){
            
            DatabaseApi.removeItemFromDoc('masterFav', user.id, id)
            this.setState({heart: false}) 

          } else {

            DatabaseApi.updateDocument('masterFav', {[id]:masterFav}, user.id)
            this.setState({heart: true})
          }
          break;
          default:
      }
    })
  }

  async updateUserFavs (collection, docId, fieldid, itemToAdd){
    await DatabaseApi.updateItemArrayIntoDoc(collection, docId, fieldid, itemToAdd)
    this.props.refreshUserFromDb(this.props.user.id)
  }

  async removeUserFavs(collection, docId, fieldid, itemToRemove){
    await DatabaseApi.removeItemArrayIntoDoc(collection, docId, fieldid, itemToRemove)
    this.props.refreshUserFromDb(this.props.user.id)
  }


  shouldPrintHeart = (id) => {
    const {labelFav, artistFav, masterFav, releaseFav } = this.state
  
    switch(this.props.type){
      case 'artist':
      artistFav.includes(id) && this.setState({heart: true}) 
      break;
      case 'label':
      labelFav.includes(id) && this.setState({heart: true})
      break;
      case 'release':
      releaseFav.includes(id) && this.setState({heart: true})
      break;
      case 'master':
      masterFav.includes(id) && this.setState({heart: true})
      break;
      default:

    }

  }

  render() {
    
    const { id, type } = this.props
    const {labelFav,artistFav,releaseFav,masterFav } = this.state

    return (

      labelFav && artistFav && releaseFav && masterFav &&

      <div className="list-card-action">
        <Link className="list-card-button" to={this.linkTo(type,id)}>
          <FontAwesomeIcon icon="link" />
        </Link>
        <button style={{disabled: this.state.isDisabled}} className="list-card-button"><FontAwesomeIcon icon="plus-circle" /></button>
        { type === 'release' && <button className="list-card-button interchange"><FontAwesomeIcon icon="exchange-alt" /></button>}
        <button 
          className={`list-card-button${this.state.heart ? '-fav' : ''}`} 
          onClick={() => {this.props.user && this.addToGlobalFavs()}}><FontAwesomeIcon 
          icon="heart" 
          disabled={this.state.user}/></button>
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

const mapDispatchToProps = (dispatch) => {
  return {
    refreshUserFromDb: (userid) => { dispatch(refreshUserFromDb(userid)) }
  }
}


export default connect(mapStateToProps,mapDispatchToProps)(ActionBar);



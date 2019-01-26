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
    heart: false
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

    const labelFav = Object.keys(JSON.parse(localStorage.getItem(`${this.props.user.id}_favLabel`)))
    const artistFav = Object.keys(JSON.parse(localStorage.getItem(`${this.props.user.id}_favArtist`)))
    const releaseFav = Object.keys(JSON.parse(localStorage.getItem(`${this.props.user.id}_favRelease`)))
    const masterFav = Object.keys(JSON.parse(localStorage.getItem(`${this.props.user.id}_favMaster`)))

    this.setState({labelFav, artistFav, releaseFav, masterFav}, () => this.shouldPrintHeart(this.props.id))
    
  }


  addToGlobalFavs = async () => {

    const user = this.props.user
    const { id= '', cover_image = '', title = '', year = '', catno = '', type = '', artist = '' } = this.props.actionProps
    
    let prevArtistFav = JSON.parse(localStorage.getItem(`${user.id}_favArtist`))
    prevArtistFav = prevArtistFav === null ? prevArtistFav = {} : prevArtistFav
    
    let prevLabelFav = JSON.parse(localStorage.getItem(`${user.id}_favLabel`))
    prevLabelFav = prevLabelFav === null ? prevLabelFav = {} : prevLabelFav

    let prevReleaseFav = JSON.parse(localStorage.getItem(`${user.id}_favRelease`))
    prevReleaseFav = prevReleaseFav === null ? prevReleaseFav = {} : prevReleaseFav
    
    let prevMasterFav = JSON.parse(localStorage.getItem(`${user.id}_favMaster`))
    prevMasterFav = prevMasterFav === null ? prevMasterFav = {} : prevMasterFav


    this.setState({id:id.toString(), cover_image, title, year, catno, type, artist },
    async function() {

      switch(this.props.type){
        case 'artist':
          const artistFav = {artist: title, cover_image, id, type} 
          
          if (prevArtistFav !== null && prevArtistFav[id]){
            
            DatabaseApi.removeItemFromDoc('artistFav', user.id, id)
            delete prevArtistFav[id]
            localStorage.setItem(`${user.id}_favArtist`, JSON.stringify(prevArtistFav));
            this.setState({heart: false}) 

          } else {

            DatabaseApi.updateDocument('artistFav', {[id]:artistFav}, user.id)
            prevArtistFav[id] = artistFav
            localStorage.setItem(`${user.id}_favArtist`, JSON.stringify(prevArtistFav));
            this.setState({heart: true})
          }
          break;

        case 'label':
          const labelFav = {cover_image, id, title, type}

          if (prevLabelFav !== null && prevLabelFav[id]){
            
            DatabaseApi.removeItemFromDoc('labelFav', user.id, id)
            delete prevLabelFav[id]
            localStorage.setItem(`${user.id}_favLabel`, JSON.stringify(prevLabelFav));
            this.setState({heart: false}) 

          } else {

            DatabaseApi.updateDocument('labelFav', {[id]:labelFav}, user.id)
            prevLabelFav[id] = labelFav
            localStorage.setItem(`${user.id}_favLabel`, JSON.stringify(prevLabelFav));
            this.setState({heart: true})
          }
          break;

          case 'release':

          const releaseFav = {cover_image, id, title, type, year, catno}

          if (prevReleaseFav !== null && prevReleaseFav[id]){
            
            DatabaseApi.removeItemFromDoc('releaseFav', user.id, id)
            delete prevReleaseFav[id]
            localStorage.setItem(`${user.id}_favRelease`, JSON.stringify(prevReleaseFav));
            this.setState({heart: false}) 

          } else {

            DatabaseApi.updateDocument('releaseFav', {[id]:releaseFav}, user.id)
            prevReleaseFav[id] = releaseFav
            localStorage.setItem(`${user.id}_favRelease`, JSON.stringify(prevReleaseFav));
            this.setState({heart: true})
          }
          break;

          case 'master':
          const masterFav = {cover_image, id, title, type, year, catno}

          if (prevMasterFav !== null && prevMasterFav[id]){
            
            DatabaseApi.removeItemFromDoc('masterFav', user.id, id)
            delete prevMasterFav[id]
            localStorage.setItem(`${user.id}_favMaster`, JSON.stringify(prevMasterFav));
            this.setState({heart: false}) 

          } else {

            DatabaseApi.updateDocument('masterFav', {[id]:masterFav}, user.id)
            prevMasterFav[id] = masterFav
            localStorage.setItem(`${user.id}_favMaster`, JSON.stringify(prevMasterFav));
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


  isFavCssClass = (user, idRec) => { 
    
    return user.includes(idRec.toString()) ? "-fav" : ""  

  }


  shouldPrintHeart = (id) => {
    const {labelFav, artistFav, masterFav, releaseFav } = this.state
  
    switch(this.props.type){
      case 'artist':
      artistFav.includes(id.toString()) && this.setState({heart: true}) 
      break;
      case 'label':
      labelFav.includes(id.toString()) && this.setState({heart: true})
      break;
      case 'release':
      releaseFav.includes(id.toString()) && this.setState({heart: true})
      break;
      case 'master':
      masterFav.includes(id.toString()) && this.setState({heart: true})
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
        <button className="list-card-button"><FontAwesomeIcon icon="share-square" /></button>
        <button className="list-card-button"><FontAwesomeIcon icon="plus-circle" /></button>
        <button className={`list-card-button${this.state.heart ? '-fav' : ''}`} 
          onClick={() => {this.addToGlobalFavs()}}><FontAwesomeIcon icon="heart" /></button>
      </div>

    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.userReducer.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    refreshUserFromDb: (userid) => { dispatch(refreshUserFromDb(userid)) }
  }
}


export default connect(mapStateToProps,mapDispatchToProps)(ActionBar);



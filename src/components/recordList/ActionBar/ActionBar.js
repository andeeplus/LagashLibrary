import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'
import  DatabaseApi from '../../../services/dbApi'
import AuthApi from '../../../../src/services/authApi'
import { connect } from 'react-redux';
import { setUserInfo } from '../../../../src/redux/actions/authActions';

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
    heart: false
  }  

  componentDidMount() {
    console.log(this.props.heart)
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

  manageFav(id){
    AuthApi.registerAuthObserver(async (user) => {
      console.log("​App -> componentDidMount -> user", user)
      let userData = null;
      if (user) {
        userData = await DatabaseApi.getDocumentById('user', user.uid);
        if(!userData){ 
          console.log("Please verify your Firebase setup");
        }
      } 
      this.props.setUser(userData);
      this.setState({user:userData}, ()=> this.addToGlobalFavs(id));
    });
  }


  addToGlobalFavs = async (idRec) => {
    const user = this.state.user.id
    const { id= '', cover_image = '', title = '', year = '', catno = '', type = '', artist = '' } = this.props.actionProps

    const prevFavs = await DatabaseApi.getDocumentById('favourites', idRec.toString())
    const userData = await DatabaseApi.getDocumentById('user', user)


    this.setState({id:id.toString(), cover_image, title, year, catno, type, artist, user },
    async function() {

      switch(this.props.type){
        case 'artist':
          if (prevFavs !== null && userData.artistFav.includes(idRec.toString())){
            this.removeUserFavs('user', user, 'artistFav', idRec.toString())
          } else {
            DatabaseApi.addDocumentWithID('favourites', this.state, idRec.toString())
            this.updateUserFavs('user', user, 'artistFav', idRec.toString())
          }
          break;
        case 'label':
          if (prevFavs !== null && userData.labelFav.includes(idRec.toString())){
            this.removeUserFavs('user', user, 'labelFav', idRec.toString())
          } else {
            DatabaseApi.addDocumentWithID('favourites', this.state, idRec.toString())
            this.updateUserFavs('user', user, 'labelFav', idRec.toString())
          }
          break;
        case 'release':
          if (prevFavs !== null && userData.releaseFav.includes(idRec.toString())){
            this.removeUserFavs('user', user, 'releaseFav', idRec.toString())
          } else {
            DatabaseApi.addDocumentWithID('favourites', this.state, idRec.toString())
            this.updateUserFavs('user', user, 'releaseFav', idRec.toString())
          }
          break;
        case 'master':
          if (prevFavs !== null && userData.masterFav.includes(idRec.toString())){
            this.removeUserFavs('user', user, 'masterFav', idRec.toString())
          } else {
            DatabaseApi.addDocumentWithID('favourites', this.state, idRec.toString())
            this.updateUserFavs('user', user, 'masterFav', idRec.toString())
          }
          break;
        default:
      }
    })
  }


  updateUserFavs(collection, docId, fieldid, itemToAdd){
    DatabaseApi.updateItemArrayIntoDoc(collection, docId, fieldid, itemToAdd)
  }

  removeUserFavs(collection, docId, fieldid, itemToRemove){
    DatabaseApi.removeItemArrayIntoDoc(collection, docId, fieldid, itemToRemove)
  }


  isFavCssClass = (user, idRec) => { 
    
    return user.includes(idRec.toString()) ? "-fav" : ""  

  }

  heartCallback = () => {
    console.log('ENTRANDOOOOOO')
    console.log(this.state.heart)
    this.setState({heart: !this.state.heart})
  }

  render() {
    
    const { id, type } = this.props
    const { heart } = this.state

    return (

      <div className="list-card-action">
        <Link className="list-card-button" to={this.linkTo(type,id)}>
          <FontAwesomeIcon icon="link" />
        </Link>
        <button className="list-card-button"><FontAwesomeIcon icon="share-square" /></button>
        <button className="list-card-button"><FontAwesomeIcon icon="plus-circle" /></button>
        <button className={`list-card-button${this.props.heart || heart ? '-fav' : ''}`} onClick={() => {this.manageFav(id); this.heartCallback()}}><FontAwesomeIcon icon="heart" /></button>
      </div>

    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setUser: (userInfo) => { dispatch(setUserInfo(userInfo)) }
  }
}

export default connect(null, mapDispatchToProps)(ActionBar);


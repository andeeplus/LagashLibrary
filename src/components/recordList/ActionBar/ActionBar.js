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
    user: ''
  }  

  componentWillMount(){
    // const {user, id} = this.props
    // console.log('---->USER ACTION',this.props)
    // this.isFavCssClass(user.userFav, id)
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

    this.setState({id:id.toString(), cover_image, title, year, catno, type, artist, user },
    async function() {

      const prevFavs = await DatabaseApi.getDocumentById('favourites', idRec.toString())
      const userData = await DatabaseApi.getDocumentById('user', user)

        if (prevFavs !== null && userData.userFav.includes(idRec.toString())){
          this.removeUserFavs('user', user, 'userFav', idRec.toString())
        } else {
          DatabaseApi.addDocumentWithID('favourites', this.state, idRec.toString())
          this.updateUserFavs('user', user, 'userFav', idRec.toString())
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

  render() {
    
    const { id, type } = this.props

    return (

      <div className="list-card-action">
        <Link className="list-card-button" to={this.linkTo(type,id)}>
          <FontAwesomeIcon icon="link" />
        </Link>
        <button className="list-card-button"><FontAwesomeIcon icon="share-square" /></button>
        <button className="list-card-button"><FontAwesomeIcon icon="plus-circle" /></button>
        <button className="list-card-button" onClick={() => this.manageFav(id)}><FontAwesomeIcon icon="heart" /></button>
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


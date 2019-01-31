import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'
import  DatabaseApi from '../../../services/dbApi'
import { connect } from 'react-redux';
import { refreshUserFromDb } from '../../../redux/actions/refreshUser'
import { refreshFav } from '../../../redux/actions/refreshFav'

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
    
    
    this.firstCall()


  }

  componentDidUpdate(prevProps){
    if (prevProps.favoIds !== this.props.favoIds){this.firstCall()}
  }

  firstCall(){
    const {user} = this.props   

    if (user){
      this.setState({
      isDisabled: false
    }, () => this.shouldPrintHeart(this.props.id.toString())) 
    } else {
      this.setState({isDisabled: true})
    }
  }

  addToGlobalFavs = async (id) => {

    const user = this.props.user

    const {actionProps, favourites, favoIds} = this.props
    const {type} = actionProps
    
      switch(type){

          case 'label':
          if (favoIds.labelId.includes(id.toString())){      
            this.props.refreshFav(user, 'REMOVE', actionProps, favourites, favoIds)
          } else {
            this.props.refreshFav(user, 'ADD', actionProps, favourites, favoIds)
          } break;


        case 'artist':

          if (favoIds.artistId.includes(id.toString())){            
            this.props.refreshFav(user, 'REMOVE', actionProps, favourites, favoIds)
          } else {
            this.props.refreshFav(user, 'ADD', actionProps, favourites, favoIds)
          } break;

        case 'release':

        if (favoIds.releaseId.includes(id.toString())){         
            this.props.refreshFav(user, 'REMOVE', actionProps, favourites, favoIds)
          } else {
            this.props.refreshFav(user, 'ADD', actionProps, favourites, favoIds)
          } break;

        case 'master':

        if (favoIds.masterId.includes(id.toString())){            
            this.props.refreshFav(user, 'REMOVE', actionProps, favourites, favoIds)
          } else {
            this.props.refreshFav(user, 'ADD', actionProps, favourites, favoIds)
          } break;

          default:
      }

      this.shouldPrintHeart(id)
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
    const {favoIds} = this.props

    switch(this.props.type){
      case 'artist':
      favoIds.artistId.includes(id) ? this.setState({heart: true}) : this.setState({heart: false})
      break;
      case 'label':
      favoIds.labelId.includes(id) ? this.setState({heart: true}) : this.setState({heart: false})
      break;
      case 'release':
      favoIds.releaseId.includes(id) ? this.setState({heart: true}) : this.setState({heart: false})
      break;
      case 'master':
      favoIds.masterId.includes(id) ? this.setState({heart: true}) : this.setState({heart: false})
      break;
      default:

    }

  }

  render() {
    
    const { id, type } = this.props

    return (

      this.props.favoIds &&

      <div className="list-card-action">
        <Link className="list-card-button" to={this.linkTo(type,id)}>
          <FontAwesomeIcon icon="link" />
        </Link>
        <button style={{disabled: this.state.isDisabled}} className="list-card-button"><FontAwesomeIcon icon="plus-circle" /></button>
        { type === 'release' && <button className="list-card-button interchange"><FontAwesomeIcon icon="exchange-alt" /></button>}
        <button 
          className={`list-card-button${this.state.heart ? '-fav' : ''}`} 
          onClick={() => {this.props.user && this.addToGlobalFavs(this.props.id.toString())}}><FontAwesomeIcon 
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
    refreshUserFromDb: (userid) => { dispatch(refreshUserFromDb(userid)) },
    refreshFav: (user, actionType, actionProps, favourites, favoIds) => { dispatch(refreshFav(user, actionType, actionProps, favourites, favoIds))}
  }
}


export default connect(mapStateToProps,mapDispatchToProps)(ActionBar);


